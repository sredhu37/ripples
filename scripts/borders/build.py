"""Make the border files: one JSON per map year in web/public/borders/<year>.json.

  borders.sh runs this after inputs.py and the export of the map years (web/scripts/borders-export.ts).
  Sources (spec section 4): OpenHistoricalMap from 1900, Cliopatria before 1900, every shape clipped
  to Natural Earth land. India's outline is the Natural Earth India point of view (ADR 0016).

Usage: build.py [--years 1942,1500] [--tolerance 0.08]

File format (read by web/src/timeline/borders.ts):
  land.json: {"rings": ["<polyline>", ...]}. All land, drawn neutral under every map (spec D4: land with no
  polity stays unassigned).
  {"year": 1942, "shapes": [{"country": "India", "colour": "#f7b37a", "rings": ["<polyline>", ...]}]}
  Shapes are in drawing order. Rings are filled even-odd, so a ring inside a ring is a hole. A ring is
  longitude and latitude in hundredths of a degree, each as the difference to the point before, written
  in the polyline format (zigzag, 5 bits a character, offset 63) that map libraries use.
"""

import argparse
import json
import sys
from pathlib import Path

from shapely import from_wkb, set_precision
from shapely.geometry import Point, Polygon
from shapely.ops import unary_union

import ohm
import prep
from prep import World, polygons

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
OUT = ROOT / "web" / "public" / "borders"
CACHE = HERE / ".cache"
CONTROL_POINTS = ROOT / "web" / "src" / "timeline" / "india-control-points.json"

# Degrees. How far a simplified edge may drift from the real one. Raised per file only when needed.
TOLERANCE = 0.08
# A file may not be bigger than this (spec D2: about 70 KB, small enough for an iPad).
MAX_BYTES = 70_000
# Square degrees. Smaller islands and slivers are not drawn.
MIN_AREA = 0.03
# From this year India is drawn as the India point of view (spec section 4.2). Before it, dynastic borders.
INDIA_FROM = 1858
# Present-day countries whose holes in OpenHistoricalMap are filled from Natural Earth (spec section 8.2).
FILLED_COUNTRIES = ["Oman", "Yemen", "United Arab Emirates", "Egypt"]
# Grid for coordinates: 0.01 degrees, about 1 km.
GRID = 0.01
# Degrees. Radius of the disc that keeps an ADR 0016 control point inside India after simplifying.
PIN_RADIUS = 0.04


def active_items(store: dict, tags: dict, year: int) -> list[tuple[str, object, str]]:
    """(name, geometry, present-day country) of every source shape that exists on 1 January of the year."""
    rows: dict[str, list] = {}
    if year < 1900:
        for name, start, end, wkb, country in store["clio"].values():
            if wkb and start <= year <= end:
                rows.setdefault(name, []).append((from_wkb(wkb), country))
    else:
        for i, (name, _, wkb, country) in store["ohm"].items():
            if wkb and ohm.active(tags[i], float(year)):
                rows.setdefault(name, []).append((from_wkb(wkb), country))
    out = []
    for name, parts in rows.items():
        # A polity in several rows takes the country of its largest row.
        country = max(parts, key=lambda r: r[0].area)[1]
        out.append((name, unary_union([g for g, _ in parts]), country))
    return out


def fill_gaps(world: World, items: list, year: int) -> list:
    """Spec section 8.2: OpenHistoricalMap has no shape for part of Oman, Yemen and the Emirates (1942) or
    Egypt (1900). Where one of these present-day countries is not covered, its Natural Earth outline fills
    the hole. Other holes stay unassigned and are drawn neutral (D4)."""
    if year < 1900 or not items:
        return items
    covered = unary_union([g for _, g, _ in items]).buffer(0.02)
    out = list(items)
    for country in FILLED_COUNTRIES:
        gap = polygons(world.full_countries[country].difference(covered))
        if gap is not None:
            out.append((f"{country} (gap filled from Natural Earth)", gap, country))
    return out


def thin(g, tolerance: float):
    """Simplify, drop tiny islands and tiny holes."""
    g = polygons(g.simplify(tolerance, preserve_topology=True)) if g is not None else None
    if g is None:
        return None
    parts = []
    for p in getattr(g, "geoms", [g]):
        if p.area < MIN_AREA:
            continue
        holes = [h for h in p.interiors if Polygon(h).area >= MIN_AREA]
        parts.append(Polygon(p.exterior, holes))
    return unary_union(parts) if parts else None


def control_points() -> list[dict]:
    return json.loads(CONTROL_POINTS.read_text())["points"]


def pinned(india, full):
    """Simplifying moves an edge by up to the tolerance. A control point that sits just inside the real
    outline (Kalapani is 0.6 km inside) would fall out, so India grows a small disc around each one."""
    for p in control_points():
        pt = Point(p["lon"], p["lat"])
        if full.contains(pt) and not india.contains(pt):
            india = india.union(pt.buffer(PIN_RADIUS))
    return india


