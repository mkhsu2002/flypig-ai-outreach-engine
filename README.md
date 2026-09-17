# FlyPig AI Outreach Engine

An open-source Skill system for disciplined LLM prospect research and qualification.

FlyPig AI Outreach Engine helps a business turn an ambiguous market-development idea into a researched, evidence-backed Qualified Prospect Tracker.

It does not try to make the underlying LLM smarter.

It makes important research behaviors explicit, mandatory, stateful, and auditable.

> LLM knows how. FlyPig makes sure the process actually requires it.

No FlyPig runtime, API, dedicated UI, or multi-agent framework is required.

A single capable LLM is the default execution model. ChatGPT, Claude, OpenClaw, Hermes Agents, or another suitable environment can execute the Skills sequentially.

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

That drift also affected downstream outreach. A polished message can still be commercially wrong if the model has misunderstood whether the recipient is a distributor, retailer, manufacturer, integrator, or buyer.

FlyPig was created to make the critical research checks persistent instead of hoping the model remembers them throughout a long task.

See `docs/15_WHY_FLYPIG_EXISTS.md`.

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

See `docs/13_PROSPECT_TRACKER.md`.

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

The control result led directly to the new Discovery Diversity Check in the Core.

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

Tell a compatible LLM to read this repository, then say something like:

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

## Where the Open Core stops

The public project intentionally stops at the Qualified Prospect Tracker.

It does not include FlyPig's private Controlled Outreach layer for:

```text
Account-specific formal outreach strategy
Message preparation
Independent pre-send review
Approval-controlled sending
Mailbox monitoring
Reply classification
Bounce / opt-out operations
Controlled follow-up
Execution audit trail
```

The commercial layer begins after the qualified Tracker and focuses on operating real outreach safely and consistently.

## Repository map

```text
QUICK_START.md

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

Why FlyPig exists: `docs/15_WHY_FLYPIG_EXISTS.md`

Process reliability: `docs/14_PROCESS_RELIABILITY.md`

Tracker behavior: `docs/13_PROSPECT_TRACKER.md`

Validation: `validation/README.md`

Version: 0.1.0
