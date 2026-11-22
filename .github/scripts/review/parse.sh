#!/usr/bin/env bash
# Read the review agent's final json block into $RUNNER_TEMP/result/<agent>.json (shared/review.mjs).
# A usage limit or a missing block counts as an error for this agent.
#
# Usage: review/parse.sh
# Env:   AGENT, EXECUTION_FILE
set -euo pipefail

file=${EXECUTION_FILE:-$RUNNER_TEMP/claude-execution-output.json}
limit=$(.github/scripts/shared/usage-limit.sh "$file" 2> /dev/null || true)
mkdir -p "$RUNNER_TEMP/result"
node .github/scripts/shared/review.mjs parse "$AGENT" "$file" "$RUNNER_TEMP/result/$AGENT.json" "$limit" |
  tee -a "$GITHUB_STEP_SUMMARY"
