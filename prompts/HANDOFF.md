# Campaign Handoff Prompt

Use this when you want to continue a FlyPig AI Outreach Engine research campaign in another chat, LLM, or agent environment.

## Create the handoff

```text
Create a FlyPig AI Outreach Engine handoff record for the work completed in this conversation.

Follow schemas/handoff.schema.yaml.

Preserve:

1. Campaign ID and latest mission version
2. Current workflow stage and prospect state where applicable
3. Tracker format, location, and template
4. Discovery Diversity status and notes
5. Verified facts and their evidence
6. Contradictory evidence
7. Working hypotheses, clearly separated from facts
8. Open questions that materially affect the next decision
9. Questions already asked so the next LLM does not repeat them
10. User decisions and material commercial constraints
11. Research already completed
12. Research still needed
13. Current decision and its reason
14. Active Knowledge Packs and versions, if any
15. The single next best action
16. Suggested next mode: RESEARCH, INFER, ASK, PROCEED, or STOP

Do not convert unresolved assumptions into facts.
Do not summarize away disagreements, counter-evidence, or material uncertainty.
Do not create a new Tracker when an existing canonical Tracker is available.

Return the structured handoff first. Add a short human-readable summary only if useful.
```

## Resume from a handoff

Give the handoff record to the new LLM or agent, then use:

```text
Continue this research campaign using FlyPig AI Outreach Engine.

Read the provided handoff record before asking me any question.

Continue the same canonical Tracker.

Do not restart Mission Discovery unless the handoff indicates that the mission needs material revision.

Do not repeat questions already answered.
Research public facts before asking me to provide them.
Keep verified facts, contradictory evidence, working hypotheses, and user decisions separate.

Check whether the Discovery Diversity requirement has already been satisfied before re-running or skipping it.

Follow the active Skill and any listed Knowledge Packs.

Choose the next action using the FlyPig interaction protocol:
RESEARCH, INFER, ASK, PROCEED, or STOP.

Begin from the handoff's next_best_action.
```

## Why this exists

FlyPig AI Outreach Engine does not depend on a proprietary runtime to preserve continuity.

A structured handoff lets the user move work between compatible LLM environments while preserving the Tracker and decision trail instead of restarting research.
