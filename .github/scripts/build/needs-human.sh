#!/usr/bin/env bash
# The build needs Sunny: factory:human, and a comment with the reason and the agent's last words.
# Sunny's own fix round gets no comment: the PR note and the Telegram message say it.
# Spec: docs/factory.md, section Build.
#
# Usage: build/needs-human.sh
# Env:   GH_TOKEN, BOARD_TOKEN (as shared/move.sh), ISSUE, REASON, HUMAN, LAST_WORDS, RUN_URL
set -euo pipefail

"$(dirname "$0")/../shared/move.sh" "$ISSUE" factory:human
if [ -n "${HUMAN:-}" ]; then
  exit 0 # Sunny's own round: the PR note and the Telegram message say it
fi
body=$(mktemp "${RUNNER_TEMP:-${TMPDIR:-/tmp}}/needs-human.XXXXXX")
{
  printf 'Needs human: %s.\n\n' "$REASON"
  if [ -n "${LAST_WORDS:-}" ]; then
    printf 'The build agent said:\n\n'
    printf '%s\n' "$LAST_WORDS" | sed 's/^/> /'
    printf '\n'
  fi
  printf 'Run: %s\n' "$RUN_URL"
} > "$body"
gh issue comment "$ISSUE" --repo "$GITHUB_REPOSITORY" --body-file "$body"