def finish(world: World, items: list, year: int, tolerance: float) -> list[tuple[str, object, str]]:
    shapes = [(n, thin(g, tolerance), c) for n, g, c in items]
    shapes = [(n, g, c) for n, g, c in shapes if g is not None]
    full = world.full_countries["India"]
    india = thin(full, tolerance)
    if india is None:
        raise SystemExit("borders: India has no shape. No fallback (ADR 0016).")
    india = pinned(india, full)

    if year >= INDIA_FROM:
        # The shape that is India in this year (British India before 1947) takes in the whole outline.
        overlap = [(g.intersection(india).area if c == "India" else 0.0, i) for i, (_, g, c) in enumerate(shapes)]
        best, home = max(overlap) if overlap else (0.0, -1)
        if best < india.area * 0.2:
            shapes.append(("India", india, "India"))
            home = len(shapes) - 1
        shapes = [(n, g.union(india) if i == home else g.difference(india), c) for i, (n, g, c) in enumerate(shapes)]
    else:
        # Dynastic borders stay, but no foreign power is drawn inside the outline.
        shapes = [(n, g if c == "India" else g.difference(india), c) for n, g, c in shapes]

    result = []
    for n, g, c in shapes:
        g = polygons(set_precision(g, GRID)) if not g.is_empty else None
        g = polygons(g.buffer(0)) if g is not None else None
        if g is None:
            continue
        parts = [p for p in getattr(g, "geoms", [g]) if p.area >= MIN_AREA]
        if parts:
            result.append((n, unary_union(parts), c))
    # Big shapes first, so small ones are drawn on top.
    result.sort(key=lambda r: -r[1].area)
    return result


def rings(g) -> list[list[tuple[float, float]]]:
    out = []
    for p in getattr(g, "geoms", [g]):
        for ring in [p.exterior, *p.interiors]:
            pts = list(ring.coords)[:-1]
            if len(pts) >= 3:
                out.append(pts)
    return out


def polyline_value(v: int) -> str:
    v = ~(v << 1) if v < 0 else v << 1
    out = ""
    while v >= 0x20:
        out += chr((0x20 | (v % 32)) + 63)
        v >>= 5
    return out + chr(v + 63)


def polyline(points: list[tuple[float, float]]) -> str:
    out, last_x, last_y = [], 0, 0
    for x, y in points:
        ix, iy = round(x * 100), round(y * 100)
        out.append(polyline_value(ix - last_x) + polyline_value(iy - last_y))
        last_x, last_y = ix, iy
    return "".join(out)


def encode(world: World, year: int, shapes: list) -> str:
    body = [{"country": c, "colour": world.colour[c], "rings": [polyline(r) for r in rings(g)]} for _, g, c in shapes]
    return json.dumps({"year": year, "shapes": body}, separators=(",", ":"), ensure_ascii=False)


def land_file(world: World, tolerance: float) -> str:
    """All land in the map box, drawn neutral under the shapes. Same coast detail as a sparse map."""
    land = thin(world.land, tolerance)
    land = polygons(set_precision(land, GRID))
    return json.dumps({"rings": [polyline(r) for r in rings(land)]}, separators=(",", ":"))


def check_india(shapes: list, year: int) -> list[str]:
    """ADR 0016: from 1858 the control points are inside India and inside no other country. Before 1858
    they are inside no other country (an Indian dynasty may leave them blank)."""
    problems = []
    for p in control_points():
        pt = Point(p["lon"], p["lat"])
        holders = [c for _, g, c in shapes if g.contains(pt)]
        wrong = holders != ["India"] if year >= INDIA_FROM else any(c != "India" for c in holders)
        if wrong:
            problems.append(f"{year} {p['name']}: inside {holders or 'nothing'}")
    return problems


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--years", help="comma separated map years; default all")
    ap.add_argument("--tolerance", type=float, default=TOLERANCE)
    args = ap.parse_args()

    spec = json.loads((CACHE / "years.json").read_text())
    years = [int(y) for y in args.years.split(",")] if args.years else spec["years"]
    pins = spec["pins"]

    world = World()
    ohm_tags = ohm.tags()
    store = prep.prepared(world, years)
    OUT.mkdir(parents=True, exist_ok=True)

    report = {}
    failed = []
    land = land_file(world, args.tolerance)
    (OUT / "land.json").write_text(land + "\n")
    print(f"borders: land.json  {len(land):>6} bytes  tol {args.tolerance:.2f}", flush=True)
    if len(land) > MAX_BYTES:
        failed.append(f"land.json: {len(land)} bytes")
    for year in years:
        items = fill_gaps(world, active_items(store, ohm_tags, year), year)
        tolerance = args.tolerance
        while True:
            shapes = finish(world, items, year, tolerance)
            text = encode(world, year, shapes)
            if len(text) <= MAX_BYTES or tolerance > args.tolerance * 4:
                break
            tolerance *= 1.25
        if len(text) > MAX_BYTES:
            failed.append(f"{year}: {len(text)} bytes at tolerance {tolerance:.3f}")
        (OUT / f"{year}.json").write_text(text + "\n")

        union = unary_union([g for _, g, _ in shapes]) if shapes else None
        outside = [
            p["id"]
            for p in pins
            if p["mapYear"] == year and (union is None or not union.buffer(0.2).contains(Point(p["lon"], p["lat"])))
        ]
        problems = check_india(shapes, year)
        failed += problems
        report[year] = {
            "bytes": len(text),
            "tolerance": round(tolerance, 3),
            "shapes": [{"name": n, "country": c} for n, _, c in shapes],
            "pinsOutside": outside,
        }
        print(
            f"borders: {year:>6}  {len(shapes):>3} shapes  {len(text):>6} bytes  tol {tolerance:.2f}"
            + (f"  pins off the map: {outside}" if outside else "")
            + (f"  INDIA: {problems}" if problems else ""),
            flush=True,
        )

    # Files for map years that no pin or stop uses any more.
    if not args.years:
        keep = {f"{y}.json" for y in spec["years"]}
        for old in OUT.glob("*.json"):
            if old.name not in keep and old.name != "land.json":
                old.unlink()
    (CACHE / "report.json").write_text(json.dumps(report, indent=1) + "\n")
    if failed:
        print("borders: FAILED\n  " + "\n  ".join(failed), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
