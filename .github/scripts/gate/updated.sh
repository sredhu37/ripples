#!/usr/bin/env bash
# gate/merge.sh brought the PR up to date with main: mark the new head as the factory's own update of
# an approved head, and hand it to the gate's merge mode (which waits for its checks, then merges).
# Spec: docs/factory.md, section Gate (up to date before merge).
#
# Usage: gate/updated.sh
# Env:   GH_TOKEN (pull-requests: write, actions: write), PR, OLD_SHA, NEW_SHA, RUN_URL
set -euo pipefail

gh api -X POST "repos/$GITHUB_REPOSITORY/issues/$PR/comments" --silent -f body="<!-- factory-update sha=$NEW_SHA from=$OLD_SHA -->
Brought up to date with main as \`${NEW_SHA:0:7}\` (no conflict, merged by GitHub's update-branch). The approved change is \`${OLD_SHA:0:7}\`, so there is no new review: sredhu37-bot merges once the checks are green. Run: $RUN_URL"
gh workflow run factory-gate.yml --repo "$GITHUB_REPOSITORY" --ref main -f pr="$PR" -f mode=merge
echo "::notice::PR #$PR brought up to date as ${NEW_SHA:0:7}; factory-gate merge mode dispatched"
