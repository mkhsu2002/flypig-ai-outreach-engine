# Prospect Audit Skill

## Purpose

Stress-test a prospect that has already been marked `QUALIFIED` before it can enter the final shortlist.

This Skill is mandatory in the public Core.

It is designed for the default single-LLM operating model: the same LLM may perform the audit, but it must explicitly switch from advocate to skeptical reviewer and assume the previous qualification may be wrong.

Follow `skills/INTERACTION_PROTOCOL.md`.

## Required inputs

```text
Mission brief
Canonical Tracker record
Account research
Qualification decision
Evidence list
Working hypotheses
Known aliases / identity signals
Candidate contact routes if already observed
```

## Audit stance

Do not ask:

```text
Can I justify the previous qualification?
```

Ask:

```text
What would make the previous qualification wrong?
```

The audit must attempt to falsify the prior decision.

## Mandatory checks

### A. Identity and duplicate check

Confirm:

```text
Correct legal / trading entity
Correct official domain
No duplicate row under another language, alias, brand, or parent-company name
```

Return:

```text
UNIQUE
DUPLICATE_MERGE
IDENTITY_UNCERTAIN
```

### B. Business-role challenge

Try to disprove the assigned business role.

Examples:

```text
Distributor → could actually be retailer only
Importer → could import only its own products
Market-entry partner → could be generic consulting only
Manufacturer → could also operate meaningful third-party distribution
```

### C. Evidence challenge

For each material qualification claim, verify that the cited source actually supports it.

Check:

```text
Official / supportable source
Current enough for the claim
Directly relevant to the claimed role or fit
Not merely a search snippet
Not circular evidence
```

### D. Counter-evidence search

Actively look for evidence that weakens or contradicts the qualification.

Record contradictory evidence even when the final decision remains unchanged.

### E. Commercial-fit challenge

Ask whether the account truly fits the active mission rather than merely the general category.

A famous company or large retailer is not automatically a useful prospect.

### F. Contact-policy precheck

If a public inquiry policy is easily observable during audit, record whether it appears to:

```text
ALLOW_BUSINESS_INQUIRY
GENERAL_ONLY
PROHIBIT_SOLICITATION
UNRESOLVED
```

Do not convert contact-route suitability into business-fit qualification. A commercially strong account may remain `QUALIFIED` while its contact route is `DO_NOT_USE` or unresolved.

## Audit outcomes

Return exactly one:

```text
AUDIT_PASS
RESEARCH_REPAIR
DOWNGRADE_SECONDARY
HOLD
PASS
DUPLICATE_MERGE
```

### AUDIT_PASS

The original qualification survived skeptical review with adequate evidence.

Current Tracker status remains:

```text
qualification_status: QUALIFIED
state: audit_passed
```

### RESEARCH_REPAIR

The account may still qualify, but a material claim is insufficiently verified or conflicting.

Return to Account Research and do not leave a stale final-status signal in the Tracker.

### DOWNGRADE_SECONDARY

Relevant, but prior qualification overstated strength or certainty.

Update current Tracker status to:

```text
qualification_status: SECONDARY
audit_result: DOWNGRADE_SECONDARY
state: secondary
```

The `audit_result` preserves the fact that the account entered Audit as QUALIFIED.

### HOLD

Update current Tracker status to:

```text
qualification_status: HOLD
audit_result: HOLD
state: hold
```

### PASS

Update current Tracker status to:

```text
qualification_status: PASS
audit_result: PASS
state: pass
```

### DUPLICATE_MERGE

Merge evidence into the canonical existing Tracker record and retire the duplicate row.

## Current-status rule

`qualification_status` always represents the currently effective commercial status after all completed gates.

Do not leave `qualification_status: QUALIFIED` after an Audit has downgraded the record to SECONDARY, HOLD, or PASS.

Historical transition information belongs in:

```text
audit_result
audit_reason
Execution Log
```

This avoids contradictory Tracker fields.

## Output contract

```text
PROSPECT_ID
AUDIT_RESULT
IDENTITY_CHECK
DUPLICATE_CHECK
ROLE_CHALLENGE
EVIDENCE_CHALLENGE
COUNTER_EVIDENCE
COMMERCIAL_FIT_CHALLENGE
CONTACT_POLICY_PRECHECK
AUDIT_REASON
REPAIR_ACTIONS
QUALIFICATION_STATUS_AFTER_AUDIT
STATE_TRANSITION
TRACKER_WRITE: UPDATED | MERGED
```

## Fail-closed rules

Do not return `AUDIT_PASS` when:

1. Identity is uncertain
2. The business role rests mainly on inference
3. A material qualification claim lacks supportable evidence
4. Contradictory evidence has not been reconciled or preserved
5. Duplicate status is unresolved
6. The account fits only by generic category overlap

## Next handoff

```text
AUDIT_PASS → Contact Verification
RESEARCH_REPAIR → Account Research
DOWNGRADE_SECONDARY → Tracker / secondary queue
HOLD → targeted repair or user decision
PASS → archive with reason
DUPLICATE_MERGE → merge and continue with canonical record
```

No prospect may reach `SHORTLIST_READY` without a recorded `AUDIT_PASS`.
