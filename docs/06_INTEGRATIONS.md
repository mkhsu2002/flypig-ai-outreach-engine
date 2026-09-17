# 06 Integrations

The Open Core can run with only a capable LLM and current web research.

Integrations are optional and should support research quality, state continuity, and review consistency rather than external sending.

## Web research

Used for:

1. Mission context
2. Prospect discovery
3. Discovery Diversity testing
4. Account research
5. Business-role verification
6. Counter-evidence research
7. Contact-route verification
8. Evidence refresh

Research outputs should retain source references and distinguish current evidence from assumptions.

## Shared files

Useful for:

```text
Company background
Product information
Approved proof points
Market notes
Existing prospect lists
Excluded organizations
Internal constraints
```

Avoid exposing confidential files to tools that do not need them.

## Google Sheets, spreadsheet, or CRM

Google Sheets is the recommended Tracker surface when connected. Local CSV is the default when no connected spreadsheet is available.

Useful persistent fields include:

```text
Prospect identity / aliases
Dedup status
Business role
Evidence
Contradictory evidence
Qualification status
Audit result
Contact-policy status
Contact-route status
Mission version
Discovery Diversity status
Key uncertainty
Next research action
```

The data model should align with `schemas/prospect.schema.yaml` and `schemas/campaign.schema.yaml` where useful.

## Cross-session / cross-agent handoff

A campaign may move between ChatGPT, another LLM, OpenClaw, Hermes Agents, or another environment.

Use `schemas/handoff.schema.yaml` to preserve:

```text
Canonical Tracker location
Mission version
Discovery Diversity result
Evidence and counter-evidence
User decisions
Current stage
Next best action
```

## Mailbox integrations

Gmail, Outlook, SMTP, and reply-monitoring connectors are not required by the public Core.

Formal message preparation, sending, mailbox monitoring, reply classification, and controlled follow-up are outside this repository's public scope.

## Integration principle

Do not add an integration merely because it exists.

Use tools when they improve:

```text
Evidence quality
Research coverage
Canonical state continuity
Deduplication
Audit consistency
Contact-route verification
Human review
```

The Open Core should remain usable without a proprietary integration stack.
