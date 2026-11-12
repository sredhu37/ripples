#!/usr/bin/env bash
# Did a claude-code-action run stop on a Claude usage or rate limit?
# Reads the action's execution file (the JSON array of Agent SDK messages, output `execution_file`).
# Spec: docs/factory.md, section Build (a usage limit puts the issue back to factory:ready).
#
# Usage: usage-limit.sh <execution-file>
# Exit:  0 and prints the evidence when it was a limit; 1 when not, or when the file is missing.
#
# Only error signals count, never tool output or the agent's own words, so a lesson about
# "rate limits" or an npm 429 cannot pause a build:
#   - an assistant message with error "rate_limit" (the SDK's typed code for a 429 on the plan)
#   - a rate_limit_event with status "rejected"
#   - a result with is_error true whose text names a limit ("You've hit your session limit",
#     "usage limit", "limit reached"), excluding "Context limit reached"
set -euo pipefail

file=${1:?usage: usage-limit.sh <execution-file>}

if [ ! -s "$file" ]; then
  echo "usage-limit: no execution file at $file" >&2
  exit 1
fi

evidence=$(jq -r '
  .[]
  | if .type == "assistant" and .error == "rate_limit" then
      "assistant error: rate_limit"
    elif .type == "rate_limit_event" and .rate_limit_info.status == "rejected" then
      "rate_limit_event: rejected"
    elif .type == "result" and .is_error == true
      and ((.result // "") | test("hit your [a-z ]*limit|usage limit|limit reached"; "i"))
      and ((.result // "") | test("context limit reached"; "i") | not) then
      "result: " + (.result | split("\n")[0])
    else
      empty
    end
' "$file" | head -n 1)

if [ -n "$evidence" ]; then
  echo "$evidence"
  exit 0
fi
exit 1
