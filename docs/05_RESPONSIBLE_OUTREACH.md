# 05 Responsible Research and Outreach Preparation

FlyPig AI Outreach Engine is designed for legitimate professional market research and business development, not indiscriminate messaging or private-data harvesting.

The public Core stops before formal outreach execution, but the quality and provenance of its research still matter because downstream actions may rely on it.

## Core rules

### Use legitimate business context

Do not fabricate a person, organization, relationship, customer reference, partnership, credential, or prior interaction.

### Use supportable claims

Material claims about a prospect, market, product category, partnership, or business role should have an evidence basis.

### Separate fact from hypothesis

Example:

Fact:

```text
The organization currently carries several third-party brands in the category.
```

Hypothesis:

```text
It may be open to evaluating another complementary brand.
```

The second statement is not verified buyer intent.

### Preserve contradictory evidence

Do not hide evidence that weakens the preferred interpretation.

Prospect Audit is specifically designed to search for reasons the previous qualification may be wrong.

### Use appropriate public professional data

Prefer official, public, professional contact routes.

Do not guess private addresses, harvest private data, bypass access controls, or use leaked information.

### Respect published contact restrictions

A company may remain commercially qualified while a visible public contact form is unsuitable or explicitly prohibits solicitation.

Record the route as `DO_NOT_USE` or unresolved rather than changing the business-role decision merely to create an actionable contact path.

### Preserve rejected research history

PASS, SECONDARY, and HOLD records should remain in the canonical Tracker when useful so the same weak organizations are not repeatedly rediscovered.

### Avoid indiscriminate volume

The Core is optimized for relevance, evidence, and qualification—not maximum list size.

## Jurisdiction and platform rules

Outreach rules vary by country, region, industry, communication channel, recipient type, and platform.

This repository does not provide legal advice and does not determine whether a later outreach campaign is lawful.

Before executing any outreach, the operator remains responsible for applicable privacy, electronic-communications, anti-spam, consumer-protection, industry, employment, and platform rules.

## Data minimization

Store only what is needed for legitimate research and workflow continuity.

Public-safe research fields may include:

```text
Organization-level business information
Official professional contact routes
Evidence sources
Qualification state
Audit state
Uncertainty
Research notes
```

Avoid sensitive or unrelated personal information.

## Public validation data

Validation may use real current public business information.

Public Golden Test artifacts should mask prospect identifiers when appropriate for the demonstration. Unmasked verification records should not be published when they contain unnecessary prospect-level detail.

A control run may preserve named public organizations when doing so is necessary to keep the raw control output faithful; such data must still be limited to current public professional information.

## Public fail-closed conditions

The research workflow should stop, hold, downgrade, or reject a record when it detects conditions such as:

```text
Fabricated or ambiguous identity
Unsupported material role claim
Guessed private contact information
Known published route restriction
Clearly wrong organization type
Material evidence conflict
Unresolved duplicate identity
Mission mismatch
```

## Responsible automation principle

Automate research, coordination, record keeping, and repetitive checks only when the decision logic is inspectable.

Do not scale a weak research process merely because an LLM can produce more records quickly.
