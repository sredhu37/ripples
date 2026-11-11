# Agent engine options for the Ripples factory line

Research ticket: [#111](https://github.com/sredhu37/ripples/issues/111). Part of map #109.
Related: [GitHub Projects automation (#110)](https://github.com/sredhu37/ripples/blob/research/github-projects-automation/docs/research/github-projects-automation.md), [build-review loop decision (#118)](https://github.com/sredhu37/ripples/issues/118).
Checked on 2026-11-11 with Claude Code 2.1.300, `gh` 2.103.3, Hermes Agent v0.23.1. Nothing was installed and no repo settings or secrets were changed.

Labels used below:
- **Verified**: read in a primary source linked next to the claim.
- **Observed**: seen on Sunny's Mac or in this repo during this research.
- **Doc-based**: the docs say it works; not tried here.
- **Unverified**: inference or general knowledge. Test before relying on it.

## Summary

| Question | Short answer |
|---|---|
| Which engines are realistic? | (A) Hermes Kanban on the Mac, (B) GitHub Actions with `anthropics/claude-code-action`, (C) hybrid: GitHub is the source of truth, Hermes on the Mac executes some or all stations. |
| Can a Pro subscription run agents in CI? | Yes. Anthropic documents `claude setup-token` and the `CLAUDE_CODE_OAUTH_TOKEN` secret for Pro in GitHub Actions. Usage counts against Sunny's personal 5-hour and weekly limits, which "assume ordinary, individual usage". |
| Can Hermes itself use the Pro subscription? | No. Hermes docs say Pro cannot use the Anthropic OAuth path. Hermes workers can still shell out to the unmodified `claude` binary signed in with Sunny's own subscription. |
| What stops when the Mac sleeps? | Everything in A, and the Mac-side half of C. B keeps running. |
| What ports cleanly to `repo-template`? | B: workflow files travel with the template. A does not travel at all (config lives in `~/.hermes`). |
| Agent's recommendation | B for the line, with a Pro OAuth token for the ripples pilot and a switch to an API key before rollout to other repos. Details at the end. |

## The stations, and what each engine must do

| Station | Trigger | Agent work |
|---|---|---|
| READY to BUILD | Issue gets label `ready-for-agent` | Build agent: branch, implement, test, open PR that says `Closes #N`. |
| REVIEW | PR opened, or new commits pushed | 5 specialist reviewers in parallel (ux-ui, security, performance, +2), plus CI, demo video (`demo.yml` already exists), summary doc. |
| Fix loop | Reviewers left blocking findings | Build agent fixes and pushes. Max 5 rounds, then hand to a human (decision in #118). |
| GATE | All reviewers clean, CI green | Low risk: merge to `main`. Else: label for human review. |

Note (observed): the `ready-for-agent` label does not exist in `sredhu37/ripples` yet (`gh label list`). It must be created before any engine can trigger on it.

## Cross-cutting facts

### Authentication and Terms of Service

- **Pro OAuth token in CI is documented by Anthropic.** The Claude Code GitHub Actions page lists `CLAUDE_CODE_OAUTH_TOKEN`: "an OAuth token that authenticates with your Claude subscription, available on Pro, Max, Ultra, Team, and Enterprise plans. Generate one by running `claude setup-token` locally." Verified: [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions). The action's own setup guide says the same. Verified: [claude-code-action setup.md](https://github.com/anthropics/claude-code-action/blob/main/docs/setup.md).
- **Token lifetime.** `claude setup-token` generates "a one-year OAuth token" for "CI pipelines, scripts, or other environments where interactive browser login isn't available". Verified: [Authentication](https://code.claude.com/docs/en/authentication#generate-a-long-lived-token).
- **Consumer Terms.** Prohibited use includes "Except when you are accessing our Services via an Anthropic API Key or where we otherwise explicitly permit it, to access the Services through automated or non-human means, whether through a bot, script, or otherwise." Verified: [Consumer Terms](https://www.anthropic.com/legal/consumer-terms). Reading (unverified, not legal advice): the GitHub Actions docs above are the explicit permission for Claude Code in CI with a subscription token.
- **Ordinary individual use.** "Advertised usage limits for Pro, Max, and Ultra plans assume ordinary, individual usage of Claude Code and the Agent SDK." Verified: [Legal and compliance](https://code.claude.com/docs/en/legal-and-compliance#acceptable-use). A factory running 5 reviewers x up to 5 rounds per issue is the kind of load this sentence is about. It is not a ban, but it is the risk.
- **Third-party tools on subscription credentials.** "Anthropic does not permit third-party developers to offer Claude.ai login into their own applications, or to route requests through Free, Pro, Max, or Ultra plan credentials on behalf of their users." The same section does not prevent "an end user from signing in to the unmodified Claude Code binary with their own Claude subscription". Verified: [Legal and compliance, Authentication and credential use](https://code.claude.com/docs/en/legal-and-compliance#authentication-and-credential-use).
  - Consequence for Hermes: Hermes docs say "Claude Pro subscribers cannot use this path; the supported alternative is an `ANTHROPIC_API_KEY`". Verified: [Hermes providers, subscription plans](https://hermes-agent.nousresearch.com/docs/integrations/providers#subscription-plans-what-your-plan-pays-for). So a Hermes worker's own LLM loop runs on OmniRoute, a local model, or an API key. To use the Pro plan, the worker must run `claude -p` (the unmodified binary).
  - Unverified: which upstream accounts the local OmniRoute proxy uses. `GET /v1/models` on `localhost:20128` returned an empty list. If OmniRoute routes Claude traffic through a Pro or Max OAuth login, that conflicts with the sentence above. Check before using it for factory agents.
- **API key precedence trap.** If `ANTHROPIC_API_KEY` is set, Claude Code uses it instead of the subscription and bills at API rates. In `-p` mode "the key is always used when present". Verified: [Authentication precedence](https://code.claude.com/docs/en/authentication#authentication-precedence), [Use Claude Code with your Pro, Max, or Ultra plan](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan).
- **Shared secrets across repos.** Anthropic: "For a secret shared across repositories, authenticate with an API key from the Claude Console rather than an OAuth token, since an OAuth token is tied to the subscription of the person who ran `claude setup-token`." Verified: [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions).

### Pro usage limits

- Pro costs $20 per month billed monthly ($17 per month on annual). Pro has "More usage than Free, every 5 hours and every week". Max is 5x Pro, Ultra 10x Pro weekly. Verified: [claude.com/pricing](https://claude.com/pricing?mode=code).
- "Pro and Max plans have a five-hour session limit and a weekly limit." The limits are "shared across Claude and Claude Code, meaning all activity in both tools counts against the same limits." Verified: [Use Claude Code with your Pro, Max, or Ultra plan](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan).
- Anthropic does not publish token numbers for these limits. The Pro plan page adds that Anthropic "may limit your usage in other ways, such as weekly and monthly caps". Verified: [What is the Pro plan?](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan).
- Past the limit, Pro users can enable paid usage credits or wait for reset. Verified: same support article.
- Practical effect (unverified, estimate): every factory run and every interactive Claude or Claude Code session Sunny runs draws from one bucket. A busy factory day can lock Sunny out of his own Claude Code until the 5-hour window resets.

### API pricing (pay per token)

Verified from [claude.com/pricing](https://claude.com/pricing#api), per million tokens:

| Model | Input | Output | Cache read | Cache write |
|---|---|---|---|---|
| Haiku 5.5 (prompts up to 100K) | $0.10 | $0.50 | $0.01 | $0.125 |
| Sonnet 5.5 | $2 | $10 | $0.10 | $2.50 |
| Opus 5.5 | $4 | $20 | $0.20 | $5 |

Anthropic's own reference point: "Across enterprise deployments, the average cost is around $13 per developer per active day". Verified: [Costs](https://code.claude.com/docs/en/costs).

Per-issue estimate on Sonnet 5.5 (unverified, not measured; measure in the pilot):
- Build: ~2M cache-read tokens, ~200K fresh input, ~50K output, about $1 to $2.
- One reviewer pass: ~150K input, ~5K output, about $0.35. Five reviewers: about $1.75 per round.
- Typical issue (1 build, 2 review rounds, 1 fix): roughly $5 to $8. Opus roughly doubles it.

### GitHub Actions facts

- Standard GitHub-hosted runners are free for public repositories. `sredhu37/ripples` and `sredhu37/repo-template` are both public (observed: `gh repo view`). Private repos use the plan's included compute, then Linux runners cost $0.006 per minute. Verified: [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions).
- Concurrency: 20 concurrent jobs on GitHub Free, 40 on Pro (standard hosted runners). Jobs on hosted runners stop at 6 hours. Verified: [Actions limits](https://docs.github.com/en/actions/reference/limits).
- "Events triggered by the `GITHUB_TOKEN` will not create a new workflow run", except `workflow_dispatch` and `repository_dispatch`. Verified: [GITHUB_TOKEN](https://docs.github.com/en/actions/concepts/security/github_token).
- Workflows can trigger on `issues` with type `labeled`, `pull_request` (`opened`, `synchronize`), `pull_request_review`, `pull_request_review_comment`, `issue_comment`, `schedule`, `workflow_dispatch`, `workflow_run`. There is no Projects v2 event. Verified: [Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows).
- The `projects_v2_item` webhook is available for `organization` only, so a Status change on Sunny's user-owned board #2 cannot trigger anything. Verified: [Webhook events and payloads](https://docs.github.com/en/webhooks/webhook-events-and-payloads#projects_v2_item). Consequence for every option: the trigger for BUILD is the `ready-for-agent` label, not the board column.
- `schedule` runs at most every 5 minutes, can be delayed or dropped under load, and is disabled after 60 days without activity in public repos. Verified: [Events that trigger workflows, schedule](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).
- Secrets live at organization, repository, or environment level. Verified: [Secrets](https://docs.github.com/en/actions/concepts/security/secrets). Sunny's repos are personal, so each repo needs its own secret.

### claude-code-action facts

All verified from the [README](https://github.com/anthropics/claude-code-action) and its docs folder unless marked.

- Runs on your GitHub runner. Auth inputs: `anthropic_api_key`, `claude_code_oauth_token`, workload identity federation, Bedrock, Vertex, Foundry. ([usage.md](https://github.com/anthropics/claude-code-action/blob/main/docs/usage.md))
- Triggers: `@claude` mention, `assignee_trigger`, `label_trigger` ("The label name that triggers the action when applied to an issue"), or any event plus a `prompt` input, which "Runs in automation mode, executes immediately". ([usage.md](https://github.com/anthropics/claude-code-action/blob/main/docs/usage.md), [faq.md](https://github.com/anthropics/claude-code-action/blob/main/docs/faq.md))
- Limits: "Claude cannot submit formal GitHub PR reviews", "cannot approve pull requests", cannot merge or rebase. It can post inline comments through `mcp__github_inline_comment__create_inline_comment`. ([capabilities-and-limitations.md](https://github.com/anthropics/claude-code-action/blob/main/docs/capabilities-and-limitations.md), [solutions.md](https://github.com/anthropics/claude-code-action/blob/main/docs/solutions.md))
- On an issue it "always creates a new branch"; on an open PR it "always pushes directly to the existing PR branch". In its default `@claude` configuration it does not open PRs; it posts a link. ([capabilities-and-limitations.md](https://github.com/anthropics/claude-code-action/blob/main/docs/capabilities-and-limitations.md), [security.md](https://github.com/anthropics/claude-code-action/blob/main/docs/security.md)) Unverified: in automation mode, allowing `Bash(gh pr create:*)` lets it open the PR itself.
- Only users with write access can trigger it. "By default, GitHub Apps and bots cannot trigger this action"; `allowed_bots` opens that up. ([security.md](https://github.com/anthropics/claude-code-action/blob/main/docs/security.md))
- Pushes made through the Claude GitHub App do trigger other workflows; pushes made with the default `GITHUB_TOKEN` do not. ([Claude Code GitHub Actions troubleshooting](https://code.claude.com/docs/en/github-actions))
- Structured outputs: `--json-schema` in `claude_args` makes `steps.<id>.outputs.structured_output` available to later steps. ([usage.md, Structured Outputs](https://github.com/anthropics/claude-code-action/blob/main/docs/usage.md#structured-outputs))
- Cost controls Anthropic recommends: `--max-turns`, workflow timeouts, GitHub concurrency controls. ([Claude Code GitHub Actions, Manage costs](https://code.claude.com/docs/en/github-actions#manage-costs))

## Option A: Hermes Kanban dispatcher on the Mac

**Shape.** The Hermes board is the line. Profiles: `builder`, five reviewer profiles, maybe a `gate` profile. The dispatcher runs inside the Hermes gateway and ticks every 60 s (observed config: `dispatch_in_gateway: true`, `dispatch_interval_seconds: 60`, `review_dispatch: true`).

**How it notices work.**
- Hermes Kanban has no GitHub issue sync in its docs (unverified absence; searched the [Kanban page](https://hermes-agent.nousresearch.com/docs/user-guide/features/kanban)). Something must create cards:
  - a Hermes cron job (script-only, no LLM) that runs `gh issue list --label ready-for-agent` and creates a card per issue with `--idempotency-key issue-<N>`. Doc-based: [cron](https://hermes-agent.nousresearch.com/docs/user-guide/features/cron), idempotency key on `kanban create` ([Kanban](https://hermes-agent.nousresearch.com/docs/user-guide/features/kanban)).
  - or a Hermes webhook route for GitHub `issues` / `pull_request` events, with HMAC check, `filters` and `coalesce`. Doc-based: [Hermes webhooks](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/webhooks). Needs a public URL to the Mac (tunnel), and "GitHub does not automatically redeliver failed webhook deliveries". Verified: [Handling failed webhook deliveries](https://docs.github.com/en/webhooks/using-webhooks/handling-failed-webhook-deliveries).
- New PR or review comments: the build-review loop lives inside Hermes, so it does not need to notice GitHub comments. Human comments on the PR would need the same poller.

**Build-review loop.** Native and the best fit of the three.
- Builder works in a `worktree` workspace (preserved on completion), then calls `kanban_request_review`. Reviewer verdicts are `kanban_complete` (approve), `kanban_request_changes` (back to the same implementer), or `kanban_block` (human). Doc-based: [Kanban](https://hermes-agent.nousresearch.com/docs/user-guide/features/kanban) and the local `sdlc-review` skill (`~/.hermes/skills/devops/sdlc-review/SKILL.md`).
- 5-round cap: no documented review-round limit. `failure_limit` (default 2) and `--max-retries` count spawn failures, not review rounds. The sdlc-review skill already counts rounds from prior `changes_requested` attempts, so the cap is a rule in the reviewer skill: on round 5 with defects left, `kanban_block` with "escalation: 5 rounds". Unverified until built.
- Five parallel specialists: the review lane spawns one reviewer per card. For five, either five child review cards or `hermes kanban swarm` (N parallel workers, a verifier gated on all, a synthesizer). Doc-based, not tried.
- Gate: PR completion contracts (`--completion-contract OWNER/REPO`) refuse to complete a card unless required checks on the exact PR head are green. Doc-based: [Kanban, PR completion contracts](https://hermes-agent.nousresearch.com/docs/user-guide/features/kanban#pr-completion-contracts). Merge with Sunny's `gh` login, so the push to `main` does trigger `pages.yml`.

**Cost.** No GitHub minutes. LLM: OmniRoute or local model (free or proxy-dependent), an Anthropic API key, or `claude -p` on the Pro plan (fixed $20, rate-limited).

**Auth and ToS.** Hermes's own model calls cannot use Pro. Workers that run `claude -p` in the worktree use the unmodified binary with Sunny's login, which the legal page allows. Usage still counts against his limits.

**Parallelism.** `max_in_progress` and `max_in_progress_per_profile` are unset, which means unlimited (observed config, [Kanban concurrency config](https://hermes-agent.nousresearch.com/docs/user-guide/features/kanban#concurrency-scheduling-and-child-promotion-config)). Real limits: M1 Pro RAM and CPU (Vite builds, Playwright), and one Pro bucket shared by every parallel `claude -p`. The dispatcher backs off after a 429 (`rate_limit_cooldown`, `blocker_auth`), which helps.

**Mac asleep.** The line stops. `pmset -g` shows "sleep prevented by Hermes, powerd" (observed), so idle sleep is held off while the gateway runs. Closing the lid on battery still sleeps the Mac (unverified, normal macOS behavior). Cron catches up missed slots within a window of half the period, clamped to 2 min to 2 h ([cron catch-up](https://hermes-agent.nousresearch.com/docs/user-guide/features/cron#catch-up-window)). Webhooks sent while asleep are lost unless redelivered.

**Port to `repo-template`.** Poor. Profiles, board, cron jobs and webhook routes live in `~/.hermes` on one Mac. The template can carry `AGENTS.md`, skills and scripts, but each new repo needs a Hermes poller entry and `default_workdir`. Nobody but Sunny can run it.

**Second source of truth.** The Hermes board would duplicate GitHub Projects board #2. Agents would have to mirror Status with `gh project item-edit` (see #110).

## Option B: GitHub Actions with claude-code-action

**Shape.** Four workflow files in `.github/workflows/`, one per station. Agents are steps that call `anthropics/claude-code-action@v1` with a `prompt` (automation mode).

**How it notices work.**
- BUILD: `on: issues: types: [labeled]` with `if: github.event.label.name == 'ready-for-agent'`. Sunny applies the label (write access, so the permission check passes). Verified events: [Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows).
- REVIEW: `on: pull_request: types: [opened, synchronize, ready_for_review]`. The same pattern as the action's PR review solution. Verified: [solutions.md](https://github.com/anthropics/claude-code-action/blob/main/docs/solutions.md).
- Human comments: `issue_comment` or `pull_request_review_comment` with `@claude`.

**Build-review loop with a 5-round cap** (design, unverified until built):
1. Build job: claude-code-action on the issue, implements on a new branch, opens the PR. Pushes go through the Claude GitHub App, so `pull_request` workflows (`demo.yml`, review) do run.
2. Review workflow on `opened` / `synchronize`: a `strategy.matrix` of the five reviewer prompts, each with `--max-turns` and `--json-schema` so it returns `{blocking: bool, findings: [...]}`. Each also posts inline comments.
3. Aggregate job reads the five outputs. Round number = a `factory-round:N` label on the PR (or a count of summary comments).
4. If blocking and N < 5: increment the label, run a fix step (claude-code-action on the PR branch with the findings in the prompt). Its push through the Claude App fires `synchronize`, which starts round N+1.
5. If blocking and N = 5: add `ready-for-human`, comment the open findings, stop.
6. If clean: hand to the gate job.

Pitfalls to design around:
- The `synchronize` event from a push by `claude[bot]` has a bot actor. The action blocks bots by default, so the review workflow needs `allowed_bots: claude` (doc-based: [security.md](https://github.com/anthropics/claude-code-action/blob/main/docs/security.md)). Keep `allowed_bots` narrow; the docs warn that on public repos `'*'` lets external Apps invoke it.
- Labels and comments written with `GITHUB_TOKEN` do not start new runs. That is useful (no accidental loops) but means the round counter cannot be the trigger.
- `concurrency: group: review-${{ github.event.pull_request.number }}` with `cancel-in-progress: true`, so a new push cancels the stale round. ([Control workflow concurrency](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency))
- The action cannot approve. The "approval" is the aggregate job's clean result, recorded as a commit status or label.

**Gate.** A plain script step, not an agent: if risk label is `risk:low`, all required checks are green, and the aggregate is clean, run `gh pr merge --squash`. Else add `ready-for-human`. Pitfall: a merge done with `GITHUB_TOKEN` does not fire `pages.yml` (`on: push: branches: [main]`, observed). Either merge with the Claude App or a PAT token, or call `gh workflow run pages.yml` after the merge (`workflow_dispatch` is exempt from the `GITHUB_TOKEN` rule; `pages.yml` already has it).

**Cost.** Actions minutes are free on public repos. LLM: Pro token (fixed $20, rate-limited, shared with Sunny's own use) or API key (pay per token, see estimate above).

**Auth and ToS.** Pro token in CI is explicitly documented (see Cross-cutting). Risks: the "ordinary, individual usage" sentence, and one person's subscription powering a shared pipeline. API key or workload identity federation has neither problem.

**Parallelism.** 20 concurrent jobs on GitHub Free. Five reviewers in a matrix run at once. The real ceiling with a Pro token is the 5-hour bucket, not GitHub.

**Mac asleep.** No effect. GitHub queues the event and runs the job.

**Port to `repo-template`.** Best. A repo made from the template gets the same "directory structure, branches, and files" ([Creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)), so the workflows and prompt files travel. Per new repo, still manual:
- install the Claude GitHub App on it (or install once for all repos),
- `gh secret set ANTHROPIC_API_KEY` (no user-level Actions secrets for personal accounts),
- `gh label clone sredhu37/repo-template` for `ready-for-agent`, `ready-for-human`, `risk:*`, `factory-round:*` (labels are not listed among what a template copies; unverified that they are skipped, but the docs only name files and branches),
- add the repo to a Projects board if wanted.

## Option C: Hybrid, GitHub is the source of truth

**Shape.** Labels, PRs, comments and board #2 hold all state. Hermes on the Mac is one executor among others. Two useful splits:

- **C1, Mac builds, Actions reviews.** A Hermes cron poller picks up `ready-for-agent` issues, creates a Kanban card (idempotency key = issue number), a worker runs `claude -p` in a worktree on the Pro plan and opens the PR. Everything after the PR (reviewers, demo, summary, gate) runs in Actions as in B. Fix rounds: the Actions aggregate adds a label such as `needs-fix`; the Mac poller sees it and runs a fix card. Round counter stays on the PR label.
- **C2, Mac does all agent work.** The poller also watches open factory PRs for review state; GitHub only hosts CI and the demo video. This is A with GitHub as the board.

**How it notices work.** Polling with `gh` every few minutes (safe: no inbound port, nothing lost while asleep, it catches up on wake). Webhook routes are faster but need a tunnel and lose events while the Mac sleeps.

**Cost.** Builds on Pro (fixed), reviews on Actions with Pro or API key. Lowest cash cost if everything stays inside Pro limits.

**Auth and ToS.** Same rules as A and B. The Mac side must use `claude -p`, not Hermes's own Anthropic provider, to use Pro.

**Parallelism.** Builds limited by the Mac and the Pro bucket; reviews limited by GitHub (20 jobs).

**Mac asleep.** Builds pause; reviews of PRs already open keep going in Actions. Work queued while asleep is picked up on wake.

**Port to `repo-template`.** The Actions half ports like B. The Mac half needs a repo list in the poller. Other people using the template would get only the Actions half.

**Main cost of C.** Two engines, two log locations, and handoffs through labels that must be designed carefully (who owns which label, what happens on a half-finished run).

## Comparison

| | A: Hermes Kanban on Mac | B: GitHub Actions + claude-code-action | C1: Hybrid (Mac builds, Actions reviews) |
|---|---|---|---|
| Notices `ready-for-agent` | Cron poller or webhook creates a card | `issues: labeled` event, native | Cron poller on the Mac |
| Notices new PR / push | Inside Hermes (no need) | `pull_request` event, native | `pull_request` event, native |
| Notices review comments | Poller | `issue_comment`, `pull_request_review_comment` | Actions native; fix requests via label to poller |
| Build-review loop | Native (`request_review` / `request_changes`); cap as reviewer rule | Built from workflows; cap via PR label | Split across engines via labels |
| 5 parallel reviewers | Child cards or swarm (doc-based) | `strategy.matrix`, native | `strategy.matrix`, native |
| Gate | Completion contract checks + `gh pr merge` | Script step; watch the `GITHUB_TOKEN` push trap | Script step in Actions |
| LLM cost with Pro | $20/month, shared bucket | $20/month, shared bucket | $20/month, shared bucket |
| LLM cost with API key | ~$5 to $8 per issue on Sonnet (estimate) | Same | Same |
| Runner cost | $0 (Mac power) | $0 on public repos | $0 on public repos |
| Pro ToS position | OK only via `claude -p`; Hermes itself cannot use Pro | Documented by Anthropic; "ordinary, individual usage" risk | As A and B |
| Parallelism ceiling | Mac RAM/CPU and Pro bucket | 20 jobs, then Pro bucket | Mac for builds, 20 jobs for reviews |
| Mac asleep | Line stops | Unaffected | Builds pause, reviews continue |
| Port to `repo-template` | Poor (config in `~/.hermes`) | Good (files travel; secret, App, labels per repo) | Partial |
| Moving parts | One engine, second board to mirror | One engine, YAML to maintain | Two engines |
| Visibility | Hermes dashboard and Telegram | Actions logs and PR comments | Both |

## Agent's recommendation

This is the research agent's recommendation, not a decision. It needs Sunny's call in the map (#109).

1. **Use B, GitHub Actions with claude-code-action, as the factory engine.** It is the only option that keeps running when the MacBook sleeps, ports to `repo-template` as files, and needs no second board. The fiddly parts (bot triggers, round counter, `GITHUB_TOKEN` push trap) are known and listed above.
2. **Pilot in ripples on the Pro OAuth token** (`claude setup-token`, secret `CLAUDE_CODE_OAUTH_TOKEN`). It is documented by Anthropic for Pro, costs nothing extra, and the repo is public so minutes are free. Guardrails: Sonnet by default, `--max-turns` on every step, `timeout-minutes` on every job, one build at a time (`concurrency: factory-build`), reviewers capped at 5 rounds.
3. **Measure for two weeks**: tokens per issue (the action's run logs), how often Sunny hits the 5-hour limit in his own work.
4. **Switch to an API key before porting to `repo-template`** or when the pilot shows the Pro bucket running dry. Reasons: Anthropic recommends API keys for secrets shared across repos, it avoids the "ordinary, individual usage" question, and it stops the factory from eating Sunny's interactive limits. Set a monthly spend limit in the Claude Console.
5. **Keep Hermes as Sunny's cockpit, not the engine**: Telegram notifications, ad-hoc `claude -p` runs, and C1 later if API spend on builds turns out high. Do not route factory traffic through Hermes's Anthropic provider or OmniRoute on subscription credentials.

## Open questions and things to test

- Does `allowed_bots: claude` let the review workflow run on a `synchronize` pushed by `claude[bot]`? (doc-based)
- Can the build step open the PR itself in automation mode with `Bash(gh pr create:*)`? (unverified)
- Which token merges at the gate so `pages.yml` fires: Claude App token, a PAT, or `gh workflow run pages.yml` after merge?
- Real token use per issue and per review round (estimate above is not measured).
- What OmniRoute routes Claude traffic through (relevant only if Hermes stays in the line).
- Labels to create: `ready-for-agent` (missing today), `ready-for-human` (missing today), `risk:low`, `risk:high`, `factory-round:1..5`.
