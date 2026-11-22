#!/usr/bin/env bash
# Relay: Sunny's review or comment on a factory or revert PR dispatches the gate on main in mode
# approve or fix. Holds no secret: the dispatched run re-reads the review or comment from the API.
# Spec: docs/factory.md, sections Gate and Sunny's review.
#
# Usage: gate/relay.sh
# Env:   GH_TOKEN (actions: write), GITHUB_EVENT_NAME, PR, STATE, REVIEW_ID, COMMENT_ID
set -euo pipefail

ref=$(gh api "repos/$GITHUB_REPOSITORY/pulls/$PR" --jq .head.ref)
if ! [[ "$ref" =~ ^(factory/issue-[0-9]+|revert-[0-9a-f]{40})$ ]]; then
  echo "::notice::PR #$PR ($ref) is not a factory or revert PR: nothing to do"
  exit 0
fi
if [ "$GITHUB_EVENT_NAME" = "issue_comment" ]; then
  mode=fix
  source="comment:$COMMENT_ID"
else
  case "$STATE" in
    approved) mode=approve source="" ;;
    changes_requested | commented) mode=fix source="review:$REVIEW_ID" ;;
    *)
      echo "::notice::Review state $STATE: nothing to do"
      exit 0
      ;;
  esac
fi
gh workflow run factory-gate.yml --repo "$GITHUB_REPOSITORY" --ref main \
  -f pr="$PR" -f mode="$mode" -f source="$source"
echo "::notice::Dispatched factory-gate.yml on main: PR #$PR, mode $mode ${source}"
