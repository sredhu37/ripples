#!/usr/bin/env bash
# Sunny approved a factory PR in Needs human: the ticket goes back to In review, and the scan takes
# it from there (merge once the head is up to date and green, a fix round on a conflict or a red
# check). Spec: docs/factory.md, section Gate (Sunny's review).
#
# The marker <!-- factory-approved sha=<sha> review=<id> --> tells the scan and merge mode that
# Sunny approved this head. A new head (fix round, conflict) has no marker, so it goes through
# review and the gate again.
#
# Usage: gate/approved.sh
# Env:   GH_TOKEN (issues and pull-requests: write, actions: write), BOARD_TOKEN (as shared/move.sh),
#        PR, SHA, ISSUE, REVIEW, SUNNY, RUN_URL; MERGEABLE_TRIES and MERGEABLE_SLEEP as
#        gate/mergeable.sh
set -euo pipefail

here=$(cd "$(dirname "$0")" && pwd)

.github/scripts/shared/move.sh "$ISSUE" factory:in-review

# Ask GitHub now, the documented way (retries while it computes), so the scan reads an answer.
conflict=$("$here/mergeable.sh" "$PR")
case "$(sed -n 's/^conflict=//p' <<< "$conflict")" in
  yes) next="It conflicts with main, so a fix round merges main and resolves it; the new head comes back to you." ;;
  no) next="The factory merges it once it is up to date with main and every required check is green. A red check starts a fix round." ;;
  *) next="GitHub has not said yet whether it conflicts with main ($(sed -n 's/^detail=//p' <<< "$conflict")); the next scan asks again." ;;
esac

gh api -X POST "repos/$GITHUB_REPOSITORY/issues/$PR/comments" --silent -f body="<!-- factory-approved sha=$SHA review=$REVIEW -->
$SUNNY approved \`${SHA:0:7}\`: back to In review. $next Run: $RUN_URL"
# The scan for this ticket only, so the merge does not wait for the next hourly scan.
gh workflow run factory-sweep.yml --repo "$GITHUB_REPOSITORY" --ref main -f task=scan -f issue="$ISSUE"
echo "::notice::PR #$PR approved at ${SHA:0:7}: #$ISSUE back to In review, scan dispatched"
