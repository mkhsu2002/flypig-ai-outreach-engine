# Control Test 03 — Naked LLM vs FlyPig Process

## Purpose

This comparison asks a narrow question:

> What changes when the same class of capable LLM performs prospect research normally versus operating under FlyPig's mandatory process controls?

The control run was intentionally allowed to use its own best judgment. It did not read the FlyPig repository, Skills, schemas, Golden Tests, or validation cases before completing the business research.

## Important result

The naked-LLM control run was strong.

It independently formed a credible Canadian go-to-market strategy, identified useful implementation partners and ecosystem channels, deprioritized several competitive candidates, and produced a practical 15-prospect list.

The comparison therefore does not support the claim that an LLM needs FlyPig in order to perform good prospect research.

A strong model can already do much of this work.

The difference appears in how consistently the work is governed and preserved.

## What the control did well

The control run naturally:

- shifted toward multiplier organizations rather than generic end users;
- identified RevOps / GTM consultancies, accelerators, training programs, and communities;
- deprioritized some AI-SDR / outbound vendors because of competitive overlap;
- noticed repeated organizations across searches;
- stopped after it believed the first practical set was sufficient;
- produced a concise business-friendly output.

It also showed broader launch-channel creativity than the FlyPig Golden Test in one area: accelerators, founder programs, communities, events, and other amplification channels.

That finding is useful and should not be hidden.

## What FlyPig made mandatory

The FlyPig Test 03 run required:

```text
One canonical Tracker
Dedup before canonical insertion
Evidence before qualification
Explicit fact / hypothesis / uncertainty separation
Mission versioning
Prospect Audit for every QUALIFIED record
Audit designed to falsify the prior decision
Batch review every five researched prospects
Contact verification as a separate state
PASS / SECONDARY records retained
Explicit stop condition
Execution Log
```

These were not optional choices left to the model during the run.

## A concrete difference: review coverage

The control run reconsidered and deprioritized some candidates, but it did not perform a formal skeptical review of every final recommendation.

Its own Execution Notes state that no formal deduplication, scoring, audit, validation framework, or state-transition process was performed.

The FlyPig run started with 18 QUALIFIED prospects.

Mandatory Prospect Audit then changed five decisions to SECONDARY.

That does not prove the five changes were objectively perfect. It demonstrates that review coverage was required and decision changes were preserved rather than left to chance.

## A concrete difference: research memory

The control considered approximately 30 organizations and returned 15 final prospects.

Some rejected or deprioritized candidates were described in prose, but the full research history was not maintained as one persistent operational record.

The FlyPig run kept the researched records in its Tracker:

```text
13 QUALIFIED / SHORTLIST_READY
5 SECONDARY
2 PASS
```

Keeping lower-priority and rejected records matters when the same campaign continues across sessions. It helps prevent the same weak accounts from being repeatedly rediscovered and re-evaluated.

## Where the control was better

The control run exposed a weakness in the FlyPig discovery process.

FlyPig Test 03 concentrated heavily on organizations whose daily work already involves market entry, outsourced sales, prospect research, CRM, or AI workflow implementation.

The control also considered:

- accelerator programs,
- training organizations,
- founder communities,
- GTM communities,
- conferences and ecosystem amplification channels.

For an open-source launch, those indirect adoption paths may be highly valuable.

The lesson is not to weaken qualification discipline. It is to improve discovery breadth before convergence.

The Core should therefore perform a Discovery Diversity Check when the mission is ambiguous: before settling on one ICP or route, test whether materially different paths such as direct users, implementation partners, channels, communities, education programs, ecosystem amplifiers, or institutional routes have been overlooked.

Not every campaign needs all of these categories. The requirement is to challenge premature convergence.

## Comparison summary

### Naked LLM strengths

```text
Strategic creativity
Channel diversity
Strong one-shot synthesis
Business-readable output
Natural prioritization
```

### FlyPig strengths

```text
Mandatory process coverage
Canonical dedup
Persistent research state
Explicit uncertainty
Evidence discipline
Required skeptical audit
Formal mission revision
Contact-route state
Preservation of PASS / SECONDARY records
Auditable stopping logic
Cross-session continuity
```

## Conclusion

The strongest defensible product claim is not:

> ChatGPT cannot do this without FlyPig.

It is:

> A capable LLM can produce excellent prospect research on its own. FlyPig turns many of the practices behind a high-quality result from optional model behavior into required operating discipline.

The strong control result does not weaken the case for FlyPig. It clarifies it.

FlyPig should not compete with the intelligence of the underlying model.

Its value is in making that intelligence easier to operate consistently across long, stateful, repeated business-development work.

> LLM knows how. FlyPig makes sure the process actually requires it.
