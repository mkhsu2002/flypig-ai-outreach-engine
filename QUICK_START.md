# Quick Start

This is the shortest path from a business thought to a reviewed Qualified Prospect Tracker.

You do not need to understand AI agents before using the system.

You also do not need to complete a form before beginning.

## Step 1: Start naturally

Tell your AI assistant what you are trying to achieve in your own words.

Example:

```text
We make laboratory equipment and I want to explore Germany, but I am not sure whether we should look for distributors, integrators, or direct buyers.
```

Then add:

```text
Use FlyPig AI Outreach Engine.
Start with Mission Discovery.
Research what you can before asking me questions.
Build and maintain a Qualified Prospect Tracker.
Follow every mandatory dedup, diversity, evidence, audit, and batch-review gate.
Do not write or send outreach messages.
```

## Step 2: Choose where to keep the Tracker

The AI should offer this choice early without blocking research:

```text
Google Sheets  RECOMMENDED
Local CSV      DEFAULT
Other          optional
```

If you do not choose, the engine should use `templates/PROSPECT_TRACKER.csv` as a local CSV structure.

## Step 3: Let Mission Discovery structure the problem

The agent should not immediately ask you to fill a questionnaire.

It should choose among:

```text
RESEARCH
INFER
ASK
PROCEED
```

while preserving mandatory process controls.

Typical behavior:

```text
Read your intent
→ establish Tracker location
→ inspect provided company context
→ research public market context
→ form a working hypothesis
→ ask a high-value clarification only when needed
→ refine the mission
```

The mission may remain `PARTIALLY_READY` when enough is known for research but important commercial variables are still unknown.

## Step 4: Prospect Discovery with mandatory dedup

The AI should search broadly enough to test the mission, but every newly discovered company must be checked against the canonical Tracker before a new row is created.

Check identity signals such as:

```text
Official domain
Legal / trading name
Local-language name
English name
Parent company
Brand aliases
```

Return:

```text
NEW
DUPLICATE_MERGE
IDENTITY_UNCERTAIN
```

A rediscovered company updates the existing row rather than becoming a second prospect.

## Step 5: Run the Discovery Diversity Check

Before the search converges on one ICP, partner type, or channel, explicitly test whether the current search space is too narrow.

Depending on the mission, plausible alternatives may include:

```text
Direct users / buyers
Distributors / importers
System integrators / implementation partners
Market-entry / outsourced-BD partners
Professional-service firms
Training / education programs
Communities / ecosystem amplifiers
Institutional channels
Other market-specific roles
```

You do not need to search every category.

The point is to challenge premature convergence.

Return:

```text
ADEQUATE
EXPAND_SEARCH
MISSION_REVISION_SIGNAL
```

## Step 6: Account Research

For unique candidates, research enough current evidence to establish:

```text
Who the organization is
What business role it actually plays
Which campaign-relevant facts are verified
What remains a hypothesis
What evidence contradicts the apparent fit
```

Search snippets alone are not enough when an official/supportable source exists.

## Step 7: Qualification

Qualification returns:

```text
QUALIFIED
SECONDARY
HOLD
PASS
```

`QUALIFIED` does not mean final shortlist entry.

It means the evidence is strong enough to justify mandatory Prospect Audit.

Commercial fit and contactability must remain separate.

## Step 8: Prospect Audit

Every QUALIFIED prospect must be stress-tested before shortlist entry.

The Audit role assumes the prior decision may be wrong and checks:

```text
Identity
Duplicate status
Business-role interpretation
Evidence quality
Contradictory evidence
Commercial fit
Visible contact-policy conflicts
```

Possible outcomes:

```text
AUDIT_PASS
RESEARCH_REPAIR
DOWNGRADE_SECONDARY
HOLD
PASS
DUPLICATE_MERGE
```

Only `AUDIT_PASS` proceeds to final Contact Verification.

## Step 9: Batch review every five researched prospects

By default, after every five newly researched prospects, pause and check:

```text
Duplicate leakage
Role-classification drift
Qualification-standard drift
Repeated evidence weakness
Repeated PASS / HOLD patterns
New organization types
Search noise
Mission impact
```

The checkpoint may continue, adjust search, repair research, review the mission, or stop discovery.

## Step 10: Contact Verification

For AUDIT_PASS prospects, identify the strongest supportable professional route from permitted public sources.

Prefer:

```text
Official role-specific business contact
Official partnership / business-development contact
Official general business contact
Official contact form
Verified professional channel
```

Never guess private email addresses.

Read visible contact-policy restrictions before recommending a route.

A prospect may remain commercially QUALIFIED even when its public route is `UNRESOLVED` or `DO_NOT_USE`.

## Step 11: Stop deliberately

Do not search forever.

Stop or change strategy when additional discovery is mostly producing:

```text
Existing Tracker records
Low-yield adjacent companies
Repeated role types with no new insight
Weak evidence
Mission-level contradictions
```

Record why discovery stopped.

## Final output

The public workflow is complete when the same canonical Tracker contains reviewed records with fields such as:

```text
Organization
Canonical identity / aliases
Duplicate-check status
Business role
Evidence
Verified facts
Working hypotheses
Contradictory evidence
Qualification status
Audit result
Counter-evidence summary
Confidence
Contact-policy precheck
Recommended contact function
Contact route and route status
Key uncertainty
Next recommended human action
```

The same Tracker can later be handed to a private Controlled Outreach workflow without repeating research.

## Validation / benchmark runs

When you want an auditable run, use:

`templates/EXECUTION_LOG.md`

The Log should preserve actual queries, dedup decisions, diversity checks, state changes, audit corrections, batch reviews, human interventions, stop conditions, and final counts—not just a polished summary written afterward.

## What the Open Core does not do

The public repository intentionally stops before formal outreach execution.

It does not include formal message strategy, message preparation, pre-send review, sending, mailbox monitoring, reply classification, or controlled follow-up.

## Next

Why FlyPig exists: `docs/15_WHY_FLYPIG_EXISTS.md`

Process reliability: `docs/14_PROCESS_RELIABILITY.md`

Tracker details: `docs/13_PROSPECT_TRACKER.md`

Shared protocol: `skills/INTERACTION_PROTOCOL.md`

Public Skill architecture: `skills/README.md`
