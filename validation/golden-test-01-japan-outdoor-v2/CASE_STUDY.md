# Golden Test 01 v2 — Can a Single LLM Become More Reliable Through Process Discipline?

## The question

A capable LLM can already search the web, summarize company websites, classify businesses, and produce a prospect list.

So what does FlyPig AI Outreach Engine actually add?

Golden Test 01 v2 was redesigned to test a narrower claim:

> FlyPig does not make the model smarter. It makes important prospect-research behaviors mandatory, stateful, and auditable.

The test used one LLM, not a multi-agent framework.

## Scenario

A privacy-safe fictional Canadian outdoor-accessories brand wanted to explore Japan. Its products were described broadly as pack organizers, utility pouches, and lightweight carry accessories.

The initial assumption was that a Japanese distributor might be needed.

The system was deliberately not given a finished target list.

## Why the mission was only PARTIALLY_READY

The market and broad product category were sufficient for channel research, but exact SKUs, wholesale pricing, margin structure, logistics, and positioning were unknown.

The system therefore treated the first run as channel / organization qualification, not proof that any company would buy the product.

That distinction matters: an LLM should not pretend that public-company research can replace missing commercial data.

## What changed in v2

The strengthened Open Core added mandatory controls:

1. One canonical Tracker
2. Dedup before insertion
3. Evidence before qualification
4. Explicit fact / hypothesis / contradictory-evidence separation
5. Prospect Audit after every QUALIFIED decision
6. Audit instruction to actively try to disprove the prior decision
7. Batch review after every five researched prospects
8. Contact-route suitability separated from commercial fit
9. Explicit stop conditions
10. Detailed Execution Log for validation runs

## Discovery

Fourteen broad English/Japanese search strategies produced 44 material candidate mentions.

Repeated hits were not treated as additional prospects.

After identity deduplication:
- 34 unique canonical candidates remained
- 20 were promoted into the full regression research set

This matters because the same company repeatedly appears under English names, Japanese names, brand pages, distributor lists, and different search queries.

Without a canonical Tracker, repeated discovery can easily inflate the apparent list.

## Qualification was not the final decision

Of the 20 researched companies:
- 15 initially reached QUALIFIED
- 3 were SECONDARY
- 2 were PASS

The system then ran Prospect Audit on every one of the 15 qualified companies.

The audit did not ask, “Can I defend my earlier answer?”

It asked, “Assume my earlier answer may be wrong. What would break it?”

## The audit changed real decisions

Three of the 15 initial QUALIFIED prospects were downgraded to SECONDARY.

The reasons were specific:
- genuine importer role, but limited demonstrated distribution depth
- strong alignment, but the company was newly established and channel reach was not yet proven
- genuine overseas-brand importer/wholesaler, but too generalist to justify first-tier outdoor priority

That is the core process value.

A normal LLM may be capable of noticing these weaknesses, but the Skill requires the check instead of hoping the model remembers to do it.

## A second correction: fit is not contactability

One prospect had very strong official evidence of outdoor wholesale / agency activity.

Its public contact form, however, explicitly prohibited sales or solicitation use.

The first version of the workflow risked turning that contact problem into a commercial PASS.

v2 handled it differently:

- Qualification: QUALIFIED
- Prospect Audit: AUDIT_PASS
- Contact policy: PROHIBIT_SOLICITATION
- Route state: DO_NOT_USE

The company remains valuable market intelligence and a legitimate target account, but the visible public form must not be used.

This separation is more precise than treating “can I find an email/form?” as part of business fit.

## Final result

The final Tracker contained:
- 12 QUALIFIED / SHORTLIST_READY
- 6 SECONDARY
- 2 PASS

The public version masks organization names and contact details. A private audit file preserves the real companies, URLs, and evidence used.

## What this test proves

It demonstrates that a single LLM can execute the FlyPig workflow when the process is explicit.

It also demonstrates that the controls can change outcomes:
- duplicate results were merged
- three initial qualification decisions were downgraded by audit
- a contact-policy conflict was caught without corrupting commercial qualification
- wrong-partner-type and wrong-category companies remained in the Tracker as PASS history
- the system stopped when marginal search value fell

## What it does not prove

This is not a blind comparison against vanilla ChatGPT.

The model/operator had already seen the first version of the case, so v2 is a regression test, not an independent benchmark.

It also does not prove that same-model self-audit is equivalent to an independent second model.

The next stronger evaluation is a control experiment:

- same model
- same web access
- same business request
- one run without FlyPig process rules
- repeated runs with FlyPig process rules

Then compare:
- skipped checks
- duplicate leakage
- unsupported role claims
- evidence coverage
- audit corrections
- contact-policy mistakes
- Tracker completeness
- cross-run variance

## The product claim

The strongest defensible claim is not:

> ChatGPT cannot do this without FlyPig.

It is:

> A capable LLM already knows many of these practices. FlyPig makes the critical ones part of the required operating process.

Or more simply:

> LLM knows how. FlyPig makes sure the process actually requires it.
