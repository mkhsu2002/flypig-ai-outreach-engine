# Validation

This directory contains public validation runs for FlyPig AI Outreach Engine Open Core.

The purpose is to show how the Skills behave on real research tasks, not just describe the methodology.

## Privacy model

Validation cases may use real current public business data.

Public Golden Test artifacts mask organization names, domains, and contact details when appropriate. Unmasked verification records may be retained privately for audit.

The naked-LLM control preserves named public organizations because its purpose is to keep the original control output faithful. It contains only current public professional information.

## Golden Test 01 v1 — Functional Run

Path:

`validation/golden-test-01-japan-outdoor/`

This first run established that the Open Core could turn a Japan market-entry objective into a persistent prospect Tracker using real organizations and public evidence.

Result:

```text
17 researched candidates
10 QUALIFIED
3 SECONDARY
1 HOLD
3 PASS
```

The run exposed process weaknesses that became improvements, especially the need to separate commercial fit from contact-route suitability and to make skeptical review mandatory.

## Golden Test 01 v2 — Strengthened Single-Agent Regression

Path:

`validation/golden-test-01-japan-outdoor-v2/`

Goal:

Test whether one capable LLM can execute a more disciplined process when FlyPig makes deduplication, evidence checks, skeptical audit, batch review, and stop conditions mandatory.

This is explicitly a regression / process-validation run, not a blind benchmark. The model/operator had already seen the v1 case.

Results:

```text
44 material candidate mentions observed
10 duplicate mentions merged
34 unique canonical candidates
20 fully researched
15 QUALIFIED before audit
12 AUDIT_PASS
3 audit downgrades to SECONDARY
12 final QUALIFIED / SHORTLIST_READY
6 SECONDARY
2 PASS
1 qualified prospect with a public route marked DO_NOT_USE
```

The mandatory audit changed three initial qualification decisions, while the contact-policy gate preserved one strong commercial prospect as QUALIFIED even though its visible public form could not appropriately be used for solicitation.

Public artifacts:

```text
EXECUTION_LOG.md
QUALIFIED_PROSPECT_TRACKER.csv
CASE_STUDY.md
```

## Golden Test 02 — Germany Industrial Water Monitoring

Path:

`validation/golden-test-02-germany-water/`

Goal:

Test whether the same single-agent process can challenge the user's original route-to-market assumption rather than merely automate it.

Starting hypothesis:

```text
DISTRIBUTOR_FIRST
```

Discovery repeatedly surfaced multi-brand instrumentation distributor/integrators, water/wastewater automation system integrators, and turnkey water/process-water engineering firms.

The mission changed:

```text
Mission v1: DISTRIBUTOR_FIRST
→
Mission v2: CHANNEL_PLUS_INTEGRATION
```

Results:

```text
42 canonical organizations in discovery scratch universe
20 fully researched
12 QUALIFIED before audit
7 AUDIT_PASS
5 audit downgrades to SECONDARY
7 final QUALIFIED / SHORTLIST_READY
7 SECONDARY
6 PASS
```

High-keyword-overlap water-analysis manufacturers were still rejected when their actual business role conflicted with the partner mission.

## Golden Test 03 — FlyPig Uses FlyPig

Path:

`validation/golden-test-03-flypig-canada/`

Goal:

Test whether the engine can infer a useful ICP when there is no predefined channel taxonomy and the product being promoted is the Open Core itself.

Starting model:

```text
BROAD_ADOPTER_DISCOVERY
```

Discovery found two higher-leverage groups:

```text
Direct workflow practitioners
→ market-entry, outsourced sales, lead-generation, partner-matching firms

Implementation multipliers
→ AI/CRM consultancies with sales, lead qualification, CRM or outreach workflow delivery
```

The mission changed:

```text
Mission v1: BROAD_ADOPTER_DISCOVERY
→
Mission v2: SERVICE_MULTIPLIER_FIRST
```

Results:

```text
27 material candidate identities observed
1 related-brand/operator dedup case merged
26 canonical candidate records
20 fully researched
18 QUALIFIED before audit
13 AUDIT_PASS
5 audit downgrades to SECONDARY
13 final QUALIFIED / SHORTLIST_READY
5 SECONDARY
2 PASS
```

The Audit rejected the assumption that every AI consultancy is automatically a strong fit.

## Naked LLM Control — Test 03

Path:

`validation/control-test-03-naked-llm/`

A fresh GPT-5.6 Sol session received the same underlying business problem but was explicitly prohibited from reading FlyPig Skills, schemas, examples, Golden Tests, or methodology until its substantive business answer was complete.

It used normal web research and its own best judgment.

The result was strong.

The control:

- formed a credible multiplier strategy;
- produced a useful 15-prospect set;
- naturally deprioritized several competitive AI-outbound vendors;
- identified accelerators, founder programs, GTM communities, and ecosystem amplification channels that the FlyPig run had explored less aggressively;
- stopped after it judged the first set sufficient.

Its own Execution Notes also record that no formal deduplication procedure, numerical scoring, mandatory skeptical audit, validation framework, or state-transition process was performed.

That is an important result.

The comparison does not show that FlyPig makes the underlying LLM smarter.

It shows that FlyPig turns important behaviors from optional model judgment into required workflow controls.

### What the control taught FlyPig

The control exposed a weakness in the original Golden Test 03 discovery breadth.

The FlyPig run was disciplined, but its search space concentrated heavily on market-entry firms, outsourced sales, and AI/CRM implementers.

The control considered additional indirect adoption paths such as accelerators, training programs, communities, and ecosystem amplifiers.

The Core therefore added a mandatory Discovery Diversity Check before a candidate universe is allowed to converge too early.

This is exactly how validation is intended to work: not to prove the framework always wins, but to find where the process itself should improve.

See:

`validation/control-test-03-naked-llm/COMPARISON.md`

## What validation is trying to establish

FlyPig does not claim that ChatGPT or another capable LLM is unable to research prospects without these Skills.

The validation questions are broader:

```text
Did dedup actually happen?
Was the search space challenged before convergence?
Was evidence checked before qualification?
Were weak initial decisions challenged?
Were PASS / SECONDARY records preserved?
Was contact policy checked separately from business fit?
Did the system review itself during a long run?
Did it revise the mission when repeated evidence contradicted the original model?
Could it infer a useful ICP rather than merely execute a predefined category search?
Did it know when to stop?
Could another session continue from the same persistent state?
```

See `docs/14_PROCESS_RELIABILITY.md`.
