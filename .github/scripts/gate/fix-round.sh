#!/usr/bin/env bash
# Sunny commented or requested changes: a factory-build fix round; the PR stays in Needs human.
#
# Usage: gate/fix-round.sh
# Env:   GH_TOKEN (actions: write, pull-requests: write), ISSUE, PR, SOURCE, SUNNY
set -euo pipefail

gh workflow run factory-build.yml --repo "$GITHUB_REPOSITORY" --ref main \
  -f issue="$ISSUE" -f pr="$PR" -f human="$SOURCE"
gh api -X POST "repos/$GITHUB_REPOSITORY/issues/$PR/comments" --silent \
  -f body="Fix round started from $SUNNY's ${SOURCE%%:*} (factory-build.yml). A question gets a reply, a change request a new commit; then the PR comes back to Needs human."
