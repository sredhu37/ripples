"""Whisper round trip audit using mlx-whisper (whisper-large-v3-turbo).

Compares rendered audio against expected spoken lines to catch drops, hallucinations,
or severe pronunciation bugs.
"""

from __future__ import annotations

import argparse
import difflib
import json
from pathlib import Path
import re
import sys
import time

try:
    import mlx_whisper  # type: ignore[import-untyped]
except ImportError:
    print("mlx_whisper is required: install in venv or run with mlx_whisper python", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent.parent
CACHE = ROOT / "scripts" / "voices" / ".cache"
AUDIO = ROOT / "web" / "public" / "audio"
MODEL = "mlx-community/whisper-large-v3-turbo"


def norm(text: str) -> str:
    t = text.lower()
    t = re.sub(r"[\.,!?:;«»\"\"\'\'„”…—\-\(\)]", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    return t


def screen_lines(lang: str) -> dict[str, str]:
    """Spoken version -> screen line, from web/src/voice/spoken.<lang>.json."""
    spoken = json.loads((ROOT / "web" / "src" / "voice" / f"spoken.{lang}.json").read_text())
    return {said: screen for screen, said in spoken.items()}


def audit_language(
    lang: str, limit: int | None = None, threshold: float = 0.80, numbers: bool = False
) -> dict:
    jobs_file = CACHE / "jobs.json"
    if not jobs_file.exists():
        raise FileNotFoundError(f"Jobs file not found: {jobs_file}")

    data = json.loads(jobs_file.read_text())
    files = data[lang]["files"]
    screens = screen_lines(lang)
    if numbers:
        # Only lines with a spoken version. Whisper may write numbers as digits,
        # so these are also compared against the screen line.
        files = [f for f in files if f["text"] in screens]
    if limit:
        files = files[:limit]

    lang_dir = AUDIO / lang
    results = []
    flagged = []
    total = len(files)
    t0 = time.time()

    print(f"Auditing {lang} ({total} files) with {MODEL}...")

    for idx, item in enumerate(files, 1):
        fid = item["id"]
        expected = item["text"]
        fpath = lang_dir / f"{fid}.m4a"

        if not fpath.exists():
            flagged.append({
                "id": fid,
                "expected": expected,
                "error": "File missing on disk",
                "ratio": 0.0,
            })
            continue

        try:
            res = mlx_whisper.transcribe(str(fpath), path_or_hf_repo=MODEL, language=lang)
            transcribed = res.get("text", "").strip()
        except Exception as e:
            flagged.append({
                "id": fid,
                "expected": expected,
                "error": str(e),
                "ratio": 0.0,
            })
            continue

        n_got = norm(transcribed)
        ratio = difflib.SequenceMatcher(None, norm(expected), n_got).ratio()
        screen = screens.get(expected)
        if screen:
            ratio = max(ratio, difflib.SequenceMatcher(None, norm(screen), n_got).ratio())

        entry = {
            "id": fid,
            "screen": screen,
            "expected": expected,
            "transcribed": transcribed,
            "ratio": round(ratio, 3),
        }
        results.append(entry)

        if ratio < threshold:
            flagged.append(entry)

        if idx % 50 == 0 or idx == total:
            dt = time.time() - t0
            print(f"[{lang}] {idx}/{total} in {dt:.1f}s ({dt/idx:.2f}s/file) - {len(flagged)} flagged")

    return {
        "lang": lang,
        "total": total,
        "audited": len(results),
        "flagged_count": len(flagged),
        "flagged": flagged,
        "elapsed_seconds": round(time.time() - t0, 1),
    }


def main():
    parser = argparse.ArgumentParser(description="Audit voice audio files with Whisper")
    parser.add_argument("langs", nargs="*", default=["pl"], help="Languages to audit (en, de, pl)")
    parser.add_argument("--limit", type=int, default=None, help="Limit number of files per lang")
    parser.add_argument("--threshold", type=float, default=0.75, help="Similarity threshold")
    parser.add_argument("--numbers", action="store_true", help="Only lines with a spoken version")
    parser.add_argument("--out", type=Path, default=CACHE / "whisper_audit_report.json")
    args = parser.parse_args()

    reports = {}
    for lang in args.langs:
        reports[lang] = audit_language(
            lang, limit=args.limit, threshold=args.threshold, numbers=args.numbers
        )

    args.out.write_text(json.dumps(reports, indent=2, ensure_ascii=False) + "\n")
    print(f"\nAudit finished. Report saved to {args.out}")

    for lang, r in reports.items():
        print(f"\nSummary for {lang.upper()}:")
        print(f"  Total: {r['total']}")
        print(f"  Flagged (< {args.threshold}): {r['flagged_count']}")
        if r['flagged']:
            print("  Top flagged items:")
            for f in r['flagged'][:5]:
                print(f"    - ID: {f['id']} (ratio {f.get('ratio', 0)})")
                print(f"      EXP: {f['expected']}")
                print(f"      GOT: {f.get('transcribed', f.get('error'))}")


if __name__ == "__main__":
    main()
