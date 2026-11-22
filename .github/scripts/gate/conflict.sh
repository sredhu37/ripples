#!/usr/bin/env bash
# The PR is behind main and conflicts with it: a fix round where the build agent merges main and
# resolves the conflict. The issue goes (back) to factory:in-review, so the new head is reviewed and
# gated again; the round counts toward 5. A revert PR gets a note: Sunny resolves it by hand.
# Spec: docs/factory.md, section Gate (up to date before merge).
#
# Usage: gate/conflict.sh
# Env:   GH_TOKEN (issues and pull-requests: write, actions: write), BOARD_TOKEN (as shared/move.sh),
#        PR, SHA, KIND (factory or revert), ISSUE (factory), RUN_URL
set -euo pipefail

if [ "$KIND" != "factory" ]; then
  gh api -X POST "repos/$GITHUB_REPOSITORY/issues/$PR/comments" --silent -f body="This PR conflicts with main, so it was not merged. Resolve the conflict by hand. Run: $RUN_URL"
  exit 0
fi
label=$(gh api "repos/$GITHUB_REPOSITORY/issues/$ISSUE/labels" --jq '[.[].name | select(startswith("factory:"))] | join(",")')
if [ "$label" != "factory:in-review" ]; then
  .github/scripts/shared/move.sh "$ISSUE" factory:in-review
fi
gh api -X POST "repos/$GITHUB_REPOSITORY/issues/$PR/comments" --silent -f body="<!-- factory-conflict sha=$SHA -->
\`${SHA:0:7}\` conflicts with main, so it was not merged. A fix round merges main and resolves the conflict; the new head goes through review and the gate again. Run: $RUN_URL"
gh workflow run factory-build.yml --repo "$GITHUB_REPOSITORY" --ref main -f issue="$ISSUE" -f pr="$PR"
echo "::notice::PR #$PR conflicts with main: fix round for #$ISSUE dispatched"
