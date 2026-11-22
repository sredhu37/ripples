#!/usr/bin/env bash
# The build stopped on a Claude usage limit: back to factory:ready with a comment; the hourly
# sweep restarts it. Spec: docs/factory.md, section Build.
#
# Usage: build/paused.sh
# Env:   GH_TOKEN, BOARD_TOKEN (as shared/move.sh), ISSUE, EVIDENCE, RUN_URL
set -euo pipefail

"$(dirname "$0")/../shared/move.sh" "$ISSUE" factory:ready
gh issue comment "$ISSUE" --repo "$GITHUB_REPOSITORY" --body "paused: usage limit

The build stopped on a Claude limit ($EVIDENCE). The issue is back in factory:ready; the hourly check restarts it. Run: $RUN_URL"
