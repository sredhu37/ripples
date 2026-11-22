#!/usr/bin/env bash
# The agent token cannot push .github/workflows changes: keep its unpushed commits that touch them
# as patches, for the push-workflows job.
#
# Usage: build/workflow-patches.sh
# Env:   BRANCH  factory/issue-<n>
# Output (GITHUB_OUTPUT): has_patches; patches in $RUNNER_TEMP/workflow-patches
set -euo pipefail

mkdir -p "$RUNNER_TEMP/workflow-patches"
git fetch origin "$BRANCH" || true
if git rev-parse --verify "origin/$BRANCH" >/dev/null 2>&1; then
  COMMITS_AHEAD=$(git rev-list --count "origin/$BRANCH..HEAD" || echo 0)
  echo "Commits ahead of origin/$BRANCH: $COMMITS_AHEAD"
  if [ "$COMMITS_AHEAD" -gt 0 ]; then
    if git diff --name-only "origin/$BRANCH..HEAD" | grep -q '^.github/workflows/'; then
      echo "Unpushed commit(s) modify .github/workflows/"
      git format-patch "origin/$BRANCH..HEAD" -o "$RUNNER_TEMP/workflow-patches"
      echo "has_patches=true" >> "$GITHUB_OUTPUT"
    else
      echo "Unpushed commit(s) do not touch .github/workflows/"
      echo "has_patches=false" >> "$GITHUB_OUTPUT"
    fi
  else
    echo "No commits ahead of origin/$BRANCH"
    echo "has_patches=false" >> "$GITHUB_OUTPUT"
  fi
else
  echo "Branch origin/$BRANCH does not exist"
  echo "has_patches=false" >> "$GITHUB_OUTPUT"
fi
