# Adaptive Collaboration and Process Reliability Protocol

FlyPig AI Outreach Engine is designed for human and LLM cowork with a single capable LLM as the default execution model.

The Core does not assume that an LLM will remember to perform every good practice on its own. The purpose of this protocol is to make important research behaviors mandatory, explicit, stateful, and auditable.

A multi-agent system may implement the same protocol, but multiple agents are not required.

## Core loop

At every stage, choose the next action from:

```text
RESEARCH
INFER
ASK
PROCEED
```

The agent may not skip a required stage gate merely because it believes the answer is obvious.

## Mandatory process controls

The following controls apply to every campaign unless a Skill explicitly defines a stricter rule.

### 1. Persistent Tracker

Maintain one canonical prospect Tracker for the campaign.

Every discovered candidate, including PASS and HOLD records, must be checked against and recorded in the Tracker.

Do not keep important prospect decisions only in conversational prose.

### 2. Dedup before insertion

Before creating a new prospect record, compare the candidate against the canonical Tracker using available identity signals such as:

```text
Legal or trading name
Official domain
Parent company
Local-language name
English name
Brand name
Known aliases
```

Return one of:

```text
NEW
DUPLICATE_MERGE
IDENTITY_UNCERTAIN
```

A rediscovered company must update the existing record rather than create a second row.

### 3. Discovery Diversity Check

Before materially converging on one ICP, partner type, channel, or adoption route, explicitly challenge whether the candidate universe is too narrow.

When relevant, test at least one materially different route such as:

```text
Direct users / buyers
Distributors / resellers / importers
System integrators / implementation partners
Market-entry / outsourced-business-development partners
Professional services / consultants
Training / education programs
Communities / associations / ecosystem amplifiers
Institutional channels
Other market-specific roles revealed by research
```

Do not mechanically search every category.

Record one of:

```text
DIVERSITY_CHECK: ADEQUATE
DIVERSITY_CHECK: EXPAND_SEARCH
DIVERSITY_CHECK: MISSION_REVISION_SIGNAL
```

If a materially stronger or different route appears, trigger Mission Review and version the mission rather than silently changing the target model.

### 4. Evidence before qualification

A prospect may not become `QUALIFIED` from search-result wording, model memory, category overlap, or a single unsupported inference.

Material role and fit decisions require current evidence from supportable sources.

Prefer official company sources when available.

### 5. Fact / hypothesis separation

Keep these distinct throughout the workflow:

```text
VERIFIED_FACT
WORKING_HYPOTHESIS
UNKNOWN
CONTRADICTORY_EVIDENCE
```

A plausible inference must never silently become a verified fact.

### 6. Counter-check before audit pass

For every prospect that reaches `QUALIFIED`, actively try to disprove the qualification.

At minimum ask:

```text
Could this company actually play a different business role?
Is the third-party brand / channel evidence current?
Is the evidence from an official or supportable source?
Is there contradictory evidence?
Is this company already represented elsewhere in the Tracker?
Does the contact route actually support business outreach?
```

The counter-check is not optional.

### 7. Mandatory Prospect Audit

A prospect may not move from `QUALIFIED` to Contact Verification / shortlist completion until `skills/prospect-audit/SKILL.md` returns `AUDIT_PASS`.

The same LLM may perform the audit, but it must change role and instruction: assume the previous qualification may be wrong and try to break it.

### 8. Batch review checkpoint

Default interval: every 5 newly researched prospects.

At each checkpoint, pause candidate processing and review the batch for:

```text
Duplicate or alias leakage
Role-classification drift
Qualification-standard drift
Repeated evidence weakness
Repeated exclusion reasons
New organization types that challenge the mission
Search queries producing mostly noise
Unresolved HOLD patterns
```

Record the checkpoint in the Execution Log.

The checkpoint may return:

```text
CONTINUE
ADJUST_SEARCH
RESEARCH_REPAIR
MISSION_REVIEW
STOP_DISCOVERY
```

### 9. Stop conditions

Do not search indefinitely.

Consider stopping or changing strategy when one or more are observed:

```text
New searches mostly return existing Tracker records
Qualified yield falls materially across repeated batches
New candidates add no new organization type or market insight
The available evidence is too weak to improve decisions
The mission itself appears incorrect
The user-defined batch objective has been satisfied
```

State why discovery stopped.

### 10. Fail-closed stage gates

If a mandatory check is incomplete, do not infer that it passed.

Examples:

```text
Dedup not checked → do not create a second canonical record
Diversity not checked before convergence → challenge the search space before narrowing further
Business role unresolved → HOLD or research repair
Qualification audit missing → do not shortlist
Contact route unsupported → record UNRESOLVED, never guess
```

### 11. Execution Log

For validation, benchmark, or auditable runs, maintain `templates/EXECUTION_LOG.md`.

The log should record actual actions rather than only final summaries, including:

```text
Core version / commit when known
Model / environment when known
Initial user input
Pre-registered mission and qualification rules
Search queries actually used
Candidate counts
Dedup decisions
Discovery Diversity decisions
Research sources
State transitions
Qualification decisions
Counter-check results
Audit decisions
Batch review checkpoints
Mission revisions
Human interventions
Stop condition
Final counts
Known limitations
```

## RESEARCH

Use research when an uncertainty can be resolved from approved external or connected sources without burdening the user.

Before asking the user a factual question, check:

1. User-provided materials
2. Company website
3. Approved connected files or systems
4. Current public sources
5. Existing campaign state and Tracker

Do not ask the user for facts that can be reliably researched.

## INFER

Infer when evidence supports a useful working hypothesis but not a verified fact.

Rules:

1. Label material inferences.
2. Preserve the evidence that motivated the inference.
3. Never use a hypothesis as evidence for itself.
4. Prefer reversible hypotheses early in the workflow.

## ASK

Ask the user when the missing information is preference, intent, commercial judgment, private context, or a material ambiguity that public research cannot resolve safely.

Do not ask a questionnaire by default.

Prefer the smallest question with the highest expected information gain.

## PROCEED

Proceed only when the current stage gate is satisfied.

Decision-ready does not mean perfectly complete. Remaining uncertainty may be preserved in the Tracker when it does not block the next bounded decision.

## Progressive mission formation

Treat the mission as a versioned working model:

```text
User intent
→ targeted research
→ working hypothesis
→ clarification when needed
→ discovery
→ diversity check
→ account evidence
→ batch review
→ mission refinement when evidence requires it
```

Repeated downstream contradiction or material expansion must trigger Mission Review rather than forcing prospects into the original category.

## Conversation style

1. Start from what the user actually said.
2. Do not force technical terminology.
3. Ask one or a small set of tightly related questions at a time.
4. Do not repeat questions already answered by evidence or user decisions.
5. Keep operational controls in the background unless they materially affect the user.
6. Surface important corrections, downgrades, and mission changes clearly.

## Human authority

The agent may research, infer, classify, audit, and recommend.

The user retains authority over:

```text
Commercial objective
Acceptable relationship types
Material exclusions
Brand positioning
Private business constraints
```

## Handoff requirement

Every Skill should preserve:

```text
verified_facts
working_hypotheses
contradictory_evidence
open_questions
user_decisions
research_needed
current_decision
next_best_action
tracker_format
tracker_location
discovery_diversity_status
discovery_diversity_notes
```

The receiving LLM should continue from the existing state and Tracker rather than restart the campaign.
