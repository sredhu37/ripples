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
new issue ──► TRIAGE ──► READY ──► BUILD ──► CI TOOLS ──► REVIEW ──► GATE ──► main ──► LIVE CHECK
              (Sunny +   factory:  build     tests,       4 agents   risky     deploy    renders?
               /triage)  ready     agent     lint, ...    FAIL/      list or   (Pages)   errors?
                                     ▲                     SUGGEST.   gate                   │
                                     └──── FAIL: fix round (max 5) ◄──┘ agent            broken:
                                                                         │               redeploy
                                                     HUMAN ──► Sunny (Needs human)        live-good
```

| Station    | Who                         | Trigger                    | Output                                                               |
| ---------- | --------------------------- | -------------------------- | -------------------------------------------------------------------- |
| Triage     | Sunny with `/triage`        | issue has `factory:triage` | `factory:ready` + agent brief, `factory:human`, `wontfix`, or parked |
| Ready      | waiting                     | `factory:ready` added      | build starts when no build runs and all blockers are closed          |
| Build      | build agent                 | pickup                     | PR with the 4-heading summary, specs, `Closes #n`                    |
| CI tools   | GitHub Actions              | PR opened or pushed        | pass, or straight back to build (no round used)                      |
| Review     | 4 review agents             | CI green                   | findings: FAIL or SUGGESTION                                         |
| Gate       | risky list, then gate agent | review passed              | MERGE or HUMAN                                                       |
| Live check | Lighthouse on the live URL  | deploy finished            | tag `live-good` moves, or rollback                                   |

## Labels and board

