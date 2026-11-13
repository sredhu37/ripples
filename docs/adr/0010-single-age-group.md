# ADR 0010: Single age group

## Status

Accepted. Supersedes ADR 0009.

## Context

ADR 0009 split Ripples into a Junior (7-10) and a Senior (10-14) age group. Lessons could fork per group, with a senior registry, a `Progress.ageGroup` field, an `a` key in the save code and two texts on every timeline event and Meanwhile window. Sunny decided on 11.11.2026 to remove the Senior lessons and settled the details in triage on 12.11.2026. There are no live users.

## Decision

- Ripples has one age group. Nobody picks or sees an age group in the app.
- `AgeGroup`, `Progress.ageGroup`, `setAgeGroup()`, the senior registry, `registerSeniorLesson()` and the age-group UI text and CSS are removed.
- `getLesson(id)` and `hasLesson(id)` read the one lesson registry.
- The save code has no `a` key. It is never written or read.
- Timeline events and Meanwhile windows have one text each (the former junior text). Group 5 fact cards use that summary.
- The 7 senior-only lessons are deleted. Their junior versions are tracked as #179 to #185.
- The rules of `docs/AGE_10_STANDARD.md` moved into `docs/writing-lessons.md` and apply to all lessons.

## Consequences

- No backward compatibility for saved progress. Stored progress with an `ageGroup` key and old save codes with an `a` key load, and the extra key is ignored and not written back.
- One lesson per id keeps content, tests and review simple.
- Adding an age group again needs a new decision and a new ADR.
