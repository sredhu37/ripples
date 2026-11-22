#!/usr/bin/env bash
# A closed issue gets factory:done, a reopened one factory:triage.
#
# Usage: sync/close-reopen.sh
# Env:   GH_TOKEN, ISSUE, ACTION (closed or reopened)
set -euo pipefail

if [ "$ACTION" = closed ]; then label=factory:done; else label=factory:triage; fi
.github/scripts/shared/label-set.sh "$ISSUE" "$label"
