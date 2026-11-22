#!/usr/bin/env bash
# The build job stopped (out of turns, timeout, crash): the label stays, so the hourly scan continues
# the ticket (max 3). This comment keeps the agent's last words for the cap message.
# Spec: docs/factory.md, sections Build and Scan.
#
# Usage: build/stopped.sh
# Env:   GH_TOKEN, ISSUE, REASON, LAST_WORDS, RUN_URL
set -euo pipefail

body=$(mktemp "${RUNNER_TEMP:-${TMPDIR:-/tmp}}/stopped.XXXXXX")
{
  printf '<!-- factory-stopped -->\n'
  printf 'Stopped: %s. The hourly scan continues it on the same branch (at most 3 times).\n\n' "$REASON"
  if [ -n "${LAST_WORDS:-}" ]; then
    printf 'The build agent said:\n\n'
    printf '%s\n' "$LAST_WORDS" | sed 's/^/> /'
    printf '\n'
  fi
  printf 'Run: %s\n' "$RUN_URL"
} > "$body"
gh issue comment "$ISSUE" --repo "$GITHUB_REPOSITORY" --body-file "$body"
