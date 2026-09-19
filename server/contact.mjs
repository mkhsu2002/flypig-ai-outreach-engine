const MAX_BYTES = 24000;
const SAFE_RETRY_MS = 23 * 60 * 60 * 1000;
const fields = [
  ['name', 'Name', 120], ['email', 'Email', 200], ['company', 'Company', 200],
  ['website', 'Website', 500], ['target_market', 'Target market', 240],
  ['timeline', 'Timeline', 120], ['objective', 'Objective', 240], ['offer', 'Offer', 4000],
  ['target_hypothesis', 'Target hypothesis', 4000], ['prospect_volume', 'Prospect volume', 120],
  ['budget_range', 'Budget range', 120], ['constraints', 'Constraints', 4000], ['notes', 'Notes', 4000],
];
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const json = (body, status = 200) => Response.json(body, { status, headers: {
  'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow',
} });
const ready = env => env.CONTACT_DB && env.RESEND_API_KEY && env.RESEND_FROM_EMAIL && env.RESEND_TO_EMAIL;
const sha = async value => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))))
  .map(n => n.toString(16).padStart(2, '0')).join('');
const escaped = value => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function validOrigin(origin) {
  if (!origin) return false;
  try {
    const url = new URL(origin);
    return url.origin === origin && url.protocol === 'https:' && !url.port &&
      (url.hostname === 'outreach-engine.flypigai.ca' || url.hostname === 'flypig-ai-outreach-engine.pages.dev' ||
       /^[a-z0-9-]+\.flypig-ai-outreach-engine\.pages\.dev$/.test(url.hostname));
  } catch { return false; }
}

async function readBody(request) {
  if (Number(request.headers.get('Content-Length')) > MAX_BYTES) throw new Error('payload_too_large');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('invalid_json');
  const chunks = []; let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > MAX_BYTES) { await reader.cancel(); throw new Error('payload_too_large'); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  try { return JSON.parse(new TextDecoder().decode(bytes)); } catch { throw new Error('invalid_json'); }
}

function audit(env, row, stage, code = null, providerId = null) {
  return env.CONTACT_DB.prepare('INSERT OR IGNORE INTO contact_audit (request_id,stage,attempt,recorded_at,recipient_hash,provider_id,provider_code) VALUES (?,?,?,?,?,?,?)')
    .bind(row.id, stage, row.attempts, Date.now(), row.recipient_hash, providerId, code);
}

export async function deliver(id, env, provider = fetch) {
  const db = env.CONTACT_DB;
  let row = await db.prepare('SELECT * FROM contact_requests WHERE id = ?').bind(id).first();
  if (!row || row.status === 'sent' || row.status === 'needs_review') return row?.status;
  const now = Date.now();
  if (row.lease_until > now) return 'sending';
  // An uncertain result must never be resent after Resend's deduplication window.
  if (!row.payload || row.attempts >= 5 || (row.first_attempt && now - row.first_attempt >= SAFE_RETRY_MS)) {
    await db.batch([
      db.prepare("UPDATE contact_requests SET status='needs_review', lease_until=0 WHERE id=? AND status!='sent'").bind(id),
      audit(env, row, 'needs_review', 'retry_requires_review'),
    ]);
    return 'needs_review';
  }
  const claimed = await db.prepare("UPDATE contact_requests SET status='sending', attempts=attempts+1, first_attempt=COALESCE(first_attempt,?), lease_until=? WHERE id=? AND status IN ('pending','sending') AND lease_until<=?")
    .bind(now, now + 120000, id, now).run();
  if (!claimed.meta.changes) return 'sending';
  row = await db.prepare('SELECT * FROM contact_requests WHERE id=?').bind(id).first();
  await audit(env, row, 'sending').run();
  let result; let body; let code = 'network_error';
  try {
    result = await provider('https://api.resend.com/emails', {
      method: 'POST', signal: AbortSignal.timeout(12000),
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `contact-${id}` },
      body: row.payload,
    });
    body = await result.json();
    code = `http_${result.status}:${String(body.name || 'provider_response').replace(/[^a-zA-Z0-9_-]/g, '').slice(0,60)}`;
  } catch { /* Keep the durable event pending when the provider outcome is unknown. */ }
  if (result?.ok && typeof body?.id === 'string') {
    await db.batch([
      db.prepare("UPDATE contact_requests SET status='sent', provider_id=?, provider_code=NULL, sent_at=?, lease_until=0 WHERE id=?")
        .bind(body.id, Date.now(), id),
      audit(env, row, 'sent', null, body.id),
    ]);
    return 'sent';
  }
  await db.batch([
    db.prepare("UPDATE contact_requests SET status='pending', provider_code=?, lease_until=0 WHERE id=?").bind(code, id),
    audit(env, row, 'pending', code),
  ]);
  return 'pending';
}

