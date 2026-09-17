# LLM Conformance

FlyPig AI Outreach Engine is executed by external LLM / Agent environments rather than a proprietary FlyPig runtime.

The default model is one capable LLM executing explicit responsibility stages sequentially.

Because model behavior varies, the public Core includes a conformance standard for testing whether an environment follows the prospect-research process reliably.

## What is tested

```text
Free-form Mission Discovery
Research before asking
Fact / hypothesis / contradictory-evidence separation
Canonical Tracker discipline
Mandatory dedup
Discovery versus qualification separation
Discovery Diversity Check
Business-role verification
Evidence-backed qualification
Mandatory skeptical Prospect Audit
Batch-review checkpoints
Commercial fit versus contact-route separation
Explicit stop / mission-revision behavior
Cross-session handoff continuity
```

The point is not whether the LLM knows these practices.

The point is whether it actually performs the required controls consistently.

## Use

Read:

`docs/12_LLM_CONFORMANCE.md`

Then record results with:

`templates/LLM_CONFORMANCE_SCORECARD.md`

For auditable research runs, also use:

`templates/EXECUTION_LOG.md`

## Important distinction

A missing tool is not automatically a conformance failure.

```text
No web research capability
→ capability limitation

Invents a company role instead of admitting evidence is unavailable
→ conformance failure
```

Likewise:

```text
Model could have deduplicated the company but skipped the required dedup gate
→ conformance failure

Model found one plausible ICP and never tested a materially different route despite ambiguous mission evidence
→ Discovery Diversity conformance failure
```

The standard evaluates process behavior, not exact phrasing.

Formal message review, sending, mailbox monitoring, reply classification, and follow-up are outside the public conformance standard.
