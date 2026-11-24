"""Download the voice models named in models.json into .cache/models, checked by sha256.

Files already present with the right hash are kept, so a second run downloads nothing.
"""

import hashlib
import json
import sys
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
MODELS = HERE / ".cache" / "models"


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for block in iter(lambda: f.read(1 << 20), b""):
            h.update(block)
    return h.hexdigest()


def main() -> int:
    pins = json.loads((HERE / "models.json").read_text())
    for name, pin in pins.items():
        target = MODELS / name
        if target.exists() and sha256(target) == pin["sha256"]:
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        part = target.with_suffix(target.suffix + ".part")
        print(f"voices: downloading {name}", flush=True)
        urllib.request.urlretrieve(pin["url"], part)
        got = sha256(part)
        if got != pin["sha256"]:
            part.unlink()
            print(f"voices: {name} has sha256 {got}, expected {pin['sha256']}", file=sys.stderr)
            return 1
        part.replace(target)
    return 0


if __name__ == "__main__":
    sys.exit(main())
