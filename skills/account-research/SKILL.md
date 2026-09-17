# Account Research Skill

## Purpose

Determine what a candidate organization actually does and create an evidence-backed account profile for qualification.

Follow `skills/INTERACTION_PROTOCOL.md`.

Account Research enriches the existing canonical campaign Tracker rather than creating a separate research artifact.

## Required inputs

```text
Mission brief
Canonical candidate record
Current research tools
Known campaign constraints
Tracker configuration
Execution Log when running an auditable / benchmark campaign
```

## Minimum evidence standard

Before proceeding to Qualification, the record must have enough current evidence to support:

```text
Organization identity
Current business role
At least one campaign-relevant fact
```

Search snippets alone do not satisfy this standard when a supportable primary or official source is available.

## Procedure

1. Confirm the organization's identity, official domain, and geography.
2. Re-check aliases / parent identity if new evidence suggests a duplicate.
3. Determine the current business role.
4. Identify relevant products, services, categories, audiences, or channels.
5. Look for evidence of third-party brands, partnerships, procurement, licensing, distribution, or other campaign-relevant behavior when applicable.
6. Identify current signals that materially affect the campaign.
7. Search for evidence that could contradict the apparent role or fit.
8. Find official public business contact-route candidates where easily available, but do not make route suitability the qualification decision.
9. Separate verified facts, hypotheses, unknowns, and contradictory evidence.
10. Record the source and date checked for material claims.
11. Flag evidence that materially changes the mission model.
12. Update the existing Tracker row.
13. For auditable runs, log material source checks and any research repair / role correction.

## Tracker write behavior

Update fields such as:

```text
business_role
canonical_domain
aliases
verified facts / concise evidence summary
source trail
working_hypotheses
contradictory_evidence
key_uncertainty
confidence
state: researched
```

Do not silently overwrite a prior verified fact with a conflicting new claim. Preserve the conflict and update deliberately.

## Interaction rules

### RESEARCH

Research before asking the user whenever the missing information is publicly observable.

### INFER

Infer only when evidence supports a useful working hypothesis.

Do not convert an inference into a verified fact merely because it appears commercially plausible.

### ASK

Ask the user when the unresolved point depends on private context or materially changes how evidence should be interpreted.

### PROCEED

Proceed to Qualification only when identity, business role, and campaign-relevant facts are sufficiently clear to support a bounded fit decision.

Stop researching when additional browsing is unlikely to change the qualification decision materially.

Return to Mission Discovery when repeated account research shows that the campaign is targeting the wrong organization type or relationship model.

## Output contract

```text
PROSPECT_ID
ORGANIZATION
VERIFIED_IDENTITY
CANONICAL_DOMAIN
ALIASES
GEOGRAPHY
BUSINESS_ROLE
RELEVANT_FACTS
EVIDENCE
CONTRADICTORY_EVIDENCE
COMMERCIAL_OBSERVATIONS
CONTACT_ROUTE_CANDIDATES
UNKNOWNS
HYPOTHESES
MISSION_IMPACT
RESEARCH_CONFIDENCE
STATE: RESEARCHED
TRACKER_WRITE: UPDATED
```

## Fail or hold conditions

Return `HOLD` when:

1. Identity remains ambiguous
2. Sources materially conflict and cannot be bounded
3. Evidence is too weak to determine the business role
4. Current relevance cannot be established

Do not silently fill evidence gaps with general assumptions.

## Next handoff

Qualification, or Mission Discovery when mission refinement is required.
