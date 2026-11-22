#!/usr/bin/env bash
# Pickup: may this run build the issue? Ready, a stopped build to continue, or a fix round; open and
# unblocked.
# Spec: docs/factory.md, sections Build and Labels and board.
#
# Usage: build/check.sh
# Env:   GH_TOKEN  token with issues: read and pull-requests: read
#        ISSUE     issue number
#        FIX_PR    optional: fix round on this open factory PR
#        HUMAN     optional: review:<id> or comment:<id> by sredhu37 on FIX_PR
# Output (GITHUB_OUTPUT): go, issue, ready, move (label factory:in-progress now), human, and for a
#         fix round pr and start_sha
set -euo pipefail

if ! [[ "$ISSUE" =~ ^[0-9]+$ ]]; then
  echo "::error::Issue number '$ISSUE' is not a number"
  exit 1
fi
if [ -n "$FIX_PR" ] && ! [[ "$FIX_PR" =~ ^[0-9]+$ ]]; then
  echo "::error::PR number '$FIX_PR' is not a number"
  exit 1
fi
if [ -n "$HUMAN" ] && { [ -z "$FIX_PR" ] || ! [[ "$HUMAN" =~ ^(review|comment):[0-9]+$ ]]; }; then
  echo "::error::human '$HUMAN' needs pr and the form review:<id> or comment:<id>"
  exit 1
fi
state=$(gh api "repos/$GITHUB_REPOSITORY/issues/$ISSUE" \
  --jq '[.state, (.pull_request != null), any(.labels[]; .name == "factory:ready"), any(.labels[]; .name == "factory:in-review"), any(.labels[]; .name == "factory:human"), any(.labels[]; .name == "factory:in-progress")] | @tsv')
read -r open_state is_pr ready in_review human_label in_progress <<< "$state"
move=false
if [ "$is_pr" = "true" ] || [ "$open_state" != "open" ]; then
  echo "::notice::#$ISSUE skipped: needs to be an open issue (state $open_state)"
  exit 0
fi
if [ -n "$HUMAN" ]; then
  # Fix round from Sunny's comment (factory-gate): the issue stays factory:human.
  # factory:in-review is allowed too: factory-gate only dispatches it for a comment with @build.
  if [ "$human_label" != "true" ] && [ "$in_review" != "true" ]; then
    echo "::notice::#$ISSUE skipped: a fix round from Sunny's comment needs factory:human or factory:in-review"
    exit 0
  fi
  ready=false
fi
if [ -n "$FIX_PR" ]; then
  # Fix round from factory-review: the issue stays factory:in-review.
  if [ -z "$HUMAN" ] && [ "$in_review" != "true" ] && [ "$ready" != "true" ]; then
    echo "::notice::#$ISSUE skipped: a fix round needs factory:in-review or factory:ready"
    exit 0
  fi
  head=$(gh api "repos/$GITHUB_REPOSITORY/pulls/$FIX_PR" --jq '[.state, .head.ref, .head.repo.full_name] | @tsv')
  if [ "$head" != "$(printf 'open\tfactory/issue-%s\t%s' "$ISSUE" "$GITHUB_REPOSITORY")" ]; then
    echo "::error::PR #$FIX_PR is not the open factory PR of #$ISSUE ($head)"
    exit 1
  fi
  pr=$FIX_PR
else
  # Start (ready), continue a stopped build (in-progress), or rebuild an In review issue whose PR is
  # gone. The scan only dispatches these; factory:human waits for Sunny.
  if [ "$ready" != "true" ] && [ "$in_progress" != "true" ] && [ "$in_review" != "true" ]; then
    echo "::notice::#$ISSUE skipped: needs factory:ready, factory:in-progress or factory:in-review"
    exit 0
  fi
  blockers=$(.github/scripts/shared/open-blockers.sh "$ISSUE" | sed 's/^/#/' | paste -sd' ' -)
  if [ -n "$blockers" ]; then
    echo "::notice::#$ISSUE waits for open blockers: $blockers"
    exit 0
  fi
  # A paused fix round restarts from factory:ready: continue it as a fix round.
  pr=$(gh pr list --repo "$GITHUB_REPOSITORY" --head "factory/issue-$ISSUE" --state open \
    --json number,headRepositoryOwner \
    --jq "[.[] | select(.headRepositoryOwner.login == \"$GITHUB_REPOSITORY_OWNER\")][0].number // \"\"")
  if [ "$in_review" = "true" ] && [ -n "$pr" ]; then
    echo "::notice::#$ISSUE skipped: in review with PR #$pr; a fix round needs pr"
    exit 0
  fi
  if [ "$in_progress" != "true" ]; then
    move=true
  fi
fi
if [ -n "$pr" ]; then
  start_sha=$(gh api "repos/$GITHUB_REPOSITORY/pulls/$pr" --jq .head.sha)
  echo "Fix round on PR #$pr, head ${start_sha:0:7}"
  {
    echo "pr=$pr"
    echo "start_sha=$start_sha"
  } >> "$GITHUB_OUTPUT"
fi
{
  echo "issue=$ISSUE"
  echo "ready=$ready"
  echo "move=$move"
  echo "human=$HUMAN"
  echo "go=true"
} >> "$GITHUB_OUTPUT"
