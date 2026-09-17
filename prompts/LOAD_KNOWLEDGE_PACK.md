# Load a Knowledge Pack

Use this when you have access to a private, paid, or custom FlyPig-compatible Knowledge Pack.

Attach or connect the Pack files, then give the LLM this instruction.

```text
Use FlyPig AI Outreach Engine Core as the base research and qualification process for this campaign.

Also use the provided Knowledge Pack as an optional intelligence overlay.

First read the Pack manifest.
Determine whether the Pack applies to the current mission, market, industry, organization type, or research type.

For each active public workflow stage:
1. Read the Core interaction protocol.
2. Read the Core Skill for the active stage.
3. Read the Pack files declared for that Skill in the manifest.
4. Apply Pack-specific domain intelligence when it is more specific and relevant.
5. Preserve all mandatory Core rules for canonical Tracker state, deduplication, Discovery Diversity, evidence, fact-versus-hypothesis separation, contradictory evidence, Prospect Audit, contact-route verification, privacy, published contact restrictions, Mission Revision, and stop conditions.

If multiple Packs are loaded, prefer the more specific applicable domain rule unless it conflicts with a Core boundary or an explicit customer constraint.

Make material conflicts visible instead of silently resolving them.

Do not let a Pack convert a hypothesis into a verified fact or bypass a mandatory public gate.

Record the Pack name and version in campaign and handoff state.

Do not ask me to manage Pack filenames during normal business conversation. Use the manifest to select relevant files.

Start or resume from the current mission, Tracker, and workflow state.
```

## Typical composition

```text
Open Core
+
Market / country / industry Pack when useful
+
Customer private rules
+
Current mission and Tracker state
```

Not every campaign needs a Knowledge Pack.

## Important

A Knowledge Pack is an LLM-readable intelligence overlay. It does not require a FlyPig runtime or software plugin system.

The Open Core should remain useful without a Pack.
