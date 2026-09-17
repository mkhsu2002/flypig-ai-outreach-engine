# Mission Brief Template

This is primarily an output artifact of Mission Discovery, not a required intake form.

The user may begin in free-form business language. The LLM should research, infer, and clarify adaptively, then populate the brief once the mission is sufficiently decision-ready.

Do not force the user to manually complete every field.

## Mission identity

Mission ID:

Mission version:

Mission status:

```text
READY
PARTIALLY_READY
HOLD
```

Campaign owner:

## User intent summary

What the user is trying to achieve, in plain business language:

## Company and offer

Company:

Website:

What we offer:

Verified public proof points:

Private approved context relevant to research:

## Market objective

Target country or region:

Business objective:

Why this market or problem now, if known:

## Commercial relationship hypotheses

Plausible organization types:

Commercial relationship(s) to explore or test:

Ideal contact functions, if known:

Recipient-value hypothesis:

Do not require these to be perfectly verified before a small research-first discovery batch. Label uncertain items as working hypotheses.

## Constraints

Excluded organizations or categories:

Prohibited implications:

Relationship types that are unacceptable:

Private operational or commercial constraints:

Acceptable public contact-route types, if defined:

Language or brand constraints:

## Tracker configuration

Tracker format:

```text
GOOGLE_SHEETS
LOCAL_CSV
OTHER
```

Default: `LOCAL_CSV`

Tracker location:

Tracker template:

Default template:

`templates/PROSPECT_TRACKER.csv`

## Knowledge state

### Verified facts

```text
Fact
Source
Checked date when relevant
```

### Working hypotheses

```text
Hypothesis
Why it is plausible
How it can be tested
```

### User decisions

```text
Decision
Why it matters
```

### Open questions

Only material unresolved questions:

### Research still needed

Questions that should be answered from external or connected sources rather than by asking the user:

## First discovery batch

Suggested size:

Primary target hypothesis:

Secondary hypothesis, if useful:

What the first batch is intended to test:

## Discovery Diversity state

```text
NOT_CHECKED
ADEQUATE
EXPAND_SEARCH
MISSION_REVISION_SIGNAL
```

Alternative routes or organization types that should be deliberately tested when relevant:

Diversity notes:

## Success and revision criteria

What would make the first batch worth continuing?

What evidence would cause the mission to change?

What would indicate that the search space is too narrow?

What would cause the research to stop?

## Next best action

```text
RESEARCH
INFER
ASK
PROCEED
STOP
```

Specific next action:

## Active Knowledge Layers

Core version:

Knowledge Pack name / version, if any:

Customer-specific rule layer, if any:

## Public boundary

This Mission Brief governs prospect research and qualification only.

Formal message strategy, drafting, approval, sending, reply monitoring, and follow-up are outside the Open Core.

## Important rule

A Mission Brief is versioned.

When downstream evidence materially changes the target organization type, relationship model, recipient-value hypothesis, or major constraint, create a new mission version instead of silently rewriting the old reasoning.
