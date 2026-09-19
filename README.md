# FlyPig AI Outreach Engine v0.1.0

English | [繁體中文](README.zh-TW.md)

Official site: https://outreach-engine.flypigai.ca/

Traditional Chinese website: https://outreach-engine.flypigai.ca/zh

Website maintainers: bilingual HTML sources live in `site/pages/`; edit Chinese metadata in `site/metadata.json` and shared questions in `site/faq.json`. Run `python3 scripts/build_site.py`, `python3 scripts/check_site.py`, and `node --test scripts/site.test.mjs` before committing generated `docs/` pages. This dependency-free publishing tool is only for the documentation website, not an Open Core runtime requirement. See [Site Operations](SITE_OPERATIONS.md) and the [SEO/GEO/AEO audit](SEO_AUDIT.md).

The website inquiry form separately uses Cloudflare Pages Functions, D1 and deployment-only Resend secrets. Run `node --test scripts/site.test.mjs tests/*.test.mjs` with Node 24 for the full website/contact suite. See [Contact Delivery](CONTACT_DELIVERY.md) for both-environment deployment and delivery verification; this does not add automated prospect outreach to Open Core.

An open-source LLM-native Skill system for disciplined prospect research and qualification.

> LLM knows how. FlyPig makes sure the process actually requires it.

## Read this first: what this repository actually is

FlyPig AI Outreach Engine Open Core is a set of LLM-readable operating instructions, schemas, templates, and validation cases.

It is designed to be read and executed directly by a capable LLM or Agent environment such as ChatGPT, Claude, OpenClaw, Hermes Agents, or another compatible system.

There is nothing to install or deploy.

Minimum environment:

```text
A capable LLM / Agent
Current web research access
Your business / product / market context
Enough state continuity to maintain one canonical Tracker
```

Primary output:

```text
Qualified Prospect Tracker
```

The public workflow stops there.

## What this repository is NOT

This Open Core is not:

```text
A web scraper
A LinkedIn automation tool
A lead-harvesting crawler
An email-personalization engine
A cold-email sender
A multi-channel outreach platform
An inbox / reply tracking system
A CRM execution service
A Python service
An n8n workflow
A Docker application
A SaaS runtime
```

The Open Core does not require:

```text
Python
Node.js
Docker
Docker Compose
n8n
SMTP
SendGrid
Apollo
SerpAPI
Apify
An OpenAI API key specifically
A FlyPig API
A FlyPig server
A proprietary FlyPig UI
A mandatory multi-agent framework
```

If an AI describes this repository as a deployable Python/n8n/Docker outreach system, or says that it sends email, scrapes LinkedIn, personalizes cold messages, or tracks replies, that interpretation is incorrect for the public v0.1.0 Open Core.

For the authoritative scope boundary, also see `AGENTS.md` and `docs/04_REQUIREMENTS.md`.

## Why this project exists

FlyPig began using general-purpose LLMs heavily for international market development, partner research, prospect discovery, and business outreach.

The results were often surprisingly good.

The problem appeared when the same mission required many research turns.

As context grew, the work could drift:

```text
The original target role slowly broadened
Evidence standards became inconsistent
Retailers appeared in distributor searches
Manufacturers were treated as possible buyers
Previously rejected organizations were rediscovered
Fact and hypothesis began to blur
The original market objective became less visible
```

That drift can later contaminate downstream business communication. A polished message can still be commercially wrong if the underlying research has confused a distributor, retailer, manufacturer, integrator, or buyer.

FlyPig was created to make the critical research checks persistent instead of hoping the model remembers them throughout a long task.

See `docs/15_WHY_FLYPIG_EXISTS.md`.

## Public workflow

```text
Free-form Business Intent
        ↓
Mission Discovery
        ↓
Tracker Setup
        ↓
Prospect Discovery
        ↓
Dedup Gate
        ↓
Discovery Diversity Check
        ↓
Account Research
        ↓
Qualification
        ↓
Prospect Audit
        ↓
Contact Verification
        ↓
Qualified Prospect Tracker
```

A prospect cannot reach `SHORTLIST_READY` without `AUDIT_PASS`.

## Primary output: Qualified Prospect Tracker

The Open Core maintains one canonical Tracker throughout the campaign.

Near the beginning, the LLM should offer a lightweight storage choice:

```text
Google Sheets  RECOMMENDED when connected
Local CSV      DEFAULT
Other          optional
```

If the user does not choose, use local CSV based on:

`templates/PROSPECT_TRACKER.csv`

The Tracker is not a disposable final report. Discovery begins populating it and later Skills update the same records.

PASS, HOLD, and SECONDARY records remain useful research memory instead of disappearing from context.

See `docs/13_PROSPECT_TRACKER.md`.

## Mandatory reliability controls

The Open Core requires:

