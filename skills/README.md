# Skills

The `skills/` directory defines the public FlyPig AI Outreach Engine research and qualification Skills.

These files are model independent. They are intended to be read and executed by capable LLM assistants or agents such as ChatGPT, Claude, OpenClaw, Hermes Agents, IDE agents, or future compatible systems.

They do not require a FlyPig runtime or multiple agents.

## Public Core promise

The Open Core is designed to show that a capable LLM can help a business:

```text
Understand a market-development objective
Discover relevant organizations
Deduplicate repeated identities
Challenge whether the search space is too narrow
Research what those organizations actually do
Qualify which accounts are worth keeping
Audit its own qualification decisions skeptically
Identify legitimate professional contact routes
Return a persistent Qualified Prospect Tracker
```

The Open Core stops at the Qualified Prospect Tracker.

Formal message strategy, message preparation, independent pre-send review, approval-controlled sending, mailbox monitoring, reply classification, and controlled follow-up are not part of the public Core.

## Single-agent default

FlyPig does not require a multi-agent framework.

The default model is:

```text
One capable LLM / Agent
+
FlyPig Skills
+
One canonical Tracker
+
Mandatory stage gates
+
State machine
```

Different Skills represent responsibility boundaries, not separate model requirements.

The same LLM may execute them sequentially.

## Human and LLM cowork model

All public Skills follow `skills/INTERACTION_PROTOCOL.md`.

The agent continuously chooses among:

```text
RESEARCH
INFER
ASK
PROCEED
```

But it may not bypass mandatory controls defined in the protocol.

## Mandatory reliability controls

The Core requires:

```text
One canonical Tracker
Dedup before insertion
Evidence before qualification
Fact / hypothesis / contradictory-evidence separation
Discovery Diversity Check before premature convergence
Counter-check of every qualified prospect
Mandatory Prospect Audit
Batch review every 5 newly researched prospects by default
Mission Revision when evidence changes the target model
Explicit stop conditions
Fail-closed stage gates
Execution Log for benchmark / validation runs
```

See `docs/14_PROCESS_RELIABILITY.md`.

## Public Skills

```text
mission-discovery
mission-planner compatibility alias
prospect-discovery
account-research
qualification
prospect-audit
contact-verification
```

## Default entry point

Start with Mission Discovery even when the user's request is incomplete.

Mission Discovery should:

1. Listen to free-form intent
2. Extract what is already known
3. Research public facts before asking the user
4. Create working hypotheses when appropriate
5. Ask the highest-information-gain question when clarification is needed
6. Stop asking when the Mission Readiness Gate is satisfied
7. Produce a versioned mission brief and Tracker configuration

The mission may be refined later if discovery or account research changes the commercial model.

## Public workflow

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

A prospect cannot reach `SHORTLIST_READY` without a recorded `AUDIT_PASS`.

## Discovery Diversity Check

Prospect Discovery should not become rigorous inside a search space that is too narrow.

Before materially converging on one ICP, partner type, or route, test whether a different path could satisfy the business objective.

When relevant, consider direct users, channel partners, integrators, implementation partners, professional services, communities, education programs, institutional routes, or other market-specific roles.

The requirement is not to search every category. It is to challenge premature convergence.

## Prospect Audit

Prospect Audit is deliberately adversarial.

After Qualification says:

```text
This prospect appears strong enough to continue.
```

Prospect Audit asks:

```text
Assume that decision may be wrong. Can the business role, evidence, identity, duplicate status, or commercial fit be disproved?
```

The same LLM may run both roles, but the audit responsibility and required checks remain separate.

## Minimum handoff record

Every Skill handoff should preserve:

```text
campaign_id
mission_version
prospect_id when applicable
current_stage
input_sources
verified_facts
working_hypotheses
contradictory_evidence
open_questions
questions_already_asked
user_decisions
research_completed
research_needed
material_constraints
decision
reason
active_knowledge_layers
next_best_action
tracker_format
tracker_location
```

Use `schemas/handoff.schema.yaml` when a structured cross-session or cross-agent handoff is useful.

## When to ask the user

Ask only when missing information concerns:

```text
Intent
Preference
Private commercial context
Strategic constraints
Material ambiguity that research cannot safely resolve
```

Do not ask the user for public facts that can be researched reliably.

## When to stop

The public workflow is complete when the user has a persistent reviewed Tracker whose shortlist-ready prospects have:

```text
Evidence-backed commercial relevance
Completed dedup check
Completed qualification
AUDIT_PASS
Supportable contact-route status or an explicitly unresolved route
```

The Open Core should not pretend to send messages or monitor replies.
