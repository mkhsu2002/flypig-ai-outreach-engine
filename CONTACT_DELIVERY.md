# Website Inquiry Delivery

Implementation date: 2026-09-19. Live release verification is pending below until evidence is recorded. This replaces the direct-send backend limitation recorded in the earlier SEO audit.

## Contract and security

- Public `POST /api/contact`: same required form fields and affirmative consent, JSON only, strict site/own-preview origins, honeypot, 24,000-byte streamed-body limit, per-field bounds and HTML escaping.
- Store the exact notification payload in private D1 before attempting delivery. `200 sent/already_sent` means provider acceptance or permanent replay; `202 accepted` means durably saved for recovery, not confirmed delivery. Failure to persist returns `503`.
- `Idempotency-Key` identifies one submission. The client retains only a key and payload digest in session storage during retries; no personal fields are stored there. Changed payload with the same key is `409`. Old clients receive deterministic payload-based deduplication.
- Atomic two-minute delivery leases and permanent `sent` rows prevent duplicate dispatch. Resend's 24-hour idempotency window is secondary protection. Unknown outcomes older than 23 hours or five attempts become `needs_review`, never blindly resend. This intentionally favors manual reconciliation over possible duplicate mail.
- Sender is `info@flypigai.ca`; configured owner is the only recipient. Reply-To is the submitter. No subscriber listing, broadcast or automatic reply is performed.
- `contact_audit` keeps only request/recipient hashes, stage, attempt, time, provider ID and sanitized error code. It never contains request content or raw email addresses.
- Successful payloads are removed by daily maintenance after 30 days; hashed audit and deduplication records remain. Unresolved payloads remain for review. Restrict D1/dashboard access to operators. The privacy pages disclose this retention.
- Origin checks and honeypots are not complete bot protection. Monitor volume and add Cloudflare abuse controls if observed traffic warrants them; avoid logging raw inquiries.

## Environments and deployment

| Environment | Host | CONTACT_DB |
| --- | --- | --- |
| production | `outreach-engine.flypigai.ca` | `e5767f6d-7f6e-4480-a4a3-b696591f26f7` |
| preview | `contact-delivery-preview.flypig-ai-outreach-engine.pages.dev` | `68c08506-8896-4b20-8473-3ad913da9deb` |

Migration: `migrations/0001_contact.sql`, tracked in `contact_migrations`. Each environment independently requires `RESEND_API_KEY`, `RESEND_TO_EMAIL`, `CONTACT_RECOVERY_TOKEN` as platform secrets and `RESEND_FROM_EMAIL`, `NODE_VERSION=24` as plain settings. No values belong in the repo or CI. The recovery Worker holds only `CONTACT_RECOVERY_TOKEN` and endpoint URLs, never a provider key.

1. Run `python3 scripts/build_site.py`, `python3 scripts/check_site.py`, `node --test scripts/site.test.mjs tests/*.test.mjs`, and `git diff --check`.
2. Deploy the recovery script with `npx wrangler@4 deploy --config wrangler.recovery.jsonc`. It is deployed separately from Pages; changes require an explicit Worker deployment.
3. For initial setup or coordinated rotation only, run `python3 scripts/contact-admin.py` interactively. It takes the provider secret via hidden input, stores it only on Pages, applies the idempotent migration in both environments, sets matching trigger secrets on Pages/Worker, and verifies binding names and migration records. Keep the controller session open through release verification; its trigger is ephemeral memory only. Never pass credentials as command arguments. Future operator tools should inject the trigger from OS secure storage instead of re-running setup merely to inspect a request.
4. Push the tested revision to `contact-delivery-preview`, verify its deployed commit, run `smoke preview` then `status preview` and `recover preview` in the controller. Smoke sends exactly one owner notification, followed by an exact replay.
5. Only after preview succeeds, push the same revision to `main`. Verify the production commit, `smoke production`, `status production`, and `recover production`. Check unauthenticated recovery is `401` and both environments have the same schema/function contract before considering the release complete.
6. Record redacted evidence below; docs-only updates must not rebuild or deploy the site. Exit the controller to discard in-memory credentials.

## Recovery and operations

`POST /api/contact-recovery` requires the high-entropy bearer trigger, processes at most five pending records, and purges expired successful payloads. Authenticated `GET ?id=<request-hash>` returns delivery state and a deployed-provider status lookup without disclosing the notification content. Provider `sent` acceptance is not the same as recipient-server `delivered`.

`flypig-outreach-contact-recovery` runs at 08:17 UTC once daily (`wrangler.recovery.jsonc`). Primary delivery is event-driven, not cron. The budget is at most 31 scheduled invocations and 62 endpoint calls in a 31-day month across both environments; low-volume healthy operation is expected to be almost entirely empty recovery runs, which exit after bounded queries. No scheduled builds or minute-level polling exist.

Inspect D1 for `pending`, `sending` with expired lease, and `needs_review`; inspect sanitized `provider_code` and protected provider readback. Retry within the safe window via the protected endpoint. For `needs_review`, reconcile the provider ID/idempotency result before any manual action; never delete a sent deduplication record to force resend. Unresolved records require operator follow-up and do not auto-expire. This flow has no separate alerting channel for delivery failures.

## Release Evidence

- 2026-09-19: migration `0001_contact.sql` and required platform bindings/secrets were applied and read back for both environments.
- Recovery Worker initially deployed as version `b3e9ac15-f89b-4fff-a978-712c6abc610f`; daily schedule accepted by Cloudflare. Live Pages/send/replay checks pending.

References: [Cloudflare Pages D1 bindings](https://developers.cloudflare.com/pages/functions/bindings/#d1-databases), [Resend send API](https://resend.com/docs/api-reference/emails/send-email), [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys).
