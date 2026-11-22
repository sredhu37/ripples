#!/usr/bin/env bash
# PASS: one deduplicated suggestions issue per PR, in triage (label and board Backlog).
#
# Usage: review/suggestions.sh
# Env:   GH_TOKEN, BOARD_TOKEN (as shared/move.sh), ISSUE, PR, COUNT; the issue body in
#        $RUNNER_TEMP/summary/suggestions.md
set -euo pipefail

.github/scripts/shared/label-set.sh "$ISSUE" factory:in-review
if [ "$COUNT" = "0" ]; then
  echo "No suggestions, no issue"
  exit 0
fi
existing=$(gh api --paginate "repos/$GITHUB_REPOSITORY/issues?state=all&per_page=100" --jq "
  .[] | select(.pull_request == null and .user.login == \"github-actions[bot]\"
    and ((.body // \"\") | startswith(\"<!-- factory-suggestions pr=$PR -->\"))) | .number")
existing=${existing%%$'\n'*}
if [ -n "$existing" ]; then
  echo "::notice::PR #$PR already has suggestions issue #$existing, none filed"
  exit 0
fi
title=$(gh api "repos/$GITHUB_REPOSITORY/pulls/$PR" --jq .title)
url=$(gh issue create --repo "$GITHUB_REPOSITORY" --title "Suggestions from PR #$PR: $title" \
  --body-file "$RUNNER_TEMP/summary/suggestions.md" --label factory:triage)
echo "Filed $url"
.github/scripts/shared/move.sh "${url##*/}" factory:triage
