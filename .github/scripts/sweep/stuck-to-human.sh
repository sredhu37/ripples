#!/usr/bin/env bash
# Stuck builds go to Sunny: factory:human (label and board) and a comment.
#
# Usage: sweep/stuck-to-human.sh
# Env:   GH_TOKEN, BOARD_TOKEN (as shared/move.sh), STUCK ("<issue> <minutes>" per line)
set -euo pipefail

while read -r issue minutes; do
  .github/scripts/shared/move.sh "$issue" factory:human
  gh issue comment "$issue" --repo "$GITHUB_REPOSITORY" --body "Needs human: the build looks stuck. The issue has been in factory:in-progress for $minutes minutes with no factory-build run that could be building it.

Sweep run: $GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID"
done <<< "$STUCK"
