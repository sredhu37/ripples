#!/usr/bin/env bash
# What did a claude-code-action agent say when it stopped? So a stop without a PR explains itself.
# Reads the action's execution file (the JSON array of Agent SDK messages, output `execution_file`).
# Spec: docs/factory.md, section Build.
#
# Usage: agent-last-words.sh <execution-file> [max-chars]
# Prints: the agent's final message (the result text, else its last text block), cut to max-chars
#         (default 1500), then one "Refused tools:" line when tool calls were refused.
#         Prints nothing when the file is missing or holds no text.
set -euo pipefail

file=${1:?usage: agent-last-words.sh <execution-file> [max-chars]}
max=${2:-1500}

if [ ! -s "$file" ]; then
  exit 0
fi

text=$(jq -r '
  ([.[] | select(.type == "result") | .result // empty | select(length > 0)] | last)
  // ([.[] | select(.type == "assistant") | .message.content[]? | select(.type == "text") | .text] | last)
  // ""
' "$file")

if [ "${#text}" -gt "$max" ]; then
  text="${text:0:$max} [...]"
fi

refused=$(jq -r '
  [.[] | select(.type == "result") | .permission_denials[]?
    | .tool_name + (if .tool_input.command then " (" + (.tool_input.command | .[0:80]) + ")" else "" end)]
  | unique | join(", ")
' "$file")

if [ -n "$text" ]; then
  printf '%s\n' "$text"
fi
if [ -n "$refused" ]; then
  printf 'Refused tools: %s\n' "$refused"
fi
