#!/usr/bin/env bash
# Squash-merge a PR as the machine account, only if its head is still <sha>, it is up to date with
# its base, and every required check is green. Spec: docs/factory.md, section Gate.
#
# A head behind its base is never merged here (#314): with no conflict, GitHub's update-branch
# merges the base into the PR (no agent); the new head runs CI and the caller hands it to the gate's
# merge mode. With a conflict, nothing changes and the caller starts a fix round.
#
# Usage: gate/merge.sh <pr> <sha>
# Env:   GH_TOKEN  FACTORY_TOKEN (sredhu37-bot): a merge by GITHUB_TOKEN starts no push
#                  workflow. Never in a step that runs an agent.
#        REPO      owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
#        DRY_RUN   1: check everything, do not update or merge
#        MERGEABLE_TRIES, MERGEABLE_SLEEP  how often gate/mergeable.sh asks whether the PR conflicts
#                         (default 5 reads, 60 s apart); still unknown: refused, Sunny hears it
# Output: merged=true|false, reason=<text>, and when behind update=updated|conflict (with
#         new_sha=<sha> for updated) on stdout (also GITHUB_OUTPUT when set).
#         Exit 0 when merged, updated, conflicting, or skipped for a moved head (a new head gets its
#         own round); exit 1 when the merge was refused, so the caller hands the PR to Sunny.
set -euo pipefail

pr=${1:?usage: gate/merge.sh <pr> <sha>}
sha=${2:?usage: gate/merge.sh <pr> <sha>}
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

# Behind its base: bring it up to date first (never merge a head CI has not seen with the base).
base=$(gh api "repos/$repo/pulls/$pr" --jq .base.ref)
behind=$(gh api "repos/$repo/compare/$base...$sha" --jq .behind_by)
if [ "$behind" -gt 0 ]; then
  conflict=$("$here/mergeable.sh" "$pr")
  case "$(sed -n 's/^conflict=//p' <<< "$conflict")" in
    yes)
      emit merged false
      emit update conflict
      emit reason "the PR is $behind commit(s) behind $base and conflicts with it"
      exit 0
      ;;
    unknown)
      emit merged false
      emit reason "GitHub did not say whether the PR conflicts with $base: $(sed -n 's/^detail=//p' <<< "$conflict")"
      exit 1
      ;;
  esac
  if [ "${DRY_RUN:-}" = "1" ]; then
    emit merged false
    emit update updated
    emit new_sha ""
    emit reason "dry run: would bring PR #$pr up to date with $base ($behind commit(s) behind)"
    exit 0
  fi
  gh api -X PUT "repos/$repo/pulls/$pr/update-branch" -f expected_head_sha="$sha" --silent
  new_sha=$sha
  for _ in $(seq 1 12); do
    new_sha=$(gh api "repos/$repo/pulls/$pr" --jq .head.sha)
    [ "$new_sha" != "$sha" ] && break
    sleep 5
  done
  if [ "$new_sha" = "$sha" ]; then
    emit merged false
    emit reason "update-branch was accepted, but the head is still ${sha:0:7} after 60s"
    exit 1
  fi
  emit merged false
  emit update updated
  emit new_sha "$new_sha"
  emit reason "brought up to date with $base as ${new_sha:0:7} ($behind commit(s) behind); merges once its checks are green"
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
