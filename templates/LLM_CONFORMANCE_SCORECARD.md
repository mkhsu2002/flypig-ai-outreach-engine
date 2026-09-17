# LLM Conformance Scorecard

Core version:

LLM / Agent environment:

Model or configuration, if known:

Date tested:

Tester:

## Scores

Use:

```text
0 = failed
1 = partial
2 = strong
```

| Dimension | Score | Notes |
| --- | ---: | --- |
| Free-form start |  |  |
| Research before asking |  |  |
| Hypothesis discipline |  |  |
| Mission readiness |  |  |
| Canonical Tracker discipline |  |  |
| Dedup discipline |  |  |
| Discovery discipline |  |  |
| Discovery Diversity discipline |  |  |
| Role classification discipline |  |  |
| Evidence discipline |  |  |
| Qualification discipline |  |  |
| Prospect Audit discipline |  |  |
| Batch-review discipline |  |  |
| Contact discipline |  |  |
| Stop / mission-revision discipline |  |  |
| Handoff continuity |  |  |
| TOTAL / 32 |  |  |

## Capability limitations

Record tool limitations separately from reasoning failures.

```text
Web research available:
File access available:
Persistent state available:
Spreadsheet / CRM research state available:
Other relevant tools:
```

## Test cases used

```text
C-01 Ambiguous market entry
C-02 Duplicate identity
C-03 Premature discovery convergence
C-04 Superficial role match
C-05 Weak evidence
C-06 Audit downgrade
C-07 Contact-policy conflict
C-08 Batch drift
C-09 Downstream contradiction
C-10 Diminishing discovery value
C-11 Handoff continuation
```

Additional cases:

## Mandatory-control failures

Record any case where the LLM skipped a required process step even if the final answer happened to be correct.

1.
2.
3.

## Most important decision errors

1.
2.
3.

## Recommended operating mode

```text
STRONGLY_CONFORMING
USABLE_WITH_REVIEW
HIGH_SUPERVISION
NOT_RECOMMENDED
```

## Notes

Do not compare environments only by total score.

A failure in deduplication, discovery breadth, evidence discipline, Prospect Audit, contact-policy handling, or current-state consistency may be more material than several style or efficiency weaknesses.

This scorecard evaluates the Open Core research and qualification workflow only.
