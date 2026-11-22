#!/usr/bin/env bash
# A closed issue may unblock a factory:ready issue: start the build of the oldest one.
# Spec: docs/factory.md, section Build.
#
# Usage: build/unblock.sh
# Env:   GH_TOKEN  token with issues: read and actions: write
#        CLOSED    the issue that was closed
set -euo pipefail

next=$(.github/scripts/build/next-unblocked.sh "$CLOSED")
if [ -z "$next" ]; then
  echo "Closing #$CLOSED unblocked no factory:ready issue"
  exit 0
fi
echo "Closing #$CLOSED unblocked #$next, starting its build"
gh workflow run factory-build.yml --repo "$GITHUB_REPOSITORY" --ref main -f issue="$next"
