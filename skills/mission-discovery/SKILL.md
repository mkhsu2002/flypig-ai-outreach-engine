# Mission Discovery Skill

## Purpose

Transform a free form commercial intention into an executable prospect-research mission through adaptive dialogue, targeted research, explicit hypotheses, and minimal high value clarification.

This skill is the default entry point for FlyPig AI Outreach Engine.

Follow `skills/INTERACTION_PROTOCOL.md`.

## Entry condition

The user may start with anything useful, including:

```text
A vague market idea
A company website
A product
A target country
A list of companies
A partnership concept
A business problem
A partially formed campaign
```

Do not require a completed intake form before beginning.

## Tracker setup

The Open Core should maintain a persistent Qualified Prospect Tracker as the main campaign output.

Early in Mission Discovery, naturally offer the user a choice of where to keep it:

```text
Google Sheets  RECOMMENDED when the current environment can create or update a Sheet
Local CSV      DEFAULT
Other          user-selected compatible spreadsheet or database
```

Do not turn this into a blocking setup step.

Recommended behavior:

```text
I will maintain a prospect tracker as we research. If you have Google Sheets connected, I recommend using a Sheet because it is easier to review and continue across sessions. Otherwise I will use a local CSV by default. You can change this later.
```

Rules:

1. Recommend Google Sheets when a usable Sheets connection exists or the user wants collaborative cloud tracking.
2. Default to `local_csv` when the user does not choose, does not answer, or no compatible Sheet connection exists.
3. Use `templates/PROSPECT_TRACKER.csv` as the canonical field structure for local CSV.
4. Keep one canonical tracker for the campaign rather than creating a new list for every research batch.
5. Append or update prospect records as research changes their status.
6. Do not require the user to configure Google Sheets before research can begin.
7. Record the selected tracker format and location in campaign state and cross-agent handoffs.

## Core procedure

1. Interpret the user's current intent without overcommitting to a campaign structure.
2. Extract what is already known from the conversation and provided materials.
3. Offer the lightweight Tracker storage choice and apply `local_csv` if no choice is made.
4. Research factual context that can be resolved without asking the user.
5. Build one or more plausible commercial hypotheses when the direction is still ambiguous.
6. Identify the uncertainty that most changes the next decision.
7. Ask the smallest useful clarification question.
8. Update the mission model after the user's response.
9. Repeat research, inference, and clarification only as needed.
10. Stop asking when the Mission Readiness Gate is satisfied.
11. Produce a Mission Brief v1 with verified facts, working hypotheses, constraints, Tracker configuration, and remaining nonblocking uncertainties.
12. Ask the user to correct only material misunderstandings before prospect discovery begins.

## Mission Readiness Gate

The mission is ready when the system can answer, with sufficient confidence:

```text
WHAT_ARE_WE_OFFERING
TARGET_MARKET
PLAUSIBLE_TARGET_ORGANIZATION_TYPES
COMMERCIAL_RELATIONSHIP_TO_EXPLORE
RECIPIENT_VALUE_HYPOTHESIS
MATERIAL_EXCLUSIONS
PROHIBITED_IMPLICATIONS
TRACKER_FORMAT
```

Not every item must be a verified fact. A field may remain a working hypothesis when:

1. It is clearly labeled
2. It can be tested during discovery or research
3. It does not create a material risk if temporarily wrong

Tracker configuration must never block research. If unresolved, use `local_csv`.

## Highest information gain examples

If the user says:

```text
We want to enter Germany.
```

Do not immediately ask for ten fields.

Useful sequence:

```text
Acknowledge that a prospect tracker will be maintained.
Recommend Google Sheets if available; otherwise default to local CSV.
Research the user's company and offer if a website is available.
Infer plausible channel models.
Ask whether the main objective is direct customers, channel partners, or market exploration when that distinction materially changes discovery.
```

If the user says:

```text
We usually sell through agents in Taiwan, but I do not know what model makes sense in Germany.
```

Do not force the user to choose prematurely.

Instead:

```text
Treat distribution as a working hypothesis.
Research the target market structure.
Compare distributor, integrator, representative, and direct sales paths where relevant.
Return a recommendation and ask the user only about private constraints or preferences that research cannot resolve.
```

## Research rules

Research before asking when the missing information concerns:

```text
Company offering
Public product information
Current market presence
Published channel model
Industry terminology
Target market structure
Publicly observable partner types
```

Ask the user when the missing information concerns:

```text
Strategic preference
Commercial priority
Private margin or capacity constraints
Relationship types the company will or will not accept
Internal timing
Brand positioning choices
Preferred Tracker location when they want something other than the default
```

## Output contract

```text
MISSION_STATUS: READY | PARTIALLY_READY | HOLD
MISSION_VERSION
USER_INTENT_SUMMARY
WHAT_WE_OFFER
TARGET_MARKET
TARGET_ORGANIZATION_TYPES
COMMERCIAL_RELATIONSHIP_TO_EXPLORE
RECIPIENT_VALUE_HYPOTHESIS
IDEAL_CONTACT_ROLES if known
EXCLUSIONS
PROHIBITED_IMPLICATIONS
APPROVED_RESEARCH_SOURCES if defined
ACCEPTABLE_CONTACT_ROUTE_TYPES if defined
FIRST_BATCH_SIZE
TRACKER_FORMAT: GOOGLE_SHEETS | LOCAL_CSV | OTHER
TRACKER_LOCATION if known
VERIFIED_FACTS
WORKING_HYPOTHESES
OPEN_QUESTIONS
RESEARCH_NOTES
SUCCESS_CRITERIA
NEXT_BEST_ACTION
```

## Decision states

`READY`

Enough information exists to begin prospect discovery.

`PARTIALLY_READY`

Discovery may begin as a learning exercise, but one or more mission assumptions should be tested and may trigger mission refinement.

`HOLD`

A material ambiguity, missing private decision, or safety issue prevents useful discovery.

## Hold conditions

Return `HOLD` when:

1. The user cannot yet identify even a broad commercial objective
2. There is no plausible value for any recipient category
3. The intended research depends on deceptive identity or material misrepresentation
4. A private strategic decision is required before target categories can be defined
5. The scope is so broad that research would be mostly noise

Tracker preference is never a hold condition. Use local CSV by default.

## Conversation behavior

1. Do not open with a rigid questionnaire unless the user explicitly asks for one.
2. Start by responding to the substance of what the user said.
3. Offer Tracker storage as a lightweight operational choice, not an intake form.
4. Prefer one high value business question over a long checklist.
5. When useful, present a working hypothesis and ask the user to confirm or correct it.
6. If research changes the model, explain the change and revise the mission.
7. Do not ask the user to supply public facts that the agent can research.
8. Do not ask for technical AI knowledge.

## Reentry

Any downstream skill may return control to Mission Discovery when new evidence materially changes:

```text
Target organization type
Commercial relationship
Market assumption
Recipient value hypothesis
Campaign exclusions
```

Mission refinement should create a new mission version rather than silently overwriting the previous reasoning.

Changing Tracker format does not require a new mission version unless the change materially alters workflow or ownership.

## Next handoff

READY or PARTIALLY_READY → Prospect Discovery.

HOLD → user decision or targeted research repair.