([#114](https://github.com/sredhu37/ripples/issues/114), facts from [#110](https://github.com/sredhu37/ripples/issues/110), [#112](https://github.com/sredhu37/ripples/issues/112))

Exactly one `factory:` label per issue at a time. The factory swaps it at each step. Labels sit on the issue only; the PR links with `Closes #n`.

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

- Status changes on a user-owned board cannot trigger anything (`projects_v2_item` is org-only), so a label starts the factory and the engine moves the card. Nobody drags cards.
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
- **Triage reminder:** the factory bot sends a Telegram message on Monday at 09:00, only when issues wait: count, age of the oldest, link to the board filtered by `factory:triage`.

## Build

([#113](https://github.com/sredhu37/ripples/issues/113), [#117](https://github.com/sredhu37/ripples/issues/117), [#118](https://github.com/sredhu37/ripples/issues/118))

- **Starts** when an issue gets `factory:ready`, when one of its blockers closes (`issues: closed`), or from the hourly check. One build at a time; waiting builds queue (`queue: max`, up to 100).
- The build agent swaps the label to `factory:in-progress`, implements on a new branch, runs tests, typecheck and build, writes or updates specs, and opens the PR.
- **PR description = the summary**, with four headings: `## What changed`, `## Decisions`, `## Verified` (real command output), `## Left`. The build agent rewrites "Verified" every fix round.
- **Fix rounds:** any FAIL from review sends the PR back to the build agent. Maximum 5 rounds, counted from the factory's review-summary comments on the PR. Round 5 with FAILs left: `factory:human` (the agent is stuck, or the work should become its own ticket).
- **Failures:** a Claude usage limit puts the issue back to `factory:ready` with a comment; the hourly check restarts it later (not counted as a failure). Any other error (crash, timeout, agent says it cannot) sets `factory:human` and sends a Telegram message. No retry counters.

## CI tools

([#115](https://github.com/sredhu37/ripples/issues/115), [#116](https://github.com/sredhu37/ripples/issues/116), [#117](https://github.com/sredhu37/ripples/issues/117))

Deterministic checks run before any review agent. A failure goes straight back to the build agent and uses no review round.

| Check                   | Tool                                                                | Default settings                                                                                                 |
| ----------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Tests, types, build     | `npm run test`, `npm run typecheck`, `npm run build`                | as today                                                                                                         |
| Code mistakes           | oxlint                                                              | defaults, no config                                                                                              |
| Formatting              | oxfmt (no Prettier)                                                 | defaults                                                                                                         |
| Dependency holes        | `npm audit`                                                         | defaults                                                                                                         |
| XSS, injection patterns | CodeQL default setup                                                | to turn on                                                                                                       |
| Secrets                 | GitHub secret scanning + push protection                            | already on                                                                                                       |
| Speed                   | Lighthouse CI (`@lhci/cli`), median of 3 runs, one retry on failure | fail on LCP > 2.5 s, CLS > 0.1, TBT > 200 ms                                                                     |
| Accessibility basics    | Lighthouse accessibility audits                                     | any failed audit fails                                                                                           |
| Lesson content counts   | `src/content/content.test.ts`                                       | new: max 15 words per sentence; question max 20 words, options under 15; no "Bartek"; diagram labels max 4 words |
| Save-code order         | new test on `src/lessons.ts`                                        | an existing lesson id never changes position                                                                     |
| Specs present           | CI rule                                                             | a change to `*.tsx` or `*.css` must change at least one `e2e/*.spec.ts`                                          |
| Specs pass              | Playwright (all specs, video on)                                    | see [Evidence](#evidence)                                                                                        |

- ESLint is not used while `typescript-eslint` supports only TypeScript below 6.1; ripples uses 7.0.2. Switching later is its own ticket.
- A one-time PR applies oxfmt to the whole repo and fixes existing accessibility and content-count failures.

## Review

([#115](https://github.com/sredhu37/ripples/issues/115))

Four review agents, all on every PR and all again after every fix round. They run in parallel once CI is green. An agent with nothing to check returns PASS with a reason (for example "no UI changed").

| Agent        | Checks                                                                                                                                                 | Sources, in order                                                                                                                                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ux-ui        | friction (too many buttons, taps or choices), confusing screens, Ripples UX rules, what tools cannot see in WCAG                                       | Ripples rules in `docs/design.md` "Experience" (moved there from agent notes), [Nielsen's 10 heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/), [Laws of UX](https://lawsofux.com/hicks-law/), [WCAG 2.2 AA](https://www.w3.org/WAI/WCAG22/quickref/)  |
| security     | private data readable in client code, unsafe input handling (save codes), prompt injection, app-specific logic holes                                   | [OWASP Top 10](https://owasp.org/Top10/), [OWASP DOM XSS cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html), [OWASP LLM01](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)                                      |
| content      | plain words for a 10-year-old, a physical anchor before each concept, story arc, each fact against its source, natural DE and PL with the same meaning | `docs/writing-lessons.md` (rules from agent notes moved in: per-language character names, the "Bartek" ban, balanced starred terms), `docs/AGE_10_STANDARD.md`                                                                                                               |
| code-quality | where code goes, reuse, naming, design, the change has a test                                                                                          | `ARCHITECTURE.md` and `docs/adr/` first, then standards picked to fit the change ([Google TS Style Guide](https://google.github.io/styleguide/tsguide.html), [React docs](https://react.dev/learn/thinking-in-react), ...). Repo decisions win on conflict. No own rule doc. |

**Finding format** (all agents, plain words):

```
FAIL | SUGGESTION
Problem: "Start over" deletes progress with no confirm
Where:   src/lesson/LessonRunner.tsx:84
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

`src/progress.ts`, `public/sw.js`, `public/manifest.webmanifest`, `package.json`, `package-lock.json`, `vite.config.ts`, `.github/**`, `AGENTS.md`, `CLAUDE.md`, `.claude/**`, `ARCHITECTURE.md`, `docs/**`, `LICENSE`, `LICENSE-CONTENT.txt`, `LICENSING.md`.

**Gate agent** (PRs outside the risky list):

- Writes an open risk analysis. Per risk: what breaks, who notices, how likely, can it be undone fast. Starts from Ripples' weak spots: offline cache (own address only), saved progress, 3 languages, parent panel, children's privacy.
- Fixed rule. HUMAN if any of:
  - a risk is likely and a child would notice;
  - a risk cannot be undone by merging a fix;
  - a product or privacy call: new screen or path, something kids have is removed or renamed, new child input or saved data, new outside address;
  - the agent is unsure.
    Otherwise MERGE.
- Output: one PR comment with the risks, MERGE or HUMAN, and the reason.

**Ruleset on main:** PR only, every CI check green, no force-push, Sunny on the bypass list.

**Sunny's review:** pressing Merge is the approval. A comment from Sunny on a PR in "Needs human" starts a fix run; a question gets a reply instead of a code change. After the fix the PR returns to Sunny, not the gate (once HUMAN, stays HUMAN). These rounds do not count toward the 5-round limit.

## Evidence

([#117](https://github.com/sredhu37/ripples/issues/117))

- One Playwright **spec** per screen (`e2e/`; ripples has 5 screens: map, lesson, facts, parents, timeline). Each spec is a test and records the demo.
- The lesson spec takes lesson ids. CI passes the ids from changed `src/content/<id>.*` files and runs them in EN, DE and PL. A change only in `src/content/**` needs no spec edit.
- Every PR runs all specs with video on. Each step saves a screenshot.
- The **evidence branch** `evidence` holds `pr-<n>/step-*.png` and `pr-<n>/demo.mp4` (the spec videos joined with ffmpeg; Playwright draws the pointer and outlines each clicked element). One **evidence comment** per PR, updated in place, shows the screenshots inline, links the walkthrough video through jsDelivr (GitHub strips video players from comments and serves raw `.mp4` as a download; jsDelivr serves it as `video/mp4`, so the browser's own player can pause and rewind), and links the full video artifact (90-day retention).
- Review agents and the gate agent read the PNGs. Sunny watches on HUMAN PRs.
- After merge, CI deletes `pr-<n>/` and rewrites `evidence` to a single commit.
- `demo.yml` is fixed first: it fails on every PR today (job-level `if` uses `hashFiles`).

## Deploy and live check

([#116](https://github.com/sredhu37/ripples/issues/116), [#113](https://github.com/sredhu37/ripples/issues/113))

```
merge ──► pages.yml: build ──► deploy ──► live-check
                                            │ wait until version.txt shows the new commit
                                            │ Lighthouse on the live URL: renders? console errors?
                                            ├─ ok ──────► move tag live-good to this commit
                                            └─ broken ──► same run: build tag live-good, deploy
                                                          + open revert PR for main
                                                          + Telegram to Sunny
```

- The live site serves the last uploaded build (`build_type: workflow`), not the main branch, so a rollback needs no merge.
- The live check has no speed limits (live network varies; speed is checked before merge).
- The revert PR is opened with `FACTORY_TOKEN`, so its checks run without an approval click. It waits for Sunny's merge.
- At setup, `live-good` is placed once on the current main.

## Engine

([#113](https://github.com/sredhu37/ripples/issues/113), research [#111](https://github.com/sredhu37/ripples/issues/111))

GitHub Actions runs the factory. Agent steps use `anthropics/claude-code-action`. Hermes is Sunny's cockpit (ask it about the factory), not the engine.

| Workflow             | Runs on                                                                               | Does                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `factory-build.yml`  | `issues: labeled` (`factory:ready`), `issues: closed` (unblocks), `workflow_dispatch` | pickup, label swap, build agent, opens PR                                                   |
| `factory-review.yml` | `workflow_run` (CI workflows done on a factory PR), `workflow_dispatch`               | 4 review agents in parallel, suggestions issue, fix round, round counter                    |
| `factory-gate.yml`   | review passed                                                                         | risky list, gate agent, merge with `FACTORY_TOKEN` or `factory:human`                       |
| `factory-sweep.yml`  | hourly at :07; Monday 09:00 Europe/Berlin; `workflow_dispatch` (`task`, `dry_run`)    | restart paused `factory:ready` tickets, flag stuck builds, board reconcile; triage reminder |
| `factory-sync.yml`   | `issues: labeled, closed, reopened`                                                   | card to the label's column; close sets `factory:done`                                       |
| `pages.yml`          | push to main                                                                          | build, deploy, live check, rollback                                                         |
| `demo.yml` (fixed)   | `pull_request`                                                                        | specs, evidence branch, evidence comment                                                    |

Shared scripts in `.github/scripts/`, for every factory workflow:

| Script                 | Does                                                                  | Token                      |
| ---------------------- | --------------------------------------------------------------------- | -------------------------- |
| `label-set.sh`         | gives an issue exactly one `factory:` label                           | `GITHUB_TOKEN`             |
| `board-move.sh`        | moves the issue's card to a Status column, adds the card if missing   | `FACTORY_TOKEN` (no agent) |
| `telegram.sh`          | sends a factory bot message to Sunny                                  | `TELEGRAM_TOKEN` + chat id |
| `open-blockers.sh`     | lists an issue's open blockers                                        | `GITHUB_TOKEN`             |
| `next-unblocked.sh`    | oldest `factory:ready` issue a closed issue unblocked                 | `GITHUB_TOKEN`             |
| `usage-limit.sh`       | did a claude-code-action run stop on a Claude limit (execution file)  | none                       |
| `build-runs-active.sh` | lists the `factory-build` runs that have not finished                 | `GITHUB_TOKEN`             |
| `sweep-restart.sh`     | oldest unblocked `factory:ready` issue to restart, when no build runs | `GITHUB_TOKEN`             |
| `sweep-stuck.sh`       | `factory:in-progress` issues with no build run for over 45 minutes    | `GITHUB_TOKEN`             |
| `triage-reminder.sh`   | the triage reminder text, empty when no issue waits                   | `GITHUB_TOKEN`             |
| `board-reconcile.sh`   | moves every card to its label's column (`DRY_RUN=1` only prints)      | `FACTORY_TOKEN` (no agent) |
| `review-gate.sh`       | factory PR, current head, required checks green, round (max 5)        | `GITHUB_TOKEN`             |
| `review.mjs`           | parses review agent json; writes the round summary and suggestions    | none                       |

**Claude account:** 2-week pilot on Sunny's Pro token (`CLAUDE_CODE_OAUTH_TOKEN`), Sonnet. Measure tokens per issue and how often Sunny is locked out, then choose an API key with a spend cap, a bigger plan, or Pro. Switch to an API key before porting to `repo-template`.

## Identity, secrets and permissions

([#113](https://github.com/sredhu37/ripples/issues/113), [#126](https://github.com/sredhu37/ripples/issues/126))

| Actor                 | Identity                                                                                                                     | Used for                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Agent code            | `claude[bot]` via the Claude GitHub App, Sunny as co-author                                                                  | commits and PR on the build branch                         |
| Factory plumbing      | machine account `sredhu37-bot`, classic token `FACTORY_TOKEN` (`public_repo`, `project`, 1-year expiry; no `workflow` scope) | board moves, gate merge (so `pages.yml` fires), revert PRs |
| Label swaps, comments | `GITHUB_TOKEN`                                                                                                               | no new workflow runs, so no loops                          |
| Notifications         | Telegram factory bot, `TELEGRAM_TOKEN` + chat id                                                                             | "Needs human", rollbacks, triage reminder                  |

**Trusted input:** every agent step sets `include_comments_by_actor` to `sredhu37`, `sredhu37-bot`, `claude[bot]`, `github-actions[bot]`. Other comments stay visible on GitHub but never reach an agent.

**Tools per agent** (`--allowedTools`):

| Agent                                  | Read repo | Edit | npm, git | Web read | Comment | Push   |
| -------------------------------------- | --------- | ---- | -------- | -------- | ------- | ------ |
| build                                  | ✓         | ✓    | ✓        | ✓        | ✓       | own PR |
| ux-ui, security, content, code-quality | ✓         | ✗    | ✗        | ✓        | ✓       | ✗      |
| gate                                   | ✓         | ✗    | ✗        | ✗        | ✓       | ✗      |

**Rules come from main:** workflows fetch `.claude/agents/*`, `.github/gate-paths.txt`, `docs/writing-lessons.md`, `docs/AGE_10_STANDARD.md`, `docs/design.md`, `ARCHITECTURE.md` and `docs/adr/` from `main`, never from the PR branch.

**Never:** `FACTORY_TOKEN` in an agent step. The Claude App cannot change workflow files. The action scrubs secrets from the commands agents run.

## Notifications

([#113](https://github.com/sredhu37/ripples/issues/113), [#124](https://github.com/sredhu37/ripples/issues/124))

The factory bot messages Sunny only when he has to act or should know:

```
Needs human: PR #130 "Lesson 4 toy"       Live site rolled back to live-good    Triage: 23 waiting
reason: gate HUMAN, new screen            broken: #131                          (oldest 9 days)
[video] link to PR                       revert PR #132 waits for your merge   link to board
```

Normal merges are silent.

## repo-template

([#115](https://github.com/sredhu37/ripples/issues/115), [#117](https://github.com/sredhu37/ripples/issues/117), [#114](https://github.com/sredhu37/ripples/issues/114), [#113](https://github.com/sredhu37/ripples/issues/113))

| Ports to the template                                        | Stays in ripples (and web repos)               |
| ------------------------------------------------------------ | ---------------------------------------------- |
| ux-ui, security, code-quality agents and the finding format  | content agent and its rule docs                |
| the 6 `factory:` labels (board optional)                     | oxlint, oxfmt, Lighthouse, Playwright evidence |
| the 4-heading PR summary, fixed `demo.yml` and `/demo` skill | ripples' risky list entries                    |
| the workflows                                                | Pro token (template uses an API key)           |

## Sunny's setup checklist

Steps only a human can do. Filed as one `factory:human` ticket.

1. Create the machine account `sredhu37-bot` (own email, 2FA), invite it to ripples and to board #2, create its classic token, store it as `FACTORY_TOKEN`.
2. Create the Telegram factory bot in BotFather; store `TELEGRAM_TOKEN` and the chat id.
3. Run `claude setup-token`; store it as `CLAUDE_CODE_OAUTH_TOKEN`. Install the Claude GitHub App on ripples.
4. Board #2: add the "Needs human" column (red, description "The factory stopped. Answer, review or merge to move it on."); turn off the 4 board workflows listed under [Labels and board](#labels-and-board).
5. Turn on CodeQL default setup.

## Implementation defaults

Choices the agent made, not decided in a grilling round. Check these.

| Default                 | Value                                                                                                                 | Source            |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Model                   | Sonnet for all agents during the pilot                                                                                | #113 guardrail    |
| Turn caps               | build 60, each review agent 15, gate 10                                                                               | #126              |
| Job timeout             | 30 minutes per agent job                                                                                              | #126              |
| Spec run time           | revisit if the full run exceeds 10 minutes                                                                            | #117              |
| Live check wait         | poll `version.txt` with a cache-busting query; Pages caches for 10 minutes                                            | #116              |
| `npm audit`             | default level, which fails on any known hole, including low severity                                                  | new while writing |
| Lighthouse in PR CI     | runs against the built app served by `vite preview`                                                                   | new while writing |
| Suggestions issue title | `Suggestions from PR #<n>: <PR title>`                                                                                | new while writing |
| Weekly reminder         | Monday 09:00 Europe/Berlin, only when issues wait                                                                     | #124              |
| Hourly check            | every hour, at a minute off the hour to avoid GitHub's busy top of the hour                                           | new while writing |
| Stuck build             | `factory:in-progress` set by the factory over 45 minutes ago, no build run that could be building it: `factory:human` | #143              |
| `.worktrees/`           | added to `.gitignore` in the first build ticket                                                                       | #109              |
