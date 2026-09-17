# 11 LLM Cowork Mode

FlyPig AI Outreach Engine is designed to run inside an existing LLM environment rather than through a dedicated FlyPig application.

The conversation is the interface.

The Skills are the operating instructions.

The Tracker, mission state, and handoff records preserve continuity.

## Default execution model

One capable LLM is the default.

A user may begin with ordinary business language:

```text
We make laboratory monitoring equipment and want to explore Singapore. I am not sure whether we need distributors, integrators, or direct customers.
```

The LLM should begin Mission Discovery rather than forcing the user to complete an AI-specific form.

## What the LLM should load

At minimum:

```text
README.md or QUICK_START.md
skills/INTERACTION_PROTOCOL.md
skills/mission-discovery/SKILL.md
skills/prospect-discovery/SKILL.md
skills/prospect-audit/SKILL.md
```

As the workflow advances, read the active public Skill:

```text
Prospect discovery → skills/prospect-discovery/SKILL.md
Account research → skills/account-research/SKILL.md
Qualification → skills/qualification/SKILL.md
Prospect audit → skills/prospect-audit/SKILL.md
Contact verification → skills/contact-verification/SKILL.md
```

## Role separation without model separation

The public workflow is:

```text
Mission Discovery
→ Prospect Discovery
→ Dedup Gate
→ Discovery Diversity Check
→ Account Research
→ Qualification
→ Prospect Audit
→ Contact Verification
→ Qualified Prospect Tracker
```

These are responsibility boundaries.

They do not require separate model instances.

The same LLM may perform Qualification and then switch to a skeptical Audit stance:

```text
Qualification:
Why is this account strong enough to continue?

Audit:
Assume that conclusion may be wrong. What evidence would break it?
```

This does not create fully independent review, but it is stronger than leaving self-review optional.

## Tracker continuity

Maintain one canonical Tracker per campaign.

At the start, offer:

```text
Google Sheets  recommended when connected
Local CSV      default
Other          optional
```

When moving to a new chat or model, preserve the same Tracker location rather than creating a new list.

## Switching environments

Research may move between:

```text
One chat → another chat
ChatGPT → another LLM
ChatGPT → OpenClaw
ChatGPT → Hermes Agents
Single LLM → multi-agent environment
```

Before switching, create a handoff record containing:

```text
Mission version
Tracker format and location
Current stage
Verified facts
Evidence
Contradictory evidence
Working hypotheses
Open questions
Questions already asked
User decisions
Research completed
Research still needed
Current decision
Next best action
Active Knowledge Pack versions if any
```

The receiving LLM should read the handoff before asking new questions.

## Do not restart the interview

Before asking the user anything, check:

```text
Was this already answered?
Can it be researched?
Is it recorded as a user decision?
Is it actually necessary for the next decision?
```

## Research and conversation may alternate

A normal pattern is:

```text
User thought
→ research
→ working hypothesis
→ clarification if needed
→ discovery
→ diversity check
→ account research
→ new evidence
→ mission revision when necessary
```

## Long-run stability

During larger campaigns, the same LLM should not simply continue indefinitely.

By default, after every five newly researched prospects, run a batch review for:

```text
Duplicate leakage
Role drift
Qualification drift
Evidence weakness
Repeated exclusion patterns
Search noise
New organization types
Mission impact
```

The purpose is to reduce long-context drift, not to simulate another model.

## User authority

The LLM may research, classify, infer, audit, recommend, and prioritize.

The user retains authority over the commercial objective, acceptable relationship types, material exclusions, private business constraints, and which prospects to pursue later.

## Public stopping point

The Open Core ends at the Qualified Prospect Tracker.

It does not prepare formal outreach messages, send email, monitor mailboxes, classify replies, or run follow-up operations.

## API requirement

No FlyPig API is required.

A third-party API is needed only when the chosen environment itself requires one.

## Knowledge Packs

Optional Knowledge Packs are LLM-readable research overlays. They may make public research and qualification rules more domain-specific, but they are not required by the Core.

## Recommended end-of-session behavior

When research is incomplete, produce a handoff artifact rather than only a prose summary.

Suggested instruction:

```text
Create a FlyPig handoff record using schemas/handoff.schema.yaml. Preserve the Tracker location, mission version, verified facts, counter-evidence, working hypotheses, user decisions, unanswered material questions, current stage, and next best action. Do not restart the campaign in the next session.
```
