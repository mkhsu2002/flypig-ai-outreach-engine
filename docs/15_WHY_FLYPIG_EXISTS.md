# 15 Why FlyPig Exists

FlyPig AI Outreach Engine did not begin from the belief that general-purpose LLMs are bad at business research.

It began from the opposite observation.

During repeated international market-development, partner-search, prospect-research, and business-outreach work, FlyPig relied heavily on capable general LLMs. The results were often surprisingly good. Given enough company context, product information, and a target market, a strong model could research organizations, classify business roles, discover plausible partners, and sometimes identify market-entry paths that had not been considered in advance.

The problem appeared later in the task.

## The long-run problem

A serious market-development campaign rarely ends after one prompt.

The same objective may require dozens of research turns across many organizations. As the context grows, a model that began carefully can gradually drift.

Typical drift observed in practice included:

```text
The original target role slowly broadens
Retailers begin to appear in a distributor search
Manufacturers are treated as potential buyers
Evidence standards become less consistent
Search snippets replace deeper verification
Previously rejected organizations are rediscovered
Fact and hypothesis begin to blur
The original market-entry objective becomes less visible
```

Each individual decision may still sound reasonable. The problem is that the standard has changed without an explicit decision to change it.

## Why that becomes dangerous downstream

Research drift does not stop at the prospect list.

If the model misunderstands what a company actually does, later outreach language can become commercially wrong even when the writing itself is fluent.

Examples include:

```text
Writing to a retailer as if it were a distributor
Treating a manufacturer as a potential buyer
Using reseller language with a system integrator
Turning a possible fit into an unsupported claim of interest
Using the wrong CTA for the recipient's actual role
```

A polished message with the wrong commercial context can be worse than an awkward message.

To the recipient, it signals that the sender did not understand the organization.

## The design response

FlyPig therefore does not try to teach the LLM how to think from scratch.

It turns important research practices into required process controls:

```text
Discovery is separate from Qualification
One canonical Tracker is maintained
Identity dedup happens before insertion
Material role claims require evidence
Facts, hypotheses, unknowns, and counter-evidence stay separate
QUALIFIED is not final until Prospect Audit passes
Audit explicitly tries to falsify the prior decision
Long runs include periodic batch review
Mission assumptions can be revised when evidence contradicts them
Contact-route suitability is separate from commercial fit
PASS / SECONDARY / HOLD records remain visible
The process has an explicit stopping condition
```

The default execution model remains one capable LLM.

Multi-agent orchestration is optional.

The product thesis is therefore not:

> LLMs do not know how to perform prospect research.

It is:

> Knowing the right practices does not guarantee that every practice will be applied consistently across a long, stateful task.

FlyPig is an attempt to make those practices persistent, inspectable, and repeatable.

> LLM knows how. FlyPig makes sure the process actually requires it.
