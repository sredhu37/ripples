#!/usr/bin/env bash
# Gate said MERGE: squash-merge as sredhu37-bot (gate/merge.sh). A refused merge goes to Sunny.
#
# Usage: gate/try-merge.sh
# Env:   GH_TOKEN (FACTORY_TOKEN, never in a step that runs an agent), PR, SHA
# Output (GITHUB_OUTPUT): merged, reason (from gate/merge.sh), refused
set -euo pipefail

# gate/merge.sh writes merged= and reason= to GITHUB_OUTPUT itself.
if .github/scripts/gate/merge.sh "$PR" "$SHA" | tee "$RUNNER_TEMP/merge.txt"; then
  echo "refused=false" >> "$GITHUB_OUTPUT"
else
  echo "refused=true" >> "$GITHUB_OUTPUT"
fi
echo "::notice::$(sed -n 's/^reason=//p' "$RUNNER_TEMP/merge.txt")"
