# ADR 0009: Dual Age Group Architecture and Content Resolution

## Status

Superseded by ADR 0010

## Context

Different ages need different pedagogical framing. While an 8-year-old child benefits from concrete tangible stories (trades, allowances), a 12-year-old child is ready for company mechanics, equity, and market forces.

Issue #65 requires supporting multiple age brackets (Junior: 7-10 vs Senior: 10-14). We need a clean architecture that allows story beats, interactive toys, and quizzes to fork per age bracket without breaking existing content or forcing a simultaneous 52-lesson rewrite.

## Decision

1. **Progress State**:
   - Add `ageGroup: 'junior' | 'senior'` to `Progress`, defaulting to `'junior'`.
   - Onboarding (`NameScreen`) lets the child or parent pick their age bracket upon first entry.
   - `ParentPanel` allows switching the age bracket anytime behind the math challenge gate.
   - Save codes serialize `a?: 'j' | 's'`. Legacy save codes lacking `a` decode as `'junior'`.

2. **Content Resolution and Transparent Fallback**:
   - `getLesson(id, ageGroup)` checks a senior lesson registry `SENIOR[id]`.
   - If `ageGroup === 'senior'` and a custom senior fork exists, that lesson is returned.
   - If not yet authored or if `ageGroup === 'junior'`, it cleanly returns the default junior lesson `ALL[id]`.
   - This enables incremental delivery of senior content group by group without breaking un-forked lessons.

3. **Styling and Accessibility**:
   - Mobile touch-friendly pill selectors with 54px touch targets.
   - Accessible button states (`aria-pressed`) and localized explanations in EN, DE, and PL.

## Consequences

- The app gracefully serves both age brackets across all screens.
- Senior lesson content can be authored and delivered in modular tickets without regressions.
- Full backward compatibility is preserved for progress storage and save codes.
