#!/usr/bin/env bash
# Which PR does this review run belong to? The dispatch input, or the PR of the CI run's branch.
#
# Usage: review/find-pr.sh
# Env:   GH_TOKEN, GITHUB_EVENT_NAME, INPUT_PR (dispatch), RUN_PR, RUN_BRANCH, RUN_SHA (workflow_run)
# Output (GITHUB_OUTPUT): pr, sha
set -euo pipefail

if [ "$GITHUB_EVENT_NAME" = "workflow_dispatch" ]; then
  echo "pr=$INPUT_PR" >> "$GITHUB_OUTPUT"
  exit 0
fi
pr=$RUN_PR
if [ -z "$pr" ]; then
  pr=$(gh pr list --repo "$GITHUB_REPOSITORY" --head "$RUN_BRANCH" --state open --json number --jq '.[0].number // ""')
fi
echo "CI run for $RUN_BRANCH at ${RUN_SHA:0:7}: PR '${pr}'"
echo "pr=$pr" >> "$GITHUB_OUTPUT"
echo "sha=$RUN_SHA" >> "$GITHUB_OUTPUT"
