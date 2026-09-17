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

FlyPig AI Outreach Engine is treated as:

- an open-source LLM-native Skill system,
- for disciplined prospect research and qualification,
- producing a persistent Qualified Prospect Tracker,
- with mandatory deduplication, evidence checks, skeptical Prospect Audit, batch review and stop conditions,
- usable by one capable LLM without a proprietary runtime.

The test does not assume that the best targets are software buyers.

Possible relationship hypotheses include:
- direct practitioner / adopter,
- consulting-service user,
- implementation partner,
- AI/CRM workflow integrator,
- market-entry / outsourced-sales multiplier.

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

Important uncertainty:
The product is open-source and workflow-native. The best early target may be a service multiplier rather than a conventional end-business buyer.

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

Deferred examples included:
- inbound-only automation studios,
- generic small-business AI consultancies with no sales/research specialization,
- Canadian-market activation firms focused more on incorporation/operations,
- lead-prequalification products focused mainly on inbound leads.

## Discovery checkpoint — ICP problem

The strongest repeated patterns were not generic SMEs.

Two multiplier archetypes dominated:

### Archetype A — direct workflow practitioners

These firms repeatedly perform:
- market-entry research,
- target-account research,
- territory/vertical research,
- partner matching,
- outsourced prospecting,
- list building,
- qualification.

### Archetype B — implementation multipliers

These firms already implement:
- AI agents,
- CRM workflows,
- lead qualification,
- sales copilots,
- outbound/follow-up automation,
- guarded human approval,
- CRM dedup/validation.

The strongest adoption hypothesis became:

> A service provider that repeatedly performs prospect research, or an AI/CRM implementer that can embed the Skill in client work, has more immediate leverage from the Open Core than a random end-user SMB.

## Mission revision

MISSION_VERSION: v1 → v2

New model:
`SERVICE_MULTIPLIER_FIRST`

Priority segment 1:
Market-entry, outsourced sales, lead-generation, and international BD consultancies.

Priority segment 2:
AI/CRM automation consultancies with explicit sales, lead, CRM or outreach workflow delivery.

Deprioritized for launch:
- generic SMBs with only occasional prospecting needs,
- AI consultancies with no visible sales/research workflow,
- public institutions where practical adoption authority/procurement is unclear.

This does not mean those groups cannot benefit. It means they are lower-priority first-wave outreach prospects.

## Batch 1 — P001 to P005

P001 — initial QUALIFIED
Outsourced B2B sales firm with prospecting, lead generation, territory/vertical research and sales-playbook work.

P002 — initial QUALIFIED
International market-entry/GTM advisory with market reality checks, partnerships and early pipeline execution.

P003 — initial QUALIFIED
Founder-led, research-first Canada market-entry consultancy.

P004 — initial QUALIFIED
Related market-expansion / AI consulting brand ecosystem; duplicate/related-identity check merged multiple public surfaces into one canonical prospect.

P005 — initial QUALIFIED
Market-entry operator with explicit channel mapping, business-development materials and channel follow-up.

### Batch Review BR-01

Finding:
The highest-fit market-entry firms do not need a "lead database." They already sell judgment.

FlyPig value must therefore be framed as:
- repeatable research workflow,
- evidence discipline,
- Tracker persistence,
- skeptical review,
not as "AI that finds leads."

Dedup finding:
P004 demonstrated that a single operator can appear through multiple domains/brands. Canonicalization avoided duplicate outreach.

Prospect Audit:
- P001 AUDIT_PASS
- P002 AUDIT_PASS
- P003 AUDIT_PASS
- P004 AUDIT_PASS
- P005 AUDIT_PASS

Decision: CONTINUE.

## Batch 2 — P006 to P010

P006 — initial QUALIFIED
International expansion consultancy with market research and partner identification.

P007 — initial QUALIFIED
Trade advisory with explicit strategic partner matching.

P008 — initial QUALIFIED
GTM / fractional commercial leadership practice.

P009 — initial QUALIFIED
Outsourced lead-generation firm covering account selection through booked meetings.

P010 — initial QUALIFIED
Broad SME strategy/digital-transformation/international-expansion consultancy.

### Batch Review BR-02

The group split into two levels:
- firms with repeated prospect/partner research as core delivery,
- firms where market expansion is present but prospect research is less explicit.

Prospect Audit:
- P006 AUDIT_PASS
- P007 AUDIT_PASS
- P008 DOWNGRADE_SECONDARY
- P009 AUDIT_PASS
- P010 DOWNGRADE_SECONDARY

