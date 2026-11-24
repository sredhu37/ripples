#!/usr/bin/env bash
# The build agent's prompt: template .github/prompts/build.md, rules .claude/agents/build.md from
# main, the issue, trusted comments, and for a fix round the review summary or Sunny's comment.
# Runs before the branch switch, so this script and the templates come from main.
# Spec: docs/factory.md, sections Build and Identity secrets and permissions.
#
# Usage: build/prompt.sh
# Env:   GH_TOKEN        token with issues: read and pull-requests: read
#        ISSUE, BRANCH   issue number and factory/issue-<n>
#        FIX_PR, HUMAN   optional, as in build/check.sh
#        TRUSTED_ACTORS  comma-separated logins whose comments reach the agent
# Output (GITHUB_OUTPUT): text
set -euo pipefail

FIX_PR=${FIX_PR:-}
HUMAN=${HUMAN:-}
render="node $(dirname "$0")/../shared/render.mjs"
prompts=.github/prompts
tmp=$(mktemp -d "${RUNNER_TEMP:-${TMPDIR:-/tmp}}/build-prompt.XXXXXX")

# Rules come from main, never from a PR branch (docs/factory.md, Identity secrets and permissions).
git show origin/main:.claude/agents/build.md | awk 'NR == 1 && /^---$/ { fm = 1; next } fm && /^---$/ { fm = 0; next } !fm' > "$tmp/build.md"
TITLE=$(gh api "repos/$GITHUB_REPOSITORY/issues/$ISSUE" --jq .title)
gh api "repos/$GITHUB_REPOSITORY/issues/$ISSUE" --jq '.body // ""' > "$tmp/issue.md"
# Only comments by trusted accounts reach the agent; the agent brief is one of them.
gh api --paginate "repos/$GITHUB_REPOSITORY/issues/$ISSUE/comments" |
  jq -r -s --arg trusted "$TRUSTED_ACTORS" '
    add // [] | .[]
    | select(.user.login as $u | ($trusted | split(",") | index($u)) != null)
    | "### Comment by \(.user.login), \(.created_at)\n\n\(.body)\n"' \
  > "$tmp/comments.md"

: > "$tmp/fix.md"
if [ -n "$HUMAN" ]; then
  # Sunny's comment, read again from the API: only sredhu37's own text reaches the agent.
  id=${HUMAN#*:}
  if [ "${HUMAN%%:*}" = "review" ]; then
    gh api "repos/$GITHUB_REPOSITORY/pulls/$FIX_PR/reviews/$id" > "$tmp/human.json"
    gh api --paginate "repos/$GITHUB_REPOSITORY/pulls/$FIX_PR/reviews/$id/comments" |
      jq -r -s 'add // [] | .[] | "- \(.path):\(.line // .original_line // "file"): \(.body)"' > "$tmp/human-inline.md"
  else
    gh api "repos/$GITHUB_REPOSITORY/issues/comments/$id" > "$tmp/human.json"
    : > "$tmp/human-inline.md"
  fi
  author=$(jq -r '.user.login' "$tmp/human.json")
  if [ "$author" != "sredhu37" ]; then
    echo "::error::$HUMAN is by $author, not sredhu37"
    exit 1
  fi
  {
    jq -r '.body // ""' "$tmp/human.json"
    if [ -s "$tmp/human-inline.md" ]; then
      echo ""
      echo "Line comments:"
      cat "$tmp/human-inline.md"
    fi
  } > "$tmp/comment.md"
  FIX_PR=$FIX_PR BRANCH=$BRANCH HUMAN=$HUMAN COMMENT_FILE="$tmp/comment.md" \
    $render "$prompts/build-fix-human.md" > "$tmp/fix.md"
elif [ -n "$FIX_PR" ]; then
  # Fix round: the latest review summary on the PR (by github-actions[bot], marker on line 1).
  gh api --paginate "repos/$GITHUB_REPOSITORY/issues/$FIX_PR/comments" |
    jq -r -s '[add // [] | .[]
      | select(.user.login == "github-actions[bot]"
        and (.body | test("^<!-- factory-review round=[0-9]+ sha=[0-9a-f]{40} -->")))]
      | last | .body // ""' > "$tmp/review.md"
  # Red required checks on the head (the scan starts a fix round for them too).
  head_sha=$(gh api "repos/$GITHUB_REPOSITORY/pulls/$FIX_PR" --jq .head.sha)
  checks=$("$(dirname "$0")/../gate/checks-green.sh" "$head_sha" 0)
  if [ "$(sed -n 's/^state=//p' <<< "$checks")" = red ]; then
    sed -n 's/^detail=//p' <<< "$checks" > "$tmp/checks.md"
  else
    echo "none" > "$tmp/checks.md"
  fi
  # Every review fix round merges origin/main first (build-fix-review.md), so a conflict never
  # depends on GitHub having computed mergeable yet (#366).
  FIX_PR=$FIX_PR BRANCH=$BRANCH REVIEW_FILE="$tmp/review.md" CHECKS_FILE="$tmp/checks.md" \
    $render "$prompts/build-fix-review.md" > "$tmp/fix.md"
fi

ISSUE=$ISSUE BRANCH=$BRANCH TITLE=$TITLE GITHUB_REPOSITORY=$GITHUB_REPOSITORY TRUSTED_ACTORS=$TRUSTED_ACTORS \
  RULES_FILE="$tmp/build.md" ISSUE_BODY_FILE="$tmp/issue.md" COMMENTS_FILE="$tmp/comments.md" FIX_FILE="$tmp/fix.md" \
  $render "$prompts/build.md" > "$tmp/prompt.md"
"$(dirname "$0")/../shared/output.sh" text "$tmp/prompt.md"
