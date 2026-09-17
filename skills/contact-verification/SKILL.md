# Contact Verification Skill

## Purpose

Identify a legitimate, supportable professional route for an audited prospect and complete the public Qualified Prospect Tracker record.

Follow `skills/INTERACTION_PROTOCOL.md`.

This is the final specialist Skill in the public Open Core.

## Required inputs

```text
Prospect with AUDIT_PASS
Account research
Prospect Audit result
Ideal contact roles
Acceptable contact-route types
Tracker configuration
Execution Log when running an auditable / benchmark campaign
```

## Mandatory gate

Do not run final Contact Verification for a prospect that has not recorded `AUDIT_PASS`.

Commercial qualification and route suitability are separate dimensions.

A commercially strong prospect may remain in the qualified set even when the only visible route is unsuitable or unresolved.

## Procedure

1. Confirm `AUDIT_PASS` is recorded.
2. Search official organization sources first.
3. Prefer role-specific professional routes when clearly published.
4. Use official general business routes when role-specific routes are unavailable and appropriate.
5. Record official contact forms where appropriate.
6. Read visible contact / inquiry policy before recommending a route.
7. Record the source and date checked.
8. Never construct or guess a private email address.
9. Do not treat an unverified address from an unknown source as verified.
10. Update the canonical Tracker with the strongest supportable route and final public state.
11. For auditable runs, log route-policy conflicts and the resulting state change.

## Contact-route statuses

Use:

```text
VERIFIED_ROLE_CONTACT
OFFICIAL_GENERAL_CONTACT
OFFICIAL_FORM
VERIFIED_PROFESSIONAL_CHANNEL
UNRESOLVED
DO_NOT_USE
```

`DO_NOT_USE` applies when an official policy makes the route unsuitable for the intended business approach, even if the company remains commercially qualified.

## Tracker write behavior

Update:

```text
recommended_contact_function
contact_name when publicly verified and materially useful
contact_route
contact_route_status
contact_policy_precheck
state
key_uncertainty
next_recommended_human_action
```

Recommended final public state:

```text
AUDIT_PASS + supportable route → shortlist_ready
AUDIT_PASS + route unresolved → shortlist_ready with route status UNRESOLVED when the user still benefits from the qualified account
AUDIT_PASS + only known route prohibited → shortlist_ready or hold according to mission requirements, but keep qualification_status separate from route status
```

Do not convert a contact-policy problem into `PASS` unless the campaign explicitly requires immediate contactability as a hard qualification criterion.

The public Core should never mark a prospect as contacted, sent, replied, or followed up.

## Interaction rules

### RESEARCH

Research by default. Contact verification is primarily a source-validation task.

### INFER

Do not infer an email address from a naming pattern.

You may infer which role is likely relevant when organization structure supports it, but label the role as a hypothesis until verified.

### ASK

Ask the user only when private relationship context materially affects the record.

### PROCEED

Proceed to final Tracker output when route state has been resolved as far as current public evidence allows.

Stop searching when a valid route is found unless the mission specifically requires a named contact.

## Output contract

```text
PROSPECT_ID
AUDIT_RESULT: AUDIT_PASS
CONTACT_ROLE
CONTACT_NAME if verified and relevant
CONTACT_ROUTE
ROUTE_TYPE
CONTACT_POLICY
SOURCE
DATE_CHECKED
STATUS: VERIFIED_ROLE_CONTACT | OFFICIAL_GENERAL_CONTACT | OFFICIAL_FORM | VERIFIED_PROFESSIONAL_CHANNEL | UNRESOLVED | DO_NOT_USE
NOTES
OPEN_QUESTIONS
FINAL_PUBLIC_STATE: SHORTLIST_READY | HOLD
TRACKER_WRITE: UPDATED
```

## Fail or hold conditions

Do not proceed when Prospect Audit is missing or not passed.

Return `DO_NOT_USE` when the route is known to be invalid, improperly sourced, or prohibited for the intended approach.

Do not guess an alternative private route to bypass an official restriction.

## Next handoff

The public workflow ends here.

Return the updated Qualified Prospect Tracker and Execution Log when applicable.

Any later message strategy, formal drafting, pre-send review, authorized sending, inbox monitoring, reply classification, or follow-up belongs outside the public Core.
