#!/usr/bin/env bash
# Is Sunny's latest approving or blocking review on the PR an APPROVED?
# Used while the factory still has the PR: such an approval came before the gate comment.
# Spec: docs/factory.md, section Gate, Sunny's review.
#
# Usage: early-approval.sh <pr>
# Env:   GH_TOKEN  token with pull-requests read; SUNNY (default sredhu37); REPO
# Output: early=true or early=false on stdout.
set -euo pipefail

pr=${1:?usage: early-approval.sh <pr>}
sunny=${SUNNY:-sredhu37}
repo=${REPO:-${GITHUB_REPOSITORY:-}}
if [ -z "$repo" ]; then
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
fi

# Comment-only and pending reviews do not change the latest verdict.
state=$(gh api --paginate "repos/$repo/pulls/$pr/reviews?per_page=100" --jq "
  .[] | select(.user.login == \"$sunny\" and .state != \"COMMENTED\" and .state != \"PENDING\") | .state")
state=${state##*$'\n'}
if [ "$state" = "APPROVED" ]; then
  echo "early=true"
else
  echo "early=false"
fi
