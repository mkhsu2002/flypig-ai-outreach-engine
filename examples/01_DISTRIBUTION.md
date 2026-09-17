# Example 01: International Distribution

All organizations and names in this example are fictional placeholders.

## Scenario

`Northpine Gear` is a fictional Canadian outdoor-accessories brand exploring Japan.

It begins with a working assumption that it may need a distributor, but the user is not certain whether the strongest route is an importer, distributor, specialist retailer, agency partner, or another local operator.

## Mission

```text
Company: Northpine Gear
Category: Outdoor accessories
Target market: Japan
Goal: Identify organizations worth considering for market entry
Initial hypothesis: Distributor-first
Important exclusion: Do not treat manufacturers as distribution prospects without evidence of a separate channel role
Tracker: Local CSV
```

Mission status may be `PARTIALLY_READY` if price, margin, logistics, product range, or channel requirements remain unknown.

## Discovery

The Discovery Skill builds a candidate universe and keeps role labels provisional.

```text
Prospect A
Discovery reason: Operates in Japan's specialist outdoor market
Initial role hypothesis: Retailer / possible channel operator
Dedup result: NEW
State: DISCOVERED
```

Discovery alone does not qualify the prospect.

Before narrowing the search, the Diversity Check should test adjacent routes such as:

```text
Importer / distributor
Wholesale agency
Specialty retailer with direct-import capability
Market-entry / sales agency
Other market-specific channel roles
```

## Account Research

```text
Prospect A
Verified role: Specialty retailer
Verified fact: Carries multiple third-party outdoor brands
Unknown: Wholesale or import capability
Evidence: Official current company / category sources
State: RESEARCHED
```

The unknown remains visible rather than being converted into a distributor claim.

## Qualification

Possible result:

```text
Status: SECONDARY
Reason: Strong category relevance, but wholesale / distribution capability remains unverified
Confidence: MEDIUM
```

A different account with verified third-party import / wholesale activity could be `QUALIFIED`.

## Prospect Audit

Every QUALIFIED record must be challenged before final shortlist entry.

The Audit should ask:

```text
Is the company actually a distributor, or only a retailer?
Is third-party brand evidence current?
Is the business role inferred from a directory or verified from official sources?
Is there contradictory evidence?
Is this a duplicate under another Japanese / English name?
```

Possible result:

```text
AUDIT_PASS
DOWNGRADE_SECONDARY
RESEARCH_REPAIR
PASS
DUPLICATE_MERGE
```

## Contact Verification

For an audited qualified prospect, identify the strongest supportable professional route.

```text
Recommended function: Brand / business development
Route status: OFFICIAL_FORM
Key uncertainty: Form purpose is not explicitly supplier-facing
```

Do not guess a private email address.

A company can remain commercially qualified while a visible public contact route is `DO_NOT_USE` or unresolved.

## Final Tracker output

The public workflow ends with one persistent Tracker containing both strong and rejected research history:

```text
QUALIFIED / SHORTLIST_READY
SECONDARY
HOLD
PASS
```

Useful fields include:

```text
Organization
Business role
Evidence
Qualification reason
Confidence
Audit result
Counter-evidence
Contact-route status
Key uncertainty
Next recommended human action
```

The Open Core does not write or send the outreach message.
