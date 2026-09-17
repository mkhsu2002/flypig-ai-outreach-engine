# 08 Glossary

## Campaign

A bounded research and qualification initiative with a defined objective, target market, constraints, and success criteria.

## Mission

The current working definition of what opportunity is being explored and which organization types or market-entry paths may be relevant.

## Mission Version

A versioned mission record. Create a new version when research materially changes the target model or commercial relationship hypothesis.

## Prospect

A candidate organization under consideration for the active mission.

## Canonical Prospect

The single Tracker identity used for an organization after deduplication across legal names, trading names, local-language names, brands, domains, or aliases.

## Prospect Discovery

The process of building a candidate universe. Discovery alone does not mean a prospect is qualified.

## Dedup Gate

The mandatory check performed before creating a new canonical Tracker row.

## Discovery Diversity Check

A required checkpoint that tests whether discovery is prematurely converging on one version of the answer and whether materially different direct, channel, implementation, community, institutional, or market-specific routes deserve testing.

## Account Research

The process of determining what a candidate organization actually does using current supportable evidence.

## Business Role

The organization's actual role in the market, such as distributor, retailer, importer, integrator, manufacturer, agent, buyer, marketplace, implementation partner, community, or another ecosystem role.

## Evidence

A source supporting a material statement used in research or qualification.

## Verified Fact

A statement supported by adequate evidence.

## Working Hypothesis

A useful but unverified interpretation that guides research without being presented as fact.

## Contradictory Evidence

Evidence that weakens, complicates, or disproves the current interpretation of a prospect or mission.

## Qualification

The decision process that determines whether a researched prospect is strong enough to continue in the active mission.

## Qualified Prospect

A prospect with enough evidence and commercial logic to enter Prospect Audit.

`QUALIFIED` is not the final shortlist state and does not mean the organization has expressed interest.

## Prospect Audit

A mandatory skeptical review of every QUALIFIED prospect.

The Audit assumes the previous decision may be wrong and actively looks for identity, role, evidence, duplication, contradiction, fit, or contact-policy problems.

## Audit Pass

The audit result required before a prospect may proceed to final Contact Verification and `SHORTLIST_READY`.

## Secondary

A relevant prospect that is lower priority than the active shortlist.

## Hold

A prospect that may be relevant but cannot yet be confidently advanced because material evidence or identity remains unresolved.

## Pass

A prospect that does not fit the current mission strongly enough to continue.

## Batch Review

A periodic self-review during long research runs. By default, FlyPig reviews drift, duplicate leakage, evidence weakness, search noise, repeated exclusions, and mission impact after every five newly researched prospects.

## Contact Function

The business role or department most relevant to a potential future conversation.

## Contact Route

An official or otherwise supportable professional channel associated with the organization or relevant function.

## Contact Policy Precheck

A check for visible public restrictions or route-purpose conflicts before a contact route is recommended.

## Qualified Prospect Tracker

The primary Open Core output: one persistent campaign record containing discovered, researched, qualified, audited, secondary, hold, pass, and contact-route state.

## Shortlist Ready

The terminal success state for a public prospect record after `AUDIT_PASS` and final contact verification or documented route uncertainty.

## Execution Log

An auditable record used for validation or benchmark runs. It preserves actual search queries, dedup decisions, mission changes, audit corrections, batch reviews, human interventions, stop conditions, and final counts.

## Handoff

A structured state record that allows research to continue in another chat, LLM, or agent environment without restarting the work.

## Knowledge Pack

An optional intelligence overlay that may add more specific market, industry, or channel knowledge to the public research Skills.

Knowledge Packs are not required by the Open Core and are not the primary Free / Paid boundary.

## Controlled Outreach

A separate commercial layer that may take a Qualified Prospect Tracker into formal message strategy, drafting, independent review, approval-controlled sending, reply monitoring, and follow-up.
