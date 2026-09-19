import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { submit, recover, deliver } from '../server/contact.mjs';

function setup() {
  const db = new DatabaseSync(':memory:');
  db.exec(readFileSync(new URL('../migrations/0001_contact.sql', import.meta.url), 'utf8'));
  const wrap = (sql, args = []) => ({
    bind: (...values) => wrap(sql, values),
    first: async () => db.prepare(sql).get(...args) || null,
    all: async () => ({ results: db.prepare(sql).all(...args) }),
    run: async () => ({ meta: db.prepare(sql).run(...args) }),
  });
  const env = { CONTACT_DB: { prepare: sql => wrap(sql), batch: async list => {
    db.exec('BEGIN');
    try { const result = []; for (const query of list) result.push(await query.run()); db.exec('COMMIT'); return result; }
    catch (error) { db.exec('ROLLBACK'); throw error; }
  } }, RESEND_API_KEY: 'test-only', RESEND_FROM_EMAIL: 'info@example.org', RESEND_TO_EMAIL: 'owner@example.org', CONTACT_RECOVERY_TOKEN: 'test-trigger' };
  return { db, env };
}
const fields = { name: 'Test', email: 'submitter@example.org', company: 'Example', target_market: 'Canada', objective: 'Research', offer: 'Test project', consent: 'yes' };
function request(body = fields, key = 'test-request-0001', origin = 'https://outreach-engine.flypigai.ca') {
  return new Request('https://outreach-engine.flypigai.ca/api/contact', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', 'Idempotency-Key': key }, body: JSON.stringify(body) });
}
const sent = () => Response.json({ id: 'provider-test-id' });

test('persists before provider send, uses configured owner and submitter reply-to', async () => {
  const { db, env } = setup();
  const response = await submit(request(), env, async (url, options) => {
    assert.equal(db.prepare('SELECT count(*) AS n FROM contact_requests').get().n, 1);
    const payload = JSON.parse(options.body);
    assert.deepEqual(payload.to, [env.RESEND_TO_EMAIL]);
    assert.equal(payload.reply_to, fields.email);
    assert.equal(url, 'https://api.resend.com/emails');
    assert.ok(options.headers['Idempotency-Key']);
    return sent();
  });
  assert.equal(response.status, 200);
  assert.equal(db.prepare('SELECT status FROM contact_requests').get().status, 'sent');
  assert.equal(db.prepare('SELECT count(*) AS n FROM contact_audit').get().n, 3);
  assert.ok(!JSON.stringify(db.prepare('SELECT * FROM contact_audit').all()).includes(fields.email));
});

test('permanent replay sends nothing and changed payload with same key conflicts', async () => {
  const { env } = setup(); let calls = 0;
  const provider = async () => { calls++; return sent(); };
  await submit(request(), env, provider);
  assert.equal((await (await submit(request(), env, provider)).json()).status, 'already_sent');
  assert.equal((await submit(request({ ...fields, offer: 'Changed' }), env, provider)).status, 409);
  assert.equal(calls, 1);
});

test('invalid origin, fields, content type and oversized actual body reject before sending', async () => {
  const { db, env } = setup(); const provider = () => { throw Error('Must not call'); };
  assert.equal((await submit(request(fields, 'test-request-0001', 'https://attacker.pages.dev'), env, provider)).status, 403);
  assert.equal((await submit(request({}), env, provider)).status, 400);
  const wrongType = request();
  wrongType.headers.set('Content-Type', 'text/plain');
  assert.equal((await submit(wrongType, env, provider)).status, 415);
  assert.equal((await submit(request({ ...fields, offer: 'x'.repeat(25000) }), env, provider)).status, 413);
  assert.equal(db.prepare('SELECT count(*) AS n FROM contact_requests').get().n, 0);
});

test('database failure cannot send an unpersisted inquiry', async () => {
  const { env } = setup();
  env.CONTACT_DB.prepare = () => { throw Error('database unavailable'); };
  const result = await submit(request(), env, () => { throw Error('Must not send'); });
  assert.equal(result.status, 503);
});

test('active delivery lease prevents concurrent sends and payload cleanup preserves replay', async () => {
  const { db, env } = setup();
  let calls = 0;
  await submit(request(), env, async () => {
    calls++;
    const id = db.prepare('SELECT id FROM contact_requests').get().id;
    assert.equal(await deliver(id, env, () => { throw Error('Lease must prevent provider access'); }), 'sending');
    return sent();
  });
  db.prepare('UPDATE contact_requests SET sent_at=?').run(Date.now() - 31 * 86400000);
  await recover(new Request('https://example.org/api/contact-recovery', { method: 'POST', headers: { Authorization: 'Bearer test-trigger' } }), env, sent);
  assert.equal(db.prepare('SELECT payload FROM contact_requests').get().payload, null);
  assert.equal((await (await submit(request(), env, () => { throw Error('Must not resend'); })).json()).status, 'already_sent');
  assert.equal(calls, 1);
});

test('recovery scheduler contains only protected trigger configuration', () => {
  const worker = readFileSync(new URL('../workers/contact-recovery.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(worker, /RESEND_API_KEY|api\.resend\.com/);
  assert.match(worker, /CONTACT_RECOVERY_TOKEN/);
});

test('missing bindings fail closed and honeypot produces no event', async () => {
  assert.equal((await submit(request(), {}, sent)).status, 503);
  const { db, env } = setup();
  assert.equal((await submit(request({ ...fields, confirm_company_website: 'spam' }), env, sent)).status, 200);
  assert.equal(db.prepare('SELECT count(*) AS n FROM contact_requests').get().n, 0);
});

test('failed delivery stays durable and authorized recovery does not replay sent rows', async () => {
  const { db, env } = setup();
  assert.equal((await submit(request(), env, async () => Response.json({ name: 'rate_limit_exceeded' }, { status: 429 }))).status, 202);
  assert.equal(db.prepare('SELECT status FROM contact_requests').get().status, 'pending');
  assert.equal((await recover(new Request('https://example.org/api/contact-recovery'), env, sent)).status, 401);
  const auth = () => new Request('https://example.org/api/contact-recovery', { method: 'POST', headers: { Authorization: 'Bearer test-trigger' } });
  let calls = 0;
  await recover(auth(), env, async () => { calls++; return sent(); });
  await recover(auth(), env, async () => { calls++; return sent(); });
  assert.equal(calls, 1);
  assert.equal(db.prepare('SELECT status FROM contact_requests').get().status, 'sent');
});

test('uncertain old attempts require review instead of risking a duplicate email', async () => {
  const { db, env } = setup();
  await submit(request(), env, async () => { throw Error('timeout'); });
  db.prepare('UPDATE contact_requests SET first_attempt = ?, lease_until = 0').run(Date.now() - 25 * 3600000);
  const id = db.prepare('SELECT id FROM contact_requests').get().id;
  await deliver(id, env, () => { throw Error('Must not send outside provider idempotency window'); });
  assert.equal(db.prepare('SELECT status FROM contact_requests').get().status, 'needs_review');
});
