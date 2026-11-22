#!/usr/bin/env bash
# PASS: hand the PR to the gate (factory-gate.yml) when that workflow exists.
#
# Usage: review/to-gate.sh
# Env:   GH_TOKEN, PR
set -euo pipefail

if gh api "repos/$GITHUB_REPOSITORY/actions/workflows/factory-gate.yml" --silent 2> /dev/null; then
  gh workflow run factory-gate.yml --repo "$GITHUB_REPOSITORY" --ref main -f pr="$PR"
  echo "::notice::Review passed: factory-gate.yml dispatched for PR #$PR"
else
  echo "::notice::Review passed. factory-gate.yml does not exist yet; the factory-review status marks the pass"
fi
