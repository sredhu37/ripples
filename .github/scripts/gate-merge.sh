#!/usr/bin/env bash
# Squash-merge a PR as the machine account, only if its head is still <sha> and every required
# check is green. Spec: docs/factory.md, section Gate.
#
# Usage: gate-merge.sh <pr> <sha>
# Env:   GH_TOKEN  FACTORY_TOKEN (sredhu37-bot): a merge by GITHUB_TOKEN starts no push
#                  workflow, so pages.yml would not deploy. Never in a step that runs an agent.
#        REPO      owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
#        DRY_RUN   1: check everything, do not merge
# Output: merged=true|false and reason=<text> on stdout (also GITHUB_OUTPUT when set).
#         Exit 0 when merged or skipped for a moved head (a new head gets its own round);
#         exit 1 when the merge was refused, so the caller hands the PR to Sunny.
set -euo pipefail

pr=${1:?usage: gate-merge.sh <pr> <sha>}
sha=${2:?usage: gate-merge.sh <pr> <sha>}
here=$(cd "$(dirname "$0")" && pwd)

repo=${REPO:-${GITHUB_REPOSITORY:-}}
if [ -z "$repo" ]; then
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
fi

emit() {
  local value=${2//$'\n'/ }
  echo "$1=$value"
  if [ -n "${GITHUB_OUTPUT:-}" ]; then
    echo "$1=$value" >> "$GITHUB_OUTPUT"
  fi
}

if ! [[ "$pr" =~ ^[0-9]+$ ]] || ! [[ "$sha" =~ ^[0-9a-f]{40}$ ]]; then
  emit merged false
  emit reason "bad input: pr '$pr', sha '$sha'"
  exit 1
fi

IFS=$'\t' read -r state head <<< "$(gh api "repos/$repo/pulls/$pr" --jq '[.state, .head.sha] | @tsv')"
if [ "$state" != "open" ]; then
  emit merged false
  emit reason "the PR is $state"
  exit 0
fi
if [ "$head" != "$sha" ]; then
  emit merged false
  emit reason "the head moved from ${sha:0:7} to ${head:0:7}, so this decision no longer applies"
  exit 0
fi

checks=$("$here/checks-green.sh" "$sha" 0)
if [ "$(sed -n 's/^state=//p' <<< "$checks")" != "green" ]; then
  emit merged false
  emit reason "checks $(sed -n 's/^detail=//p' <<< "$checks")"
  exit 1
fi

if [ "${DRY_RUN:-}" = "1" ]; then
  emit merged false
  emit reason "dry run: would squash-merge PR #$pr at ${sha:0:7} as $(gh api user --jq .login)"
  exit 0
fi

# sha= makes GitHub refuse the merge if the head changed after the checks above.
if out=$(gh api -X PUT "repos/$repo/pulls/$pr/merge" -f merge_method=squash -f sha="$sha" --jq .sha 2>&1); then
  emit merged true
  emit reason "squash-merged PR #$pr at ${sha:0:7} as commit ${out:0:7}"
  exit 0
fi
emit merged false
emit reason "GitHub refused the merge: $out"
exit 1
