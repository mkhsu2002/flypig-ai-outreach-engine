const MAX_BODY_BYTES = 24000;
const ALLOWED_ORIGINS = new Set([
  "https://outreach-engine.flypigai.ca",
  "https://flypig-ai-outreach-engine.pages.dev"
]);

function clean(value, max = 4000) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value) {
  return clean(value, 8000)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function singleLine(value, max = 200) {
  return clean(value, max).replace(/[\r\n]+/g, " ");
}

function response(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const origin = request.headers.get("Origin");
  if (origin && !ALLOWED_ORIGINS.has(origin) && !origin.endsWith(".pages.dev")) {
    return response({ ok: false, error: "origin_not_allowed" }, 403);
  }

  const length = Number(request.headers.get("Content-Length") || "0");
  if (length > MAX_BODY_BYTES) {
    return response({ ok: false, error: "payload_too_large" }, 413);
  }

  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL || !env.RESEND_TO_EMAIL) {
    return response({ ok: false, error: "server_not_configured" }, 500);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return response({ ok: false, error: "invalid_json" }, 400);
  }

  if (clean(data.confirm_company_website, 100)) {
    return response({ ok: true }, 200);
  }

  const name = clean(data.name, 120);
  const email = clean(data.email, 200);
  const company = clean(data.company, 200);
  const website = clean(data.website, 500);
  const market = clean(data.target_market, 240);
  const timeline = clean(data.timeline, 120);
  const objective = clean(data.objective, 240);
  const offer = clean(data.offer, 4000);
  const targets = clean(data.target_hypothesis, 4000);
  const volume = clean(data.prospect_volume, 120);
  const budget = clean(data.budget_range, 120);
  const constraints = clean(data.constraints, 4000);
  const notes = clean(data.notes, 4000);
  const consent = clean(data.consent, 20);

  if (!name || !email || !company || !market || !objective || !offer || consent !== "yes") {
    return response({ ok: false, error: "missing_required_fields" }, 400);
  }
  if (!validEmail(email)) {
    return response({ ok: false, error: "invalid_email" }, 400);
  }

  const fields = [
    ["Name", name],
    ["Email", email],
    ["Company", company],
    ["Website", website || "—"],
    ["Target market", market],
    ["Timeline", timeline || "—"],
    ["Objective", objective],
    ["Offer", offer],
    ["Target hypothesis", targets || "—"],
    ["Prospect volume", volume || "—"],
    ["Budget range", budget || "—"],
    ["Constraints", constraints || "—"],
    ["Notes", notes || "—"]
  ];

  const htmlRows = fields.map(([k,v]) =>
    `<tr><th align="left" style="padding:8px;border-bottom:1px solid #ddd;vertical-align:top">${escapeHtml(k)}</th><td style="padding:8px;border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
  ).join("");

  const textBody = fields.map(([k,v]) => `${k}: ${v}`).join("\n\n");

  const resend = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: `FlyPig AI Outreach Engine <${env.RESEND_FROM_EMAIL}>`,
      to: [env.RESEND_TO_EMAIL],
      reply_to: email,
      subject: `New project brief · ${singleLine(company)} · ${singleLine(market)}`,
      text: textBody,
      html: `<h2>FlyPig AI Outreach Engine — New project brief</h2><table style="border-collapse:collapse;width:100%;max-width:760px">${htmlRows}</table><p style="margin-top:20px;color:#666">Source: outreach-engine.flypigai.ca managed-service form</p>`
    })
  });

  const resultText = await resend.text();
  if (!resend.ok) {
    console.error("Resend error", resend.status, resultText);
    return response({ ok: false, error: "email_delivery_failed" }, 502);
  }

  return response({ ok: true }, 200);
}
