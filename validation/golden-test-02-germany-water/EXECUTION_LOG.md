# Golden Test 02 — Germany Industrial Water Monitoring

Date: 2026-09-17
Run ID: GT02-DE-WATER
Run type: GOLDEN TEST / fresh industry scenario
Execution mode: single LLM agent with web research
FlyPig Core main commit at run start: ffde471b987b537f0e81516eccb19ba0628e423e
Tracker: Local CSV (default)

## Test objective

Test whether the strengthened single-agent FlyPig process can avoid being trapped by the user's initial channel assumption.

The scenario begins with a conventional idea:

> We make industrial water-quality monitoring sensors and normally work through distributors. We want to enter Germany, but we do not know whether distributors are the right route there.

The test is successful only if the process:
- searches beyond the word `distributor`,
- distinguishes OEM sensor manufacturers from channel partners,
- discovers technically relevant integrators / engineering firms,
- revises the mission when evidence warrants it,
- applies dedup, evidence, Prospect Audit and batch review,
- and produces a persistent qualified Tracker.

## Mission v1 — pre-registered before discovery

MISSION_STATUS: PARTIALLY_READY

Offer hypothesis:
A Canadian supplier of modular online water-quality sensors/controllers for parameters such as pH, conductivity, dissolved oxygen and turbidity, designed for industrial/municipal water and wastewater monitoring and integration into process-control environments.

Known limitations:
- exact SKUs not specified,
- German/EU certifications not specified,
- price/margin structure not specified,
- service model not specified,
- logistics / stocking expectations not specified.

Therefore this run can evaluate organization/channel fit, not predict final sales fit.

Mission v1 channel hypothesis:
`DISTRIBUTOR_FIRST`

Initial target organization types:
1. German distributors of water-quality / process instrumentation
2. Measurement-equipment wholesalers
3. Technical distributors with water/wastewater customers

Explicit exclusions:
- direct sensor OEMs with strongly overlapping proprietary portfolios
- pure end users
- general industrial distributors without water/instrumentation evidence
- entities whose Germany relevance cannot be verified

## Mandatory process controls

- [x] One canonical Tracker
- [x] Dedup before creating a canonical row
- [x] Search snippets used only for discovery
- [x] Official/current evidence required for material role claims
- [x] Facts, hypotheses and counter-evidence separated
- [x] Every QUALIFIED prospect requires Prospect Audit
- [x] Audit explicitly tries to falsify the previous decision
- [x] Batch review after every five fully researched prospects
- [x] Contact route checked separately from commercial fit
- [x] Explicit mission-revision gate
- [x] Explicit stop condition
- [x] No guessed private contact information

## Discovery query log

The following broad discovery queries were used before company-specific account research:

DQ-01 `Deutschland Wasserqualitätsmessung Systemintegrator Messtechnik Abwasser Prozessinstrumentierung`

DQ-02 `Wasseranalytik Prozessmesstechnik Vertrieb Deutschland pH Leitfähigkeit Trübung Sensoren`

DQ-03 `Systemintegrator Wasser Abwasser Automatisierung Deutschland Messtechnik`

DQ-04 `water quality sensors distributor Germany pH conductivity turbidity process instrumentation`

DQ-05 `Industrie Wasser Messtechnik Händler Deutschland Sensoren Abwasser`

DQ-06 `Deutschland Wasser Abwasser Systemintegrator Automatisierung Messtechnik Sensorik Unternehmen`

DQ-07 `Deutschland Wasseraufbereitung Systemintegrator Prozessmesstechnik pH Leitfähigkeit Trübung`

DQ-08 `"Wasser und Abwasser" Systemintegrator Automatisierung Deutschland`

DQ-09 `Wasseranalytik Vertrieb Sensoren Deutschland Unternehmen`

DQ-10 `"Online Messtechnik" Wasser Abwasser Deutschland Unternehmen`

DQ-11 `"Distributor und Systemintegrator" Wasser Deutschland Messtechnik`

DQ-12 `"Systemintegrator" "online-Messtechnik" Wasser Deutschland`

DQ-13 `"Wasserqualität" Systemintegrator Deutschland Sensorik`

DQ-14 `"Abwasser" Messtechnik Distributor Deutschland Sensoren`

