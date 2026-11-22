#!/usr/bin/env bash
# Builds stuck in factory:in-progress (sweep/stuck.sh), as step outputs.
#
# Usage: sweep/find-stuck.sh
# Env:   GH_TOKEN (issues: read, actions: read)
# Output (GITHUB_OUTPUT): issues (space-separated), lines ("<issue> <minutes>" per line)
set -euo pipefail

stuck=$(.github/scripts/sweep/stuck.sh)
if [ -z "$stuck" ]; then
  echo "No stuck build"
  exit 0
fi
echo "::warning::Stuck in factory:in-progress (issue, minutes): $(echo "$stuck" | paste -sd';' -)"
{
  echo "issues=$(echo "$stuck" | awk '{ print $1 }' | paste -sd' ' -)"
  echo "lines<<STUCK_EOF"
  echo "$stuck"
  echo "STUCK_EOF"
} >> "$GITHUB_OUTPUT"
