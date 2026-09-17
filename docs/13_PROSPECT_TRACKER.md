# 13 Qualified Prospect Tracker

The primary output of the FlyPig AI Outreach Engine Open Core is one persistent Qualified Prospect Tracker.

The Tracker is not a one-time list. It is the canonical research record for the campaign and should be updated as prospects move through discovery, deduplication, account research, qualification, skeptical audit, and contact verification.

## Storage choice

At the beginning of a campaign, the LLM should offer:

```text
Google Sheets  RECOMMENDED
Local CSV      DEFAULT
Other          optional
```

This choice must not delay research.

If the user does not choose, use local CSV automatically.

## Default local CSV

The canonical public field structure is:

`templates/PROSPECT_TRACKER.csv`

Create or maintain a campaign-specific copy rather than overwrite the repository template.

Suggested file name:

```text
<campaign_id>_prospect_tracker.csv
```

## One canonical record per organization

Before creating a new row, run dedup using available identity signals:

```text
Official domain
Legal / trading name
Local-language name
English name
Parent company
Brand name
Known aliases
```

Record:

```text
duplicate_check_status
canonical_domain
aliases
duplicate_of_prospect_id when applicable
```

Possible dedup results:

```text
UNIQUE
DUPLICATE_MERGE
IDENTITY_UNCERTAIN
```

A later search hit for the same company must update the canonical record instead of creating a second row.

## Recommended public fields

The current template contains:

```text
campaign_id
mission_version
prospect_id
organization
country
website
canonical_domain
aliases
duplicate_check_status
business_role
discovery_reason
discovery_source
qualification_status
qualification_reason
confidence
audit_result
audit_reason
counter_evidence_summary
contact_policy_precheck
recommended_contact_function
contact_name
contact_route
contact_route_status
state
key_uncertainty
next_recommended_human_action
notes
```

Detailed evidence may be retained in linked research notes when the Tracker surface is too narrow, but material decisions must remain traceable.

## Qualification is not final shortlist entry

Qualification states:

```text
QUALIFIED
SECONDARY
HOLD
PASS
```

`QUALIFIED` means the prospect is strong enough to enter mandatory Prospect Audit.

Every QUALIFIED prospect must then receive an audit result:

```text
AUDIT_PASS
RESEARCH_REPAIR
DOWNGRADE_SECONDARY
HOLD
PASS
DUPLICATE_MERGE
```

Only `AUDIT_PASS` may reach the final shortlist path.

## Counter-evidence belongs in the record

The Tracker should not preserve only evidence supporting a positive decision.

When material, also record:

```text
Contradictory evidence
Counter-evidence summary
Key uncertainty
Audit reason
```

This makes the record useful for later review and reduces confirmation bias.

## Commercial fit and contactability are separate

Do not use a weak or prohibited public contact route as automatic evidence that the company itself is commercially unsuitable.

Example:

```text
qualification_status: QUALIFIED
audit_result: AUDIT_PASS
contact_policy_precheck: PROHIBIT_SOLICITATION
contact_route_status: DO_NOT_USE
```

This means:

- the company remains a valid target account,
- the visible public route must not be used,
- a different legitimate route may be researched later.

Likewise, a route can remain `UNRESOLVED` without converting the company into PASS.

## Preserve rejected history

The Tracker may and should contain:

```text
SECONDARY
HOLD
PASS
```

Do not delete weak prospects merely to make the final output look stronger.

Rejected and uncertain records prevent repeated research and show how the qualification boundary was applied.

## Batch review relationship

After every five newly researched prospects by default, the workflow performs a batch review for:

```text
Duplicate leakage
Role-classification drift
Qualification-standard drift
Repeated evidence weakness
Repeated exclusion reasons
New organization types
Search noise
Mission impact
```

Any corrections must be written back into the same Tracker.

## Google Sheets operating behavior

When Google Sheets is selected and an authorized connection exists:

1. Create or identify one campaign Sheet.
2. Use the public Tracker fields as the column structure.
3. Record the Sheet location in campaign state.
4. Read existing rows before new discovery.
5. Update rows as evidence changes instead of creating duplicates.
6. Preserve manual user corrections.
7. Add audit and contact-policy results to the same canonical row.

If the connection becomes unavailable, do not invent updates. Continue research and prepare rows for later synchronization, or fall back to local CSV with the user's knowledge.

## Cross-session continuity

A handoff should preserve:

```text
tracker_format
tracker_location
tracker_template
current prospect state
next best action
```

The receiving LLM should continue the same Tracker rather than starting another list.

See `schemas/handoff.schema.yaml`.

## Validation logging

For benchmark or validation runs, the Tracker should be accompanied by:

`templates/EXECUTION_LOG.md`

The Log records how rows were created, merged, researched, qualified, audited, downgraded, and finalized.

## Free-to-Paid handoff

The same Qualified Prospect Tracker can later become the input to Controlled Outreach.

The public Core ends with researched, audited, and qualified prospect records.

A private execution layer may then add separate state for:

```text
Outreach strategy
Message versions
Pre-send review
Approval
Sending
Reply monitoring
Follow-up
```

Those execution fields should not be mixed into the public Tracker template by default.
