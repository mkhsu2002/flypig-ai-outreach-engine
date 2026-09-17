# 14 Process Reliability — Why a Single LLM Still Needs FlyPig

FlyPig AI Outreach Engine does not claim that a capable LLM is unable to research companies, classify business roles, or build a prospect list.

A fresh naked-LLM control run demonstrated the opposite: a strong model can produce a very good one-shot result using normal web research and its own judgment.

The problem FlyPig targets is execution reliability across long, stateful work.

## The reliability problem

A capable LLM may know that it should:

```text
Check official sources
Separate facts from hypotheses
Deduplicate companies
Challenge its first interpretation
Keep qualification standards consistent
Record why a prospect was rejected
Test whether the search space is too narrow
Stop when searches become repetitive
```

But knowing a good practice does not guarantee that the model will perform every one of them consistently across many turns.

The Open Core therefore treats these behaviors as process requirements rather than optional reasoning habits.

## Default architecture

```text
One capable LLM
+
FlyPig Skills
+
Canonical Tracker
+
State machine
+
Mandatory stage gates
+
Execution Log when auditability matters
```

Multiple agents are not required.

## Role separation without model separation

```text
Mission Discovery
→ Prospect Discovery
→ Dedup Gate
→ Discovery Diversity Check
→ Account Research
→ Qualification
→ Prospect Audit
→ Contact Verification
```

These are responsibility boundaries, not a requirement for separate models.

The Prospect Audit role deliberately changes stance:

```text
Qualification:
Why does this prospect fit?

Audit:
Assume the qualification may be wrong. What evidence would break it?
```

This does not create full statistical independence. It creates mandatory skeptical review coverage.

## Mandatory controls

The public Core requires:

1. One canonical prospect Tracker per campaign
2. Deduplication before insertion
3. Evidence before qualification
4. Explicit fact / hypothesis / contradictory-evidence separation
5. Discovery Diversity Check before premature convergence
6. Mandatory Prospect Audit for every QUALIFIED prospect
7. Batch review every five newly researched prospects by default
8. Mission Revision when evidence changes the target model
9. Commercial fit separated from contact-route suitability
10. PASS / SECONDARY / HOLD research history preserved
11. Explicit stop conditions
12. Fail-closed stage gates
13. Auditable execution logging for validation runs

## What FlyPig is trying to reduce

Common long-task failure modes include:

```text
A retailer is casually called a distributor
A search snippet becomes proof
The same company appears twice under different names
Qualification standards loosen after many records
A famous company is kept despite poor mission fit
A strong account is rejected only because the public route is weak
The same rejected account is rediscovered in a later session
The search becomes rigorous but too narrow
The model keeps searching long after results become repetitive
```

FlyPig does not assume a particular model will always make these mistakes.

It makes the checks explicit because the model may otherwise skip them.

## Discovery breadth is also a reliability problem

The Naked LLM Control Test 03 exposed an important weakness in the original FlyPig Test 03 search strategy.

The FlyPig run was disciplined around service multipliers such as market-entry firms, outsourced sales teams, and AI/CRM implementers.

The control run also found accelerators, training programs, communities, events, and ecosystem amplification channels that may be useful for an open-source launch.

This demonstrated that process discipline alone is not enough if the candidate universe converges too early.

The Core therefore adds a Discovery Diversity Check:

```text
Are we repeatedly searching only one version of the answer?
Could a different organization type satisfy the business objective through another route?
Has current evidence revealed a higher-leverage adjacent role?
```

The goal is not to search every possible category. It is to challenge premature convergence.

## Commercial fit is not contactability

The Core explicitly separates:

```text
Is this organization worth approaching?
```

from:

```text
Can we currently verify an appropriate public route to approach it?
```

A strong commercial fit may remain `QUALIFIED` even when the route is `UNRESOLVED` or `DO_NOT_USE`.

## What the control comparison shows

The naked-LLM control did several things very well:

```text
Strategic creativity
Natural prioritization
Useful one-shot synthesis
Channel diversity
Business-readable output
```

It also recorded that no formal deduplication procedure, mandatory skeptical audit, validation framework, or state-transition process was performed.

The FlyPig Test 03 run, by contrast, required Audit for every QUALIFIED prospect and preserved every downgrade in the Tracker.

This is the intended product distinction.

The strongest defensible claim is not:

> ChatGPT cannot do this without FlyPig.

It is:

> A capable LLM can produce excellent prospect research on its own. FlyPig turns critical practices from optional model behavior into required operating discipline.

See `validation/control-test-03-naked-llm/COMPARISON.md`.

## Benchmark principle

A useful evaluation should not ask only:

```text
Did the LLM find relevant companies?
```

It should also examine:

```text
Dedup coverage
Discovery breadth
Evidence coverage
Role corrections
Unsupported-claim rate
Audit downgrades
Contact-policy conflicts caught
PASS / HOLD history preserved
Batch-review corrections
Mission revisions
Tracker completeness
Stop-condition quality
Cross-run variance
```

The claim is not that FlyPig makes the model smarter.

The claim is that it makes prospect research more disciplined, repeatable, auditable, and persistent.

> LLM knows how. FlyPig makes sure the process actually requires it.
