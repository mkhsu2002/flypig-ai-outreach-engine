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

### Validation included

- Golden Test 01: Japan outdoor-market role classification and process regression
- Golden Test 02: Germany industrial-water Mission Revision
- Golden Test 03: FlyPig self-dogfooding / ICP discovery
- Naked LLM Control Test 03: ordinary capable-LLM best-effort comparison

The control run produced a strong result and directly motivated the Discovery Diversity Check.

### Commercial boundary

The public Core intentionally stops at the qualified Tracker.

Formal message strategy, message drafting, independent pre-send review, approval-controlled sending, mailbox monitoring, reply classification, bounce / opt-out handling, and controlled follow-up are outside the v0.1 Open Core.

No FlyPig runtime, API, Python environment, dedicated UI, or multi-agent framework is required.
