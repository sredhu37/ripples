#!/usr/bin/env bash
# Move an issue's card on the factory board (Projects v2) to <column>. Adds the card if missing.
# Spec: docs/factory.md, section Labels and board (the label is the truth, the board mirrors it).
#
# Usage: board-move.sh <issue> <column>
#        column is a Status option name: Backlog, Ready, "In progress", "In review", "Needs human", Done
# Env:   GH_TOKEN                 token with the project scope (FACTORY_TOKEN in workflows,
#                                 never in a step that runs an agent)
#        REPO                     owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
#        FACTORY_PROJECT_ID       defaults to board #2 of sredhu37
#        FACTORY_STATUS_FIELD_ID  defaults to that board's Status field
#
# GraphQL variables ($field, $item, ...) sit in single quotes on purpose: gh passes them, not bash.
# shellcheck disable=SC2016
set -euo pipefail

issue=${1:?usage: board-move.sh <issue> <column>}
column=${2:?usage: board-move.sh <issue> <column>}

project=${FACTORY_PROJECT_ID:-PVT_kwHOAIaaWM4BrKpj}
field=${FACTORY_STATUS_FIELD_ID:-PVTSSF_lAHOAIaaWM4BrKpjzhpejZI}

repo=${REPO:-${GITHUB_REPOSITORY:-}}
if [ -z "$repo" ]; then
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
fi

# Status option id by name, so a renamed or recreated option needs no script change.
option=$(gh api graphql -f field="$field" -f query='
  query($field: ID!) {
    node(id: $field) { ... on ProjectV2SingleSelectField { options { id name } } }
  }' --jq ".data.node.options[] | select((.name | ascii_downcase) == (\"$column\" | ascii_downcase)) | .id")
if [ -z "$option" ]; then
  echo "board-move: no Status option named '$column' on field $field" >&2
  exit 2
fi

content=$(gh api "repos/$repo/issues/$issue" --jq .node_id)

item=$(gh api graphql -f content="$content" -f query='
  query($content: ID!) {
    node(id: $content) {
      ... on Issue { projectItems(first: 50) { nodes { id project { id } } } }
    }
  }' --jq ".data.node.projectItems.nodes[] | select(.project.id == \"$project\") | .id")

if [ -z "$item" ]; then
  item=$(gh api graphql -f project="$project" -f content="$content" -f query='
    mutation($project: ID!, $content: ID!) {
      addProjectV2ItemById(input: { projectId: $project, contentId: $content }) { item { id } }
    }' --jq .data.addProjectV2ItemById.item.id)
  echo "board-move: added #$issue to the board"
fi

gh api graphql -f project="$project" -f item="$item" -f field="$field" -f option="$option" -f query='
  mutation($project: ID!, $item: ID!, $field: ID!, $option: String!) {
    updateProjectV2ItemFieldValue(input: {
      projectId: $project, itemId: $item, fieldId: $field,
      value: { singleSelectOptionId: $option }
    }) { projectV2Item { id } }
  }' > /dev/null

echo "board-move: #$issue is in $column"
