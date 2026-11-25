"""Download the inputs named in inputs.json into .cache/inputs, checked by sha256, and unzip them.

Files already present with the right hash are kept, so a second run downloads nothing.
"""

import hashlib
import json
import sys
import urllib.request
import zipfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
INPUTS = HERE / ".cache" / "inputs"


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for block in iter(lambda: f.read(1 << 20), b""):
            h.update(block)
    return h.hexdigest()


def main() -> int:
    pins = json.loads((HERE / "inputs.json").read_text())
    for name, pin in pins.items():
        target = INPUTS / name
        folder = INPUTS / name.removesuffix(".zip")
        if not (target.exists() and sha256(target) == pin["sha256"]):
            target.parent.mkdir(parents=True, exist_ok=True)
            part = target.with_suffix(target.suffix + ".part")
            print(f"borders: downloading {name}", flush=True)
            urllib.request.urlretrieve(pin["url"], part)
            got = sha256(part)
            if got != pin["sha256"]:
                part.unlink()
                print(f"borders: {name} has sha256 {got}, expected {pin['sha256']}", file=sys.stderr)
                return 1
            part.replace(target)
            if folder.exists():
                for old in folder.iterdir():
                    old.unlink()
        if not folder.exists() or not any(folder.iterdir()):
            folder.mkdir(parents=True, exist_ok=True)
            with zipfile.ZipFile(target) as z:
                z.extractall(folder)
    return 0


if __name__ == "__main__":
    sys.exit(main())
