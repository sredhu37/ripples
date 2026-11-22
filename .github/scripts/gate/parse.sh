#!/usr/bin/env bash
# Read the gate agent's final json block into $RUNNER_TEMP/result/gate.json (gate/gate.mjs).
# A usage limit or a missing block counts as HUMAN.
#
# Usage: gate/parse.sh
# Env:   EXECUTION_FILE
set -euo pipefail

file=${EXECUTION_FILE:-$RUNNER_TEMP/claude-execution-output.json}
limit=$(.github/scripts/shared/usage-limit.sh "$file" 2> /dev/null || true)
mkdir -p "$RUNNER_TEMP/result"
node .github/scripts/gate/gate.mjs parse "$file" "$RUNNER_TEMP/result/gate.json" "$limit" |
  tee -a "$GITHUB_STEP_SUMMARY"
