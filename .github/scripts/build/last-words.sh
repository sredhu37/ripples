#!/usr/bin/env bash
# The build agent's final message, kept for a stop without a PR (the action deletes its transcript).
#
# Usage: build/last-words.sh
# Env:   EXECUTION_FILE  the claude-code-action execution file
# Output (GITHUB_OUTPUT): text
set -euo pipefail

file=${EXECUTION_FILE:-$RUNNER_TEMP/claude-execution-output.json}
text=$("$(dirname "$0")/agent-last-words.sh" "$file" 1500 || true)
printf '%s\n' "${text:-(no final message)}"
printf '%s\n' "$text" | "$(dirname "$0")/../shared/output.sh" text
