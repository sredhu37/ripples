# ADR 0011: Factory workflow changes and environment secrets

## Status

Accepted.

## Context

Issue #194 identified a security and architectural limitation in the software factory. The build agent running on feature branches could not modify `.github/workflows/*` because repository secrets (`FACTORY_TOKEN`, `CLAUDE_CODE_OAUTH_TOKEN`, `TELEGRAM_TOKEN`, `TELEGRAM_CHAT_ID`) were accessible to any workflow run in the repository, and GitHub repository tokens held by the agent lacked workflow permissions.

If the build agent had permission to edit workflows and secrets remained repository-wide, a rogue workflow or prompt injection on a PR branch could exfiltrate repository secrets on `push` before human review.

Conversely, preventing the agent from editing workflows blocked factory self-improvement (such as updating agent models, prompt flags, and automation scripts in issues #189, #190, #191, and #192).

## Decision

1. **Environment secrets locked to main**:
   All sensitive secrets (`FACTORY_TOKEN`, `CLAUDE_CODE_OAUTH_TOKEN`, `TELEGRAM_TOKEN`, `TELEGRAM_CHAT_ID`) are migrated to the `factory` GitHub environment. The environment has a custom deployment branch policy restricted strictly to the `main` branch (`name=main`).
   All repository-level secrets are deleted.
   Branch workflows on PRs and feature branches receive empty values for these secrets, eliminating credential exfiltration risk.

2. **Isolated push step outside the agent**:
   The build agent commits workflow edits into a trailing commit on the PR branch but does not push them.
   The agent workspace never receives `FACTORY_TOKEN` or workflow push access.
   An unpushed commit touching `.github/workflows/*` is exported as a `git format-patch` artifact.
   A dedicated runner job (`push-workflows`) runs in a clean checkout with `environment: factory`, `core.hooksPath=/dev/null`, and `FACTORY_TOKEN` (which has `workflow` scope). It applies the patch via `git am --3way` and pushes it to the PR branch.

3. **Mandatory human gate for workflow changes**:
   `.github/**` remains on `.github/gate-paths.txt`. Any pull request that modifies workflow files or factory configuration requires manual human approval and can never auto-merge.

4. **Tag `live-good` and other branch write paths**:
   Tag `live-good` is not protected with a tag ruleset because `pages.yml` updates `live-good` after each successful deployment on `main` using `GITHUB_TOKEN`. GitHub rulesets do not support branch-scoped bypass rules for `GITHUB_TOKEN`, so a tag protection ruleset would break automated production deployment updates.
   Risk is mitigated because GitHub Pages deployments only build and deploy commits from `main`, and all workflow modifications on branches require human review before merging to `main`.

## Consequences

- Factory jobs requiring secrets (`pickup`, `build`, `push-workflows`, `finish` in `factory-build.yml`; `agent`, `decide`, `approve` in `factory-gate.yml`; `review`, `summary` in `factory-review.yml`; `sweep`, `reconcile`, `reminder` in `factory-sweep.yml`; `sync` in `factory-sync.yml`; `link` in `factory-pr-link.yml`; `report` in `pages.yml`) declare `environment: factory`.
- Factory issues that edit workflows can now be built by the agent, opening a PR with the workflow changes pushed by the isolated step, and properly routing to human review at the gate.
- Repository secrets are empty; all operational credentials live under the `factory` environment.
