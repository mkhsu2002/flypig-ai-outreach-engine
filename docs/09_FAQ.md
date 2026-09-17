# 09 FAQ

## What does the Open Core actually do?

It helps a capable LLM turn a business-development goal into a researched, evidence-backed Qualified Prospect Tracker.

The workflow is:

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

## Why use this if ChatGPT can already research prospects?

Because the project does not claim that ChatGPT or another capable LLM is unable to do the work.

A naked-LLM control run produced a strong result.

FlyPig's purpose is to make critical behaviors required rather than optional across a long task:

```text
Dedup
Evidence checks
Fact / hypothesis separation
Diversity checks
Skeptical audit
Batch review
Mission revision
Persistent rejected records
Contact-policy checks
Stop conditions
```

See `validation/control-test-03-naked-llm/COMPARISON.md`.

## Do I need multiple AI agents?

No.

One capable LLM is the default operating model.

The Skills define responsibility boundaries. The same model may execute them sequentially.

## Do I need an API or FlyPig runtime?

No.

The primary operating model is direct LLM cowork.

## Do I need to know how to code?

No.

Start with `QUICK_START.md` or `prompts/START_HERE.md`.

## Do I have to fill in a campaign form first?

No.

Mission Discovery starts from free-form business intent.

The LLM should research public facts before asking you to supply them and ask only questions that materially change the direction.

## What if I do not know what type of partner or customer I need?

That is a normal use case.

The system can treat your initial model as a hypothesis, research the market, run a Discovery Diversity Check, and revise the Mission when current evidence indicates a stronger route.

## What does the Tracker use?

At the start, the LLM should offer:

```text
Google Sheets  recommended when connected
Local CSV      default
Other          optional
```

If you do not choose, local CSV is the default.

## Is this just a lead scraper?

No.

Discovery is only one stage.

A prospect must pass account research, qualification, skeptical Prospect Audit, and contact verification before reaching `SHORTLIST_READY`.

## What makes a prospect `QUALIFIED`?

A qualified prospect has enough evidence and commercial logic to justify skeptical Audit.

Typical dimensions include:

```text
Market relevance
Business-role fit
Offer / category fit
Commercial plausibility
Evidence confidence
Constraint fit
```

`QUALIFIED` is not the final shortlist state.

## Why keep PASS and SECONDARY records?

Because rejected research is still useful memory.

Keeping it prevents the same weak companies from being rediscovered and re-evaluated in later sessions.

## What is Prospect Audit?

Every QUALIFIED prospect is reviewed again under a different stance:

```text
Assume the previous qualification may be wrong.
What evidence would break it?
```

Only `AUDIT_PASS` may proceed to final shortlist completion.

## Does the Open Core write or send emails?

No.

Formal outreach strategy, message preparation, sending, mailbox monitoring, reply classification, and follow-up are outside the public boundary.

## What is paid if the prospect research engine is open source?

The primary commercial boundary begins after the Qualified Prospect Tracker.

FlyPig Controlled Outreach may add:

```text
Account-specific outreach strategy
Message preparation
Independent pre-send review
Exact message-version approval
Final pre-send checks
Authorized sending
Confirmed send-state tracking
Reply monitoring
Reply classification
Bounce / opt-out handling
Controlled follow-up
Execution audit history
```

## What about Knowledge Packs?

Knowledge Packs are optional intelligence overlays.

They are not the main Free / Paid boundary.

They are most valuable when they contain defensible information beyond generic LLM knowledge, such as private evaluation cases, repeated failure patterns, outcome-backed calibration, or market-specific source intelligence.

## Can I use the Open Core commercially?

The public Core is licensed under Apache License 2.0. Review `LICENSE`, `NOTICE`, and `TRADEMARKS.md` for the exact terms and brand boundary.

## Can I use it for distribution, B2B, partnerships, licensing, or media research?

Yes.

The core process is intentionally general. The organization types and evidence standards change by mission, but the discipline—discovery, dedup, research, qualification, audit, contact verification, and persistent state—remains reusable.

## Does the engine guarantee a reply or sale?

No.

`SHORTLIST_READY` means the account is evidence-backed and worth considering for the current mission. It does not mean interest, reply, meeting, or revenue is guaranteed.
