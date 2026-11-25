#!/usr/bin/env bash
# npm run borders: make the border files of the world map (web/public/borders/<map year>.json).
# Spec: docs/specs/world-timeline-map.md, section 4. Details: scripts/borders/README.md.
#   1. Python tools in .cache/venv (uv) and the map data in .cache/inputs (inputs.py, checked by sha256).
#   2. The export (web/scripts/borders-export.ts) writes the map years and pins to .cache/years.json.
#   3. build.py makes one file per map year, and stops with an error if India breaks ADR 0016.
# Needs uv. The first run downloads about 60 MB of map data and fetches about 1,300 country shapes from
# OpenHistoricalMap (15 to 30 minutes); later runs use .cache and take a few minutes.
#   npm run borders                  all map years
#   npm run borders -- --years 1942  only these map years
#   npm run borders -- sheet         the contact sheet of every map: .cache/sheet/page-NN.png
set -euo pipefail

here=$(cd "$(dirname "$0")" && pwd)
root=$(cd "$here/../.." && pwd)
venv="$here/.cache/venv"

if ! command -v uv >/dev/null; then
  echo "borders: uv is missing (macOS: brew install uv)" >&2
  exit 1
fi

if [ ! -x "$venv/bin/python" ] || ! cmp -s "$here/requirements.txt" "$venv/requirements.txt"; then
  # PYTHONPATH from another Python setup would leak into the venv.
  PYTHONPATH='' uv venv --quiet --allow-existing --python 3.12 "$venv"
  PYTHONPATH='' uv pip install --quiet --python "$venv/bin/python" -r "$here/requirements.txt"
  cp "$here/requirements.txt" "$venv/requirements.txt"
fi

PYTHONPATH='' "$venv/bin/python" "$here/inputs.py"
npm run --silent borders:export --prefix "$root/web"

if [ "${1:-}" = "sheet" ]; then
  shift
  PYTHONPATH='' "$venv/bin/python" "$here/sheet.py" "$@"
else
  PYTHONPATH='' "$venv/bin/python" "$here/build.py" "$@"
fi
