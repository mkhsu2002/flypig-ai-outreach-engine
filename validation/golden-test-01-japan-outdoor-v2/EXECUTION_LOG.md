# Golden Test 01 v2 — Single-Agent Regression Execution Log

Date: 2026-09-17
Run ID: GT01-JP-OUTDOOR-V2
Run type: REGRESSION
Model / environment: GPT-5.6 Sol, single-agent conversation with web research
FlyPig Core commit used at start of run: 21fca23043fa921b54bb2c3360903001679c9a6b
Tracker: Local CSV (default)

## Benchmark limitation

This is not a blind benchmark. The operator and model had already seen the first Golden Test and some candidate identities. This run tests whether the strengthened single-agent process reliably enforces the new gates and corrects known logic weaknesses. It should be treated as a regression / process-validation run.

## Initial user input

Privacy-safe reproduction:

> We are a Canadian outdoor-accessories brand making pack organizers, utility pouches, and lightweight carry accessories. We want to explore Japan. We assume we may need a distributor, but we are not sure. Research real companies and build a qualified prospect tracker. Do not send anything.

## Pre-registered mission — before discovery

MISSION_STATUS: PARTIALLY_READY

Why PARTIALLY_READY:
- The market and broad offer are clear enough for channel research.
- Exact SKU mix, wholesale pricing, margin, logistics, and brand positioning are not defined.
- Therefore the run can qualify channel / organization fit, but cannot claim final sales fit.

Target market: Japan

Target organization hypotheses:
1. Outdoor importers / distributors
2. Outdoor wholesalers / agency businesses
3. Market-entry partners able to execute sales or import distribution
4. Adjacent EDC / carry importers when product-category overlap is strong

Explicit exclusions:
- Pure retailers with no supportable import / wholesale role
- Own-brand / OEM suppliers when no evidence shows foreign-brand representation
- Category-mismatched importers
- Search-directory entries that cannot be tied to a verified operating company

Critical rule:
Commercial fit and contact-route suitability are separate decisions.

## Pre-registered process controls

- [x] One canonical Tracker
- [x] Dedup before insertion
- [x] Search snippets not accepted as qualification evidence
- [x] Facts / hypotheses / contradictory evidence separated
- [x] QUALIFIED requires Prospect Audit
- [x] Prospect Audit tries to falsify the prior decision
- [x] Batch review after every five fully researched prospects
- [x] Contact policy does not overwrite commercial qualification
- [x] No guessed private contact data
- [x] Stop condition must be recorded

## Discovery query log

### DQ-01
Query: `Japan outdoor importer distributor overseas brands`
Purpose: broad English discovery of importer/distributor roles.

### DQ-02
Query: `アウトドア 輸入 代理店 海外ブランド 日本`
Purpose: discover companies described in Japanese as import agents / overseas-brand representatives.

### DQ-03
Query: `アウトドア 卸売 輸入 商社 ブランド 日本`
Purpose: surface wholesalers and trading companies.

### DQ-04
Query: `outdoor brands Japan import agency distributor`
Purpose: cross-check English-language market-entry and import-agency pages.

### DQ-05
Query: `海外アウトドアブランド 日本 総代理店 輸入 卸`
Purpose: discover exclusive agents and wholesale operators.

### DQ-06
Query: `海外 アウトドア ブランド 正規輸入代理店 会社`
Purpose: narrow to authorized outdoor import agents.

### DQ-07
Query: `アウトドア ブランド 輸入 卸 株式会社 日本`
Purpose: find corporate pages describing import / wholesale operations.

### DQ-08
Query: `アウトドア用品 輸入 販売 卸会社`
Purpose: widen to accessory and gear importers.

### DQ-09
Query: `アウトドア 輸入代理店 ブランド 会社概要`
Purpose: bias toward official company/profile pages.

### DQ-10
Query: `アウトドア用品 輸入卸 ブランド一覧`
Purpose: find companies with current third-party brand portfolios.

