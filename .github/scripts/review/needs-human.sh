#!/usr/bin/env bash
# Round 5 failed, or an agent gave no valid result: factory:human and a comment.
#
# Usage: review/needs-human.sh
# Env:   GH_TOKEN, BOARD_TOKEN (as shared/move.sh), ISSUE, PR, OUTCOME, ERRORS, MAX_ROUNDS, RUN_URL
# Output (GITHUB_OUTPUT): reason
set -euo pipefail

.github/scripts/shared/move.sh "$ISSUE" factory:human
if [ "$OUTCOME" = "FAIL" ]; then
  reason="$MAX_ROUNDS review rounds failed"
else
  reason="review error, $ERRORS"
fi
echo "reason=$reason" >> "$GITHUB_OUTPUT"
gh issue comment "$ISSUE" --repo "$GITHUB_REPOSITORY" --body "Needs human: PR #$PR, $reason.

Run: $RUN_URL"
