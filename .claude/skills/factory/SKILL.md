---
name: factory
description: Run the Ripples factory locally as Sunny, from an idea or one station on one ticket, with the same agents, prompts and scripts as GitHub.
argument-hint: '"<idea>" | build <issue> | review <pr> | gate <pr>'
disable-model-invocation: true
---

# /factory (local run)

The local override of the software factory: for when GitHub Actions, issues or secrets are down, or Sunny wants to drive a ticket himself. Same agent rules (`.claude/agents/`), prompt templates (`.github/prompts/`) and input scripts (`.github/scripts/`) as GitHub, taken from `origin/main`. Spec: `docs/factory.md`, section Local run.

Arguments: `$ARGUMENTS`

- `build <issue>`, `review <pr>`, `gate <pr>`: run that one station, then stop.
- Anything else is an idea: run the whole line from the start (see "Idea").

Helper: `.claude/skills/factory/scripts/local.sh <command>` (run from the repo root; commands listed in its header). It acts as Sunny through his `gh` login.

## Rules

- Act as Sunny, and only as a person would. Never the Slack webhook, never `sredhu37-bot`, never edit `.github/` settings.
- Tickets move only through `local.sh move <issue> <label>` (label and card in one call).
- Local branch is `local/issue-<n>`, never `factory/issue-<n>`: the GitHub review starts by itself on `factory/` branches, and the scan treats this ticket as local and leaves it alone.
- Merge only after Sunny says yes in this chat, for this PR.
- Show real output. If a step fails, say which and stop; do not work around a broken script.

## Idea (`/factory "<idea>"`)

The plugin skills `/grill-with-docs`, `/wayfinder` and `/triage` can only be started by Sunny, so read their SKILL.md files from disk and follow them here:

```bash
plugin=$(jq -r '.plugins["mattpocock-skills@claude-plugins-official"][0].installPath' ~/.claude/plugins/installed_plugins.json)
ls "$plugin/skills/engineering/grill-with-docs/SKILL.md" "$plugin/skills/engineering/wayfinder/SKILL.md" "$plugin/skills/engineering/triage/SKILL.md"
```

If a file is missing, stop and tell Sunny the plugin layout changed (path above). Read the files each skill links to (for triage: `AGENT-BRIEF.md`) when it says so.

1. **Grill:** follow `grill-with-docs` with Sunny, one question per message. When the work is too big for one session, follow `wayfinder` instead and stop after the map: its tickets go through `/factory build` or the GitHub scan one at a time later.
2. **Issue:** create one issue with the shared understanding (`gh issue create`), then `local.sh move <n> factory:triage` (Backlog).
3. **Triage:** follow `triage` on that issue with Sunny: the agent brief comment, then `local.sh move <n> factory:ready` (Ready). If Sunny decides it is not ready, use the label he picks and stop.
4. **Ask once:** "Run #<n> now locally, run it now on GitHub, or leave it in Ready for the hourly scan?"
   - Locally: the line below, from Build.
   - On GitHub: `local.sh scan-now <n>`, report the run link. The scan starts it only when one of the 5 slots is free; otherwise the next scan does.
   - Leave it: done.

## The line (local)

1. **Build:** `local.sh build-prep <issue>` (worktree, branch, In progress, prompt). Run the `build` subagent with the full text of the prompt file as its task. It pushes and opens the PR with `Closes #<issue>`. Then `local.sh move <issue> factory:in-review`.
2. **CI:** `local.sh wait-checks <pr>`. Red: a fix round (step 4) with the red checks named.
3. **Review:** `local.sh review-prep <pr>`. Run the 4 review subagents (`ux-ui`, `security`, `content`, `code-quality`) in parallel, each with its prompt file as the task. Save each final message, unchanged, to the `answer-<agent>.md` path the helper printed. Then `ROUND=<k> local.sh review-summary <pr>` (k = this chat's review round, from 1) and show Sunny the summary (`summary/comment.md`). Nothing is posted on GitHub.
4. **Fix round** (outcome FAIL, max 5 rounds counted in this chat): `local.sh build-prep <issue> <summary-file>` and run the `build` subagent again. Then back to step 2. After round 5 with FAILs left: `local.sh move <issue> factory:human`, tell Sunny why, stop. Outcome ERROR: show it, ask Sunny.
5. **Gate** (outcome PASS): `local.sh gate-prep <pr>`. When `risky=0`, run the `gate` subagent with the prompt file and save its final message to `answer-gate.md`. Then `local.sh gate-decide <pr>` and show the decision and the reason.
   - MERGE: ask "Merge PR #<pr>?". Yes: `local.sh merge <pr>` (brings it up to date with main first). The issue closes and goes to Done by itself.
   - HUMAN (risky files or the agent's call): show why and ask "Merge anyway, or leave it in Needs human?". Leave: `local.sh move <issue> factory:human`.
6. **Clean up:** `local.sh cleanup <pr>` and `git worktree remove .claude/worktrees/local-issue-<issue>` once merged.

## One station

- `build <issue>`: step 1 (a fix round when the issue is in review: pass the latest local summary if this chat has one). Stop after the PR is open; say what CI shows.
- `review <pr>`: step 3 only. Show the summary; no labels change.
- `gate <pr>`: step 5 only. Merge only on Sunny's yes.
