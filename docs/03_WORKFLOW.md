# 03 Workflow Reference

This document defines the public Open Core workflow for the default single-agent model.

Different stages are responsibility boundaries. They do not require separate LLM instances.

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

Every stage uses:

```text
PURPOSE
INPUT
TASK
DECISION RULES
OUTPUT
GATE
NEXT STATE
```

Mandatory process controls are defined in `skills/INTERACTION_PROTOCOL.md` and `docs/14_PROCESS_RELIABILITY.md`.

## 01 Mission Discovery

PURPOSE

Turn a broad or ambiguous growth idea into a bounded research mission.

TASK

Listen, research public context, form working hypotheses, ask only high-information-gain questions, establish the canonical Tracker, and stop when the mission is decision-ready.

OUTPUT

Versioned Mission Brief plus Tracker configuration.

GATE

Enough clarity exists to test a target market and organization model without pretending all assumptions are facts.

`PARTIALLY_READY` is valid when the mission is sufficient for market/channel research but important commercial variables remain unknown.

## 02 Prospect Discovery

PURPOSE

Build a broad but relevant candidate universe.

TASK

Search by market, category, ecosystem role, geography, and commercial relationship hypothesis.

For validation runs, log the actual material search queries.

DECISION RULE

Discovery is not qualification.

OUTPUT

Candidate observations with discovery reason, source, and initial role hypothesis.

## 03 Dedup Gate

PURPOSE

Prevent repeated search hits, aliases, brands, or language variants from becoming duplicate prospects.

CHECK:

```text
Official domain
Legal / trading name
Local-language name
English name
Parent company
Brand aliases
```

OUTPUT:

```text
NEW
DUPLICATE_MERGE
IDENTITY_UNCERTAIN
```

GATE

Do not create a second canonical Tracker row when duplicate identity remains unresolved.

## 04 Discovery Diversity Check

PURPOSE

Prevent the research from becoming rigorous inside a search space that is too narrow.

TASK

Before materially converging on one ICP, partner type, or route, ask whether a different path could satisfy the business objective.

When relevant, test alternatives such as:

```text
Direct users / buyers
Distributors / resellers / importers
System integrators / implementation partners
Market-entry / outsourced-BD partners
Professional-service firms
Training / education programs
Communities / ecosystem amplifiers
Institutional channels
Other market-specific roles
```

The check does not require every category to be searched.

It requires an explicit challenge to premature convergence.

OUTPUT

```text
ADEQUATE
EXPAND_SEARCH
MISSION_REVISION_SIGNAL
```

GATE

If a materially stronger or different route appears, return to Mission Discovery and version the change rather than silently redefining the target.

## 05 Account Research

PURPOSE

Determine what each canonical candidate actually does.

TASK

Research identity, business role, products, channels, geography, partner relationships, current activity, and campaign-relevant evidence.

Actively look for evidence that contradicts the apparent role or fit.

OUTPUT

```text
Verified facts
Evidence
Contradictory evidence
Unknowns
Working hypotheses
```

GATE

Do not advance when identity, role, or minimum material evidence remains insufficient.

Search snippets alone are not sufficient qualification evidence when supportable primary sources are available.

## 06 Qualification

PURPOSE

Decide whether a researched organization is strong enough to deserve skeptical audit.

Base dimensions:

```text
Market relevance
Business-role fit
Offer / category fit
Commercial plausibility
Evidence confidence
Constraint fit
Contactability as a separate operational dimension
```

OUTPUT

```text
QUALIFIED
SECONDARY
HOLD
PASS
```

`QUALIFIED` is provisional. It does not mean final shortlist entry.

GATE

Only QUALIFIED records proceed to Prospect Audit.

## 07 Prospect Audit

PURPOSE

Try to disprove the previous QUALIFIED decision before shortlist entry.

AUDIT STANCE

```text
Assume the previous qualification may be wrong.
What evidence would break it?
```

CHECK:

```text
Identity
Duplicate status
Business-role interpretation
Evidence quality
Counter-evidence
Commercial fit
Visible contact-policy conflicts
```

OUTPUT

```text
AUDIT_PASS
RESEARCH_REPAIR
DOWNGRADE_SECONDARY
HOLD
PASS
DUPLICATE_MERGE
```

GATE

Only `AUDIT_PASS` may proceed to final Contact Verification.

When Audit changes the result, `qualification_status` must be updated to the current effective status while `audit_result` preserves the historical transition.

## 08 Contact Verification

PURPOSE

Identify a legitimate professional route for an AUDIT_PASS organization.

Possible routes:

```text
Official role-specific business contact
Official partnership or business-development contact
Official general business contact
Official contact form
Verified professional channel
```

Read visible inquiry restrictions before recommending a route.

Do not invent private contact data or bypass published restrictions.

Commercial qualification and route suitability remain separate.

A prospect may remain QUALIFIED while its route is:

```text
UNRESOLVED
DO_NOT_USE
```

OUTPUT

Contact function, route, source, policy, status, and date checked.

## 09 Qualified Prospect Tracker

PURPOSE

Produce and maintain the final public-core research asset.

A strong record preserves:

```text
Canonical identity / aliases
Duplicate-check status
Business role
Discovery reason
Evidence
Verified facts
Working hypotheses
Contradictory evidence
Qualification status
Audit result
Counter-evidence summary
Confidence
Contact-policy precheck
Recommended contact function
Contact route / route status
Key uncertainty
Next recommended human action
```

## Batch review checkpoint

Default interval: after every five newly researched prospects.

Review:

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

Return:

```text
CONTINUE
ADJUST_SEARCH
RESEARCH_REPAIR
MISSION_REVIEW
STOP_DISCOVERY
```

## Mission revision loop

If repeated evidence contradicts or materially expands the original target model, return to Mission Discovery and create a new mission version.

Do not force evidence to fit the first hypothesis.

## Stop rule

Do not search indefinitely.

Stop or change strategy when marginal discovery mostly adds:

```text
Existing Tracker records
Repeated organization types
Low-value adjacent companies
Weak evidence
No new market insight
```

Record why the search stopped.

## Validation logging

For benchmark or validation work, use `templates/EXECUTION_LOG.md`.

The log should contain actual queries, state changes, diversity decisions, audit decisions, batch reviews, corrections, human interventions, and stop conditions rather than only a polished retrospective summary.

## Public stopping boundary

The public workflow ends at the Qualified Prospect Tracker.

It does not proceed into formal message strategy, drafting, sending, reply monitoring, or follow-up.

## Workflow principle

A smaller, evidence-backed, audited Tracker is more valuable than a larger weak list.
