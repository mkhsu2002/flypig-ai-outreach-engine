# Golden Test 02 — When “Find Distributors” Is the Wrong Search Model

## The question

Can one LLM, operating under FlyPig process rules, recognize that the user’s initial channel assumption is too narrow?

Golden Test 02 used a new industry and a new market:

- Canadian industrial water-monitoring equipment
- Germany
- initial assumption: find distributors

The test was designed to stress Mission Discovery and Mission Revision, not just company search.

## Starting point

The fictional supplier offers online water-quality sensing and control equipment for parameters such as pH, conductivity, dissolved oxygen and turbidity.

The user’s initial commercial intuition was conventional:

> We normally work with distributors. Find the right route into Germany.

A weak workflow can turn that sentence directly into a search for `German water sensor distributors`.

FlyPig treated `distributor` as a hypothesis.

## Mission v1

The first mission was:

`DISTRIBUTOR_FIRST`

Potential targets were distributors and measurement-equipment wholesalers.

The mission remained `PARTIALLY_READY` because pricing, certifications, service requirements and exact SKUs were unknown.

## What discovery found

Broad English and German discovery repeatedly surfaced three different kinds of companies:

1. multi-brand water instrumentation distributors that also perform system integration,
2. automation / MSR integrators that build complete water and wastewater control systems,
3. industrial-water engineering companies that specify and integrate field instrumentation inside turnkey plants.

Official company evidence confirmed that these were not just search-keyword artifacts.

Some integrators describe complete MSR, PLC/SCADA and external-system integration for water and wastewater facilities. Some multi-brand water-treatment suppliers explicitly select, procure, calibrate and loop-test pH, dissolved-oxygen, turbidity and conductivity instruments from multiple manufacturers.

## Mission Revision

The evidence forced a formal revision:

`Mission v1: DISTRIBUTOR_FIRST`

became:

`Mission v2: CHANNEL_PLUS_INTEGRATION`

The new target model included:

- multi-brand instrumentation distributor / integrators,
- water/wastewater automation system integrators,
- turnkey water/process-water engineering companies that integrate third-party instrumentation,
- conventional distributors only when industrial inline measurement was relevant.

This was the most important result of the test.

The system did not conclude that distributors were wrong.

It concluded that the original model was incomplete.

## Why system integrators matter

In industrial water, the commercial gatekeeper is often not simply the company that resells a sensor.

A company may influence:
- field-instrument selection,
- MSR design,
- PLC/SCADA integration,
- commissioning,
- calibration,
- service,
- specification of equipment within a plant project.

For example, one researched German integrator publicly describes complete automation work including MSR field technology and analysis measurement, while another water-treatment supplier explicitly lists selection and procurement of pH, DO, turbidity and conductivity analysers from multiple brands.

That evidence made integrators a legitimate route-to-market hypothesis.

## The false-positive problem

The same search queries also surfaced some of the most technically relevant companies in Germany.

But several were direct sensor manufacturers.

Some companies explicitly develop and manufacture their own water-analysis sensors and integrated measurement/control systems in Germany.

Their technical relevance is extremely high.

Their partner fit for this mission is low.

They were therefore `PASS`.

This is exactly why FlyPig separates:

`technical/category relevance`

from:

`commercial role fit`.

## Prospect Audit changed the result

20 organizations were fully researched.

Before Audit:
- 12 were QUALIFIED
- 2 were SECONDARY
- 6 were PASS

Every QUALIFIED record then entered Prospect Audit.

The audit tried to disprove the previous decision.

Five were downgraded.

Typical downgrade reasons:

- real integration capability, but too much reliance on a proprietary measurement stack,
- water automation is real, but analytical field instrumentation is not a demonstrated sourcing focus,
- excellent SCADA footprint, but weak evidence of sensor procurement,
- large EPC relevance, but unclear new-vendor onboarding,
- real analytical distribution, but an incumbent brand relationship and lab-heavy channel reduce first-wave fit.

Final result:

- 7 QUALIFIED / SHORTLIST_READY
- 7 SECONDARY
- 6 PASS

## What the test says about single-agent execution

No multi-agent framework was used.

The same LLM executed:

Mission Discovery
→ Discovery
→ Dedup
→ Account Research
→ Qualification
→ Prospect Audit
→ Contact Verification
→ Tracker

The value did not come from pretending that each role was a different AI.

The value came from requiring different decision stances at different gates.

Qualification asks:

> Why is this prospect strong enough to continue?

Audit asks:

> Assume that answer may be wrong. What evidence would break it?

The same model can perform both passes, even though this is not equivalent to statistically independent multi-model review.

## What this test proves

It demonstrates that the FlyPig process can force a single LLM to:

- treat the user’s channel assumption as a hypothesis,
- broaden discovery when market evidence contradicts that assumption,
- formalize a Mission Revision,
- preserve technically relevant but commercially wrong companies as PASS,
- run mandatory skeptical review,
- and maintain a single auditable Tracker.

## What it does not prove

It does not prove that any shortlisted company will sign a distribution agreement.

Public information cannot establish:
- current appetite for a new supplier,
- pricing/margin fit,
- certification fit,
- internal procurement rules,
- territory strategy.

Those remain commercial unknowns.

The Tracker says:

> these organizations are evidence-backed prospects worth the next business step.

It does not say:

> these organizations will buy.

## Why this case is different from Golden Test 01

Golden Test 01 mainly tested whether the process could distinguish importer, distributor, retailer, manufacturer and market-entry roles.

Golden Test 02 tests something harder:

> can the process change the user’s original market-entry model when the ecosystem says it should?

That ability is essential if the engine is meant to perform business research rather than merely automate a search request.
