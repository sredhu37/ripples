#!/usr/bin/env bash
# Print an agent's tool list into the job summary, so each run shows what the agent could do.
#
# Usage: shared/tool-list.sh <agent>
# Env:   ALLOWED_TOOLS, DENIED_TOOLS
set -euo pipefail

agent=${1:?usage: shared/tool-list.sh <agent>}
{
  echo "### $agent agent tools"
  echo ""
  echo "- allowed: \`$ALLOWED_TOOLS\`"
  echo "- denied: \`$DENIED_TOOLS\`"
  echo "- token: GITHUB_TOKEN with contents: read and pull-requests: read; no id-token, so no Claude App token"
} | tee -a "${GITHUB_STEP_SUMMARY:-/dev/null}"
