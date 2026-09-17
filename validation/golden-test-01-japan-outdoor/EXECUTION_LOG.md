# Golden Test 01 Execution Log — Japan Outdoor Market

Date: 2026-09-17  
Campaign ID: `GT01-JP-OUTDOOR`  
Open Core version under test: `0.1.0`  
Tracker mode: `LOCAL_CSV` (default)  
Public-data policy: real organizations and real public business evidence; public artifact masks organization names, domains, and contact details.

## Test objective

Test whether FlyPig AI Outreach Engine Open Core can turn a market-entry objective into a persistent, evidence-backed Qualified Prospect Tracker without drafting or sending outreach.

The test uses a fictional sender so no real customer information is exposed.

### Fictional sender

`Northpine Gear`

Working offer:

```text
Canadian outdoor-accessories brand
Compact hiking and travel accessories
Pack organizers, utility pouches, lightweight carry accessories, and adjacent outdoor lifestyle products
```

Initial user intent:

```text
We are a Canadian outdoor-accessories brand and want to explore Japan.
We assume a distributor or importer may be the right partner, but we are not certain.
Build and qualify a prospect tracker. Do not write or send outreach messages.
```

## Privacy rule

Research was performed against real current public business information.

The public validation artifacts intentionally mask:

```text
Organization names
Domains
Phone numbers
Email addresses
Named contact details
```

The unmasked verification record is retained only in the private commercial repository.

## Stage 1 — Mission Discovery

### Tracker choice

No Google Sheets destination was supplied, so the Open Core defaulted to:

```text
tracker_format: LOCAL_CSV
tracker_template: templates/PROSPECT_TRACKER.csv
```

This did not block research.

### Working mission

```text
Target market:
Japan

Primary partner hypothesis:
Importer / distributor able to represent third-party outdoor brands

Secondary hypotheses:
Wholesale agency
Brand operator with external-brand capability
Market-entry / sales agency
Selected specialty retailer only if the mission later expands to direct retail

Primary qualification question:
Is this organization structurally capable of helping an overseas outdoor-accessories brand enter or expand in Japan?

Important exclusions:
Pure manufacturers with no evidence of external-brand representation
Pure retailers when the mission is distributor-focused
Consumer-only contact routes
Guessed private contact details
```

### Mission readiness result

`READY`

No additional clarification was required because the commercial objective, market, product family, and research-only scope were already clear enough for a bounded first batch.

## Stage 2 — Prospect Discovery

Discovery deliberately searched beyond the word `distributor`.

Search dimensions included:

```text
outdoor importer
outdoor distributor
exclusive importer
wholesale outdoor products
overseas outdoor brands Japan
brand agency
market-entry partner
specialty outdoor retailer
manufacturer / own-brand operator
```

Sources prioritized:

```text
Official company pages
Official brand / distributor pages
Official company contact pages
Official retail / dealer network pages
Current official business descriptions
```

A larger raw search universe was explored. After deduplication and removal of obvious non-target noise, 17 organizations were retained as the structured candidate universe.

## Stage 3 — Account Research

Each retained candidate was researched to establish:

```text
Actual business role
Import / wholesale capability
Evidence of third-party brand handling
Channel reach
Category relevance
Public professional contact route
Material uncertainty
```

The test did not treat search-result wording as verified business role.

## Stage 4 — Qualification

Public Core statuses were applied:

```text
QUALIFIED
SECONDARY
HOLD
PASS
```

Final distribution:

```text
QUALIFIED: 10
SECONDARY: 3
HOLD: 1
PASS: 3
TOTAL: 17
```

### Important qualification behaviors observed

1. Well-known outdoor companies were not automatically qualified.
2. Retail-only organizations were separated from import / wholesale partners.
3. Own-brand manufacturers were not treated as distributors without evidence.
4. A market-entry / sales-agency firm was retained as a strong alternative route-to-market partner even though it was not a classic distributor.
5. A highly relevant importer was passed because its published inquiry policy explicitly rejected new-business / product proposals through the available support route.
6. One otherwise strong wholesale candidate was placed on HOLD because its published contact form prohibited sales solicitation, creating a route-policy conflict.

## Stage 5 — Contact Verification

The Open Core searched only for supportable public professional routes.

Allowed outcomes included:

```text
OFFICIAL_GENERAL_CONTACT
OFFICIAL_FORM
UNVERIFIED
DO_NOT_USE
```

No private email addresses were guessed.

A prospect could remain commercially attractive while its contact route was unresolved or restricted.

## Mission impact

The original `distributor / importer` hypothesis remained valid, but the research broadened the mission model.

A distinct alternative role emerged:

```text
Market-entry / sales agency with import-distribution execution capability
```

This did not replace the distributor hypothesis, so the mission remained `v1`. It was recorded as an alternative partner model for human review.

## Final output

The public output is:

`QUALIFIED_PROSPECT_TRACKER.csv`

It preserves all 17 researched records rather than deleting PASS / HOLD candidates.

This matters because rejected candidates are part of the research memory and should not be rediscovered and re-evaluated from scratch in a later batch.

## Test result

`PASS WITH USEFUL FINDINGS`

The Open Core successfully produced a structured prospect tracker from real market data while maintaining:

```text
Role discipline
Evidence discipline
Fact / hypothesis separation
Qualification before action
Contact-route caution
Research-only scope
Privacy masking
Persistent tracker structure
```

## What was not tested

This test intentionally did not evaluate:

```text
Message drafting
Pre-send QA
Human approval workflow
Sending
Mailbox monitoring
Reply classification
Follow-up
Conversion to meetings or revenue
```

Those belong to the private Controlled Outreach layer or to later validation stages.