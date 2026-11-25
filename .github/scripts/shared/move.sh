#!/usr/bin/env bash
# Move an issue to a factory state: its one factory: label (label-set.sh) and its board column
# (board-move.sh), in one call. Every workflow and the local /factory skill move tickets with this.
# Spec: docs/factory.md, section Labels and board (the label is the truth, the board mirrors it).
#
# Usage: shared/move.sh <issue> <label>      e.g. shared/move.sh 139 factory:in-progress
# Env:   GH_TOKEN     token with issues: write for the label (GITHUB_TOKEN in workflows, so no new runs start)
#        BOARD_TOKEN  token with the project scope for the card (FACTORY_TOKEN in workflows, never in a
#                     step that runs an agent); defaults to GH_TOKEN
#        REPO         owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
#
# A failed label change fails the script. A failed card move only warns: the label is the truth and
# the hourly reconcile (sweep/board-reconcile.sh) puts the card right.
set -euo pipefail

here=$(cd "$(dirname "$0")" && pwd)
issue=${1:?usage: shared/move.sh <issue> <label>}
label=${2:?usage: shared/move.sh <issue> <label>}

case "$label" in
  factory:triage) column=Backlog ;;
  factory:suggestion) column="Agent suggestions" ;;
  factory:ready) column=Ready ;;
  factory:in-progress) column="In progress" ;;
  factory:in-review) column="In review" ;;
  factory:human) column="Needs human" ;;
  factory:done) column=Done ;;
  *)
    echo "move: unknown factory label '$label'" >&2
    exit 2
    ;;
esac

"$here/label-set.sh" "$issue" "$label"

if ! GH_TOKEN=${BOARD_TOKEN:-$GH_TOKEN} "$here/board-move.sh" "$issue" "$column"; then
  echo "::warning::move: #$issue has $label, but its card did not move to $column; the hourly reconcile retries"
fi