DQ-15 German water-industry / association supplier-directory exploration

## Discovery universe and dedup

42 canonical organizations were entered into the discovery scratch universe.

Repeated appearances were merged using:
- legal/company name,
- canonical domain,
- aliases / brands,
- location and identity checks.

Examples of repeat patterns:
- the same integrator appeared through company pages, partner pages and water-sector pages,
- WTW/Xylem appeared both directly and through authorized distributors,
- one company appeared under separate water, automation and contact pages,
- manufacturer brands surfaced repeatedly in searches that were intended to find distributors.

20 organizations were promoted into the full research set because they provided enough role diversity to test the mission.

## Discovery checkpoint — Mission v1 challenged

Early evidence produced three recurring organization types:

1. multi-brand water-instrumentation distributors that also integrate systems,
2. vendor-diverse automation / MSR system integrators serving water and wastewater facilities,
3. turnkey water/process-water engineering firms that integrate field instrumentation into complete plants.

This materially contradicted a distributor-only mission.

The evidence did not show that distributors were wrong. It showed that the initial model was too narrow.

## Mission revision

MISSION_VERSION: v1 → v2

New mission model:
`CHANNEL_PLUS_INTEGRATION`

Target organization types in Mission v2:
1. multi-brand online water instrumentation distributor / integrators,
2. water/wastewater automation and MSR system integrators,
3. turnkey industrial-water / process-water EPC or engineering companies that integrate third-party field instrumentation,
4. conventional analytical distributors only when industrial inline/process relevance is demonstrated.

Additional exclusion:
Direct OEM sensor manufacturers with strongly overlapping proprietary water-analysis platforms are PASS unless evidence shows a separate third-party channel role.

Reason for revision:
The strongest German routes to project deployment may be created by companies that specify, procure, integrate, commission and support field instruments rather than by traditional stock-and-resell distributors alone.

No user intervention was required for this revision because it was a reversible evidence-based market hypothesis.

## Batch 1 — P001 to P005

P001 — initial QUALIFIED
Hybrid distributor + system integrator for online water instrumentation.

P002 — initial QUALIFIED
Multi-brand water-treatment instrumentation supplier with explicit instrument procurement/calibration/PLC-SCADA capability.

P003 — initial QUALIFIED
Wastewater monitoring integrator with third-party sensor use, but also a significant proprietary stack.

P004 — SECONDARY
Measurement-station / sampling specialist; third-party probes possible, but niche scope.

P005 — initial QUALIFIED
Vendor-diverse water/industrial automation integrator with MSR field and analysis-measurement capability.

### Batch Review BR-01

Dedup leakage: none.
Mission drift: distributor-only assumption no longer adequate; Mission v2 confirmed.
Evidence issue: not every system integrator publicly describes sensor procurement, so integration relevance and channel openness must remain distinct.
Decision: CONTINUE.

Prospect Audit:
- P001 AUDIT_PASS
- P002 AUDIT_PASS
- P003 DOWNGRADE_SECONDARY
- P005 AUDIT_PASS

P003 downgrade reason:
Real integration capability exists, but proprietary sampling/transmitter products and an established sensor stack weaken the assumption that another external sensor brand would be strategically attractive.

## Batch 2 — P006 to P010

P006 — initial QUALIFIED
Industrial automation company with real water/wastewater activity.

P007 — initial QUALIFIED
Water/wastewater process-automation integrator with complete MSR and system-integration scope.

P008 — SECONDARY
Good automation relevance, insufficient evidence of water-quality analyser sourcing.

P009 — initial QUALIFIED
Large installed base in water SCADA/process control.

P010 — initial QUALIFIED
Turnkey water/wastewater EMSR engineering and system integration.

### Batch Review BR-02

Observed pattern:
Automation relevance alone is insufficient. The closer the company gets to field instrumentation selection, MSR design, commissioning and plant integration, the stronger the channel hypothesis.

Prospect Audit:
- P006 DOWNGRADE_SECONDARY
- P007 AUDIT_PASS
- P009 DOWNGRADE_SECONDARY
- P010 AUDIT_PASS

P006 downgrade:
Water is a genuine application, but the broader industrial/press-automation identity dominates and public evidence for water-analysis instrumentation sourcing is weak.

