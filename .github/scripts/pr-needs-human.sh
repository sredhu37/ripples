#!/usr/bin/env bash
# Telegram "Needs human" message for a PR: title, reason, PR link, evidence GIF link.
# Spec: docs/factory.md, sections Gate and Notifications.
#
# Usage: pr-needs-human.sh <pr> <reason>
# Env:   GH_TOKEN          token with pull-requests and issues read (GITHUB_TOKEN)
#        TELEGRAM_TOKEN    bot token (passed on to telegram.sh)
#        TELEGRAM_CHAT_ID  chat id
#        RUN_URL           optional, the workflow run
#        REPO              owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
#        DRY_RUN           1: print the message, do not send it
set -euo pipefail

pr=${1:?usage: pr-needs-human.sh <pr> <reason>}
reason=${2:?usage: pr-needs-human.sh <pr> <reason>}
here=$(cd "$(dirname "$0")" && pwd)

repo=${REPO:-${GITHUB_REPOSITORY:-}}
if [ -z "$repo" ]; then
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
fi
server=${GITHUB_SERVER_URL:-https://github.com}

title=$(gh api "repos/$repo/pulls/$pr" --jq .title)
pr_url="$server/$repo/pull/$pr"
# The walkthrough video from the evidence comment (by github-actions[bot], marker on line 1):
# the first markdown link whose URL ends in /demo.mp4. Without one, the PR link.
video=$(gh api --paginate "repos/$repo/issues/$pr/comments" --jq '
  .[] | select(.user.login == "github-actions[bot]" and ((.body // "") | startswith("<!-- evidence -->")))
  | .body' | grep -oE '\]\(https://[^) ]+/demo\.mp4\)' | head -n 1 | sed -E 's/^\]\((.*)\)$/\1/' || true)

text="Needs human: PR #$pr \"$title\"
reason: $reason
$pr_url
evidence video: ${video:-none on the PR, see $pr_url}"
if [ -n "${RUN_URL:-}" ]; then
  text="$text
run: $RUN_URL"
fi

if [ "${DRY_RUN:-}" = "1" ]; then
  printf '%s\n' "$text"
  exit 0
fi
"$here/telegram.sh" "$text"
