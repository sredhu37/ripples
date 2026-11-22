#!/usr/bin/env bash
# Restart the oldest unblocked factory:ready issue (paused or missed) when no build runs:
# sweep/restart.sh picks it, this dispatches factory-build.yml.
#
# Usage: sweep/dispatch-restart.sh
# Env:   GH_TOKEN (issues: read, actions: write)
set -euo pipefail

issue=$(.github/scripts/sweep/restart.sh)
if [ -z "$issue" ]; then
  echo "Nothing to restart"
  exit 0
fi
echo "::notice::Restarting #$issue: dispatching factory-build"
gh workflow run factory-build.yml --repo "$GITHUB_REPOSITORY" --ref main -f issue="$issue"
