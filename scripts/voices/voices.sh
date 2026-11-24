#!/usr/bin/env bash
# npm run voices: make Otto's voice files for every line he can say. Spec: docs/writing-lessons.md,
# section Voice files.
#   1. Python tools in .cache/venv (uv) and the voice models in .cache/models (models.py).
#   2. The export (web/scripts/voices-export.ts) writes web/src/voice/manifest.<lang>.json and the job list.
#   3. render.py deletes unused files and renders missing ones into web/public/audio/<lang>/.
# Needs uv and ffmpeg. The first full render takes about 1.5 to 2 hours on an M1 Pro; after that only
# changed lines render. Pass languages to limit the render: npm run voices -- de
set -euo pipefail

here=$(cd "$(dirname "$0")" && pwd)
root=$(cd "$here/../.." && pwd)
venv="$here/.cache/venv"

for tool in uv ffmpeg; do
  if ! command -v "$tool" >/dev/null; then
    echo "voices: $tool is missing (macOS: brew install $tool)" >&2
    exit 1
  fi
done

if [ ! -x "$venv/bin/python" ] || ! cmp -s "$here/requirements.txt" "$venv/requirements.txt"; then
  # PYTHONPATH from another Python setup would leak into the venv.
  PYTHONPATH='' uv venv --quiet --allow-existing --python 3.12 "$venv"
  PYTHONPATH='' uv pip install --quiet --python "$venv/bin/python" -r "$here/requirements.txt"
  cp "$here/requirements.txt" "$venv/requirements.txt"
fi

PYTHONPATH='' "$venv/bin/python" "$here/models.py"
npm run --silent voices:export --prefix "$root/web"
PYTHONPATH='' "$venv/bin/python" "$here/render.py" "$@"
