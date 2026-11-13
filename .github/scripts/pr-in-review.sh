#!/usr/bin/env bash
# A pull request that closes an issue puts that issue in review: label factory:in-review, card In review.
# Covers PRs opened by hand; the factory sets in-review itself for the PRs it opens.
# Spec: docs/factory.md, section Labels and board.
#
# Usage: pr-in-review.sh <pr>
# Env:   GH_TOKEN     token with issues: write and pull-requests: read (GITHUB_TOKEN in workflows)
#        BOARD_TOKEN  token with the project scope for the card move (FACTORY_TOKEN); defaults to GH_TOKEN
#        REPO         owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
#        FACTORY_SCRIPTS  directory with label-set.sh and board-move.sh, defaults to this script's directory
#
# Skipped: a closed or draft PR, a PR from a fork (a stranger must not move cards), an issue of
# another repo, a closed issue, and an issue that is not factory:triage, factory:ready or
# factory:in-progress (human, in-review and done stay as they are).
set -euo pipefail

pr=${1:?usage: pr-in-review.sh <pr>}

repo=${REPO:-${GITHUB_REPOSITORY:-}}
if [ -z "$repo" ]; then
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
fi
dir=${FACTORY_SCRIPTS:-$(dirname "$0")}

IFS=$'\t' read -r state draft head base < <(
  gh api "repos/$repo/pulls/$pr" --jq '[.state, .draft, (.head.repo.full_name // "none"), .base.repo.full_name] | @tsv'
)
if [ "$state" != open ]; then
  echo "PR #$pr is $state; nothing to do"
  exit 0
fi
if [ "$draft" = true ]; then
  echo "PR #$pr is a draft; waits for ready for review"
  exit 0
fi
if [ "$head" != "$base" ]; then
  echo "PR #$pr comes from $head, not $base; nothing to do"
  exit 0
fi

issues=$(gh pr view "$pr" --repo "$repo" --json closingIssuesReferences \
  --jq '.closingIssuesReferences[] | "\(.repository.owner.login)/\(.repository.name)\t\(.number)"')

moved=0
while IFS=$'\t' read -r issue_repo issue; do
  [ -n "$issue" ] || continue
  if [ "$issue_repo" != "$repo" ]; then
    echo "#$issue is in $issue_repo; skipped"
    continue
  fi
  IFS=$'\t' read -r issue_state labels < <(
    gh api "repos/$repo/issues/$issue" --jq '[.state, ([.labels[].name | select(startswith("factory:"))] | join(","))] | @tsv'
  )
  if [ "$issue_state" != open ]; then
    echo "#$issue is $issue_state; skipped"
    continue
  fi
  case ",$labels," in
    *,factory:triage,* | *,factory:ready,* | *,factory:in-progress,*) ;;
    *)
      echo "#$issue has '${labels:-no factory label}'; left as is"
      continue
      ;;
  esac
  "$dir/label-set.sh" "$issue" factory:in-review
  GH_TOKEN=${BOARD_TOKEN:-$GH_TOKEN} "$dir/board-move.sh" "$issue" "In review"
  echo "#$issue -> In review (PR #$pr)"
  moved=$((moved + 1))
done <<< "$issues"

echo "PR #$pr: $moved issue(s) moved to In review"
