# Qualification Skill

## Purpose

Decide whether a researched prospect is commercially relevant enough to deserve skeptical audit before shortlist entry, and persist that decision in the canonical Qualified Prospect Tracker.

Qualification is not the final shortlist decision.

Follow `skills/INTERACTION_PROTOCOL.md`.

## Required inputs

```text
Mission brief
Researched account profile
Canonical Tracker
Campaign exclusions
Working hypotheses
Tracker configuration
```

## Base qualification dimensions

```text
Market relevance
Business role fit
Offer or category fit
Commercial plausibility
Evidence confidence
Constraint fit
Contactability as a separate operational dimension
```

The open-source Core does not prescribe proprietary industry-specific weights.

## Mandatory pre-checks

Before deciding qualification:

1. Confirm the prospect record has completed dedup status.
2. Confirm identity and current business role are sufficiently researched.
3. Confirm material evidence comes from supportable sources.
4. Preserve contradictory evidence rather than suppressing it.
5. Keep contact-route suitability separate from commercial fit.

If any mandatory pre-check is unresolved, do not return `QUALIFIED`.

## Procedure

1. Evaluate each base dimension using available evidence.
2. Identify positive signals.
3. Identify negative signals.
4. Identify unresolved uncertainties.
5. Check campaign exclusions.
6. Decide whether the prospect deserves audit, secondary status, hold, or pass.
7. Explain the decision in business language.
8. Update the canonical Tracker immediately.
9. After every five newly researched prospects, run the batch review checkpoint required by `skills/INTERACTION_PROTOCOL.md` before continuing.
10. If repeated failures indicate a mission-level problem, return to Mission Discovery.

## Tracker write behavior

Populate or update:

```text
qualification_status
qualification_reason
confidence
key_uncertainty
state
next_recommended_human_action
notes when useful
```

Recommended state mapping:

```text
QUALIFIED → qualified
SECONDARY → secondary
HOLD → hold
PASS → pass
```

Do not delete PASS records by default. Keeping rejected prospects and the reason prevents duplicate research and makes the Tracker auditable.

## Interaction rules

### RESEARCH

Request additional research only when a missing fact could realistically change the qualification status.

Do not keep researching merely to make the profile more complete.

### INFER

Commercial plausibility may be inferred as a hypothesis from verified facts, but the reasoning must be explicit.

Example:

```text
The company carries multiple third-party brands in the target category, so willingness to evaluate external brands is plausible, but not verified.
```

### ASK

Ask the user only when qualification depends on a private strategic rule or tolerance that is not already recorded.

### PROCEED

Return one of:

```text
QUALIFIED
SECONDARY
HOLD
PASS
```

`QUALIFIED` means strong enough to enter mandatory Prospect Audit. It does not mean audit passed and does not predict recipient interest.

## Output contract

```text
PROSPECT_ID
STATUS: QUALIFIED | SECONDARY | HOLD | PASS
POSITIVE_SIGNALS
NEGATIVE_SIGNALS
UNCERTAINTIES
WORKING_HYPOTHESES
CONTRADICTORY_EVIDENCE
DECISION_REASON
EVIDENCE_CONFIDENCE
MISSION_SIGNAL
NEXT_ACTION
TRACKER_WRITE: UPDATED
```

## Decision guidance

`QUALIFIED`: Evidence and commercial logic are strong enough to justify skeptical audit.

`SECONDARY`: Relevant but lower priority than the active first batch.

`HOLD`: Potentially relevant but blocked by missing, conflicting, or identity evidence.

`PASS`: Does not fit the current campaign or lacks plausible commercial logic.

## Fail or hold conditions

Do not qualify based only on:

```text
Category-name overlap
Company size
Brand familiarity
Search snippets
Model memory
Unverified role assumptions
Contactability alone
```

Do not downgrade a strong commercial fit solely because the currently visible contact route is unsuitable. Record the contact issue separately and let Prospect Audit / Contact Verification determine route status.

## Next handoff

```text
QUALIFIED → Prospect Audit
SECONDARY → Tracker / secondary queue
HOLD → targeted research repair or user decision
PASS → retain in Tracker with reason
Repeated mission-level mismatch → Mission Discovery
```