### DQ-11
Query: `アウトドア 正規輸入総代理店 MSR TATONKA 日本`
Purpose: discover additional established official importers via known category terms.

### DQ-12
Query: `アウトドア 輸入販売 株式会社 ブランド 正規代理店`
Purpose: broaden established importer set.

### DQ-13
Query: `海外アウトドアブランド 輸入販売 会社 日本 アウトドアショップ`
Purpose: find importers with retail/wholesale distribution evidence.

### DQ-14
Query: `アウトドア 卸売 正規代理店 全国 店舗 輸入`
Purpose: find companies with nationwide wholesale/store networks.

Discovery accounting:
- Material candidate mentions observed across discovery results: 44
- Duplicate mentions merged into existing identities: 10
- Unique canonical candidates after immediate dedup: 34
- Candidates promoted to the full research set: 20
- Other candidates were deferred/excluded because of weak category signal, generic market-entry scope, retailer/manufacturer mismatch, or because the 20-company regression batch was already sufficient.

Important: rediscovered companies were merged into existing records rather than added as duplicate rows.

## Batch 1 — P001 to P005

Research focus:
- Verify legal identity / official domain
- Confirm current import / wholesale role
- Confirm current third-party brand evidence
- Separate business fit from public contact route

Result:
- P001 QUALIFIED
- P002 QUALIFIED
- P003 QUALIFIED
- P004 QUALIFIED
- P005 QUALIFIED

### Checkpoint BR-01

Duplicate leakage: none after canonical-domain/name checks.
Role drift: none.
Evidence weakness: public contact pages for P001/P002/P005 were more consumer/dealer-oriented than supplier-oriented.
Decision: CONTINUE.
Corrective rule reinforced: route suitability must remain separate from qualification.

## Batch 2 — P006 to P010

Result before audit:
- P006 QUALIFIED
- P007 QUALIFIED
- P008 QUALIFIED
- P009 QUALIFIED
- P010 QUALIFIED

Material finding:
P006 had strong wholesale/agency evidence, but its public form explicitly prohibited sales/solicitation use.

Old-v1 failure mode:
A system could incorrectly convert that into PASS.

v2 decision:
- Commercial qualification remained QUALIFIED.
- Audit passed the business-role decision.
- Contact policy was separately set to PROHIBIT_SOLICITATION.
- Route state became DO_NOT_USE.
- Prospect remains useful in the qualified Tracker with a warning not to use that public form.

### Checkpoint BR-02

Role drift: none.
Repeated weakness: contact forms are often customer/dealer-facing rather than supplier-facing.
Mission impact: none.
Decision: CONTINUE.
Corrective action: continue recording route policy independently.

## Batch 3 — P011 to P015

Qualification before audit:
- P011 QUALIFIED — market-entry / sales agency / import-distribution model
- P012 QUALIFIED
- P013 SECONDARY
- P014 QUALIFIED
- P015 SECONDARY

Material mission insight:
P011 is not a conventional distributor, but official evidence shows it can execute market entry, sales agency, and import/distribution for overseas outdoor brands.

Decision:
Do not force every valid path into the distributor label. Preserve `market-entry / sales agency / import-distribution partner` as a legitimate organization type.

Audit outcome:
- P011 AUDIT_PASS
- P012 DOWNGRADE_SECONDARY
- P014 AUDIT_PASS

Why P012 was downgraded:
The importer/wholesale role is genuine, but current public evidence showed a narrower brand set and less demonstrated distribution depth than first-tier prospects.

### Checkpoint BR-03

New organization type: market-entry execution partner.
Mission impact: expands valid channel model without changing the market objective.
Qualification drift: caught and corrected on P012.
Decision: CONTINUE.

## Batch 4 — P016 to P020

Qualification before audit:
- P016 QUALIFIED
- P017 QUALIFIED
- P018 SECONDARY
- P019 PASS
- P020 PASS

