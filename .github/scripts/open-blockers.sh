#!/usr/bin/env bash
# Print the numbers of the open issues that block <issue>, one per line. No output means unblocked.
# Spec: docs/factory.md, section Build (a build starts only when all blockers are closed).
#
# Usage: open-blockers.sh <issue>
# Env:   GH_TOKEN  token with issues: read
#        REPO      owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
set -euo pipefail

issue=${1:?usage: open-blockers.sh <issue>}

repo=${REPO:-${GITHUB_REPOSITORY:-}}
if [ -z "$repo" ]; then
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
fi

gh api --paginate "repos/$repo/issues/$issue/dependencies/blocked_by" \
  --jq '.[] | select(.state == "open") | .number'
