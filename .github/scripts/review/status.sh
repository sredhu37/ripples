#!/usr/bin/env bash
# Commit status factory-review on the head: success (PASS), failure (FAIL) or error.
#
# Usage: review/status.sh
# Env:   GH_TOKEN, SHA, ROUND, OUTCOME, URL, FAILS
set -euo pipefail

case "$OUTCOME" in
  PASS) state=success desc="Review round $ROUND passed" ;;
  FAIL) state=failure desc="Review round $ROUND: $FAILS FAIL" ;;
  *) state=error desc="Review error, no round used" ;;
esac
gh api -X POST "repos/$GITHUB_REPOSITORY/statuses/$SHA" -f state="$state" \
  -f context=factory-review -f description="$desc" -f target_url="$URL" --jq '.state'
