#!/usr/bin/env bash
# Move the issue's card to the column of its factory: label, read now (another run may have swapped
# it since the event). A closed issue's card goes to Done.
#
# Usage: sync/card.sh
# Env:   GH_TOKEN (project scope, FACTORY_TOKEN), LABEL_TOKEN (issues: read), ISSUE
set -euo pipefail

# Read the state and label now, not from the event: another run may have swapped it since.
state=$(GH_TOKEN=$LABEL_TOKEN gh api "repos/$GITHUB_REPOSITORY/issues/$ISSUE" --jq .state)
label=$(GH_TOKEN=$LABEL_TOKEN gh api "repos/$GITHUB_REPOSITORY/issues/$ISSUE/labels" \
  --jq '[.[].name | select(startswith("factory:"))] | first // ""')
if [ "$state" = closed ]; then
  label=factory:done
fi
case "$label" in
  factory:triage) column=Backlog ;;
  factory:suggestion) column="Agent suggestions" ;;
  factory:ready) column=Ready ;;
  factory:in-progress) column="In progress" ;;
  factory:in-review) column="In review" ;;
  factory:human) column="Needs human" ;;
  factory:done) column=Done ;;
  *)
    echo "Issue #$ISSUE has no factory: label; card left as is."
    exit 0
    ;;
esac
.github/scripts/shared/board-move.sh "$ISSUE" "$column"
echo "Issue #$ISSUE ($label) -> $column"
