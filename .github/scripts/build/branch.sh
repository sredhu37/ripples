#!/usr/bin/env bash
# Switch to factory/issue-<n>: continue the branch of a paused run, or start it from main.
#
# Usage: build/branch.sh
# Env:   BRANCH  factory/issue-<n>
set -euo pipefail

if git ls-remote --exit-code --heads origin "$BRANCH" > /dev/null; then
  git fetch -q origin "$BRANCH"
  git switch -c "$BRANCH" FETCH_HEAD
  echo "Continuing existing branch $BRANCH at $(git rev-parse --short HEAD)"
else
  git switch -c "$BRANCH"
  echo "New branch $BRANCH from main at $(git rev-parse --short HEAD)"
fi
# The agent writes the PR body here; git must never see it.
echo ".factory-pr-body.md" >> .git/info/exclude
