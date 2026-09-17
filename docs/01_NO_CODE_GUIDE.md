# 01 No-Code Guide

This guide is for business-development, export, partnership, licensing, media, and market-development professionals who want to use FlyPig AI Outreach Engine without configuring AI software.

You can use the Open Core as a structured conversation with one capable LLM.

## The business-user mental model

Do not think in terms of prompts, models, APIs, or agent architecture.

Think in terms of these business stages:

```text
1. Clarify the market opportunity
2. Find candidate organizations
3. Check that the search is not too narrow
4. Research what each organization actually does
5. Decide which ones are worth keeping
6. Challenge the strongest decisions once more
7. Verify the best professional contact route
```

The final public output is a Qualified Prospect Tracker.

## Before research: choose the Tracker format

The AI should offer:

```text
Google Sheets  RECOMMENDED
Local CSV      DEFAULT
Other          optional
```

Google Sheets is recommended when the current environment can create or update a Sheet.

If you do not choose, use local CSV automatically with:

`templates/PROSPECT_TRACKER.csv`

The storage question must not block research.

## Stage 1: Start with your business thought

You may begin with something incomplete:

```text
We want to grow in Japan, but we are not sure whether distributors, retailers, importers, or another type of partner make sense.
```

The LLM should research public context before asking you questions that it can answer itself.

## Stage 2: Prospect Discovery

The AI should not give you a raw list and call it finished.

It should record why each candidate was discovered and check whether it already exists in the canonical Tracker under another legal name, English name, local-language name, brand, or domain.

Every reviewed candidate should be added to or merged into the same campaign Tracker.

## Stage 3: Discovery Diversity Check

Before the research settles on one answer, the AI should ask whether it is repeatedly searching only one version of the market.

Depending on the mission, alternative paths might include:

```text
Direct users
Distributors / importers
Integrators / implementation partners
Market-entry or outsourced-BD partners
Professional services
Training programs
Communities / ecosystem amplifiers
Institutional channels
Other market-specific roles
```

Not every category needs to be searched.

The purpose is to avoid becoming very rigorous inside a search space that is too narrow.

## Stage 4: Account Research

For each candidate, investigate:

```text
Who are they?
What role do they actually play?
What evidence supports that role?
What is still uncertain?
What evidence contradicts the apparent fit?
Does the organization fit the mission or only share keywords?
```

Do not assume a role from a company name or category label alone.

## Stage 5: Qualification

For every researched organization, decide:

```text
QUALIFIED
SECONDARY
HOLD
PASS
```

A qualification decision should explain why.

`QUALIFIED` is not the final shortlist state. It means the prospect is strong enough to enter mandatory Prospect Audit.

Do not delete weaker records merely to make the Tracker look stronger.

## Stage 6: Prospect Audit

Every QUALIFIED prospect receives a skeptical second pass.

The Audit asks:

```text
Assume the previous decision may be wrong.
What evidence would break it?
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

Only `AUDIT_PASS` proceeds to final Contact Verification.

## Stage 7: Contact Verification

For audited qualified prospects, identify the strongest legitimate professional route.

Examples:

```text
Official role-specific business contact
Official partnership / BD contact
Official general business contact
Official contact form
Verified professional channel
```

Do not guess private email addresses.

Commercial fit and route suitability remain separate. A good account can remain qualified even when its visible route is unresolved or `DO_NOT_USE`.

## Long-run batch review

By default, after every five newly researched prospects, review:

```text
Duplicate leakage
Role drift
Qualification drift
Evidence weakness
Repeated exclusion patterns
New organization types
Search noise
Mission impact
```

This helps reduce the drift that can appear during long LLM research sessions.

## Qualified Prospect Tracker

The Open Core is complete when you have one cumulative Tracker with fields such as:

```text
Company
Canonical identity / aliases
Business role
Evidence
Verified facts
Working hypotheses
Contradictory evidence
Qualification status
Audit result
Confidence
Contact-policy precheck
Recommended contact function
Contact route / route status
Key uncertainty
Next recommended human action
```

The Tracker is the canonical campaign record, not a disposable export.

## What happens after the Tracker?

You may use the qualified records however you choose.

The public project does not include formal message drafting, independent pre-send review, sending, mailbox monitoring, reply classification, or follow-up operations.

Those activities require your own downstream workflow or a separate Controlled Outreach layer.

## What you do not need to learn first

You do not need to understand:

1. Prompt engineering
2. Agent orchestration
3. APIs
4. Coding
5. Automation platforms
6. Model routing

## Cross-session continuity

When moving the campaign to another chat or model, preserve the Tracker format and location in the handoff record.

The next LLM should continue the same Tracker rather than start another list.

See `schemas/handoff.schema.yaml`.