export async function submit(request, env, provider = fetch) {
  if (!validOrigin(request.headers.get('Origin'))) return json({ ok: false, error: 'origin_not_allowed' }, 403);
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) return json({ ok: false, error: 'json_required' }, 415);
  if (!ready(env)) return json({ ok: false, error: 'temporarily_unavailable' }, 503);
  let data;
  try { data = await readBody(request); }
  catch (error) { return json({ ok: false, error: error.message }, error.message === 'payload_too_large' ? 413 : 400); }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return json({ ok: false, error: 'invalid_fields' }, 400);
  if (data.confirm_company_website) return json({ ok: true, status: 'accepted' });
  const values = {};
  for (const [key, , limit] of fields) {
    if (data[key] != null && typeof data[key] !== 'string') return json({ ok: false, error: 'invalid_fields' }, 400);
    values[key] = (data[key] || '').trim();
    if (values[key].length > limit) return json({ ok: false, error: 'field_too_long' }, 400);
  }
  if (['name','email','company','target_market','objective','offer'].some(key => !values[key]) || data.consent !== 'yes' || !emailPattern.test(values.email)) {
    return json({ ok: false, error: 'invalid_fields' }, 400);
  }
  const payloadHash = await sha(JSON.stringify(values));
  const key = request.headers.get('Idempotency-Key') || `legacy-${payloadHash}`;
  if (!/^[a-zA-Z0-9_-]{8,128}$/.test(key)) return json({ ok: false, error: 'invalid_request_key' }, 400);
  const id = await sha(key);
  const db = env.CONTACT_DB;
  try {
    const existing = await db.prepare('SELECT * FROM contact_requests WHERE id=?').bind(id).first();
    if (existing?.payload_hash !== undefined && existing.payload_hash !== payloadHash) return json({ ok: false, error: 'request_key_conflict' }, 409);
    if (existing?.status === 'sent') return json({ ok: true, status: 'already_sent' });
    if (!existing) {
      const owner = env.RESEND_TO_EMAIL.trim().toLowerCase();
      const from = env.RESEND_FROM_EMAIL.trim().toLowerCase();
      if (!emailPattern.test(owner) || !emailPattern.test(from)) return json({ ok: false, error: 'temporarily_unavailable' }, 503);
      const recipientHash = await sha(owner);
      const payload = JSON.stringify({
        from: `FlyPig AI Outreach Engine <${from}>`, to: [owner], reply_to: values.email,
        subject: `New project brief | ${values.company} | ${values.target_market}`.replace(/[\r\n]+/g, ' '),
        text: fields.map(([key,label]) => `${label}: ${values[key] || '-'}`).join('\n\n'),
        html: '<h2>New FlyPig AI project brief</h2><table>' + fields.map(([key,label]) => `<tr><th align="left">${label}</th><td style="white-space:pre-wrap">${escaped(values[key] || '-')}</td></tr>`).join('') + '</table>',
      });
      const row = { id, recipient_hash: recipientHash, attempts: 0 };
      await db.batch([
        db.prepare('INSERT OR IGNORE INTO contact_requests (id,payload_hash,recipient_hash,payload,created_at) VALUES (?,?,?,?,?)')
          .bind(id, payloadHash, recipientHash, payload, Date.now()),
        audit(env, row, 'accepted'),
      ]);
      const stored = await db.prepare('SELECT payload_hash FROM contact_requests WHERE id=?').bind(id).first();
      if (stored.payload_hash !== payloadHash) return json({ ok: false, error: 'request_key_conflict' }, 409);
    }
    try {
      const status = await deliver(id, env, provider);
      return json({ ok: true, status: status === 'sent' ? 'sent' : 'accepted' }, status === 'sent' ? 200 : 202);
    } catch {
      // Persistence has succeeded, so do not invite another submission on an audit/network failure.
      return json({ ok: true, status: 'accepted' }, 202);
    }
  } catch {
    return json({ ok: false, error: 'temporarily_unavailable' }, 503);
  }
}

export async function recover(request, env, provider = fetch) {
  const supplied = request.headers.get('Authorization') || '';
  if (!env.CONTACT_RECOVERY_TOKEN || await sha(supplied) !== await sha(`Bearer ${env.CONTACT_RECOVERY_TOKEN}`)) return json({ ok: false }, 401);
  if (!ready(env)) return json({ ok: false, error: 'temporarily_unavailable' }, 503);
  const url = new URL(request.url);
  if (request.method === 'GET') {
    const id = url.searchParams.get('id');
    if (!id || !/^[a-f0-9]{64}$/.test(id)) return json({ ok: false }, 400);
    const row = await env.CONTACT_DB.prepare('SELECT status, provider_id, provider_code, attempts FROM contact_requests WHERE id=?').bind(id).first();
    if (!row) return json({ ok: false }, 404);
    let delivery = null;
    if (row.provider_id) {
      const response = await provider(`https://api.resend.com/emails/${encodeURIComponent(row.provider_id)}`, { headers: { Authorization: `Bearer ${env.RESEND_API_KEY}` } });
      const result = await response.json();
      delivery = response.ok ? { last_event: result.last_event } : { status: response.status, name: result.name };
    }
    return json({ ok: true, ...row, delivery });
  }
  if (request.method !== 'POST') return json({ ok: false }, 405);
  const pending = await env.CONTACT_DB.prepare("SELECT id FROM contact_requests WHERE status IN ('pending','sending') AND lease_until<=? ORDER BY created_at LIMIT 5").bind(Date.now()).all();
  const results = [];
  for (const row of pending.results) results.push({ id: row.id, status: await deliver(row.id, env, provider) });
  await env.CONTACT_DB.prepare("UPDATE contact_requests SET payload=NULL WHERE status='sent' AND sent_at<?").bind(Date.now() - 30 * 86400000).run();
  return json({ ok: true, processed: results.length, results });
}