1. One canonical Tracker per campaign
2. Deduplication before a new canonical prospect row is created
3. Evidence before qualification
4. Verified facts, hypotheses, unknowns, and contradictory evidence kept separate
5. A Discovery Diversity Check before the search space converges too early
6. A skeptical Prospect Audit for every QUALIFIED prospect
7. Audit instructions that actively try to falsify the previous qualification
8. Batch review after every five newly researched prospects by default
9. Commercial fit kept separate from contact-route suitability
10. Explicit stop conditions
11. Fail-closed stage gates
12. A detailed Execution Log for validation runs

The same LLM may execute every role sequentially. Multi-agent orchestration is optional.

## Public Skills

```text
mission-discovery
prospect-discovery
account-research
qualification
prospect-audit
contact-verification
```

`mission-planner` remains only as a compatibility alias for older references.

All Skills follow `skills/INTERACTION_PROTOCOL.md`.

## Prospect Audit

Qualification is intentionally not the final decision.

After a prospect is marked QUALIFIED, the Audit Skill changes stance:

```text
Qualification:
Why is this account strong enough to continue?

Prospect Audit:
Assume that decision may be wrong. What would break it?
```

Audit outcomes include:

```text
AUDIT_PASS
RESEARCH_REPAIR
DOWNGRADE_SECONDARY
HOLD
PASS
DUPLICATE_MERGE
```

## Adaptive collaboration

The LLM chooses among:

```text
RESEARCH
INFER
ASK
PROCEED
```

These modes do not override mandatory gates.

- RESEARCH: use current evidence before asking the user to supply public facts.
- INFER: create useful working hypotheses without silently converting them into facts.
- ASK: ask only when the missing answer depends on human intent, preference, private context, or material ambiguity.
- PROCEED: move forward when the stage is decision-ready and its required checks are complete.

## Why not just ask an LLM for a list?

You can. A strong LLM can produce a very good prospecting result without FlyPig.

That was tested directly.

A fresh GPT-5.6 Sol control run, with normal web research and no access to FlyPig Skills, produced a strong Canadian launch strategy and a useful 15-prospect list. It also showed broader creativity in accelerator, community, and amplification channels than the FlyPig run.

The control run also recorded that it did not perform a formal deduplication procedure, mandatory skeptical audit, state-transition process, or persistent rejected-prospect Tracker.

That is the intended distinction:

```text
Naked LLM
→ can produce excellent one-shot research

FlyPig
→ turns critical practices into required operating discipline
```

The control result directly motivated the Discovery Diversity Check now included in the Core.

See `validation/control-test-03-naked-llm/COMPARISON.md`.

## Real validation

The Core is tested with real current market research. Public Golden Test artifacts mask prospect identifiers where appropriate; private verification records retain the full evidence trail.

### Golden Test 01 — Japan outdoor market

Tested role classification, deduplication, skeptical audit, contact-policy separation, and long-run process consistency.

Strengthened v2 result:

```text
44 material candidate mentions
34 unique canonical candidates
20 fully researched
15 QUALIFIED before audit
12 AUDIT_PASS
3 audit downgrades
12 final QUALIFIED / SHORTLIST_READY
```

### Golden Test 02 — Germany industrial water monitoring

Tested whether evidence could change the user's original route-to-market assumption.

```text
Mission v1: DISTRIBUTOR_FIRST
        ↓ evidence
Mission v2: CHANNEL_PLUS_INTEGRATION
```

Final result:

```text
20 fully researched
12 QUALIFIED before audit
7 AUDIT_PASS
5 audit downgrades
7 final QUALIFIED / SHORTLIST_READY
```

### Golden Test 03 — FlyPig uses FlyPig

Tested ICP discovery when no predefined channel taxonomy existed.

```text
Mission v1: BROAD_ADOPTER_DISCOVERY
        ↓ evidence
Mission v2: SERVICE_MULTIPLIER_FIRST
```

Final result:

```text
20 fully researched
18 QUALIFIED before audit
13 AUDIT_PASS
5 audit downgrades
13 final QUALIFIED / SHORTLIST_READY
```

### Naked LLM Control — Test 03

A fresh LLM session performed the same business problem without reading FlyPig methodology.

The control was deliberately preserved rather than retrofitted to FlyPig rules.

The result was strong and exposed both FlyPig's value and one weakness in its original discovery breadth.

See `validation/README.md` for execution logs, masked Trackers, case studies, limitations, and the control comparison.

## Five-minute start

There is no installation step.

Give a compatible LLM access to this repository, then say something like:

```text
Use FlyPig AI Outreach Engine.

We sell commercial water-monitoring equipment. I want to explore Southeast Asia, but I am not sure whether the right targets are distributors, engineering partners, or direct industrial customers.

Help me clarify the mission.
Research public facts before asking me questions.
Build and maintain a Qualified Prospect Tracker.
Follow every mandatory dedup, diversity, evidence, audit, and batch-review gate.
Do not write or send outreach messages.
```

For a copy-ready launcher, use `prompts/START_HERE.md`.

