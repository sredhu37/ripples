#!/usr/bin/env bash
# Weekly triage reminder text: count of open factory:triage issues, age of the oldest, board link.
# Prints nothing when no issue waits, so the caller stays silent.
# Spec: docs/factory.md, sections Triage (triage reminder) and Notifications.
#
# Usage: triage-reminder.sh
# Env:   GH_TOKEN   token with issues: read
#        REPO       owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
#        BOARD_URL  defaults to view 1 of board #2 of sredhu37
set -euo pipefail

board=${BOARD_URL:-https://github.com/users/sredhu37/projects/2/views/1}

repo=${REPO:-${GITHUB_REPOSITORY:-}}
if [ -z "$repo" ]; then
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
fi

# One line per issue: "<number> <age in whole days>". Age counts from when the issue was opened.
waiting=$(gh api --paginate "repos/$repo/issues?state=open&labels=factory:triage&per_page=100" \
  --jq '.[] | select(.pull_request == null)
        | "\(.number) \(((now - (.created_at | fromdateiso8601)) / 86400) | floor)"')

if [ -z "$waiting" ]; then
  echo "triage-reminder: no open factory:triage issue" >&2
  exit 0
fi

count=$(echo "$waiting" | wc -l | tr -d ' ')
oldest=$(echo "$waiting" | awk '{ print $2 }' | sort -n | tail -n 1)
days="days"
if [ "$oldest" = "1" ]; then
  days="day"
fi

printf 'Triage: %s waiting (oldest %s %s)\n%s?filterQuery=label%%3Afactory%%3Atriage\n' \
  "$count" "$oldest" "$days" "$board"
