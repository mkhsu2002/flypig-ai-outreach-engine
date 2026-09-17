# FlyPig Execution Log

Use this template for benchmark, regression, validation, or otherwise auditable prospect-research runs.

The purpose is to preserve actual execution decisions, not produce a polished retrospective summary.

## Run metadata

```text
RUN_ID:
DATE:
CORE_VERSION:
CORE_COMMIT:
MODEL / ENVIRONMENT:
TOOLS AVAILABLE:
TRACKER_FORMAT:
TRACKER_LOCATION:
RUN_TYPE: BENCHMARK | REGRESSION | VALIDATION | PRODUCTION_AUDIT
```

## Initial user input

Record the user input verbatim or as a clearly marked privacy-safe reproduction.

## Pre-registered mission

Before prospect discovery begins, record:

```text
MISSION_STATUS
TARGET_MARKET
OFFER
TARGET_ORGANIZATION_HYPOTHESES
COMMERCIAL_RELATIONSHIP_HYPOTHESIS
EXCLUSIONS
MATERIAL_UNKNOWNS
```

## Pre-registered process rules

Confirm before discovery:

```text
[ ] One canonical Tracker
[ ] Dedup before insertion
[ ] Search snippets are not sufficient qualification evidence
[ ] Fact / hypothesis / contradictory evidence remain separate
[ ] Discovery Diversity Check occurs before material search-space convergence
[ ] QUALIFIED requires Prospect Audit
[ ] Audit actively attempts to falsify prior qualification
[ ] Batch review every 5 newly researched prospects by default
[ ] Contact-route suitability stays separate from commercial fit
[ ] No guessed private contact data
[ ] Stop condition must be recorded
```

## Discovery query log

For every material query or search-strategy change:

```text
STEP_ID:
QUERY / SEARCH DIMENSION:
WHY USED:
RAW CANDIDATES OBSERVED:
NEW CANONICAL RECORDS:
DUPLICATES MERGED:
IDENTITY UNCERTAIN:
EXCLUDED:
NOTES:
```

## Discovery Diversity Check

Before materially converging on one ICP, partner type, or route, record:

```text
CHECKPOINT_ID:
CURRENT SEARCH MODEL:
ALTERNATIVE PATHS CONSIDERED:
PATHS TESTED:
EVIDENCE:
RESULT: ADEQUATE | EXPAND_SEARCH | MISSION_REVISION_SIGNAL
ACTION TAKEN:
```

Do not invent alternative paths after the run merely to make the log look complete.

## Prospect decision log

For each prospect or material state transition:

```text
STEP_ID:
PROSPECT_ID:
PREVIOUS_STATE:
ACTION:
SOURCE(S) CHECKED:
VERIFIED FACTS ADDED:
HYPOTHESES ADDED / REMOVED:
CONTRADICTORY EVIDENCE:
DEDUP RESULT:
DECISION:
REASON:
NEW_STATE:
TRACKER WRITE:
```

## Prospect Audit log

For each QUALIFIED prospect:

```text
PROSPECT_ID:
PRIOR QUALIFICATION:
ROLE CHALLENGE:
EVIDENCE CHALLENGE:
COUNTER-EVIDENCE SEARCH:
DUPLICATE RECHECK:
CONTACT-POLICY PRECHECK:
AUDIT_RESULT:
STATE_CHANGE:
```

## Batch review checkpoint

Default interval: every 5 newly researched prospects.

```text
CHECKPOINT_ID:
PROSPECTS REVIEWED:
DUPLICATE LEAKAGE:
ROLE-CLASSIFICATION DRIFT:
QUALIFICATION-STANDARD DRIFT:
REPEATED EVIDENCE WEAKNESS:
REPEATED PASS / HOLD PATTERN:
NEW ORGANIZATION TYPE:
SEARCH NOISE:
MISSION IMPACT:
DECISION: CONTINUE | ADJUST_SEARCH | RESEARCH_REPAIR | MISSION_REVIEW | STOP_DISCOVERY
CORRECTIVE ACTION:
```

## Mission revision log

When the mission changes:

```text
FROM_VERSION:
TO_VERSION:
OLD_MODEL:
NEW_MODEL:
EVIDENCE THAT FORCED / JUSTIFIED THE CHANGE:
USER INPUT REQUIRED: YES | NO
```

## Human intervention log

Record user corrections or operator decisions that changed the run.

```text
STEP_ID:
INTERVENTION:
WHY:
STATE / RULE AFFECTED:
```

If none occurred, explicitly record `NONE`.

## Stop decision

```text
STOP_REASON:
EVIDENCE FOR STOPPING:
UNRESOLVED AREAS:
```

## Final counts

```text
RAW CANDIDATES OBSERVED:
UNIQUE CANONICAL PROSPECTS:
DUPLICATES MERGED:
QUALIFIED BEFORE AUDIT:
AUDIT_PASS:
AUDIT_DOWNGRADE / REPAIR:
SECONDARY:
HOLD:
PASS:
SHORTLIST_READY:
ROUTE_UNRESOLVED:
DO_NOT_USE ROUTES:
```

## Self-critique

Record at least:

```text
What the process caught that an unconstrained run might have skipped
Where the search space may still have been too narrow
Where the single-agent process could still be biased
Any rule that proved ambiguous
Any schema or Skill change suggested by this run
```

## Benchmark limitation

Do not describe a regression run as blind when the operator or model has already seen the case or prior candidate set.

Do not claim a process step occurred merely because it appears in this template. Log only what actually happened.