## What a strong Tracker record preserves

```text
Organization identity
Canonical domain and aliases
Duplicate-check status
Business role
Discovery reason
Evidence
Verified facts
Working hypotheses
Contradictory evidence
Qualification status and reason
Confidence
Audit result and reason
Counter-evidence summary
Contact-policy precheck
Recommended contact function
Verified / unresolved / do-not-use contact route
Current state
Key uncertainty
Next recommended human action
```

## Cross-chat and cross-agent continuity

A campaign can move between chats, models, or agent environments.

The handoff record preserves mission version, Tracker location, verified facts, evidence, hypotheses, contradictory evidence, prior user decisions, current decision, and next best action.

The receiving LLM should continue the same Tracker rather than restart the research.

See `schemas/handoff.schema.yaml` and `prompts/HANDOFF.md`.

## Optional Knowledge Packs

Knowledge Packs may add market, industry, or channel-specific intelligence.

They are optional and are not the main Free / Paid boundary.

The Open Core should remain useful without them.

See `docs/10_KNOWLEDGE_PACK_INTERFACE.md`.

## Open Core boundary

The public v0.1.0 repository ends at researched, audited, contact-route-aware Qualified Prospect Tracker records.

Downstream message preparation, sending, mailbox/reply operations, and follow-up are outside this Open Core and are intentionally not implemented here.

See `docs/07_OPEN_CORE.md` for the product boundary.

## Landing page and test pages

Static website sources and generated output:

```text
site/pages/*.html       bilingual source bodies and English metadata
site/metadata.json      Chinese metadata and page revision dates
site/faq.json           shared visible questions and schema
scripts/build_site.py  dependency-free static renderer
docs/*.html            generated English pages and Chinese homepage
docs/zh/*.html         generated Chinese detail pages
docs/sitemap.xml       generated 14-page bilingual sitemap
```

The deployed site is plain HTML/CSS/JavaScript. Editing the site uses Python 3.9+ to render and verify committed output; Node runs the small JavaScript behavior checks. Neither tool is required to use the Open Core itself.

## Repository map

```text
QUICK_START.md
AGENTS.md

skills/
  INTERACTION_PROTOCOL.md
  mission-discovery/
  prospect-discovery/
  account-research/
  qualification/
  prospect-audit/
  contact-verification/

schemas/
  campaign.schema.yaml
  prospect.schema.yaml
  handoff.schema.yaml
  state-machine.yaml

docs/
  index.html
  test-01.html
  test-02.html
  test-03.html
  experiments.html
  managed-service.html
  privacy.html
  zh.html
  zh/
  00_OVERVIEW.md
  01_NO_CODE_GUIDE.md
  02_ARCHITECTURE.md
  03_WORKFLOW.md
  04_REQUIREMENTS.md
  05_RESPONSIBLE_OUTREACH.md
  06_INTEGRATIONS.md
  07_OPEN_CORE.md
  08_GLOSSARY.md
  09_FAQ.md
  10_KNOWLEDGE_PACK_INTERFACE.md
  11_LLM_COWORK_MODE.md
  12_LLM_CONFORMANCE.md
  13_PROSPECT_TRACKER.md
  14_PROCESS_RELIABILITY.md
  15_WHY_FLYPIG_EXISTS.md

prompts/
  START_HERE.md
  HANDOFF.md
  LOAD_KNOWLEDGE_PACK.md

templates/
  CAMPAIGN_BRIEF.md
  PROSPECT_TRACKER.csv
  EXECUTION_LOG.md
  CAMPAIGN_REPORT.md
  KNOWLEDGE_PACK_MANIFEST.yaml

validation/
  README.md
  golden-test-01-japan-outdoor/
  golden-test-01-japan-outdoor-v2/
  golden-test-02-germany-water/
  golden-test-03-flypig-canada/
  control-test-03-naked-llm/
```

## Responsible use

This project is intended for legitimate business research and professional market development.

Users are responsible for applicable privacy, communications, anti-spam, platform, and industry rules in the jurisdictions where they operate.

Do not fabricate identity or relationships, harvest private contact data, guess private emails, bypass published contact restrictions, or misrepresent research findings.

See `docs/05_RESPONSIBLE_OUTREACH.md`.

## License

The Core is licensed under Apache License 2.0. See `LICENSE` and `NOTICE`.

FlyPig AI names, logos, and product identifiers are separate trademarks. See `TRADEMARKS.md`.

## Start here

Business user: `QUICK_START.md`

LLM / Agent operator: `prompts/START_HERE.md`

AI interpretation boundary: `AGENTS.md`

Why FlyPig exists: `docs/15_WHY_FLYPIG_EXISTS.md`

Process reliability: `docs/14_PROCESS_RELIABILITY.md`

Tracker behavior: `docs/13_PROSPECT_TRACKER.md`

Validation: `validation/README.md`

Version: 0.1.0
