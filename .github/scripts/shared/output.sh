#!/usr/bin/env bash
# Write a step output that may span lines (a prompt, an agent's last words) with a random delimiter,
# so the text itself can never end the value early.
#
# Usage: shared/output.sh <name> [<file>]     the value comes from <file>, or from stdin
# Env:   GITHUB_OUTPUT  set by Actions; when unset (a run from a terminal) the output is printed
set -euo pipefail

name=${1:?usage: shared/output.sh <name> [<file>]}
file=${2:-/dev/stdin}
delim="EOF_$(openssl rand -hex 16)"
{
  echo "$name<<$delim"
  printf '%s\n' "$(cat "$file")"
  echo "$delim"
} >> "${GITHUB_OUTPUT:-/dev/stdout}"
