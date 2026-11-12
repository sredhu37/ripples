#!/usr/bin/env bash
# Print the factory-build runs that are not finished, one per line: "<run id> <created_at> <status>".
# No output means no build runs or waits. Spec: docs/factory.md, section Build (one build at a time).
#
# Usage: build-runs-active.sh
# Env:   GH_TOKEN  token with actions: read
#        REPO      owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
set -euo pipefail

repo=${REPO:-${GITHUB_REPOSITORY:-}}
if [ -z "$repo" ]; then
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
fi

# Every status a run has before it completes. A run waiting in the build queue is "pending".
for status in requested queued pending waiting in_progress; do
  gh api --paginate "repos/$repo/actions/workflows/factory-build.yml/runs?status=$status&per_page=100" \
    --jq '.workflow_runs[] | "\(.id) \(.created_at) \(.status)"'
done | sort -u
