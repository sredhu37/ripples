#!/usr/bin/env bash
# After Sunny's approval: a note on the PR, merged or why not.
#
# Usage: gate/approve-note.sh
# Env:   GH_TOKEN, PR, SHA, SUNNY, UPDATE, MERGED, MERGE_REASON, CHECK_REASON, EARLY, RUN_URL
set -euo pipefail

if [ "$EARLY" = "true" ]; then
  body="Approval noted, but the factory still has the PR. Approve again after the gate comment. Run: $RUN_URL"
elif [ "${UPDATE:-}" = "updated" ]; then
  body="$SUNNY's approval of \`${SHA:0:7}\` counts: $MERGE_REASON. No need to approve again. Run: $RUN_URL"
elif [ "${UPDATE:-}" = "conflict" ]; then
  body="$SUNNY's approval did not merge this PR: $MERGE_REASON. See the conflict note above. Run: $RUN_URL"
elif [ "$MERGED" = "true" ]; then
  body="Merged by sredhu37-bot after $SUNNY's approval of \`${SHA:0:7}\`: $MERGE_REASON. Run: $RUN_URL"
else
  why=${MERGE_REASON:-$CHECK_REASON}
  body="$SUNNY's approval did not merge this PR: $why.

The PR stays in Needs human. Approve the current head again once its checks are green, or rerun: Actions, factory-gate, Run workflow with pr $PR and mode approve. Run: $RUN_URL"
fi
gh api -X POST "repos/$GITHUB_REPOSITORY/issues/$PR/comments" --silent -f body="$body"
echo "::notice::$body"
