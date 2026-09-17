# Case Study — Can an LLM Build a Qualified Japan Outdoor Prospect Tracker?

## The question

A normal web search can produce dozens of Japanese outdoor companies in seconds.

That is not the same as producing a useful business-development list.

Golden Test 01 asked a narrower question:

> Can a capable LLM, guided by FlyPig AI Outreach Engine Skills, research real companies in Japan and distinguish which organizations are actually worth considering for an overseas outdoor-accessories brand?

The answer from this first run was yes — with important caveats.

## Setup

The sender was fictional: `Northpine Gear`, a Canadian outdoor-accessories brand.

The market was real: Japan.

The prospects were real companies researched from current public business sources.

The public result masks company names and contact details. The unmasked audit record is retained privately for verification.

The Open Core was not allowed to write or send messages. Its job ended at a persistent Qualified Prospect Tracker.

## Why this is harder than asking for “Japanese outdoor distributors”

The Japanese outdoor market contains organizations that can look similar from a distance but play very different roles:

```text
Importer / distributor
Exclusive brand agent
Wholesaler
Specialty retailer
Manufacturer / own-brand operator
Market-entry consultant
Sales agency
Direct e-commerce importer
```

A weak lead-generation workflow tends to mix them together.

That creates expensive downstream mistakes: a retailer gets treated as a national distributor, a manufacturer gets approached as a buyer, or a consumer-support form is used for a commercial proposal.

FlyPig separates the work into distinct stages:

```text
Mission Discovery
→ Prospect Discovery
→ Account Research
→ Qualification
→ Contact Verification
→ Qualified Prospect Tracker
```

## What happened in the real run

Seventeen real organizations were retained after initial discovery and deduplication.

The final qualification result was:

```text
10 QUALIFIED
3 SECONDARY
1 HOLD
3 PASS
```

The most important result was not the number ten.

It was the reasons the other seven did not simply remain on a “lead list.”

### Example pattern 1 — Famous does not mean qualified

Some companies were highly relevant to outdoor consumers but primarily operated as retailers or own-brand manufacturers.

They were not promoted to distributor status merely because they were large, recognizable, or carried outdoor products.

### Example pattern 2 — Business fit and contactability are different

One organization had excellent import and wholesale characteristics, but its published inquiry policy explicitly rejected new-business or product proposals through the available support channel.

The research did not invent another email address.

The company was passed for the current campaign.

Another strong wholesale candidate was placed on HOLD because its official form prohibited sales solicitation. The commercial fit remained visible, but the route risk was not ignored.

### Example pattern 3 — The mission can expand without becoming vague

The initial hypothesis focused on distributors and importers.

Research uncovered a real Japan market-entry operator that provides sales-agency and import-distribution execution for overseas outdoor brands.

That organization did not match the original label, but it matched the business objective.

The system therefore kept it as a qualified alternative route-to-market partner instead of discarding it for failing a taxonomy label.

This is the kind of behavior Mission Discovery is intended to enable.

## The Tracker matters

The final product was not a chat answer.

It was a persistent tracker containing fields such as:

```text
Business role
Discovery reason
Qualification status
Qualification reason
Confidence
Recommended contact function
Contact-route status
Key uncertainty
Next recommended human action
```

PASS and HOLD records were preserved.

That means a later batch can remember:

```text
We already researched this company.
We know why it failed.
Do not rediscover it and repeat the same work.
```

This is a major difference between a search result and a working BD research asset.

## Privacy-preserving publication

The test uses real companies, but the public artifact masks organization and contact identifiers.

For example:

```text
A●F C********n
s***-corp.co.jp
in**@example-domain
```

The private audit retains the exact organization, official sources, and public contact route used to make the decision.

This creates a useful compromise:

```text
Public readers can inspect the reasoning and output structure.
Private reviewers can verify that the test used real market data.
```

## What this test proves

This run supports a modest claim:

> A capable LLM following the FlyPig Open Core can produce a more disciplined prospect-research artifact than a raw company search by requiring role verification, evidence-backed qualification, and explicit uncertainty.

It does not prove that the qualified prospects will reply, become partners, or generate revenue.

Those questions require actual outreach and outcome data.

## What the test exposed

The run also surfaced useful limitations.

### 1. Contact verification is often the bottleneck

Many companies publish consumer-support or dealer-facing forms but do not publish a clear route for incoming overseas-brand proposals.

A good research system must be willing to say `UNVERIFIED`, `HOLD`, or `DO_NOT_USE`.

### 2. Category fit still needs product detail

“Outdoor accessories” is intentionally broad.

Before real outreach, the exact Northpine product line, price point, expected margin structure, logistics requirements, and brand positioning would materially affect ranking.

### 3. Qualification is not outcome prediction

The public Core can determine that a company is worth considering.

It cannot yet claim:

```text
This company will reply.
This distributor will perform.
This prospect will become a partner.
```

Those claims require the Paid / Controlled Outreach lifecycle and accumulated real outcomes.

## Why Golden Test 01 matters

The strongest evidence that an outreach-research Skill works is not that it can produce a long list.

It is that it can remove plausible-looking but wrong targets, preserve uncertainty, explain its decisions, and leave behind a tracker that a human can actually continue using.

That is what this first test was designed to evaluate.

Golden Test 02 should raise the difficulty further by moving from consumer outdoor channels to a technical industrial ecosystem where `distributor`, `system integrator`, and `direct customer` can easily be confused.