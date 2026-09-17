# Roadmap

The roadmap prioritizes process reliability, Skill quality, portability, and evaluation rather than building a proprietary FlyPig runtime.

## 0.1

Release-ready Open Core baseline.

```text
Single-LLM-first operating model
Adaptive Mission Discovery
Qualified Prospect Tracker
RESEARCH / INFER / ASK / PROCEED interaction protocol
Prospect Discovery with mandatory dedup
Discovery Diversity Check
Account Research
Qualification
Mandatory Prospect Audit
Contact Verification
Batch self-review
Mission Revision
Explicit stop conditions
Campaign, prospect, handoff, and state schemas
Cross-chat / cross-agent continuity
Execution Log for validation
LLM conformance guidance
Optional Knowledge Pack interface
Real-market Golden Tests
Naked LLM control comparison
Community health files
```

## 0.2

Reliability and evaluation.

Candidate work:

```text
Repeated-run variance testing
Cross-model conformance runs
More generic control comparisons
More Mission Revision cases
More Discovery Diversity cases
Tracker consistency checks
Schema migration examples
Structured handoff regression tests
Long-context drift tests
```

The objective is not identical wording across models.

The objective is to test whether important process behaviors remain stable.

## 0.3

Portability and interoperability.

Candidate work:

```text
Google Sheets operating example
OpenClaw usage example
Hermes Agents usage example
Other compatible LLM / agent examples
Campaign migration and handoff examples
Pack-manifest refinements
Optional audit-event schema if real users need it
```

These are compatibility examples, not a commitment to build a proprietary runtime.

## 0.4

Community research extensions.

Possible work:

```text
Community-contributed discovery patterns
Generic market-research templates
Qualification and audit evaluation cases
Knowledge Pack authoring guide
Pack compatibility declaration
Evaluation contribution standard
```

Commercial Packs remain separate unless intentionally released.

## 1.0

Stable contracts for:

```text
Mission Discovery
Prospect Discovery
Dedup and diversity checks
Account Research
Qualification
Prospect Audit
Contact Verification
Qualified Prospect Tracker
Campaign state
Prospect state
Cross-agent handoff
Knowledge Pack interface
Process reliability and validation
```

## Commercial workstream

Commercial development evolves separately from the Open Core.

The primary commercial boundary begins after the Qualified Prospect Tracker and may include Controlled Outreach capabilities such as:

```text
Account-specific outreach strategy
Message preparation
Independent pre-send review
Approval controls
Authorized sending
Mailbox monitoring
Reply classification
Controlled follow-up
Execution audit history
```

Optional private intelligence may also include market / industry Packs, private evaluation sets, repeated failure patterns, and outcome-backed calibration.

A proprietary runtime should be considered only if real customer use demonstrates a problem that existing LLM / agent environments cannot solve well.
