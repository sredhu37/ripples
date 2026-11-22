#!/usr/bin/env bash
# Lighthouse with one retry: shared runners are noisy, so a median can land over a limit with no
# app change; a real slowdown fails both tries. Config: web/lighthouserc.json.
#
# Usage: checks/lighthouse.sh        (in web/)
set -e # as in a default workflow step: no pipefail

if npx --yes @lhci/cli@0.16.0 autorun; then exit 0; fi
echo "::warning::Lighthouse failed once, retrying (runner noise check)"
rm -rf .lighthouseci
npx --yes @lhci/cli@0.16.0 autorun
