#!/usr/bin/env bash
# A review agent's prompt: template .github/prompts/review.md, rules .claude/agents/<agent>.md and
# the PR description. Runs in the main checkout, so templates and rules come from main.
# Spec: docs/factory.md, sections Review and Identity secrets and permissions.
#
# Usage: review/prompt.sh
# Env:   GH_TOKEN, AGENT, PR, SHA, ROUND, MAX_ROUNDS, INPUTS, ALLOWED_TOOLS
# Output (GITHUB_OUTPUT): text
set -euo pipefail

render="node $(dirname "$0")/../shared/render.mjs"
prompts=.github/prompts
tmp=$(mktemp -d "${RUNNER_TEMP:-${TMPDIR:-/tmp}}/review-prompt.XXXXXX")

# Rules come from main, never from a PR branch (docs/factory.md, Identity secrets and permissions).
awk 'NR == 1 && /^---$/ { fm = 1; next } fm && /^---$/ { fm = 0; next } !fm' \
  ".claude/agents/$AGENT.md" > "$tmp/agent.md"
TITLE=$(gh api "repos/$GITHUB_REPOSITORY/pulls/$PR" --jq .title)
gh api "repos/$GITHUB_REPOSITORY/pulls/$PR" --jq '.body // ""' > "$tmp/pr.md"
: > "$tmp/evidence.md"
if [ "$AGENT" = "ux-ui" ]; then
  INPUTS=$INPUTS $render "$prompts/review-evidence.md" > "$tmp/evidence.md"
fi

AGENT=$AGENT PR=$PR SHA=$SHA ROUND=$ROUND MAX_ROUNDS=$MAX_ROUNDS INPUTS=$INPUTS TITLE=$TITLE \
  GITHUB_REPOSITORY=$GITHUB_REPOSITORY ALLOWED_TOOLS=$ALLOWED_TOOLS \
  RULES_FILE="$tmp/agent.md" PR_BODY_FILE="$tmp/pr.md" EVIDENCE_FILE="$tmp/evidence.md" \
  $render "$prompts/review.md" > "$tmp/prompt.md"
"$(dirname "$0")/../shared/output.sh" text "$tmp/prompt.md"
