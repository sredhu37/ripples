#!/usr/bin/env bash
# Opens a pull request that reverts a commit which failed the live check.
# Spec: docs/factory.md, section Deploy and live check.
# Run from a full clone (fetch-depth 0) checked out without persisted credentials.
# Env: GH_TOKEN (FACTORY_TOKEN, so the PR's checks run), BROKEN_SHA, RUN_URL, ROLLBACK_RESULT,
#      GITHUB_REPOSITORY, GITHUB_OUTPUT.
# Writes step outputs: pr_url when a PR exists, note when no PR was opened.
set -euo pipefail

: "${GH_TOKEN:?GH_TOKEN is not set}"
: "${BROKEN_SHA:?BROKEN_SHA is not set}"
: "${RUN_URL:?RUN_URL is not set}"
: "${ROLLBACK_RESULT:?ROLLBACK_RESULT is not set}"
output=${GITHUB_OUTPUT:-/dev/stdout}

short=${BROKEN_SHA:0:7}
branch="revert-${BROKEN_SHA}"
subject=$(git log -1 --format=%s "$BROKEN_SHA")

# FACTORY_TOKEN has no workflow scope, so GitHub rejects a push that changes workflow files.
if git diff --name-only "${BROKEN_SHA}^" "$BROKEN_SHA" | grep -q '^\.github/workflows/'; then
  echo "note=No revert PR: the commit changes .github/workflows/ and the bot token cannot push that. Revert it by hand." >>"$output"
  echo "Skipped: $short changes .github/workflows/."
  exit 0
fi

existing=$(gh pr list --head "$branch" --state open --json url --jq '.[0].url // empty')
if [ -n "$existing" ]; then
  echo "pr_url=$existing" >>"$output"
  echo "Revert PR already open: $existing"
  exit 0
fi

login=$(gh api user --jq .login)
id=$(gh api user --jq .id)
git config user.name "$login"
git config user.email "${id}+${login}@users.noreply.github.com"

if git ls-remote --exit-code origin "refs/heads/$branch" >/dev/null; then
  echo "Branch $branch already exists, opening the PR from it."
else
  git fetch origin main
  git switch -c "$branch" origin/main
  # A merge commit needs its mainline parent; the factory squash-merges, so this is usually one parent.
  parents=$(git rev-list --parents -n 1 "$BROKEN_SHA" | wc -w)
  mainline=()
  if [ "$parents" -gt 2 ]; then
    mainline=(-m 1)
  fi
  if ! git revert --no-edit ${mainline[@]+"${mainline[@]}"} "$BROKEN_SHA"; then
    git revert --abort
    echo "note=No revert PR: reverting ${short} conflicts with the current main. Revert it by hand." >>"$output"
    echo "::error::git revert of $short conflicts with the current main."
    exit 1
  fi
  # gh hands GH_TOKEN to git for this one push, so the branch is pushed as the bot.
  git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push origin "HEAD:refs/heads/$branch"
fi

body=$(
  cat <<EOF
## What changed

Reverts ${BROKEN_SHA} (${subject}).

The live check failed after this commit was deployed. Run: ${RUN_URL}

## Decisions

- Opened by \`pages.yml\` after the failed live check. The live site was rolled back to tag \`live-good\` in the same run, so this PR only brings main back in line with the live site.

## Verified

- Live check failed in ${RUN_URL}: the site never served this commit's \`version.txt\`, the page did not render, or the browser console logged errors.
- Rollback deploy of \`live-good\`: ${ROLLBACK_RESULT}.

## Left

- Find the cause in the run's \`live-lighthouse-reports\` artifact, fix it, and land the change again in a new PR.
EOF
)

url=$(gh pr create --base main --head "$branch" --title "Revert ${short}: live check failed" --body "$body")
echo "pr_url=$url" >>"$output"
echo "Opened $url"
