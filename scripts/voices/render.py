"""Render Otto's voice files from the job list that web/scripts/voices-export.ts wrote.

For each language: deletes files no line uses any more, then renders every missing file.
Usage: render.py [en] [de] [pl]   (no argument: all languages)
"""

import json
import subprocess
import sys
import time
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
AUDIO = ROOT / "web" / "public" / "audio"
MODELS = HERE / ".cache" / "models"
JOBS = HERE / ".cache" / "jobs.json"


def kokoro(cfg: dict):
    from kokoro_onnx import Kokoro

    voices = MODELS / "kokoro" / "voices-v1.0.bin"
    if cfg["model"] == "kokoro-v1.0":
        k = Kokoro(str(MODELS / "kokoro" / "kokoro-v1.0.onnx"), str(voices))
        voice = cfg["voice"]
    elif cfg["model"] == "kokoro-de":
        # German fine-tune: its own model, any voices file, the style vector from its own .bin.
        k = Kokoro(str(MODELS / "kokoro-de" / "model.onnx"), str(voices))
        raw = np.fromfile(MODELS / "kokoro-de" / f"{cfg['voice']}.bin", dtype=np.float32)
        voice = raw.reshape(-1, 1, 256)
    else:
        raise ValueError(f"unknown kokoro model {cfg['model']}")

    def say(text: str):
        return k.create(text, voice=voice, speed=cfg["speed"], lang=cfg["lang"])

    return say


def piper(cfg: dict):
    from piper import PiperVoice, SynthesisConfig

    v = PiperVoice.load(str(MODELS / "piper" / f"{cfg['model']}.onnx"))
    # speed 1 keeps the pace the model was trained with (its own length_scale).
    syn = SynthesisConfig(length_scale=None if cfg["speed"] == 1 else 1 / cfg["speed"])

    def say(text: str):
        chunks = list(v.synthesize(text, syn_config=syn))
        audio = np.concatenate([c.audio_float_array for c in chunks])
        return audio, chunks[0].sample_rate

    return say


def encode(audio: np.ndarray, rate: int, target: Path) -> None:
    """AAC in .m4a, 32 kbps mono: plays in every browser, including older iPads."""
    part = target.with_suffix(".part.m4a")
    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(rate), "-ac", "1", "-i", "pipe:",
         "-c:a", "aac", "-b:a", "32k", "-ac", "1", "-map_metadata", "-1",
         "-movflags", "+faststart", str(part)],
        input=audio.astype(np.float32).tobytes(),
        check=True,
    )
    part.replace(target)


def render(lang: str, job: dict) -> int:
    folder = AUDIO / lang
    folder.mkdir(parents=True, exist_ok=True)
    wanted = {f["id"]: f["text"] for f in job["files"]}
    for old in folder.glob("*.m4a"):
        if old.stem not in wanted:
            old.unlink()
    todo = [(i, t) for i, t in wanted.items() if not (folder / f"{i}.m4a").exists()]
    print(f"voices: {lang}: {len(wanted)} lines, {len(todo)} to render", flush=True)
    if not todo:
        return 0
    cfg = job["voice"]
    say = kokoro(cfg) if cfg["engine"] == "kokoro" else piper(cfg)
    start = time.time()
    for n, (file_id, text) in enumerate(todo, 1):
        audio, rate = say(text)
        encode(audio, rate, folder / f"{file_id}.m4a")
        if n % 50 == 0 or n == len(todo):
            print(f"voices: {lang}: {n}/{len(todo)} in {time.time() - start:.0f} s", flush=True)
    return len(todo)


def main(langs: list[str]) -> int:
    jobs = json.loads(JOBS.read_text())
    for lang in langs or ["en", "de", "pl"]:
        render(lang, jobs[lang])
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