P009 downgrade:
Excellent SCADA/telemetry role, but insufficient evidence that water-quality sensor selection or sourcing is a meaningful part of the business.

Decision: CONTINUE.

## Batch 3 — P011 to P015

P011 — initial QUALIFIED
Industrial water/process-water plant builder with automation and measurement integration.

P012 — initial QUALIFIED
Large industrial-water EPC / engineering provider.

P013 — initial QUALIFIED
Water infrastructure / automation system integrator.

P014 — initial QUALIFIED
Authorized analytical distributor with water-analysis products.

P015 — PASS
Relevant water-market technology company, but proprietary measurement/control system makes it the wrong commercial role.

### Batch Review BR-03

Important distinction:
A company can be extremely relevant to the water market and still be a poor prospect if it is itself an overlapping OEM.

Prospect Audit:
- P011 AUDIT_PASS
- P012 DOWNGRADE_SECONDARY
- P013 AUDIT_PASS
- P014 DOWNGRADE_SECONDARY

P012 downgrade:
Very strong project relevance, but new instrumentation-vendor onboarding and procurement pathways are opaque in a large EPC organization.

P014 downgrade:
Real distributor capability, but strong incumbent WTW/Xylem authorization plus laboratory-oriented channel positioning weakens first-wave fit for a new industrial inline sensor brand.

Decision: CONTINUE.

## Batch 4 — P016 to P020

The final batch intentionally tested high-keyword-overlap false positives.

P016 — PASS
Own sensor and sensor-to-cloud manufacturer.

P017 — PASS
Major water-analysis instrument manufacturer/direct sales organization.

P018 — PASS
Liquid-analysis sensor manufacturer.

P019 — PASS
Optical/electrochemical water-analysis sensor manufacturer.

P020 — PASS
German manufacturer of pH/redox/conductivity sensors and integrated measurement/control systems.

### Batch Review BR-04

Finding:
Keyword similarity is a poor proxy for partner fit.

The final batch contained highly relevant technologies but mostly the wrong business role.

No new channel type appeared.

Decision: STOP_DISCOVERY.

## Prospect Audit summary

Initial QUALIFIED before audit: 12

AUDIT_PASS: 7
DOWNGRADE_SECONDARY: 5
RESEARCH_REPAIR: 0
PASS from audit: 0

Final:
- 7 QUALIFIED / SHORTLIST_READY
- 7 SECONDARY
- 6 PASS

The audit changed 5 of 12 initial QUALIFIED decisions.

## Contact-verification summary

For final QUALIFIED prospects:
- supportable official professional/business routes were found for all 7,
- several included role-specific engineering / automation / project-development contacts,
- no private address was guessed,
- contactability was not used to rescue a weak qualification.

## Stop condition

STOP_REASON:
The 20-company full-research set had tested the main channel types and the final batch was dominated by direct OEM manufacturers and adjacent technical players rather than new partner archetypes.

Additional broad search was no longer expected to materially change Mission v2.

## Final result

Discovery scratch universe: 42 canonical organizations
Full research set: 20

Final statuses:
- QUALIFIED / SHORTLIST_READY: 7
- SECONDARY: 7
- PASS: 6

Audit effect:
- 12 initial QUALIFIED
- 7 AUDIT_PASS
- 5 DOWNGRADE_SECONDARY

Mission effect:
- Mission v1: DISTRIBUTOR_FIRST
- Mission v2: CHANNEL_PLUS_INTEGRATION

## Human intervention log

No prospect-level human correction was used.

The user authorized Test 02 and had previously approved the strengthened single-agent process. Mission revision was generated from research evidence rather than from a user instruction to add integrators.

## What Test 02 demonstrated

1. The agent did not blindly obey the word `distributor`.
2. Discovery evidence changed the mission model.
3. Technical relevance did not automatically equal prospect qualification.
4. Direct sensor OEMs were rejected despite extremely high keyword overlap.
5. Prospect Audit materially changed 5 initial decisions.
6. System integrators and water-engineering firms were retained only when their public role made third-party instrumentation integration commercially plausible.
7. The same single LLM executed all stages; reliability came from mandatory process gates, not from multi-agent orchestration.
