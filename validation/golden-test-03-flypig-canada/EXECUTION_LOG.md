# Golden Test 03 — FlyPig AI Promotes FlyPig AI Outreach Engine

Date: 2026-09-17
Run ID: GT03-FLYPIG-CA
Run type: GOLDEN TEST / self-dogfooding
Execution mode: single LLM agent with web research
Tracker: Local CSV (default)

## Test objective

Use FlyPig AI Outreach Engine to identify real Canadian organizations that are plausible early users, practitioners, implementation partners, or multipliers for the open-source FlyPig AI Outreach Engine itself.

Unlike Test 01 and Test 02, there is no established channel taxonomy.

The central question is:

> Can the process infer a useful ICP from the product's workflow value rather than simply search for companies in a predefined category?

## Product definition used

FlyPig AI Outreach Engine is treated as an open-source LLM-native Skill system for disciplined prospect research and qualification, producing a persistent Qualified Prospect Tracker with mandatory deduplication, evidence checks, skeptical Prospect Audit, batch review and stop conditions, usable by one capable LLM without a proprietary runtime.

## Mission v1 — pre-registered before discovery

MISSION_STATUS: PARTIALLY_READY

Initial model:
`BROAD_ADOPTER_DISCOVERY`

Initial target hypotheses:
1. Canadian businesses doing international business development
2. outsourced sales / lead-generation firms
3. market-entry and export consultancies
4. AI automation / CRM implementation firms
5. public or institutional export-support organizations

Initial value hypothesis:
Organizations that repeatedly research markets, build prospect lists, qualify accounts, or automate sales workflows may benefit from a reusable open process that makes LLM prospect research more disciplined and auditable.

## Mandatory process controls

- [x] One canonical Tracker
- [x] Dedup / related-brand check before row creation
- [x] Current public evidence before qualification
- [x] Fact / hypothesis / counter-evidence separation
- [x] Every QUALIFIED record receives Prospect Audit
- [x] Audit attempts to falsify the adoption hypothesis
- [x] Batch review after every five researched prospects
- [x] Practical outreachability separated from conceptual usefulness
- [x] Mission revision allowed when ICP evidence changes
- [x] Explicit stop condition
- [x] No guessed private contact data

## Discovery query log

DQ-01 `Canada outsourced sales agency B2B business development market entry consulting`
DQ-02 `Canada export market entry consulting international sales agency B2B`
DQ-03 `Canada AI automation consulting SMB sales automation agency`
DQ-04 `Canada fractional sales business development agency outbound B2B`
DQ-05 `Canada outsourced sales company fractional sales team B2B lead generation agency`
DQ-06 `Canada international business development consulting market entry sales agency`
DQ-07 `Canada go to market consulting international expansion business development agency`
DQ-08 `Canada export consulting market entry distributor search agency`
DQ-09 `Canada fractional CRO sales consulting outbound prospecting`
DQ-10 `Canada AI sales automation consulting agency CRM sales copilot`
DQ-11 `Canada AI automation consultancy sales lead qualification CRM automation`
DQ-12 targeted official-site checks for candidate services and contact routes

## Discovery universe

27 material candidate identities were recorded.

One important dedup / related-identity case appeared across two public consulting web properties. They shared public contact identity and materially overlapping service descriptions. For prospecting purposes they were treated as one canonical outreach record, while the exact legal relationship was left as an uncertainty rather than asserted as fact.

After this merge:
- 26 canonical candidate records
- 20 promoted into the full research set
- 6 deferred because they were weaker generic automation firms, lower-signal business consultancies, or adjacent service providers

## Discovery checkpoint — ICP problem

Two multiplier archetypes dominated:

### Archetype A — direct workflow practitioners

These firms repeatedly perform market-entry research, target-account research, territory/vertical research, partner matching, outsourced prospecting, list building, and qualification.

### Archetype B — implementation multipliers

These firms already implement AI agents, CRM workflows, lead qualification, sales copilots, outbound/follow-up automation, guarded human approval, and CRM dedup/validation.

The strongest adoption hypothesis became:

> A service provider that repeatedly performs prospect research, or an AI/CRM implementer that can embed the Skill in client work, has more immediate leverage from the Open Core than a random end-user SMB.

## Mission revision

MISSION_VERSION: v1 → v2

New model:
`SERVICE_MULTIPLIER_FIRST`

Priority segment 1: Market-entry, outsourced sales, lead-generation, and international BD consultancies.

Priority segment 2: AI/CRM automation consultancies with explicit sales, lead, CRM or outreach workflow delivery.

Deprioritized: generic SMBs, AI consultancies with no visible sales/research workflow, and public institutions where practical adoption authority/procurement is unclear.

## Batch 1 — P001 to P005

All five initial prospects were QUALIFIED and received AUDIT_PASS.

Key finding: highest-fit market-entry firms do not need a lead database; FlyPig value should be framed as repeatable research workflow, evidence discipline, Tracker persistence, and skeptical review.

P004 demonstrated that one operator can appear through multiple domains/brands. Canonicalization avoided duplicate outreach.

## Batch 2 — P006 to P010

Prospect Audit:
- P006 AUDIT_PASS
- P007 AUDIT_PASS
- P008 DOWNGRADE_SECONDARY
- P009 AUDIT_PASS
- P010 DOWNGRADE_SECONDARY

P008 downgrade: strong commercial leadership, but public positioning is more CPG/GTM management than repeatable evidence-grounded prospect research.

P010 downgrade: international expansion plus digital transformation is too broad a signal without direct evidence of prospect-list/partner research workflow.

## Batch 3 — P011 to P015

Critical finding:
`AI consultancy` is not an ICP by itself.

Relevant implementation signal includes CRM/sales workflow work, lead qualification, outreach/follow-up, sales copilots, and customer/prospect data enrichment.

Prospect Audit:
- P011 DOWNGRADE_SECONDARY
- P012 DOWNGRADE_SECONDARY
- P013 AUDIT_PASS
- P014 AUDIT_PASS
- P015 AUDIT_PASS

## Batch 4 — P016 to P020

Prospect Audit:
- P016 AUDIT_PASS
- P017 AUDIT_PASS
- P018 DOWNGRADE_SECONDARY

P019 and P020 were PASS because conceptual usefulness did not equal practical early-outreach fit; institutional governance and procurement paths differed materially from private founder-led prospects.

Decision: STOP_DISCOVERY.

## Prospect Audit summary

Initial QUALIFIED before audit: 18
AUDIT_PASS: 13
DOWNGRADE_SECONDARY: 5
PASS before audit: 2

Final:
- 13 QUALIFIED / SHORTLIST_READY
- 5 SECONDARY
- 2 PASS

## Contact Verification

All 13 final qualified prospects had a supportable official business route such as founder/business email, business inquiry form, consultation form, or official contact channel.

No private email pattern was guessed.

## Stop condition

The research set had established both high-value ICP archetypes and later discovery increasingly returned generic AI agencies or generic business consultancies that did not add a new archetype.

## Human intervention log

No prospect-level human correction was used.

The user supplied the product target: FlyPig AI Outreach Engine.

The market, ICP hypotheses, Mission Revision and prospect decisions were generated by the single-agent workflow.

## What Test 03 demonstrated

1. The system can infer an ICP when no channel taxonomy is given.
2. It can revise from broad end-user discovery to a multiplier-first launch strategy.
3. It does not equate "AI company" with product fit.
4. It does not equate "could benefit" with "practical outreach prospect."
5. Dedup can apply across related domains/brands, not just identical company names.
6. Prospect Audit materially changed five initial qualification decisions.
7. FlyPig successfully dogfooded its own Open Core.
