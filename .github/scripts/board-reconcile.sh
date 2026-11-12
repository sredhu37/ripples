#!/usr/bin/env bash
# Put every card on the factory board back in the column of its issue's factory: label.
# Board drags trigger nothing on a user-owned board, so a card dragged by hand or a missed
# label event leaves the board wrong until this runs. Spec: docs/factory.md, section Labels and board.
#
# Per card (issues of REPO only; pull requests, drafts and other repos are left alone):
#   no factory: label                  leave it
#   more than one factory: label       leave it, warn (label-set.sh keeps exactly one)
#   closed issue                       Done (a closed issue is finished, whatever label it kept)
#   open issue with factory:done       leave it, warn (Done would close it: Auto-close issue)
#   open issue                         the label's column
#
# Usage: board-reconcile.sh
# Env:   GH_TOKEN                 token with the project scope (FACTORY_TOKEN in workflows)
#        DRY_RUN                  1 prints the moves and changes nothing
#        REPO                     owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
#        FACTORY_PROJECT_ID       defaults to board #2 of sredhu37
# Exit:  1 when a move failed (the other moves still run).
#
# GraphQL variables sit in single quotes on purpose: gh passes them, not bash.
# shellcheck disable=SC2016
set -euo pipefail

here=$(cd "$(dirname "$0")" && pwd)
project=${FACTORY_PROJECT_ID:-PVT_kwHOAIaaWM4BrKpj}
dry=${DRY_RUN:-0}

repo=${REPO:-${GITHUB_REPOSITORY:-}}
if [ -z "$repo" ]; then
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
fi
export REPO="$repo"

# One tab-separated line per card: number, state, repo, factory labels (comma list, "-" for none),
# column. No field is empty: read would merge two tabs into one.
cards=$(gh api graphql --paginate -f project="$project" -f query='
  query($project: ID!, $endCursor: String) {
    node(id: $project) {
      ... on ProjectV2 {
        items(first: 100, after: $endCursor) {
          pageInfo { hasNextPage endCursor }
          nodes {
            content {
              ... on Issue {
                number
                state
                repository { nameWithOwner }
                labels(first: 50) { nodes { name } }
              }
            }
            status: fieldValueByName(name: "Status") {
              ... on ProjectV2ItemFieldSingleSelectValue { name }
            }
          }
        }
      }
    }
  }' --jq '.data.node.items.nodes[]
    | select(.content.number != null)
    | [ .content.number,
        .content.state,
        .content.repository.nameWithOwner,
        ([.content.labels.nodes[].name | select(startswith("factory:"))] | join(",") | if . == "" then "-" else . end),
        (.status.name // "(no status)") ]
    | @tsv')

column_for() {
  case "$1" in
    factory:triage) echo "Backlog" ;;
    factory:ready) echo "Ready" ;;
    factory:in-progress) echo "In progress" ;;
    factory:in-review) echo "In review" ;;
    factory:human) echo "Needs human" ;;
    factory:done) echo "Done" ;;
    *) echo "" ;;
  esac
}

total=0
moved=0
failed=0
while IFS=$'\t' read -r number state card_repo labels current; do
  [ -n "$number" ] || continue
  [ "$card_repo" = "$repo" ] || continue
  total=$((total + 1))

  if [ "$labels" = "-" ]; then
    continue
  fi
  if [[ "$labels" == *,* ]]; then
    echo "::warning::board-reconcile: #$number has several factory labels ($labels), left in $current"
    continue
  fi
  if [ "$state" = "CLOSED" ]; then
    target="Done"
  elif [ "$labels" = "factory:done" ]; then
    echo "::warning::board-reconcile: #$number is open with factory:done, left in $current"
    continue
  else
    target=$(column_for "$labels")
    if [ -z "$target" ]; then
      echo "::warning::board-reconcile: #$number has unknown label $labels, left in $current"
      continue
    fi
  fi

  current_lc=$(echo "$current" | tr '[:upper:]' '[:lower:]')
  target_lc=$(echo "$target" | tr '[:upper:]' '[:lower:]')
  if [ "$current_lc" = "$target_lc" ]; then
    continue
  fi

  state_lc=$(echo "$state" | tr "[:upper:]" "[:lower:]")
  if [ "$dry" = "1" ]; then
    echo "board-reconcile: would move #$number from $current to $target ($labels, $state_lc)"
    moved=$((moved + 1))
    continue
  fi
  echo "board-reconcile: moving #$number from $current to $target ($labels, $state_lc)"
  if "$here/board-move.sh" "$number" "$target"; then
    moved=$((moved + 1))
  else
    echo "::error::board-reconcile: moving #$number to $target failed"
    failed=$((failed + 1))
  fi
done <<< "$cards"

if [ "$dry" = "1" ]; then
  echo "board-reconcile: dry run, $total cards of $repo checked, $moved would move"
else
  echo "board-reconcile: $total cards of $repo checked, $moved moved, $failed failed"
fi
[ "$failed" -eq 0 ]
