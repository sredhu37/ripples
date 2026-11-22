#!/usr/bin/env bash
# FAIL before the last round: back to the build agent on the same branch and PR.
#
# Usage: review/fix-round.sh
# Env:   GH_TOKEN, ISSUE, PR, ROUND
set -euo pipefail

.github/scripts/shared/label-set.sh "$ISSUE" factory:in-review
gh workflow run factory-build.yml --repo "$GITHUB_REPOSITORY" --ref main -f issue="$ISSUE" -f pr="$PR"
echo "::notice::Round $ROUND failed: fix round dispatched for #$ISSUE (PR #$PR)"
