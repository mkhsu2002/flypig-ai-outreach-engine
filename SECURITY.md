# Security and Privacy Policy

## Supported version

The current release line is supported for security and privacy-related fixes.

Current version: 0.1.x

## Public Core scope

FlyPig AI Outreach Engine Open Core performs prospect research and qualification.

It does not include message sending, mailbox monitoring, reply automation, or controlled follow-up.

Security issues for downstream commercial or third-party execution layers should be reported to the operator of those systems.

## What to report

Please report issues that could expose or misuse:

1. Credentials or API keys
2. Private campaign or customer data
3. Unnecessary private prospect information
4. Data leakage between campaigns or Tracker records
5. Unsafe connected-file or spreadsheet permissions
6. Prompt-injection paths that could corrupt research state or exfiltrate connected data
7. Dedup/state failures that could merge unrelated organizations or overwrite the wrong prospect
8. Handoff behavior that exposes confidential context unexpectedly
9. Repository content that accidentally publishes private verification data intended to remain private

## Reporting guidance

Do not publish exploit details, credentials, private contact data, or real customer records in a public issue.

If no private security-reporting channel is configured yet, open a minimal public issue stating that you have a security concern and request a private contact route. Do not include sensitive details.

## Safe defaults

Implementations should:

1. Minimize stored personal data
2. Prefer official public business information
3. Never guess private contact information
4. Preserve separation between verified facts and model inference
5. Limit tool permissions to what the research task actually requires
6. Keep secrets out of prompts, logs, repositories, and issue threads
7. Preserve Tracker and handoff state carefully across sessions
8. Treat public validation artifacts as privacy-reviewed outputs rather than raw private campaign dumps

## Validation privacy

Public Golden Tests may use real current public business information while masking prospect identifiers when appropriate.

Unmasked verification material should remain outside the public repository when it contains unnecessary prospect-level detail.

The naked-LLM control preserves public organization identities because fidelity to the original control output is part of the experiment; it should still contain only public professional information.

## Scope boundary

Commercial Controlled Outreach deployments and third-party integrations may have additional security requirements around email credentials, approval, sending, mailbox access, opt-outs, and execution audit.

Those systems are outside the Open Core security scope and should maintain their own operational controls.