Audit outcomes:
- P016 DOWNGRADE_SECONDARY
- P017 DOWNGRADE_SECONDARY

P016 correction:
Business model aligns well, but the company was established in 2026 and public evidence did not yet demonstrate mature distribution reach.

P017 correction:
The company genuinely imports/wholesales overseas brands and has outdoor/sports activity, but it is a broad generalist with limited evidence of specialist outdoor-channel depth.

P019 PASS:
Own-brand wholesale/OEM/import-service capability is strong, but it is a different partner type from the active foreign-brand distribution mission.

P020 PASS:
Strong import/wholesale capabilities, but current public evidence is casual-fashion focused rather than outdoor accessories.

### Checkpoint BR-04

Pattern found:
Broad import capability alone is not enough.
A company can be commercially capable but still fail the active category / relationship mission.

Decision: STOP_DISCOVERY.

## Stop decision

STOP_REASON:
The 20-company research set produced enough role diversity to test the strengthened workflow. Additional broad searches were increasingly yielding adjacent general importers, category-mismatched operators, and companies already represented by the current role types.

Evidence for stopping:
- 34 unique canonical candidates had already been identified during discovery.
- 20 were fully researched.
- Four batch-review checkpoints produced no unresolved mission-level contradiction.
- The last batch primarily tested edge cases rather than adding a new core organization type.

## Prospect Audit summary

Qualified before audit: 15

AUDIT_PASS: 12
AUDIT_DOWNGRADE_SECONDARY: 3
RESEARCH_REPAIR: 0
DUPLICATE_MERGE during audit: 0

The three downgrades were caused by specific gaps:
1. limited demonstrated distribution depth,
2. very new operating history / unproven reach,
3. broad generalist import capability without specialist outdoor depth.

## Final result

- Raw candidate mentions observed: 44
- Unique canonical candidates after dedup: 34
- Full research set: 20
- Qualified before audit: 15
- Audit pass: 12
- Audit downgrade to secondary: 3
- Final QUALIFIED / SHORTLIST_READY: 12
- SECONDARY: 6
- PASS: 2
- Public routes marked DO_NOT_USE: 1
- Qualified prospects with unresolved supplier-side route: 2

## Human intervention log

No prospect-level human correction was used during the run.
The operator provided only the overall instruction to strengthen the process and rerun Test 01.

## What the strengthened process actually changed

1. Qualification no longer means final shortlist entry.
2. Every qualified prospect received a skeptical audit pass.
3. Three initial QUALIFIED decisions were downgraded.
4. One strong prospect was retained as QUALIFIED even though its public contact form is DO_NOT_USE.
5. PASS records were preserved rather than deleted.
6. Duplicates from repeated search queries were merged into canonical identities.
7. Batch review explicitly checked drift after every five researched prospects.
8. The run stopped because marginal discovery value declined, not because an arbitrary target count was reached.

## Post-run integrity check

After the regression run, a schema-consistency check found that the three Audit downgrades had correctly moved their `state` to `secondary`, but the first exported Tracker still retained the pre-audit value `qualification_status: qualified`.

This was a Tracker semantics bug, not a prospect-research judgment error.

Correction applied:
- `qualification_status` now always represents the currently effective status after completed gates.
- `audit_result: downgrade_secondary` preserves the historical transition from QUALIFIED to SECONDARY.
- The Prospect Audit Skill and prospect schema were updated so future runs must write both fields consistently.
- The published v2 Tracker was corrected for P012, P016, and P017.

This correction is intentionally preserved in the Execution Log because validation should expose process/schema failures rather than silently clean them up.

## Single-agent limitation

The audit is still performed by the same underlying LLM, so it is not statistically independent review. The improvement comes from mandatory role separation, explicit falsification instructions, state gates, and persisted evidence—not from pretending the same model becomes a second independent reviewer.

For a stronger future benchmark, run the same case against an unconstrained control prompt and compare omission/error rates across repeated runs.
