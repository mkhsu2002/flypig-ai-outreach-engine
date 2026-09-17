# FlyPig AI Outreach Engine v0.1.0

Initial open-source release.

FlyPig AI Outreach Engine is an LLM-native Skill system for disciplined prospect research and qualification.

The project is designed around a simple thesis:

> A capable LLM already knows many good research practices. FlyPig makes the critical ones part of the required operating process.

The default execution model is one capable LLM with current web research. No FlyPig runtime, API, dedicated UI, Python environment, or multi-agent framework is required.

## Primary output

The Open Core produces and maintains a Qualified Prospect Tracker.

Default storage behavior:

```text
Google Sheets  recommended when connected
Local CSV      default
Other          optional
```

The Tracker persists discovery, research, qualification, audit, contact-route state, uncertainty, and rejected / secondary records across the campaign.

## Public workflow

```text
Free-form Business Intent
→ Mission Discovery
→ Tracker Setup
→ Prospect Discovery
→ Dedup Gate
→ Discovery Diversity Check
→ Account Research
→ Qualification
→ Prospect Audit
→ Contact Verification
→ Qualified Prospect Tracker
```

A prospect cannot reach `SHORTLIST_READY` without `AUDIT_PASS`.

## Mandatory reliability controls

v0.1.0 includes:

1. Adaptive Mission Discovery from free-form business intent
2. Shared `RESEARCH / INFER / ASK / PROCEED` interaction protocol
3. One canonical campaign Tracker
4. Mandatory identity deduplication before canonical insertion
5. Evidence-before-qualification discipline
6. Explicit separation of facts, hypotheses, unknowns, and contradictory evidence
7. Discovery Diversity Check to reduce premature search-space convergence
8. Skeptical Prospect Audit for every QUALIFIED prospect
9. Audit designed to try to falsify the previous decision
10. Default batch self-review after every five researched prospects
11. Mission revision when current evidence changes the target model
12. Contact-route verification kept separate from commercial fit
13. PASS / SECONDARY / HOLD records retained as research memory
14. Explicit stop conditions
15. Fail-closed public state machine
16. Structured cross-chat / cross-agent handoff
17. Execution Log template for auditable validation runs

## Public Skills

```text
mission-discovery
prospect-discovery
account-research
qualification
prospect-audit
contact-verification
```

`mission-planner` remains only as a compatibility alias.

## Real validation

The release includes real-market validation with public privacy-safe artifacts and private verification records.

### Golden Test 01 — Japan outdoor market

The strengthened run tested role classification, dedup, skeptical audit, contact-policy separation, and long-run process consistency.

```text
20 fully researched
15 QUALIFIED before audit
12 AUDIT_PASS
3 audit downgrades
12 final QUALIFIED / SHORTLIST_READY
```

### Golden Test 02 — Germany industrial water monitoring

The run tested evidence-driven Mission Revision.

```text
DISTRIBUTOR_FIRST
→ CHANNEL_PLUS_INTEGRATION
```

Prospect Audit changed 5 of 12 initial QUALIFIED decisions.

### Golden Test 03 — FlyPig uses FlyPig

The engine researched its own plausible Canadian adoption targets without a predefined channel taxonomy.

```text
BROAD_ADOPTER_DISCOVERY
→ SERVICE_MULTIPLIER_FIRST
```

Prospect Audit changed 5 of 18 initial QUALIFIED decisions.

### Naked LLM Control — Test 03

A fresh GPT-5.6 Sol session performed the same business problem without reading FlyPig methodology.

The control produced a strong result. It also showed broader accelerator / community / amplification-channel creativity than the FlyPig run.

The comparison clarified the product claim: FlyPig is not necessary for an LLM to produce good research; its value is making critical research behavior persistent, inspectable, and repeatable across long tasks.

The control directly motivated the Discovery Diversity Check added to the Core.

See `validation/control-test-03-naked-llm/COMPARISON.md`.

## Open Core boundary

The public release intentionally stops at the Qualified Prospect Tracker.

It does not include:

```text
Formal account-specific outreach strategy
Message preparation
Independent pre-send review
Approval-controlled sending
Mailbox monitoring
Reply classification
Bounce / opt-out operations
Controlled follow-up
Execution audit history
```

Those capabilities belong to a separate Controlled Outreach commercial layer or another downstream workflow chosen by the user.

Knowledge Packs are optional intelligence overlays and are not the main Free / Paid boundary.

## Portability

A campaign may move between chats, models, or agent environments using the structured handoff schema.

The handoff preserves mission version, Tracker location, evidence, hypotheses, uncertainty, prior decisions, active stage, and next best action.

## Responsible use

The project is intended for legitimate business research and market development.

Do not fabricate identities or relationships, guess private contact information, bypass published contact restrictions, or misrepresent research findings.

## Start

Business user: `QUICK_START.md`

LLM operator: `prompts/START_HERE.md`

Process reliability: `docs/14_PROCESS_RELIABILITY.md`

Origin: `docs/15_WHY_FLYPIG_EXISTS.md`

Validation: `validation/README.md`

## License

Apache License 2.0.

FlyPig AI trademarks and branding remain separate from the open-source license. See `TRADEMARKS.md`.
