#!/usr/bin/env bash
# The gate hands the PR to Sunny: factory:human, and a note when a MERGE did not go through.
#
# Usage: gate/needs-human.sh
# Env:   GH_TOKEN, BOARD_TOKEN (as shared/move.sh), ISSUE, PR, DECISION, GATE_REASON, MERGE_REASON,
#        EARLY, RUN_URL
# Output (GITHUB_OUTPUT): reason
set -euo pipefail

.github/scripts/shared/move.sh "$ISSUE" factory:human
if [ "$DECISION" = "MERGE" ]; then
  reason="gate MERGE, but the merge did not go through: $MERGE_REASON"
  gh api -X POST "repos/$GITHUB_REPOSITORY/issues/$PR/comments" --silent -f body="Needs human: the gate said MERGE, but the merge did not go through: $MERGE_REASON

Approve the PR to merge it once the cause is fixed. Run: $RUN_URL"
else
  reason="gate HUMAN, $GATE_REASON"
  if [ "$EARLY" = "true" ]; then
    reason="$reason. Your approval came before the gate comment: approve again to merge"
  fi
fi
echo "reason=$reason" >> "$GITHUB_OUTPUT"
