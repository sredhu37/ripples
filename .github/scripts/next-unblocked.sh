#!/usr/bin/env bash
# After <closed-issue> closed: print the oldest open factory:ready issue it was blocking
# whose blockers are now all closed. No output means nothing to start.
# Spec: docs/factory.md, section Build (starts when one of its blockers closes).
#
# Usage: next-unblocked.sh <closed-issue>
# Env:   GH_TOKEN  token with issues: read
#        REPO      owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
set -euo pipefail

closed=${1:?usage: next-unblocked.sh <closed-issue>}
here=$(cd "$(dirname "$0")" && pwd)

repo=${REPO:-${GITHUB_REPOSITORY:-}}
if [ -z "$repo" ]; then
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
fi
export REPO="$repo"

# Lowest number first: issue numbers grow with creation time, so this is oldest first.
candidates=$(gh api --paginate "repos/$repo/issues/$closed/dependencies/blocking" \
  --jq '.[] | select(.state == "open") | select(any(.labels[]; .name == "factory:ready")) | .number' |
  sort -n)

for n in $candidates; do
  if [ -z "$("$here/open-blockers.sh" "$n")" ]; then
    echo "$n"
    exit 0
  fi
done
