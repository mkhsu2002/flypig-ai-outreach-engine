# Example 00: Adaptive Mission Discovery

This fictional example shows how FlyPig AI Outreach Engine should begin from a normal business thought instead of a rigid intake form.

The company and details below are fictional.

## User starts with an incomplete idea

```text
We make industrial air-quality sensors and want to explore Germany. We usually use local distributors, but I am not sure whether that is the right model there.
```

A weak intake experience would respond with a long questionnaire.

FlyPig should not do that.

## Step 1: Interpret what is already known

The LLM records:

```text
Offer:
Industrial air-quality sensors

Target market:
Germany

Current home-market channel pattern:
Local distributors

Open strategic question:
Whether distribution is the correct German market-entry model
```

`Distributor` is treated as a working hypothesis, not a verified answer.

## Step 2: Establish the Tracker

The LLM offers:

```text
Google Sheets  recommended when connected
Local CSV      default
Other          optional
```

The storage decision does not block research.

If the user does not choose, use local CSV and continue.

## Step 3: Research before asking

Assume the fictional company website states that the products:

```text
Require technical product selection
Integrate with building or industrial monitoring systems
May require local technical support
```

The LLM should use that information rather than asking the user to repeat it.

It may form a preliminary hypothesis:

```text
Because the products require technical selection and integration, the first German discovery model should probably test technical distributors and system integrators rather than general electronics retailers.
```

This remains a hypothesis.

## Step 4: Ask the highest-value question

A useful question might be:

```text
For a local partner, is first-line technical support after the sale important, or do you mainly need them to generate and close business?
```

The answer may change whether the mission prioritizes:

```text
Technical distributors
System integrators
Sales representatives
Direct enterprise accounts
```

## Step 5: User provides private business context

```text
Yes, local first-line support is important. Our internal team can handle advanced technical issues, but we cannot support every customer directly in German.
```

This is private commercial context that public research could not reliably determine.

## Step 6: Refine the mission

The LLM can now produce a working model:

```text
Primary hypothesis:
Technical distributors and system integrators with local support capability

Secondary hypothesis:
Specialist representatives only where technical support can be provided through another channel

Not currently prioritized:
General retailers
Pure lead-generation agents without support capability
```

## Step 7: Mission Readiness Gate

The system checks whether it can state:

```text
What is being offered?                  YES
Which market?                           YES
Which organization types are plausible? YES
Which relationship is being tested?     YES
Why might the organization care?        SUFFICIENT HYPOTHESIS
Major constraints?                      YES: local first-line support
Tracker location?                       YES or DEFAULTED
```

The mission is sufficiently ready for a research-first discovery batch.

It does not need to force every field to be perfect before proceeding.

## Mission Brief v1

```text
MISSION_STATUS: PARTIALLY_READY
MISSION_VERSION: v1

USER_INTENT_SUMMARY:
Explore a German channel model for industrial air-quality sensors without assuming the existing distributor model automatically transfers to Germany.

WHAT_WE_OFFER:
Industrial air-quality sensors requiring technical selection and system integration.

TARGET_MARKET:
Germany

TARGET_ORGANIZATION_TYPES:
1. Technical distributors
2. System integrators
3. Secondary test: specialist sales representatives with support arrangements

COMMERCIAL_RELATIONSHIP_TO_EXPLORE:
Local sales and first-line technical-support partnership

RECIPIENT_VALUE_HYPOTHESIS:
Relevant partners may add a technical sensor line that fits their existing building or industrial monitoring customer base.

MATERIAL_CONSTRAINT:
Partner must be capable of local first-line support or have a credible support model.

TRACKER_FORMAT:
LOCAL_CSV unless the user selected another option

WORKING_HYPOTHESES:
Technical distributors and integrators are more promising initial targets than general retailers.

OPEN_QUESTIONS:
Exact commercial terms can be clarified after market/channel research.

DISCOVERY_DIVERSITY_STATUS:
NOT_CHECKED

NEXT_BEST_ACTION:
Run a small Prospect Discovery batch across the primary organization hypotheses.
```

## Step 8: Discovery Diversity Check

Before the research converges, the system should deliberately test whether the current target model is too narrow.

For this scenario it might compare:

```text
Technical distributors
System integrators
Building-automation partners
Specialist representatives
Direct enterprise routes where relevant
```

It does not need to search every possible organization type.

It does need to challenge the assumption that the first plausible channel is automatically the best one.

## Step 9: Discovery may change the mission

Suppose later research shows that the German category is dominated by specialized engineering firms that integrate sensors into broader building-control systems, while traditional distributors rarely provide the required support.

The system should not continue following Mission Brief v1 blindly.

It should return to Mission Discovery and record:

```text
DISCOVERY_DIVERSITY_STATUS:
MISSION_REVISION_SIGNAL

Reason:
System integrators appear to play a more central role in the target category than traditional distributors.
```

Then create `MISSION_VERSION: v2` if the target model materially changes.

## What this example demonstrates

```text
Free-form input
Tracker setup without blocking research
Research before asking
Hypothesis rather than premature certainty
One high-information-gain question
Private context supplied by the user
Decision-ready rather than perfectly complete mission
Discovery Diversity Check
Versioned mission refinement
```

That interaction model is the default behavior defined in `skills/INTERACTION_PROTOCOL.md`, `skills/mission-discovery/SKILL.md`, and `skills/prospect-discovery/SKILL.md`.
