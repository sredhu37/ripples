---
name: demo
description: Use after building or changing a feature, to record a video of it running locally so the user can review it fast.
---

# Demo

Show the change you just made with the Playwright specs in `e2e/`. The same specs run in CI (`.github/workflows/demo.yml`) and post the evidence comment on the pull request. Spec: `docs/factory.md`, sections Evidence and CI tools.

## Layout

- `e2e/` is its own npm package (`e2e/package.json`, `e2e/package-lock.json`). Install with `cd e2e && npm ci && npx playwright install chromium`.
- One spec per screen: `map.spec.ts` (trail), `lesson.spec.ts`, `facts.spec.ts` (fact cards behind the parent maths gate), `parents.spec.ts` (parent panel behind the gate), `timeline.spec.ts`.
- `evidence.ts` holds the helpers: `steps(page, name)` (pause 800 ms, then save `test-results/<name>/step-<k>.png`), `seedProgress` (saved progress in localStorage), `passParentGate` and the i18n labels the specs click.
- `playwright.config.ts` builds the app and serves it with `vite preview` on port 4744 under `/ripples/`. Video is on for every test.

## Steps

1. Find the screen your change touches. A change to any `*.tsx` or `*.css` outside `src/content/` must change at least one `e2e/*.spec.ts` (CI rule `scripts/check-spec-changed.mjs`).
2. Update the spec for that screen: walk through the changed behavior, call `await step()` after each visible change, and add real assertions so it also works as a test. Reach screens through the UI or `seedProgress`; add a `data-testid` only if nothing else works.
3. Run `cd e2e && npx playwright test <spec>`. For lessons: `LESSON_IDS=money,banks npx playwright test lesson` runs each id in EN, DE and PL (default `money`).
4. Videos land in `e2e/test-results/**/video.webm`, screenshots in `e2e/test-results/<name>/step-<k>.png`. Run `open` on the one that shows your change.
5. Optional, the CI evidence locally (needs ffmpeg): `PR_NUMBER=0 node build-evidence.mjs <out-dir>` writes the PNGs, `demo.gif` and `comment.md`.
6. Report the paths and one sentence per step shown. If a spec failed, say so; do not hide it.

## In CI

- `spec-rule` job: unit test of the rule (`npx vitest run --root scripts`), then the rule against `origin/<base>`.
- `demo` job: lesson ids from changed `src/content/<id>.*` files (not `src/content/senior/`), all specs with video, run time in the job summary, video artifact kept 90 days, ffmpeg from apt if missing, then `build-evidence.mjs`.
- Evidence goes to the `evidence` branch under `pr-<n>/` (orphan branch created if missing) and one PR comment marked `<!-- evidence -->`, updated in place. Images load from `raw.githubusercontent.com` with `?sha=<head commit>`.
- After merge, `evidence-cleanup.yml` deletes `pr-<n>/` and rewrites `evidence` to one commit.

## No UI

Record the terminal with VHS (`brew install vhs`): write `demo.tape` with the commands, run `vhs demo.tape`, open the result.

## Other repos

`templates/` holds a minimal starter (`package.json`, `playwright.config.ts`, `example.spec.ts`) for a repo without `e2e/`. Copy it into `e2e/` and set `baseURL` and `webServer.command`.
