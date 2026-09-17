# Prospect Discovery Skill

## Purpose

Build a candidate universe relevant to the campaign without confusing discovery with qualification.

Follow `skills/INTERACTION_PROTOCOL.md`.

The canonical campaign output is the Qualified Prospect Tracker. Prospect Discovery begins populating that Tracker; it does not wait until the end of the workflow.

## Required inputs

```text
Approved or partially ready mission brief
Target market
Plausible target organization types
Exclusions
Research tools
Working hypotheses
Tracker configuration
Execution Log when running an auditable / benchmark campaign
```

If no tracker choice was made, use `local_csv` with `templates/PROSPECT_TRACKER.csv`.

## Mandatory dedup rule

Before creating any new canonical prospect row, compare the candidate against the existing Tracker using available identity signals:

```text
Official domain
Legal / trading name
Local-language name
English name
Parent company
Brand name
Known aliases
```

Return one of:

```text
NEW
DUPLICATE_MERGE
IDENTITY_UNCERTAIN
```

A rediscovered organization must update the existing canonical record rather than create a second row.

`IDENTITY_UNCERTAIN` may be recorded as HOLD but must not silently create a second canonical identity.

## Discovery Diversity Check

Before the candidate universe is allowed to converge around one target model, test whether the current search space is prematurely narrow.

When relevant to the mission, consider materially different paths such as:

```text
Direct users / buyers
Distributors / resellers / importers
System integrators / implementation partners
Market-entry or outsourced-business-development partners
Professional services / consultants
Training / education programs
Communities / associations / ecosystem amplifiers
Institutional channels
Other market-specific roles discovered through research
```

This is not a requirement to search every category in every campaign.

The requirement is to ask:

```text
Are we repeatedly searching only one version of the answer?
Is there another organization type that could satisfy the business objective through a different route?
Has current evidence revealed an adjacent role with stronger leverage?
```

Record the result as:

```text
DIVERSITY_CHECK: ADEQUATE | EXPAND_SEARCH | MISSION_REVISION_SIGNAL
```

If expansion reveals a materially stronger or different route, return to Mission Discovery rather than silently changing the target model.

## Procedure

1. Generate explicit search dimensions from market, category, ecosystem role, geography, and commercial relationship.
2. For auditable runs, record every material discovery query actually used in the Execution Log.
3. Discover candidate organizations using current sources.
4. Record why each candidate was discovered and the discovery source.
5. Run mandatory dedup before insertion.
6. Apply explicit campaign exclusions.
7. Do not infer qualification from discovery alone.
8. Prioritize unique candidates for Account Research.
9. Track signals that challenge the current mission model.
10. Run the Discovery Diversity Check before materially narrowing the candidate universe.
11. Create or update one Tracker row per canonical candidate.
12. Preserve the same Tracker across later batches.
13. Record raw candidate count, duplicate count, excluded count, unique candidate count, and diversity-check result at each material discovery checkpoint.

## Tracker write behavior

At discovery stage, populate at minimum:

```text
campaign_id
mission_version
prospect_id
organization
country
website when known
canonical_domain when known
aliases when known
duplicate_check_status
discovery_reason
discovery_source
state: discovered
```

Leave research, qualification, audit, and contact-verification fields empty until the relevant Skill completes them.

## Interaction rules

### RESEARCH

Research by default. Discovery is primarily an external-evidence task.

Use research to test:

```text
Whether target organization types actually exist in the market
Which local terminology is used
Which adjacent channel roles appear important
Whether the initial market model is too narrow or too broad
Whether alternative adoption or market-entry paths deserve a deliberate test
```

### INFER

Use role labels only as initial hypotheses until Account Research verifies them.

Do not turn search-result wording into a verified business role.

### ASK

Ask the user only when discovery reveals a material choice that depends on commercial preference rather than public facts.

### PROCEED

Proceed to Account Research when the unique candidate universe is sufficiently diverse to test mission assumptions and populate the first research batch.

Do not wait to exhaust the entire market.

Do not converge merely because the first search family produced plausible candidates.

Return to Mission Discovery when discovery materially contradicts or expands the mission's target-organization model.

## Output contract

For each canonical candidate:

```text
PROSPECT_ID
ORGANIZATION
COUNTRY
DISCOVERY_REASON
DISCOVERY_SOURCE
INITIAL_ROLE_HYPOTHESIS
DEDUP_RESULT
RESEARCH_PRIORITY
MISSION_ASSUMPTION_SIGNAL: SUPPORTS | CHALLENGES | NEUTRAL
STATE: DISCOVERED
TRACKER_WRITE: CREATED | UPDATED | MERGED
```

For each discovery checkpoint:

```text
RAW_CANDIDATES
DUPLICATES_MERGED
IDENTITY_UNCERTAIN
EXCLUDED
UNIQUE_CANDIDATES_ADDED
DIVERSITY_CHECK: ADEQUATE | EXPAND_SEARCH | MISSION_REVISION_SIGNAL
DIVERSITY_NOTES
```

## Fail or hold conditions

Do not promote a candidate to qualified status from this Skill.

Do not create a second canonical row when duplicate status is unresolved.

Return `HOLD` when the organization cannot be distinguished from similarly named entities.

Return to Mission Discovery when the candidate universe consistently indicates that the target model is wrong, incomplete, or commercially implausible.

## Next handoff

Account Research, or Mission Discovery when mission refinement is required.
