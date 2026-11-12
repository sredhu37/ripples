#!/usr/bin/env bash
# Waits until the live site serves version.txt equal to a commit sha.
# Spec: docs/factory.md, section Deploy and live check.
# Usage: pages-wait-version.sh <sha> [timeout-seconds, default 600]
# Env: SITE_URL, the live site root ending in "/".
set -euo pipefail

sha=${1:?usage: pages-wait-version.sh <sha> [timeout-seconds]}
timeout=${2:-600}
: "${SITE_URL:?SITE_URL is not set}"

start=$(date +%s)
while true; do
  # A new query string on every try: Pages caches each URL for up to 600 s,
  # so a reused URL could keep answering with the old file or a 404.
  url="${SITE_URL}version.txt?v=${sha}&t=$(date +%s)"
  got=$(curl -fsS --max-time 20 "$url" 2>/dev/null | tr -d '[:space:]') || got=""
  waited=$(($(date +%s) - start))
  if [ "$got" = "$sha" ]; then
    echo "Live site serves $sha (after ${waited} s)."
    exit 0
  fi
  if [ "$waited" -ge "$timeout" ]; then
    echo "::error::Live site still serves version '${got:-none}' after ${waited} s, expected $sha."
    exit 1
  fi
  echo "version.txt is '${got:-none}', expected $sha. Waiting (${waited} s of ${timeout} s)."
  sleep 15
done
