# Software factory

How work moves from an idea to the live Ripples site with agents doing the building, reviewing and merging, and Sunny deciding what only a human should decide. Piloted in ripples, then ported to `sredhu37/repo-template`.

Source: map [#109](https://github.com/sredhu37/ripples/issues/109). Every decision below links the ticket that holds its reasoning. Choices the agent made while writing are in [Implementation defaults](#implementation-defaults), not mixed into the decided sections.

## Principles

1. **Link standards, do not copy them.** Agents check against industry standards by link. Only Ripples' own decisions are written down, in docs that already exist. ([#115](https://github.com/sredhu37/ripples/issues/115))
2. **Whatever a tool can check is a CI test.** Agents only judge what tools cannot. ([#115](https://github.com/sredhu37/ripples/issues/115))
3. **The label on the issue is the truth.** The board mirrors it. ([#114](https://github.com/sredhu37/ripples/issues/114))
4. **Unsure means Sunny.** Any agent in doubt hands over instead of guessing. ([#116](https://github.com/sredhu37/ripples/issues/116))

## The line

```
new issue ──► TRIAGE ──► READY ──► BUILD ──► CI TOOLS ──► REVIEW ──► GATE ──► main
              (Sunny +   factory:  build     tests,       4 agents   risky
               /triage)  ready     agent     lint, ...    FAIL/      list or
                                     ▲                     SUGGEST.   gate
                                     └──── FAIL: fix round (max 5) ◄──┘ agent
                                                                         │
                                                     HUMAN ──► Sunny (Needs human)
```

| Station  | Who                         | Trigger                    | Output                                                               |
| -------- | --------------------------- | -------------------------- | -------------------------------------------------------------------- |
| Triage   | Sunny with `/triage`        | issue has `factory:triage` | `factory:ready` + agent brief, `factory:human`, `wontfix`, or parked |
| Ready    | waiting                     | hourly scan or Run now     | build starts when a slot is free and all blockers are closed         |
| Build    | build agent                 | pickup                     | PR with the 4-heading summary, specs, `Closes #n`                    |
| CI tools | GitHub Actions              | PR opened or pushed        | pass, or straight back to build (no round used)                      |
| Review   | 4 review agents             | CI green                   | findings: FAIL or SUGGESTION                                         |
| Gate     | risky list, then gate agent | review passed              | MERGE or HUMAN                                                       |

## Labels and board

([#114](https://github.com/sredhu37/ripples/issues/114), facts from [#110](https://github.com/sredhu37/ripples/issues/110), [#112](https://github.com/sredhu37/ripples/issues/112))

Exactly one `factory:` label per issue at a time. The factory swaps it at each step; adding one by hand removes the others (`factory-sync.yml`). Labels sit on the issue only; the PR links with `Closes #n`. A PR opened by hand with `Closes #n` puts #n in review (`factory-pr-link.yml`): the label and the card move at once. The scan treats such a ticket as local (its PR is not on `factory/issue-<n>`). Drafts, fork PRs and issues in `factory:human`, `factory:in-review` or `factory:done` are skipped.

| Label                 | Board column                  | Set by                                                                          |
| --------------------- | ----------------------------- | ------------------------------------------------------------------------------- |
| `factory:triage`      | Backlog                       | automatically on every new issue and every suggestions issue; also parked items |
| `factory:ready`       | Ready                         | Sunny, or a confirmed wayfinder spec                                            |
| `factory:in-progress` | In progress                   | factory, when the build starts                                                  |
| `factory:in-review`   | In review                     | factory, when the PR opens                                                      |
| `factory:human`       | Needs human (new column, red) | factory, whenever it needs Sunny                                                |
| `factory:done`        | Done                          | factory, when the issue closes (merged, or closed with plain `wontfix`)         |

```
triage ─► ready ─► in-progress ─► in-review ─► done
              ▲         │              │
              └─ human ◄┴──────────────┘
```

- Status changes on a user-owned board cannot trigger anything (`projects_v2_item` is org-only), so the scan reads the labels and the engine moves the card. Nobody drags cards.
- **Board reconcile:** every hour `factory-sweep.yml` puts each card back in the column of its issue's `factory:` label, so a dragged card or a missed label event fixes itself. A closed issue goes to Done. An issue with no `factory:` label, more than one, or an open issue with `factory:done` (Done would close it) stays where it is.
- `wontfix` stays a plain label. GitHub's other default labels stay and the factory ignores them.
- Build tickets split from a confirmed wayfinder spec get `factory:ready`. `wayfinder:task` keeps its meaning: work that unblocks a decision.
- `docs/agents/triage-labels.md` maps the `/triage` skill's roles: `needs-triage` → `factory:triage`, `ready-for-agent` → `factory:ready`, `needs-info` and `ready-for-human` → `factory:human`, `wontfix` → `wontfix`.
- Board workflows: keep "Auto-add to project" and "Auto-add sub-issues". Turn off "Item added to project", "Item closed", "Pull request linked to issue", "Pull request merged" (they set Status and would fight the engine).

## Triage

([#124](https://github.com/sredhu37/ripples/issues/124))

- Sunny sorts `factory:triage` issues with the `/triage` skill when he wants. The agent checks the code, reproduces bugs, grills vague requests and proposes; Sunny decides.
- No agent moves an issue to `factory:ready` on its own: the repo is public, so a stranger's issue must never start a build.
- `/triage` posts an **agent brief** comment when an issue moves to ready; the build agent reads issue plus brief.
- `/triage` adds one category label (`bug` or `enhancement`) and keeps its `.out-of-scope/` folder for wontfix reasons.
- **Triage reminder:** the factory posts to Slack `#ripples-factory` on Monday at 09:00, only when issues wait: count, age of the oldest, link to the board filtered by `factory:triage`.

## Build

([#113](https://github.com/sredhu37/ripples/issues/113), [#117](https://github.com/sredhu37/ripples/issues/117), [#118](https://github.com/sredhu37/ripples/issues/118))

- **Starts** only from the [scan](#scan). Sunny's `factory:ready` label runs the scan at once. Up to `MAX_PARALLEL` (5) tickets run at once, one run per issue at a time (`concurrency` per issue).
- The build agent swaps the label to `factory:in-progress`, implements on a new branch, runs tests, typecheck and build, writes or updates specs, and opens the PR.
- **PR description = the summary**, with four headings: `## What changed`, `## Decisions`, `## Verified` (real command output), `## Left`. The build agent rewrites "Verified" every fix round.
- **Fix rounds:** any FAIL from review sends the PR back to the build agent. Maximum 5 rounds, counted from the factory's review-summary comments on the PR. Round 5 with FAILs left: `factory:human` (the agent is stuck, or the work should become its own ticket).
- **Failures:** a Claude usage limit puts the issue back to `factory:ready` with a comment; the scan restarts it later (not counted). A job that fails after the agent opened or pushed the PR in this run (for example the action fails a finished session that went over the turn cap) counts as done: `factory:in-review`, and the pushed head goes to CI and review. A job that fails or times out before that (out of turns, crash, the 30 minute timeout) keeps its label and gets a `stopped` comment with the agent's last words; the scan continues it on the same branch, at most 3 times, then `factory:human` and Slack. The agent finishing without a PR (it says it cannot) and a fix round that pushed nothing set `factory:human` and send a Telegram message at once.

## Scan

([#311](https://github.com/sredhu37/ripples/issues/311), decisions 1 to 5 and 11 to 13)

The only thing that starts factory work. `factory-sweep.yml` runs it when a person adds `factory:ready`, when an issue closes (a slot frees up), hourly at :07, and on "Run now" (a manual run: task `scan`, optional `issue` for one ticket, `dry_run` to only print). GitHub runs the hourly schedule only about 3 times a day (34 runs from 12.11 to 22.11.2026; its docs: scheduled runs "may be dropped" under load), so the events do the real work and the schedule is the safety net for stopped builds and usage-limit pauses ([#321](https://github.com/sredhu37/ripples/issues/321)). Script: `sweep/scan.sh`, plan in `sweep/scan.mjs`.

```
free slots = MAX_PARALLEL (5)
           - tickets with an active factory-build, factory-review or factory-gate run
           - local tickets (In progress or In review) touched in the last 2 hours
fill them, oldest issue first in each column:
  1. In review    rerun the missing station
  2. In progress  continue a stopped build on its branch
  3. Ready        start (skipped while a blocker is open)
Needs human: never picked
```

- **No double pickup:** a ticket with an unfinished factory run is skipped (run names carry the ticket); scans never overlap (`concurrency: factory-scan`); a scan waits up to 60 s until every run it dispatched shows in the Actions API, so the next scan counts it; one build per issue at a time (`concurrency: factory-build-<issue>`).
- **One ticket, one slot**, at every station: its 4 reviewers count as 1. Run names carry the ticket (`factory-build issue #<n>`, `factory-review factory/issue-<n>` or `PR #<m>`, `factory-gate PR #<m>`), which is how the scan counts them. A ticket waiting for CI holds no slot.
- **Hand-offs inside a ticket stay instant:** build to CI to review to gate, fix rounds from review, and Sunny's review or comment on a PR (`factory-gate.yml` relay). Only the start and the continue of a stopped ticket wait for the scan.
- **Missing station (In review):** checks still running: wait. A red required check: fix round (the prompt names the red checks). Green with no review for the head: review, but only 10 minutes after the checks finished (the `workflow_run` review normally starts by itself within seconds). Review FAIL below round 5 with no fix round running: fix round. Review PASS with no gate comment for the head: gate. A head brought up to date by the factory, or a head the gate said MERGE to that is still in review: gate merge mode (a conflict: fix round). Anything else (round 5, review error) is already Sunny's.
- **Local tickets** are left alone and only counted: In progress with the label set by a person, or In review whose open PR is not on `factory/issue-<n>`. They stop counting after 2 quiet hours.
- **Continue cap:** every continue posts a `factory-continue` comment. After 3 since the ticket last entered Ready by hand: `factory:human`, a comment and a Slack message with the build's last words. Setting `factory:ready` again gives 3 more. Starting a Ready ticket is not a continue, so usage-limit pauses never count.

## Local run

([#311](https://github.com/sredhu37/ripples/issues/311), decisions 9 and 10; [#315](https://github.com/sredhu37/ripples/issues/315))

The override for when GitHub Actions, issues or secrets are down, or Sunny wants to drive a ticket himself: `/factory` in Sunny's Claude Code (skill `.claude/skills/factory/`, helper `scripts/local.sh`).

```
/factory "idea"       grill-with-docs (or wayfinder) ─► issue, Backlog ─► triage ─► Ready
                      ─► ask: run now locally | run now on GitHub (scan for this issue) | leave in Ready
/factory build <n>    build agent on local/issue-<n>, PR with Closes #n
/factory review <pr>  the 4 review agents, summary shown in the chat (nothing posted)
/factory gate <pr>    risky list, gate agent, merge only on Sunny's yes in the chat
```

- **Same parts as GitHub:** agent rules from `.claude/agents/` (run as Claude Code subagents), prompt templates from `.github/prompts/`, input scripts and `review.mjs` / `gate.mjs` from `.github/scripts/`, all from a worktree of `origin/main` (`.claude/worktrees/local-main`), never from the checkout it runs in. The `<local_run>` block in the build prompt overrides the GitHub-only lines (worktree, branch, workflow pushes allowed).
- **Acts as Sunny** through his `gh` login: pushes, the PR, label and card moves (`shared/move.sh`), the merge. Never the Slack webhook, never `sredhu37-bot`.
- **Branch `local/issue-<n>`:** `factory-review.yml` only starts on `factory/issue-<n>`, so GitHub never reviews local work by itself, and the [scan](#scan) counts the ticket as local (label set by Sunny, or In review with a PR not on `factory/`) and never continues it.
- **The full line locally:** build, wait for CI, review, fix rounds (max 5, counted in the chat), gate. MERGE asks Sunny before merging; HUMAN asks "merge anyway, or leave it in Needs human?". `local.sh merge` brings the PR up to date with main first.
- **Grill and triage:** `/grill-with-docs`, `/wayfinder` and `/triage` can only be started by Sunny (`disable-model-invocation`), and plugin skills cannot be overridden in settings. `/factory` reads their SKILL.md from the plugin's install path (`~/.claude/plugins/installed_plugins.json`) and follows it in the same chat; a moved file stops it with a clear error. A wayfinder-sized idea stops after the map.
- In `/factory`, triage ends in Ready (Sunny is in the chat and confirms it), unless he picks another label.

## CI tools

([#115](https://github.com/sredhu37/ripples/issues/115), [#116](https://github.com/sredhu37/ripples/issues/116), [#117](https://github.com/sredhu37/ripples/issues/117))

Deterministic checks run before any review agent. A failure goes straight back to the build agent and uses no review round.

All of them except CodeQL run in one workflow, `pr-checks.yml`, one job per required check of the `main` ruleset: `ci`, `lint`, `audit`, `lighthouse`, `spec-rule`, `flow-rule`, `demo`. The job names are the check names, so renaming a job breaks the ruleset and `gate/checks-green.sh`.

| Check                   | Tool                                                                | Default settings                                                                                                                                         |
| ----------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tests, types, build     | `npm run test`, `npm run typecheck`, `npm run build`                | as today                                                                                                                                                 |
| Code mistakes           | oxlint                                                              | defaults, no config                                                                                                                                      |
| Formatting              | oxfmt (no Prettier)                                                 | defaults                                                                                                                                                 |
| Dependency holes        | `npm audit`                                                         | defaults                                                                                                                                                 |
| XSS, injection patterns | CodeQL default setup                                                | to turn on                                                                                                                                               |
| Secrets                 | GitHub secret scanning + push protection                            | already on                                                                                                                                               |
| Speed                   | Lighthouse CI (`@lhci/cli`), median of 3 runs, one retry on failure | fail on LCP > 2.5 s, CLS > 0.1, TBT > 200 ms                                                                                                             |
| Accessibility basics    | Lighthouse accessibility audits                                     | any failed audit fails                                                                                                                                   |
| Lesson content counts   | `web/src/content/content.test.ts`                                   | max 15 words per sentence; question max 20 words, options under 15; diagram labels max 4 words; no "Bartek"                                              |
| Save-code order         | new test on `web/src/lessons.ts`                                    | an existing lesson id never changes position                                                                                                             |
| Specs present           | CI rule                                                             | a change to `*.tsx` or `*.css` must change at least one `web/e2e/*.spec.ts`                                                                              |
| Flow diagram current    | CI rule `flow-rule` (`scripts/check-flow-changed.mjs`)              | a change to `.github/workflows/**` or `.github/scripts/**` must change `docs/factory-flow.svg`, or the PR body has a line `Diagram: unchanged, <reason>` |
| Specs pass              | Playwright (all specs, video on)                                    | see [Evidence](#evidence)                                                                                                                                |

- ESLint is not used while `typescript-eslint` supports only TypeScript below 6.1; ripples uses 7.0.2. Switching later is its own ticket.
- A one-time PR applies oxfmt to the whole repo and fixes existing accessibility and content-count failures.

## Review

([#115](https://github.com/sredhu37/ripples/issues/115))

Four review agents, all on every PR and all again after every fix round. They run in parallel once CI is green. An agent with nothing to check returns PASS with a reason (for example "no UI changed").

| Agent        | Checks                                                                                                                                                 | Sources, in order                                                                                                                                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ux-ui        | friction (too many buttons, taps or choices), confusing screens, Ripples UX rules, what tools cannot see in WCAG                                       | Ripples rules in `docs/design.md` "Experience" (moved there from agent notes), [Nielsen's 10 heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/), [Laws of UX](https://lawsofux.com/hicks-law/), [WCAG 2.2 AA](https://www.w3.org/WAI/WCAG22/quickref/)  |
| security     | private data readable in client code, unsafe input handling (save codes), prompt injection, app-specific logic holes                                   | [OWASP Top 10](https://owasp.org/Top10/), [OWASP DOM XSS cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html), [OWASP LLM01](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)                                      |
| content      | plain words for an 8-year-old, a physical anchor before each concept, story arc, each fact against its source, natural DE and PL with the same meaning | `docs/writing-lessons.md` (rules from agent notes moved in: per-language character names, the "Bartek" ban, balanced starred terms, physical anchor, length caps)                                                                                                            |
| code-quality | where code goes, reuse, naming, design, the change has a test                                                                                          | `ARCHITECTURE.md` and `docs/adr/` first, then standards picked to fit the change ([Google TS Style Guide](https://google.github.io/styleguide/tsguide.html), [React docs](https://react.dev/learn/thinking-in-react), ...). Repo decisions win on conflict. No own rule doc. |

**Finding format** (all agents, plain words):

```
FAIL | SUGGESTION
Problem: "Start over" deletes progress with no confirm
Where:   web/src/lesson/LessonRunner.tsx:84
Fix:     ask "Start this lesson again?" Yes/No
Rule:    Nielsen, error prevention (link to the exact section)
```

- **FAIL** only when the finding breaks a rule the agent can link to. One FAIL sends the PR back to build.
- **SUGGESTION** never blocks. After review passes, all suggestions from all agents are deduplicated into **one suggestions issue per PR**, linked to the PR, labelled `factory:triage`.
- ux-ui also judges from the evidence screenshots, not only the code.

## Gate

([#116](https://github.com/sredhu37/ripples/issues/116))

```
review passed ──► any changed file on the risky list? ──yes──► factory:human
                    │ no
                    ▼
                  gate agent: risk analysis ─► fixed rule ─► MERGE or HUMAN
```

**Risky list** (`.github/gate-paths.txt`, one pattern per line; the file is on its own list):

`web/src/progress.ts`, `web/public/sw.js`, `web/public/manifest.webmanifest`, `package.json`, `package-lock.json`, `web/package.json`, `web/package-lock.json`, `server/package.json`, `server/package-lock.json`, `web/vite.config.ts`, `.github/**`, `AGENTS.md`, `CLAUDE.md`, `.claude/**`, `ARCHITECTURE.md`, `docs/**`, `LICENSE`, `LICENSE-CONTENT.txt`, `LICENSING.md`.

**Gate agent** (PRs outside the risky list):

- Writes an open risk analysis. Per risk: what breaks, who notices, how likely, can it be undone fast. Starts from Ripples' weak spots: offline cache (own address only), saved progress, 3 languages, parent panel, children's privacy.
- Fixed rule. HUMAN if any of:
  - a risk is likely and a child would notice;
  - a risk cannot be undone by merging a fix;
  - a product or privacy call: new screen or path, something kids have is removed or renamed, new child input or saved data, new outside address;
  - the agent is unsure.
    Otherwise MERGE.
- Output: one PR comment with the risks, MERGE or HUMAN, and the reason.

**How `factory-gate.yml` runs it:**

- `factory-review.yml` dispatches it with `pr` after a PASS. It checks: a factory PR, issue in `factory:in-review`, the head's review summary is a PASS and status `factory-review` is green, every required check is green, no gate comment for the head yet.
- Risky list: the PR's changed files, old names of renamed files too, against `.github/gate-paths.txt` from main (`gate/gate.mjs match`: `*` inside one folder, `**` any depth, anything else an exact path). One hit is HUMAN; the gate agent does not run.
- Gate agent: `.claude/agents/gate.md` from main, Sonnet, 10 turns, `Read`, `Grep`, `Glob` only, a read-only `GITHUB_TOKEN`. It gets the diff, the PR description, the review summary and the evidence screenshots. Its final json `{decision, reason}` decides; a missing or invalid block is HUMAN.
- One gate comment per head, marker `<!-- factory-gate sha=<sha> -->`: risks (risky files, or the agent's analysis), decision, reason.
- MERGE: the head must be unchanged and every check green, then `sredhu37-bot` squash-merges with `FACTORY_TOKEN` (a `GITHUB_TOKEN` merge starts no push workflow). `Closes #n` closes the issue; the gate sets `factory:done` and moves the card to Done. A refused merge is HUMAN.
- **Up to date before merge** ([#311](https://github.com/sredhu37/ripples/issues/311), decision 6): `gate/merge.sh` never merges a head behind main, for the gate's MERGE, Sunny's approval and merge mode alike.
  - No conflict: GitHub's update-branch merges main into the PR as `sredhu37-bot` (no agent, no tokens). A comment `<!-- factory-update sha=<new> from=<old> -->` marks the new head as the factory's update of an approved head, and `factory-gate.yml` mode `merge` waits up to 20 minutes for its checks, then merges. Review skips such a head (no new round), and Sunny need not approve again. If main moved meanwhile, merge mode brings it up to date once more.
  - Conflict: a fix round (`factory-build.yml` with `issue` and `pr`, the prompt says to merge `origin/main` and resolve). The issue goes to `factory:in-review` (also from Needs human), so the new head is reviewed and gated again; the round counts toward 5. A revert PR gets a note to resolve by hand.
  - Checks red after the update: the scan starts a fix round.
- HUMAN: `factory:human`, card to Needs human, Slack: `Needs human: PR #n "title"`, the reason, the PR link and the evidence video link (the first `/demo.mp4` link in the evidence comment, or the PR link).

**Ruleset on main:** PR only, every CI check green, branch up to date with main (`strict_required_status_checks_policy`), no force-push, Sunny on the bypass list.

**Sunny's review:** Sunny's approving review is the approval (changed 12.11.2026; before, pressing Merge was the approval, [#116](https://github.com/sredhu37/ripples/issues/116), [#141](https://github.com/sredhu37/ripples/issues/141)). It applies to every PR in Needs human: risky-list PRs, gate HUMAN PRs and revert PRs.

- **Approve:** when `sredhu37` approves the PR's current head (the review's commit is the head; an approval of an older commit does not count) and every required check (`ci`, `lint`, `audit`, `lighthouse`, `demo`, `spec-rule`, `flow-rule`, `CodeQL`) is green, `sredhu37-bot` squash-merges it with `FACTORY_TOKEN`. Checks still running: the run waits up to 20 minutes. Still not green, or the head moved: no merge, a PR comment says why; approve again, or rerun `factory-gate.yml` with `pr` and mode `approve`.
- **Early approval:** an approval given while the issue is still `factory:in-review` does not count, because the gate stops at HUMAN to show Sunny its risk comment first. The approve run does not stay silent: it posts "Approval noted, but the factory still has the PR. Approve again after the gate comment." When the gate then says HUMAN and Sunny's latest review is an APPROVED from before the gate comment, the gate comment says "Your approval came before this gate comment. Read the risks above and approve again to merge." and the Slack reason says the same in one line. A new approval merges ([#191](https://github.com/sredhu37/ripples/issues/191)).
- **Comment or request changes:** a comment, a comment review or a "Request changes" review from `sredhu37` on a factory PR in `factory:human` starts a fix round: `factory-build.yml` with `issue`, `pr` and `human=<review|comment>:<id>`. A question gets a reply instead of a code change. After the round the PR returns to Sunny with a Slack message, not to the gate (once HUMAN, stays HUMAN). These rounds do not count toward the 5-round limit.
- **`@build` while the factory has the PR:** a comment by `sredhu37` that contains `@build` on a factory PR in `factory:in-review` also starts a fix round, so Sunny can talk to the build agent without waiting for the gate. Without `@build` the comment is ignored in that state. The round ends like any Sunny round: the issue goes to `factory:human` and the PR returns to Sunny.
- **Why a relay:** `issue_comment` runs the workflow file from main, but `pull_request_review` runs the file from the PR's merge commit, so a PR that edits `factory-gate.yml` would run its own copy. The `pull_request_review` and `issue_comment` jobs therefore only dispatch `factory-gate.yml` on main (no secret, `actions: write`), and the dispatched run reads the review or comment again from the API. Merges and board moves run in jobs that check out main only and run no agent.

## Evidence

([#117](https://github.com/sredhu37/ripples/issues/117))

- One Playwright **spec** per screen (`web/e2e/`; ripples has 5 screens: map, lesson, facts, parents, timeline). Each spec is a test and records the demo.
- The lesson spec takes lesson ids. CI passes the ids from changed `web/src/content/<id>.*` files and runs them in EN, DE and PL. A change only in `web/src/content/**` needs no spec edit.
- Every PR runs all specs with video on. Each step saves a screenshot.
- The **evidence branch** `evidence` holds `pr-<n>/step-*.png` and `pr-<n>/demo.mp4` (the spec videos joined with ffmpeg; Playwright draws the pointer and outlines each clicked element). One **evidence comment** per PR, updated in place, shows the screenshots inline, links the walkthrough video through jsDelivr (GitHub strips video players from comments and serves raw `.mp4` as a download; jsDelivr serves it as `video/mp4`, so the browser's own player can pause and rewind), and links the full video artifact (90-day retention).
- Review agents and the gate agent read the PNGs. Sunny watches on HUMAN PRs.
- After merge, CI deletes `pr-<n>/` and rewrites `evidence` to a single commit.
- The `demo` job in `pr-checks.yml` records and posts the evidence.

## Engine

([#113](https://github.com/sredhu37/ripples/issues/113), research [#111](https://github.com/sredhu37/ripples/issues/111))

GitHub Actions runs the factory. Agent steps use `anthropics/claude-code-action`. Hermes is Sunny's cockpit (ask it about the factory), not the engine.

[WORKFLOWS.md](WORKFLOWS.md) is the generated map of every workflow file, its trigger and what it starts next. `npm run workflows:map` regenerates it; the `workflows-map` job of `pr-checks.yml` fails when it differs. A new workflow needs a `# map-does:` header comment (and `# map-next:` for a link the script cannot see).

| Workflow              | Runs on                                                                                                                                            | Does                                                                                                            |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `factory-build.yml`   | `workflow_dispatch` (scan, Run now, fix rounds from review and gate)                                                                               | pickup, label swap, build agent, opens PR                                                                       |
| `factory-review.yml`  | `workflow_run` (`pr-checks` done on a factory PR), `workflow_dispatch`                                                                             | 4 review agents in parallel, suggestions issue, fix round, round counter                                        |
| `factory-gate.yml`    | `workflow_dispatch` (`pr`, `mode`); `pull_request_review`, `issue_comment` (relay)                                                                 | risky list, gate agent, merge with `FACTORY_TOKEN` or `factory:human`; Sunny's approval and comments            |
| `factory-sweep.yml`   | `issues: labeled` (`factory:ready`), `issues: closed`; hourly at :07; Monday 09:00 Europe/Berlin; `workflow_dispatch` (`task`, `issue`, `dry_run`) | the scan (start and continue tickets), board reconcile; triage reminder                                         |
| `factory-sync.yml`    | `issues: labeled, unlabeled, closed, reopened`                                                                                                     | keeps one `factory:` label (the newest); card to its column; close sets `factory:done`                          |
| `factory-pr-link.yml` | `pull_request_target: opened, reopened, ready_for_review`                                                                                          | a hand-opened PR with `Closes #n` puts #n in `factory:in-review`, card In review                                |
| `pr-checks.yml`       | `pull_request`                                                                                                                                     | jobs `ci`, `lint`, `audit`, `lighthouse`, `spec-rule`, `flow-rule`, `demo` (specs, evidence branch and comment) |

**Workflows only wire, scripts do the work** ([#311](https://github.com/sredhu37/ripples/issues/311), decision 7). A workflow holds triggers, permissions, secrets and timeouts; every `run:` step is one script call. Each script names its inputs (env) and outputs in its header and also runs from a terminal with `GH_TOKEN` and `REPO` (or `GITHUB_REPOSITORY`) set; when `GITHUB_OUTPUT` is unset the step outputs are printed.

```
.github/scripts/
  shared/            used by two or more workflows
  build/ review/ gate/ sweep/ sync/ pr-link/ checks/ evidence-cleanup/
                     one folder per workflow (checks = pr-checks.yml)
.github/prompts/     prompt templates per station, filled by <station>/prompt.sh
.claude/agents/      agent rules (also Claude Code subagents in a local session)
```

- **Prompts:** an agent's prompt is a template in `.github/prompts/` (where things are, turns, how to finish) plus its rules in `.claude/agents/<agent>.md`, both from main. `shared/render.mjs` fills `${NAME}` from env or from the file in `NAME_FILE`, in one pass, so issue and PR text is never scanned for placeholders; a name without a value fails the run. The templates cannot sit in `.claude/agents/`: Claude Code reads that folder and its subfolders as subagents. `.prettierignore` keeps the formatter off them, so the agent gets the text as written.
- **Moving a ticket:** `shared/move.sh <issue> <label>` sets the `factory:` label (`GH_TOKEN`) and moves the card to its column (`BOARD_TOKEN`, `FACTORY_TOKEN` in workflows) in one call. A failed card move only warns; the hourly reconcile puts it right.
- The build job runs `build/prompt.sh` before it switches to the PR branch, so the script and templates come from main.

| Script                      | Does                                                                                        | Token                                       |
| --------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `shared/move.sh`            | label and card in one call                                                                  | `GITHUB_TOKEN` + `FACTORY_TOKEN` (no agent) |
| `shared/label-set.sh`       | gives an issue exactly one `factory:` label                                                 | `GITHUB_TOKEN`                              |
| `shared/board-move.sh`      | moves the issue's card to a Status column, adds the card if missing                         | `FACTORY_TOKEN` (no agent)                  |
| `shared/render.mjs`         | fills a prompt template                                                                     | none                                        |
| `shared/output.sh`          | writes a step output that spans lines                                                       | none                                        |
| `shared/slack.sh`           | posts a factory message to Slack `#ripples-factory`                                         | `SLACK_WEBHOOK_URL`                         |
| `shared/pr-needs-human.sh`  | Slack "Needs human" for a PR with the evidence video link                                   | `SLACK_WEBHOOK_URL`                         |
| `shared/open-blockers.sh`   | lists an issue's open blockers                                                              | `GITHUB_TOKEN`                              |
| `shared/usage-limit.sh`     | did a claude-code-action run stop on a Claude limit (execution file)                        | none                                        |
| `shared/review.mjs`         | parses review agent json; writes the round summary and suggestions                          | none                                        |
| `shared/tool-list.sh`       | an agent's tool list in the job summary                                                     | none                                        |
| `build/check.sh`            | pickup: ready (or a fix round), open and unblocked                                          | `GITHUB_TOKEN`                              |
| `build/prompt.sh`           | the build prompt: template, `build.md`, issue, trusted comments, fix-round text             | `GITHUB_TOKEN`                              |
| `build/agent-last-words.sh` | the agent's final message and refused tools, for a stop without a PR (issue comment, Slack) | none                                        |
| `build/outcome.sh`          | review, paused or human, with the reason                                                    | `GITHUB_TOKEN`                              |
| `review/check.sh`           | factory PR, current head, required checks green, round (max 5)                              | `GITHUB_TOKEN`                              |
| `review/prompt.sh`          | a review agent's prompt                                                                     | `GITHUB_TOKEN`                              |
| `gate/check.sh`             | should the gate act: modes gate, approve, fix; risky files                                  | `GITHUB_TOKEN`                              |
| `gate/gate.mjs`             | risky list matcher; parses the gate agent json; writes the gate comment                     | none                                        |
| `gate/checks-green.sh`      | are a commit's required checks green; waits while they run                                  | `GITHUB_TOKEN`                              |
| `gate/merge.sh`             | squash-merges a PR if its head is unchanged and checks are green                            | `FACTORY_TOKEN` (no agent)                  |
| `sweep/scan.sh`             | the scan: collects board and runs, carries out the plan (`DRY_RUN=1` only prints)           | `GITHUB_TOKEN` + `FACTORY_TOKEN` (no agent) |
| `sweep/scan.mjs`            | the scan's plan: slots, order, missing station, continue cap                                | none                                        |
| `build/stopped.sh`          | the `stopped` comment with the agent's last words                                           | `GITHUB_TOKEN`                              |
| `sweep/board-reconcile.sh`  | moves every card to its label's column (`DRY_RUN=1` only prints)                            | `FACTORY_TOKEN` (no agent)                  |
| `sweep/triage-reminder.sh`  | the triage reminder text, empty when no issue waits                                         | `GITHUB_TOKEN`                              |
| `pr-link/pr-in-review.sh`   | the issues a hand-opened PR closes: label `factory:in-review`, card In review               | `GITHUB_TOKEN` + `FACTORY_TOKEN` (no agent) |

The other scripts are the steps of one workflow each (for example `build/paused.sh`, `review/suggestions.sh`, `checks/evidence-push.sh`); their headers say what they do.

**Claude account:** 2-week pilot on Sunny's Pro token (`CLAUDE_CODE_OAUTH_TOKEN`), Claude Sonnet 5.5. Measure tokens per issue and how often Sunny is locked out, then choose an API key with a spend cap, a bigger plan, or Pro. Switch to an API key before porting to `repo-template`.

## Models

([#190](https://github.com/sredhu37/ripples/issues/190))

Exact model IDs pinned across factory agents, workflows and skills:

| Where                                                                                            | Model               |
| ------------------------------------------------------------------------------------------------ | ------------------- |
| `.claude/agents/build.md`, `gate.md`, `code-quality.md`, `security.md`, `ux-ui.md`, `content.md` | `claude-sonnet-5-5` |
| `--model` in `claude_args` of `factory-build.yml`, `factory-gate.yml`, `factory-review.yml`      | `claude-sonnet-5-5` |
| `.claude/skills/demo/SKILL.md` (with `context: fork`)                                            | `claude-haiku-5-5`  |

## Identity, secrets and permissions

([#113](https://github.com/sredhu37/ripples/issues/113), [#126](https://github.com/sredhu37/ripples/issues/126), [#194](https://github.com/sredhu37/ripples/issues/194), ADR 0011)

| Actor                 | Identity                                                                                                            | Used for                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Agent code            | `claude[bot]` via the Claude GitHub App, Sunny as co-author                                                         | commits and PR on the build branch          |
| Factory plumbing      | machine account `sredhu37-bot`, classic token `FACTORY_TOKEN` (`public_repo`, `project`, `workflow`, 1-year expiry) | board moves, gate merge, workflow push step |
| Label swaps, comments | `GITHUB_TOKEN`                                                                                                      | no new workflow runs, so no loops           |
| Notifications         | Slack app "Ripples Factory", incoming webhook `SLACK_WEBHOOK_URL` (posts only to `#ripples-factory`)                | "Needs human", triage reminder              |

**Environment secrets locked to main:** All factory secrets (`FACTORY_TOKEN`, `CLAUDE_CODE_OAUTH_TOKEN`, `SLACK_WEBHOOK_URL`) are stored in the `factory` GitHub Environment. The environment has a custom deployment branch policy restricted to `main`. Non-main branches receive empty values for all environment secrets, preventing secret exfiltration from unreviewed PR workflows. Repository-level secrets are empty.

**Workflow edits and the push step outside the agent:** When a task modifies `.github/workflows/*`:

1. The build agent creates workflow edits in a separate trailing commit on the PR branch without pushing it.
2. The agent opens or updates the PR with the non-workflow commits first (or an initial commit if only workflows changed).
3. The runner exports unpushed workflow commits as a `git format-patch` artifact.
4. A separate runner job `push-workflows` (no agent, clean checkout, `core.hooksPath=/dev/null`, running in the `factory` environment) applies the patches via `git am --3way` and pushes with `FACTORY_TOKEN`.
5. The agent never receives `FACTORY_TOKEN` or workflow push permissions.
6. The PR touches `.github/**`, which is listed in `.github/gate-paths.txt`. The gate evaluates to `HUMAN`, requiring Sunny's manual review and approval before merging.

**Trusted input:** every agent step sets `include_comments_by_actor` to `sredhu37`, `sredhu37-bot`, `claude[bot]`, `github-actions[bot]`. Other comments stay visible on GitHub but never reach an agent.

**Tools per agent** (`--allowedTools`):

| Agent                                  | Read repo | Edit | npm, git | Web read | Comment | Push   |
| -------------------------------------- | --------- | ---- | -------- | -------- | ------- | ------ |
| build                                  | ✓         | ✓    | ✓        | ✓        | ✓       | own PR |
| ux-ui, security, content, code-quality | ✓         | ✗    | ✗        | ✓        | ✓       | ✗      |
| gate                                   | ✓         | ✗    | ✗        | ✗        | ✓       | ✗      |

The build agent's shell allows `npm`, `npx`, `git`, `ls`, `gh issue view` and the `gh pr` commands of its prompt, one command per call. `.claude/agents/build.md`, section Shell, tells it so, because a refused call costs a turn. The build job installs `web/e2e` and the Playwright browser before the agent starts.

**Rules come from main:** workflows fetch `.claude/agents/*`, `.github/gate-paths.txt`, `docs/writing-lessons.md`, `docs/design.md`, `ARCHITECTURE.md` and `docs/adr/` from `main`, never from the PR branch.

**Never:** `FACTORY_TOKEN` in an agent step. The Claude App cannot change workflow files. The action scrubs secrets from the commands agents run.

## Notifications

([#113](https://github.com/sredhu37/ripples/issues/113), [#124](https://github.com/sredhu37/ripples/issues/124), ADR 0015)

The factory bot posts to Slack `#ripples-factory` only when Sunny has to act or should know:

```
Needs human: PR #130 "Lesson 4 toy"       Triage: 23 waiting
reason: gate HUMAN, new screen            (oldest 9 days)
[video] link to PR                        link to board
```

Normal merges are silent.

## repo-template

([#115](https://github.com/sredhu37/ripples/issues/115), [#117](https://github.com/sredhu37/ripples/issues/117), [#114](https://github.com/sredhu37/ripples/issues/114), [#113](https://github.com/sredhu37/ripples/issues/113))

| Ports to the template                                       | Stays in ripples (and web repos)               |
| ----------------------------------------------------------- | ---------------------------------------------- |
| ux-ui, security, code-quality agents and the finding format | content agent and its rule docs                |
| the 6 `factory:` labels (board optional)                    | oxlint, oxfmt, Lighthouse, Playwright evidence |
| the 4-heading PR summary, `pr-checks.yml` and `/demo` skill | ripples' risky list entries                    |
| the workflows                                               | Pro token (template uses an API key)           |

## Sunny's setup checklist

Steps only a human can do. Filed as one `factory:human` ticket.

1. Create the machine account `sredhu37-bot` (own email, 2FA), invite it to ripples and to board #2, create its classic token with `public_repo`, `project`, and `workflow` scopes.
2. Create GitHub Environment `factory` restricted to branch `main`. Store all 3 secrets (`FACTORY_TOKEN`, `CLAUDE_CODE_OAUTH_TOKEN`, `SLACK_WEBHOOK_URL`) as environment secrets under `factory`. Repository secrets must remain empty.
3. In Slack workspace `redhu-engineering`, create the private channel `#ripples-factory` and the app "Ripples Factory" with an incoming webhook to that channel; store the webhook URL as `SLACK_WEBHOOK_URL` in environment secrets (ADR 0015).
4. Run `claude setup-token`; store it as `CLAUDE_CODE_OAUTH_TOKEN` in environment secrets. Install the Claude GitHub App on ripples.
5. Board #2: add the "Needs human" column (red, description "The factory stopped. Answer, review or merge to move it on."); turn off the 4 board workflows listed under [Labels and board](#labels-and-board).
6. Turn on CodeQL default setup.

## Implementation defaults

Choices the agent made, not decided in a grilling round. Check these.

| Default                 | Value                                                                                                                  | Source                                           |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Model                   | Sonnet for all agents during the pilot                                                                                 | #113 guardrail                                   |
| Turn caps               | build 150, each review agent 15, gate 10                                                                               | #126; build was 60 until the #216 builds ran out |
| Job timeout             | 30 minutes per agent job                                                                                               | #126                                             |
| Spec run time           | revisit if the full run exceeds 10 minutes                                                                             | #117                                             |
| `npm audit`             | default level, which fails on any known hole, including low severity                                                   | new while writing                                |
| Lighthouse in PR CI     | runs against the built app served by `vite preview`                                                                    | new while writing                                |
| Suggestions issue title | `Suggestions from PR #<n>: <PR title>`                                                                                 | new while writing                                |
| Weekly reminder         | Monday 09:00 Europe/Berlin, only when issues wait                                                                      | #124                                             |
| Hourly check            | every hour, at a minute off the hour to avoid GitHub's busy top of the hour                                            | new while writing                                |
| Stopped build           | continued by the scan at most 3 times since the last Ready by hand, then `factory:human` (replaces the 45 minute rule) | #311                                             |
| Approval wait           | after Sunny's approval, wait up to 20 minutes for running checks, then stop with a PR comment                          | new while writing                                |
| `.worktrees/`           | added to `.gitignore` in the first build ticket                                                                        | #109                                             |
