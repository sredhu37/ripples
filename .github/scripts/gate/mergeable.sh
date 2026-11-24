#!/usr/bin/env bash
# Does the PR conflict with its base? Asks GitHub's REST API the documented way: a GET starts the
# background job, later GETs read the result. Spec: docs/factory.md, section Gate (#366).
#
# Usage: gate/mergeable.sh <pr>
# Env:   GH_TOKEN         token with pull-requests: read
#        REPO             owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
#        MERGEABLE_TRIES  reads before giving up (default 5)
#        MERGEABLE_SLEEP  seconds between reads (default 60)
# Output: conflict=yes|no|unknown and detail=<text> on stdout. yes: mergeable is false or
#         mergeable_state is "dirty". unknown: mergeable stayed null for every read.
#         Every read is logged to stderr, so a run log shows what GitHub answered.
set -euo pipefail

pr=${1:?usage: gate/mergeable.sh <pr>}
tries=${MERGEABLE_TRIES:-5}
pause=${MERGEABLE_SLEEP:-60}

repo=${REPO:-${GITHUB_REPOSITORY:-}}
if [ -z "$repo" ]; then
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
fi

mergeable=null
state=unknown
for try in $(seq 1 "$tries"); do
  # An API error ends the script (set -e) instead of reading as "not computed yet".
  out=$(gh api "repos/$repo/pulls/$pr" \
    --jq '[(.mergeable // "null" | tostring), (.mergeable_state // "unknown")] | @tsv')
  IFS=$'\t' read -r mergeable state <<< "$out"
  echo "mergeable: PR #$pr read $try of $tries: mergeable=$mergeable mergeable_state=$state" >&2
  if [ "$mergeable" = false ] || [ "$state" = dirty ]; then
    echo "conflict=yes"
    echo "detail=mergeable=$mergeable, mergeable_state=$state"
    exit 0
  fi
  if [ "$mergeable" = true ]; then
    echo "conflict=no"
    echo "detail=mergeable=true, mergeable_state=$state"
    exit 0
  fi
  if [ "$try" -lt "$tries" ]; then sleep "$pause"; fi
done
echo "conflict=unknown"
echo "detail=no answer after $tries reads ${pause}s apart (mergeable=$mergeable, mergeable_state=$state)"
