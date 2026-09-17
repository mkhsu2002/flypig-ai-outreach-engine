# Mission Planner Skill

Status: compatibility alias

The former Mission Planner role has been superseded by `skills/mission-discovery/SKILL.md`.

Use Mission Discovery as the default entry point.

The change is intentional: FlyPig AI Outreach Engine should not require the user to complete a rigid intake form before useful reasoning begins. The agent should accept free form intent, research what it can, form working hypotheses, ask only high value clarification questions, and create a mission brief when the Mission Readiness Gate is satisfied.

For backward compatibility, any workflow that invokes Mission Planner should route to Mission Discovery and preserve the same campaign state.

Follow:

```text
skills/INTERACTION_PROTOCOL.md
skills/mission-discovery/SKILL.md
```

Next handoff after mission readiness:

Prospect Discovery.
