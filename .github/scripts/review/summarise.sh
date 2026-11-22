#!/usr/bin/env bash
# One summary of the four results; missing or invalid results count as errors (shared/review.mjs).
#
# Usage: review/summarise.sh
# Env:   PLANT_FAIL   true adds a planted FAIL (test only)
# Output (GITHUB_OUTPUT): outcome, fails, suggestions, errors; files in $RUNNER_TEMP/summary
set -euo pipefail

mkdir -p "$RUNNER_TEMP/results"
node .github/scripts/shared/review.mjs summary "$RUNNER_TEMP/results" "$RUNNER_TEMP/summary" | tee -a "$GITHUB_OUTPUT"
echo "planted FAIL: $PLANT_FAIL"
