#!/usr/bin/env bash
# Did the build agent stop on a Claude usage limit? Wraps shared/usage-limit.sh for the step outputs.
#
# Usage: build/limit.sh
# Env:   EXECUTION_FILE  the claude-code-action execution file
# Output (GITHUB_OUTPUT): limit (true or false), evidence
set -e # as in a default workflow step: no pipefail

file=${EXECUTION_FILE:-$RUNNER_TEMP/claude-execution-output.json}
if evidence=$(.github/scripts/shared/usage-limit.sh "$file"); then
  echo "Stopped on a Claude limit: $evidence"
  echo "limit=true" >> "$GITHUB_OUTPUT"
  echo "evidence=$evidence" >> "$GITHUB_OUTPUT"
else
  echo "No Claude limit in the execution file"
  echo "limit=false" >> "$GITHUB_OUTPUT"
fi
