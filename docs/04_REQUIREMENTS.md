# 04 Requirements

FlyPig AI Outreach Engine does not require one specific AI vendor.

The public Core is designed for prospect research and qualification.

## Minimum environment

You need:

1. A capable LLM or agent
2. Current web research capability
3. Your company / product / offer context
4. Enough state continuity to preserve the mission and canonical Tracker during the run

A proprietary FlyPig runtime is not required.

## Canonical Tracker requirement

The workflow requires one canonical Qualified Prospect Tracker logically, even when the current environment cannot directly create a spreadsheet file.

Preferred storage:

```text
Google Sheets  recommended when connected
Local CSV      default
Other          optional
```

If the environment cannot write files, the LLM should still maintain and return rows using the fields in:

`templates/PROSPECT_TRACKER.csv`

The user may save or synchronize those rows later.

Do not create disconnected lists for each research batch.

## No API requirement

You do not need a FlyPig API.

You do not need to build custom software.

The Skills can be read and operated directly inside a compatible LLM environment.

## No mailbox requirement for the Open Core

The public Core does not require Gmail, Outlook, SMTP, or another sending tool because it stops before formal outreach execution.

## Business inputs

You can start with incomplete context.

Useful information includes:

```text
Company or website
Product or service
Target market or region
Business objective
Known exclusions
Existing target ideas
Important private constraints
```

Mission Discovery fills gaps through research and selective questioning.

## Recommended first-batch conditions

```text
Batch size: about 5 strong research candidates before review
Dedup: required before canonical insertion
Discovery Diversity Check: required before premature convergence when alternative routes are plausible
Evidence: required for material role / fit claims
Discovery separated from qualification
QUALIFIED followed by mandatory Prospect Audit
Private email guessing: prohibited
Weak or ambiguous prospects: secondary, hold, or pass
Mission assumptions: revisable
Batch review: after every 5 newly researched prospects by default
Stop reason: required when discovery ends
```

## Research tools

The LLM should be able to inspect current public information relevant to:

```text
Company identity
Business role
Product / category fit
Market presence
Partner or channel behavior
Alternative market-entry or adoption paths
Official professional contact routes
Published inquiry restrictions
```

## Data hygiene

Do not place secrets or unnecessary personal data into public repositories, prompts, issue threads, or logs.

Keep confidential customer material and unnecessary prospect-level detail outside the public repository.

## Commercial boundary

Sending, mailbox monitoring, reply classification, controlled follow-up, and execution audit are outside the Open Core.
