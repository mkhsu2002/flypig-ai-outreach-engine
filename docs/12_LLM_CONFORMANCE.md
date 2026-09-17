# 12 LLM Conformance

FlyPig AI Outreach Engine does not control the LLM runtime.

Different models and environments may interpret the same public Skills differently.

This document defines a lightweight conformance standard for checking whether one LLM / agent environment follows the Open Core process reliably.

The goal is consistent process behavior, not identical wording.

## What conformance means

A conforming implementation should preserve:

```text
Free-form Mission Discovery
Research before asking when public facts are available
Verified fact versus hypothesis separation
One canonical Tracker
Mandatory dedup before insertion
Discovery versus qualification separation
Discovery Diversity Check before premature convergence
Evidence-backed role verification
Qualification followed by skeptical Prospect Audit
Batch review checkpoints
Commercial fit separated from contact-route suitability
Explicit stop conditions
Mission revision when evidence changes the model
Cross-session handoff continuity
```

## Evaluation dimensions

Score each dimension:

```text
0 = failed
1 = partial
2 = strong
```

### 1. Free-form start

Begins from incomplete business intent without forcing a questionnaire.

### 2. Research before asking

Uses available sources to establish public facts before asking the user to look them up.

### 3. Hypothesis discipline

Keeps verified facts, hypotheses, unknowns, and contradictory evidence distinguishable.

### 4. Mission readiness

Proceeds when the mission is sufficiently clear for bounded research and uses `PARTIALLY_READY` when appropriate.

### 5. Canonical Tracker discipline

Maintains one campaign Tracker and writes reviewed prospect decisions back into it.

### 6. Dedup discipline

Checks identity before inserting new prospects and merges aliases / repeated discoveries into canonical records.

### 7. Discovery discipline

Does not silently treat search results as qualified prospects.

### 8. Discovery Diversity discipline

Before materially converging on one ICP, partner type, or route, tests whether a different direct, channel, implementation, community, institutional, or market-specific path could satisfy the objective.

Does not mechanically search every category; challenges premature convergence when relevant.

### 9. Role classification discipline

Researches what the organization actually does instead of inferring role from name, keyword, or category overlap alone.

### 10. Evidence discipline

Material prospect claims retain current supportable evidence; search snippets alone do not silently become proof.

### 11. Qualification discipline

Returns QUALIFIED / SECONDARY / HOLD / PASS with an explicit reason and keeps commercial fit separate from contactability.

### 12. Prospect Audit discipline

Every QUALIFIED prospect receives a skeptical audit that tries to falsify the previous decision. Audit can downgrade or repair records and updates current Tracker status consistently.

### 13. Batch-review discipline

After every five newly researched prospects by default, reviews duplicate leakage, role drift, qualification drift, evidence weakness, search noise, and mission impact.

### 14. Contact discipline

Does not invent private contact data, reads visible inquiry restrictions, and can keep a commercially qualified prospect while marking its route UNRESOLVED or DO_NOT_USE.

### 15. Stop / mission-revision discipline

Stops or changes search when marginal value falls and returns to Mission Discovery when repeated evidence contradicts or materially expands the target model.

### 16. Handoff continuity

Continues from a valid handoff and existing Tracker rather than restarting the interview or research.

Maximum score: 32.

## Suggested interpretation

```text
28 to 32  Strongly conforming
23 to 27  Usable with review
16 to 22  High supervision required
0 to 15   Not suitable for reliable use of the Open Core workflow
```

These bands are operational guidance, not scientific model benchmarks.

## Public generic test cases

### C-01: Ambiguous market entry

Input:

```text
We manufacture industrial measurement equipment and want to explore Germany, but I do not know whether we need distributors, integrators, or direct customers.
```

Strong behavior:

```text
Accepts ambiguity
Researches public context
Creates reversible channel hypotheses
Uses PARTIALLY_READY when appropriate
Does not force premature channel selection
```

### C-02: Duplicate identity

The same company appears under a local legal name, English trading name, and brand-site domain.

Strong behavior:

```text
Checks identity before insertion
Merges evidence into one canonical record
Does not inflate prospect count
```

### C-03: Premature discovery convergence

Scenario:

The first search family finds several plausible direct users, but the business objective could also plausibly be served by implementation partners or ecosystem channels.

Strong behavior:

```text
Runs the Discovery Diversity Check
Tests at least one materially different path when evidence warrants it
Returns EXPAND_SEARCH or MISSION_REVISION_SIGNAL when appropriate
Does not force every campaign into a fixed list of channel categories
```

### C-04: Superficial role match

A company has relevant keywords but unclear distributor / retailer / manufacturer status.

Strong behavior:

```text
Does not qualify from keyword overlap
Researches actual role
Returns HOLD when role evidence remains insufficient
```

### C-05: Weak evidence

A directory calls a company a distributor but current official sources do not support it.

Strong behavior:

```text
Looks for stronger evidence
Keeps uncertainty visible
Does not turn the directory label into verified fact
```

### C-06: Audit downgrade

Qualification marks a real importer as QUALIFIED, but its portfolio is narrow and distribution reach is weak.

Strong behavior:

```text
Prospect Audit actively challenges the original decision
Can return DOWNGRADE_SECONDARY
Updates current qualification_status and state consistently
Preserves the audit transition
```

### C-07: Contact-policy conflict

A strong commercial prospect publishes a form that explicitly prohibits sales solicitation.

Strong behavior:

```text
Keeps commercial fit separate from route suitability
May retain QUALIFIED + AUDIT_PASS
Marks the prohibited route DO_NOT_USE
Does not invent an alternative private address
```

### C-08: Batch drift

After several prospects, the model begins accepting broader companies than it did earlier.

Strong behavior:

```text
Batch review detects drift
Tightens or repairs decisions before continuing
```

### C-09: Downstream contradiction

The mission targets distributors, but repeated research shows system integrators dominate the category.

Strong behavior:

```text
Surfaces the contradiction
Returns to Mission Discovery
Creates a revised mission version rather than forcing the original label
```

### C-10: Diminishing discovery value

New searches mostly return duplicates and low-fit adjacent companies.

Strong behavior:

```text
Records the pattern
Stops or changes search strategy
Explains the stop condition
```

### C-11: Handoff continuation

A handoff contains the canonical Tracker location, user decisions, and next action.

Strong behavior:

```text
Does not restart the interview
Reads existing Tracker state
Continues from the next required gate
```

## Testing a new LLM or agent environment

1. Give the environment access to the public Core.
2. Use a fresh conversation or clean state.
3. Run generic conformance cases.
4. Score behavior, not style.
5. Record tool limitations separately from reasoning failures.
6. Repeat important tests because LLM behavior may vary between runs.

## Tool capability versus Skill conformance

Do not confuse missing tools with poor Skill behavior.

```text
No web access
→ capability limitation

Invents a fact instead of admitting the limitation
→ conformance failure
```

## Commercial execution evaluation

Message review, sending, mailbox monitoring, reply classification, and follow-up are outside this public conformance standard.

## Versioning

When Core behavior changes materially, conformance cases and scorecards should be reviewed with the Core.
