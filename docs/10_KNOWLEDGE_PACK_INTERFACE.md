# 10 Knowledge Pack Interface

FlyPig AI Outreach Engine supports optional Knowledge Packs without requiring a separate runtime or plugin system.

A Knowledge Pack is an LLM-readable intelligence overlay that adds domain-specific research or qualification knowledge to the generic Open Core.

Knowledge Packs are optional. They are not required to use the public project and are not the primary Free / Paid boundary.

## Basic model

```text
FlyPig Open Core
+
Optional Knowledge Pack
+
User / campaign context
↓
LLM environment
↓
Domain-informed prospect research
```

The LLM itself performs the composition.

## Pack manifest

Use `templates/KNOWLEDGE_PACK_MANIFEST.yaml` as the reference structure.

A manifest should declare at minimum:

```text
PACK_NAME
PACK_VERSION
PACK_TYPE
COMPATIBLE_CORE_VERSION
APPLIES_TO
EXTENDS_SKILLS
PRECEDENCE
KNOWN_LIMITATIONS
LAST_REVIEWED
```

## Load order

When a Pack is available, use this order:

1. Core interaction protocol
2. Core Skill for the active stage
3. Applicable market / industry / outreach-type Pack
4. Customer-approved private rules
5. Current campaign, prospect, Tracker, and handoff state

## Core rules a Pack must not weaken

A Pack may add specificity but must not remove these public rules:

```text
Research public facts before asking the user
Maintain one canonical Tracker
Deduplicate before canonical insertion
Separate verified facts from hypotheses
Preserve contradictory evidence
Do not invent private contact data
Do not invent identities or relationships
Preserve campaign exclusions
Require evidence before qualification
Require Prospect Audit for QUALIFIED records
Keep commercial fit separate from contact-route suitability
Respect published contact restrictions
Keep material uncertainty visible
Preserve PASS / SECONDARY / HOLD research history
```

A Pack may impose stricter rules.

## Public Skills a Pack may extend

```text
Mission Discovery
Prospect Discovery
Account Research
Qualification
Prospect Audit
Contact Verification
```

Examples of Pack intelligence:

```text
Local channel-role terminology
Industry-specific organization types
Market-specific negative signals
Qualification dimensions or thresholds
Preferred evidence sources
Common role-confusion patterns
Known research-source weaknesses
Country-specific contact conventions
Private evaluation cases
```

## Stage-specific loading

The LLM does not need to load every Pack file at every stage.

Example:

```text
Mission Discovery
→ MISSION_DISCOVERY.md
→ MARKET_MODEL.md

Prospect Discovery
→ ORGANIZATION_TAXONOMY.md
→ DISCOVERY_SOURCES.md

Account Research
→ RESEARCH_SOURCES.md
→ ROLE_EVIDENCE.md

Qualification / Prospect Audit
→ QUALIFICATION_RULES.md
→ NEGATIVE_SIGNALS.md
→ FAILURE_CASES.md

Contact Verification
→ CONTACT_ROUTE_RULES.md
```

## Conflict resolution

When two overlays disagree:

1. Core evidence, privacy, dedup, audit, and contact-policy rules remain active.
2. A more specific applicable Pack may override a generic commercial default.
3. Customer-approved private constraints may override generic preferences when they do not conflict with Core safeguards.
4. Material conflicts must be visible rather than silently resolved.
5. Ask the user only when research and specificity cannot safely resolve the issue.

## Decision trace

When a Pack materially changes a decision, preserve enough reasoning to explain the result.

Example:

```text
Core hypothesis:
Generic distributors are plausible targets.

Pack rule:
Technical products requiring commissioning should also test system integrators.

Current evidence:
Local projects rely heavily on integrators for field-instrument selection and commissioning.

Result:
Mission Revision adds system integrators to Discovery.
```

## Handoff and versioning

When a Pack affects a campaign, record its name and version in campaign or handoff state.

This matters because the campaign may continue across sessions while Pack intelligence evolves.

## Using a Pack

A practical instruction can be simple:

```text
Use FlyPig AI Outreach Engine Core as the base process.
Also use the attached Knowledge Pack for applicable domain decisions.
Read its manifest first and load only the files relevant to the active Skill.
Do not allow Pack rules to weaken Core evidence, dedup, audit, privacy, or contact-policy controls.
```

No FlyPig API or runtime is required.

## Multi-agent environments

A multi-agent framework may attach different Pack files to specialist agents, but this is optional.

The same Pack can also be used by one LLM executing the Skills sequentially.

## Commercial boundary

The open repository defines the interface so the Core remains extensible.

Private Knowledge Packs may remain licensed separately, but generic business definitions alone should not be treated as proprietary value.

The primary Free / Paid product boundary remains the Open Core Qualified Prospect Tracker versus downstream Controlled Outreach execution.
