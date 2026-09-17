# 00 Overview

FlyPig AI Outreach Engine is an open-source Skill system for disciplined LLM prospect research and qualification.

It is designed around a practical observation:

> A strong LLM can already perform excellent prospect research, but long multi-turn work can drift, skip checks, forget rejected accounts, or apply inconsistent standards.

The Open Core therefore focuses on process reliability rather than trying to make the underlying model smarter.

## Public workflow

```text
Free-form Business Intent
↓
Adaptive Mission Discovery
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

## Primary output

A good run maintains one persistent Tracker containing both strong and rejected research history.

A shortlisted record should preserve:

```text
Organization identity
Canonical domain / aliases
Duplicate-check status
Business role
Evidence
Verified facts
Working hypotheses
Contradictory evidence
Qualification decision
Confidence
Audit result
Contact-route status
Key uncertainty
Next recommended human action
```

## Reliability controls

The Open Core makes these behaviors mandatory:

1. Dedup before canonical insertion
2. Evidence before qualification
3. Fact / hypothesis / counter-evidence separation
4. Diversity check before search-space convergence
5. Skeptical Prospect Audit for every QUALIFIED record
6. Periodic batch review during long runs
7. Mission Revision when evidence changes the target model
8. Contact-route status separated from commercial fit
9. PASS / SECONDARY / HOLD history preserved
10. Explicit stop conditions

## Default operating model

One capable LLM may execute the entire public workflow sequentially.

Multi-agent orchestration is optional.

The Skills are logical responsibility boundaries, not a requirement for separate models.

## What the Open Core is not

It is not:

1. A bulk-email sender
2. A cold-email generator
3. A private-data harvesting system
4. A mailbox-monitoring service
5. A reply automation system
6. A guarantee of replies or sales
7. A proprietary runtime requirement

## Product boundary

The public Core ends at the Qualified Prospect Tracker and contact-route verification.

A separate Controlled Outreach layer may later handle message strategy, drafting, pre-send review, approval-controlled sending, mailbox monitoring, reply classification, and follow-up.

## Validation

The repository includes real-market Golden Tests and a fresh naked-LLM control run.

The control produced a strong one-shot result and helped clarify the FlyPig value proposition: the project is not needed to make an LLM capable of prospect research; it exists to make critical research behavior more repeatable, inspectable, and persistent.

See `validation/README.md`.

## Where to go next

Business user: `01_NO_CODE_GUIDE.md`

Skill architecture: `02_ARCHITECTURE.md`

Workflow reference: `03_WORKFLOW.md`

Process reliability: `14_PROCESS_RELIABILITY.md`

Origin: `15_WHY_FLYPIG_EXISTS.md`
