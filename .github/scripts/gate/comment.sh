#!/usr/bin/env bash
# Post the gate comment (risks, decision, reason) and write decision and reason as step outputs.
#
# Usage: gate/comment.sh
# Env:   GH_TOKEN, PR, AGENT_RESULT, EARLY_APPROVAL; risky list and agent result in $RUNNER_TEMP/gate/
# Output (GITHUB_OUTPUT): decision, reason
set -euo pipefail

echo "agent job: $AGENT_RESULT"
RISKY_FILE="$RUNNER_TEMP/gate/risky.txt" RESULT_FILE="$RUNNER_TEMP/gate/gate.json" \
  node .github/scripts/gate/gate.mjs comment "$RUNNER_TEMP/comment.md" | tee -a "$GITHUB_OUTPUT"
url=$(gh api -X POST "repos/$GITHUB_REPOSITORY/issues/$PR/comments" -F "body=@$RUNNER_TEMP/comment.md" --jq .html_url)
echo "::notice::Gate comment: $url"
