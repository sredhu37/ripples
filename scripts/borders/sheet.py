"""Contact sheet: every border file drawn as a picture, for the person who checks the maps.

Reads web/public/borders/*.json and the pins from .cache/years.json. Writes .cache/sheet/page-NN.png,
eight maps a page, oldest first. Each map from 1858 has an inset of South Asia, where ADR 0016 is checked.
Usage: sheet.py [--out DIR] [--years 1500,1869]
"""

import argparse
import json
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
from matplotlib.patches import PathPatch  # noqa: E402
from matplotlib.path import Path as MPath  # noqa: E402
from shapely.geometry import Point, Polygon  # noqa: E402

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
BORDERS = ROOT / "web" / "public" / "borders"
POINTS = ROOT / "web" / "src" / "timeline" / "india-control-points.json"
PER_PAGE = 8
SOUTH_ASIA = (60, 100, 5, 40)
SEA = "#dde8f0"
LAND = "#efe8d8"


def decode_ring(encoded: str) -> list[tuple[float, float]]:
    """The reverse of polyline() in build.py."""
    points, index, x, y = [], 0, 0, 0

    def number() -> int:
        nonlocal index
        result, shift = 0, 0
        while True:
            code = ord(encoded[index]) - 63
            index += 1
            result += (code % 32) << shift
            shift += 5
            if code < 32:
                break
        return -(result + 1) // 2 if result % 2 else result // 2

    while index < len(encoded):
        x += number()
        y += number()
        points.append((x / 100, y / 100))
    return points


def shape_path(encoded: list) -> MPath:
    """One compound path. Matplotlib fills by winding, so rings inside an odd number of rings run clockwise."""
    rings = [decode_ring(r) for r in encoded]
    polys = [Polygon(r) for r in rings]
    verts, codes = [], []
    for i, ring in enumerate(rings):
        depth = sum(1 for j, q in enumerate(polys) if j != i and q.contains(Point(*ring[0])))
        pts = list(ring)
        area = sum(x1 * y2 - x2 * y1 for (x1, y1), (x2, y2) in zip(pts, pts[1:] + pts[:1]))
        if (area > 0) == (depth % 2 == 1):
            pts.reverse()
        verts += pts + [pts[0]]
        codes += [MPath.MOVETO] + [MPath.LINETO] * (len(pts) - 1) + [MPath.CLOSEPOLY]
    return MPath(verts, codes)


def draw(ax, land: MPath, data: dict, pins: list, points: list, year: int) -> None:
    ax.add_patch(PathPatch(land, facecolor=LAND, edgecolor="#6b5b45", linewidth=0.25))
    for s in data["shapes"]:
        ax.add_patch(PathPatch(shape_path(s["rings"]), facecolor=s["colour"], edgecolor="#6b5b45", linewidth=0.35))
    for p in pins:
        ax.plot(p["lon"], p["lat"], "o", ms=3.2, mfc="#c0392b", mec="white", mew=0.4)
    if year >= 1858:
        for p in points:
            ax.plot(p["lon"], p["lat"], "s", ms=2.2, mfc="black", mec="none")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(HERE / ".cache" / "sheet"))
    ap.add_argument("--years", help="comma separated map years; default all")
    args = ap.parse_args()
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    for old in out.glob("page-*.png"):
        old.unlink()

    spec = json.loads((HERE / ".cache" / "years.json").read_text())
    points = json.loads(POINTS.read_text())["points"]
    land = shape_path(json.loads((BORDERS / "land.json").read_text())["rings"])
    years = sorted(int(y) for y in args.years.split(",")) if args.years else sorted(spec["years"])
    pages = [years[i : i + PER_PAGE] for i in range(0, len(years), PER_PAGE)]
    for n, chunk in enumerate(pages, 1):
        fig, axes = plt.subplots(4, 2, figsize=(16, 13.4))
        for ax, year in zip(axes.flat, chunk):
            data = json.loads((BORDERS / f"{year}.json").read_text())
            pins = [p for p in spec["pins"] if p["mapYear"] == year]
            ax.set_facecolor(SEA)
            draw(ax, land, data, pins, points, year)
            ax.set_xlim(-180, 180)
            ax.set_ylim(-58, 84)
            ax.set_aspect("equal")
            ax.set_xticks([])
            ax.set_yticks([])
            label = f"{abs(year)} BCE" if year < 0 else str(year)
            ax.set_title(label, fontsize=11, loc="left", pad=3)
            if year >= 1858:
                inset = ax.inset_axes([0.0, 0.0, 0.17, 0.36])
                inset.set_facecolor(SEA)
                draw(inset, land, data, [], points, year)
                inset.set_xlim(SOUTH_ASIA[0], SOUTH_ASIA[1])
                inset.set_ylim(SOUTH_ASIA[2], SOUTH_ASIA[3])
                inset.set_xticks([])
                inset.set_yticks([])
        for ax in list(axes.flat)[len(chunk) :]:
            ax.axis("off")
        fig.tight_layout(pad=0.6)
        fig.savefig(out / f"page-{n:02d}.png", dpi=110)
        plt.close(fig)
        print(f"sheet: page {n} of {len(pages)}", flush=True)


if __name__ == "__main__":
    main()
