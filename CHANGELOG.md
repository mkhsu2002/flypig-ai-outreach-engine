# Changelog

All notable changes to FlyPig AI Outreach Engine are documented here.

## 0.1.0

Initial open-source Core release.

### Product scope

The Open Core is a single-LLM-first Skill system for prospect research and qualification.

Primary output:

`Qualified Prospect Tracker`

Public workflow:

```text
Mission Discovery
→ Prospect Discovery
→ Dedup Gate
→ Discovery Diversity Check
→ Account Research
→ Qualification
→ Prospect Audit
→ Contact Verification
→ Qualified Prospect Tracker
```

### Included

1. Free-form Adaptive Mission Discovery
2. `RESEARCH / INFER / ASK / PROCEED` interaction protocol
3. Canonical Tracker with Google Sheets recommendation and local CSV default
4. Mandatory prospect identity deduplication
5. Evidence-before-qualification rules
6. Fact / hypothesis / unknown / counter-evidence separation
7. Discovery Diversity Check before premature ICP / channel convergence
8. Mandatory skeptical Prospect Audit for every QUALIFIED record
9. Batch self-review during long runs
10. Mission revision when evidence changes the market model
11. Contact-route verification separated from commercial fit
12. Persistent PASS / SECONDARY / HOLD research history
13. Explicit stop conditions
14. Fail-closed public state machine
15. Campaign, prospect, handoff, and state schemas
16. Cross-chat / cross-agent continuity
17. Execution Log template for validation runs
18. LLM conformance guidance
19. Optional Knowledge Pack interface
20. Apache License 2.0 with separate FlyPig AI trademark boundary

### Documentation and interpretation hardening

- English and Traditional Chinese READMEs explicitly define the Open Core as an LLM-native research workflow with no application runtime to install or deploy.
- Added explicit anti-misread guidance covering scraping, LinkedIn automation, email personalization/sending, reply tracking, Python, Docker, n8n, SMTP, and other capabilities that are not implemented by the public Core.
- Added bilingual `AGENTS.md` as the authoritative interpretation boundary for AI assistants, coding agents, repository summarizers, and automated documentation systems.
- Shortened the root README's downstream commercial-layer description so excluded execution concepts do not dominate repository summaries.
- Added a bilingual static landing site under `docs/` with one overview page and dedicated Test 01, Test 02, and Test 03 pages.
- The static site requires no build tool, package manager, server runtime, or application framework.

### Validation included

- Golden Test 01: Japan outdoor-market role classification and process regression
- Golden Test 02: Germany industrial-water Mission Revision
- Golden Test 03: FlyPig self-dogfooding / ICP discovery
- Naked LLM Control Test 03: ordinary capable-LLM best-effort comparison

The control run produced a strong result and directly motivated the Discovery Diversity Check.

### Website / discoverability

- Added canonical SEO metadata, Open Graph / Twitter metadata, and structured JSON-LD across the public site.
- Added SoftwareSourceCode, WebSite, Organization, TechArticle, Service, Breadcrumb, and FAQ structured data where applicable.
- Added visible bilingual FAQ answer blocks for AEO and repository-scope disambiguation.
- Added robots.txt, sitemap.xml, llms.txt, favicon, web manifest, custom 404, security.txt, security headers, and clean URL redirects.
- Added bilingual Privacy Notice for the managed project inquiry form.
- Connected the managed project form to a Cloudflare Pages Function using Resend secrets stored server-side.
- Added SEO / GEO / AEO hardening around the canonical site: https://outreach-engine.flypigai.ca/

### Commercial boundary

The public Core intentionally stops at the qualified Tracker.

Downstream message preparation, sending, mailbox/reply operations, and follow-up are outside the v0.1 Open Core and are not implemented in this repository.

No FlyPig runtime, API, Python environment, dedicated UI, or multi-agent framework is required.
