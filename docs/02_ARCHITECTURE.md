# 02 Skill Architecture

FlyPig AI Outreach Engine separates research responsibilities so a single LLM does not jump from a vague business goal directly to a prospect list without evidence, qualification, or review.

## Public architecture

```text
                 ORCHESTRATOR
                      │
                      ↓
              Mission Discovery
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

The architecture is logical, not tied to one runtime.

One capable LLM may execute the Skills sequentially. A multi-agent environment may delegate them, but multiple agents are not required.

## Orchestrator

The orchestrator should:

1. Read the current mission, Tracker, and handoff state
2. Route work to the active Skill
3. Preserve verified facts, hypotheses, unknowns, counter-evidence, and user decisions separately
4. Enforce dedup before canonical prospect insertion
5. Require a Diversity Check before premature search-space convergence
6. Enforce discovery-versus-qualification separation
7. Require Prospect Audit for every QUALIFIED prospect
8. Return to Mission Discovery when repeated evidence changes the target model
9. Preserve PASS / SECONDARY / HOLD research history
10. Stop the public workflow after a reviewed Qualified Prospect Tracker is produced

## Mission Discovery

Turns free-form business intent into a decision-ready research mission.

Output includes:

```text
Target market
Plausible organization types
Commercial relationship hypotheses
Value hypothesis
Exclusions
Research constraints
Tracker configuration
Verified facts
Working hypotheses
Open questions
Mission version
```

## Prospect Discovery

Builds a candidate universe.

Discovery does not mean the candidate is qualified.

Before convergence, Discovery tests whether materially different direct, channel, implementation, community, institutional, or market-specific routes have been overlooked when relevant.

Output includes:

```text
Candidate organization
Discovery reason
Source
Initial role hypothesis
Dedup result
Research priority
Diversity-check result
```

## Account Research

Determines what the organization actually does.

Output separates:

```text
Verified facts
Evidence
Commercial observations
Unknowns
Working hypotheses
Contradictory evidence
```

## Qualification

Decides whether a researched organization belongs in the active mission.

Public statuses:

```text
QUALIFIED
SECONDARY
HOLD
PASS
```

`QUALIFIED` means the account is strong enough to enter Prospect Audit. It does not mean final shortlist approval.

## Prospect Audit

Takes a skeptical stance toward the Qualification decision.

The Audit asks:

```text
Assume this qualification may be wrong. What evidence would break it?
```

Possible outcomes:

```text
AUDIT_PASS
RESEARCH_REPAIR
DOWNGRADE_SECONDARY
HOLD
PASS
DUPLICATE_MERGE
```

Only `AUDIT_PASS` may proceed to final Contact Verification and `SHORTLIST_READY`.

## Contact Verification

Identifies a legitimate professional route for an audited qualified prospect.

Possible statuses include:

```text
VERIFIED_ROLE_CONTACT
OFFICIAL_GENERAL_CONTACT
OFFICIAL_FORM
VERIFIED_PROFESSIONAL_CHANNEL
UNRESOLVED
DO_NOT_USE
```

Never guess private email addresses.

Contact-route quality is not the same as commercial qualification.

## Final public handoff

A successful public workflow ends with one canonical Qualified Prospect Tracker.

The Tracker contains enough evidence and state for a human or downstream private workflow to decide what to do next without re-running the research.

## Shared research state

At minimum preserve:

```text
Mission version
Tracker location
Prospect records
Evidence
Counter-evidence
Qualification decisions
Audit decisions
Contact routes
Open questions
User decisions
Next research action
```

See `schemas/`.

## Commercial boundary

Formal outreach strategy, message drafting, independent pre-send review, approval-controlled sending, mailbox monitoring, reply classification, and controlled follow-up are intentionally outside the public architecture.