P008 downgrade:
Strong commercial leadership, but the public value proposition is more CPG/GTM management than repeatable evidence-grounded prospect research.

P010 downgrade:
International expansion plus digital transformation is too broad a signal without direct evidence of prospect-list/partner research workflow.

Decision: CONTINUE.

## Batch 3 — P011 to P015

P011 — initial QUALIFIED
AI consultancy with training, custom systems and workflow automation.

P012 — initial QUALIFIED
AI/automation/digital-transformation implementation company.

P013 — initial QUALIFIED
AI agency with explicit CRM & Sales Copilots.

P014 — initial QUALIFIED
AI consultancy explicitly teaching agentic workflows, lead qualification and follow-up automation.

P015 — initial QUALIFIED
AI consultancy with Customer & Sales Automation and CRM enrichment.

### Batch Review BR-03

Critical finding:
`AI consultancy` is not an ICP by itself.

The relevant implementation signal is:
- CRM/sales workflow work,
- lead qualification,
- outreach/follow-up,
- sales copilots,
- customer/prospect data enrichment.

Prospect Audit:
- P011 DOWNGRADE_SECONDARY
- P012 DOWNGRADE_SECONDARY
- P013 AUDIT_PASS
- P014 AUDIT_PASS
- P015 AUDIT_PASS

P011/P012 downgrade:
Both are technically capable, but public evidence points primarily to broad custom software, operations automation and training rather than prospect research or sales-pipeline workflows.

Decision: CONTINUE.

## Batch 4 — P016 to P020

P016 — initial QUALIFIED
AI automation agency explicitly building AI-powered outreach and CRM lead-follow-up systems.

P017 — initial QUALIFIED
CRM consultancy with lead routing, lead scoring, deduplication, validation, source-linked research and guarded automation.

P018 — initial QUALIFIED
Founder-led AI agency with sales/marketing background and automated lead/follow-up systems.

P019 — PASS
Canadian federal export-support service with qualified-contact functions.

P020 — PASS
Canadian development-bank international-expansion consulting service.

### Batch Review BR-04

P019 and P020 are conceptually close to the workflow:
- international market assessment,
- qualified contacts,
- partner identification,
- export growth.

But conceptual fit does not equal practical early-outreach fit.

Institutional governance, mandate and procurement create a different adoption path from a private founder-led consultancy.

Prospect Audit:
- P016 AUDIT_PASS
- P017 AUDIT_PASS
- P018 DOWNGRADE_SECONDARY

P018 downgrade:
AI capability and sales/marketing background are real, but public evidence is stronger for lead response/follow-up than structured target-account research.

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

The five downgrades were caused by the same discipline:

> Do not convert broad adjacency into a strong adoption hypothesis without evidence of the actual workflow.

## Final shortlist composition

13 final qualified prospects:

Direct workflow practitioners:
- outsourced sales / lead generation
- international market-entry consultancies
- partner-matching / trade advisory
- channel-development operators

Implementation multipliers:
- CRM & Sales Copilot implementers
- AI consultancies with lead qualification / sales automation
- outreach / CRM automation agencies
- CRM consultants with explicit dedup, validation and guarded automation

## Contact Verification

All 13 final qualified prospects had a supportable official business route such as:
- founder/business email,
- business inquiry form,
- consultation form,
- official contact channel.

No private email pattern was guessed.

## Stop condition

STOP_REASON:
The research set had established both high-value ICP archetypes and repeatedly reproduced the same distinction:
- prospect/market-entry workflow practitioners,
- sales/CRM AI implementation multipliers.

Later discovery increasingly returned generic AI agencies or generic business consultancies that did not add a new archetype.

The marginal value of more broad discovery had declined.

## Human intervention log

No prospect-level human correction was used.

The user supplied the product target:
FlyPig AI Outreach Engine.

The market (Canada), ICP hypotheses, Mission Revision and prospect decisions were generated by the single-agent workflow.

## What Test 03 demonstrated

1. The system can infer an ICP when no channel taxonomy is given.
2. It can revise from broad end-user discovery to a multiplier-first launch strategy.
3. It does not equate "AI company" with product fit.
4. It does not equate "could benefit" with "practical outreach prospect."
5. Dedup can apply across related domains/brands, not just identical company names.
6. Prospect Audit materially changed five initial qualification decisions.
7. FlyPig successfully dogfooded its own Open Core to identify plausible launch outreach targets for FlyPig itself.
