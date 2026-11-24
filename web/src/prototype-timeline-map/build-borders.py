"""PROTOTYPE: project historical-basemaps GeoJSON to SVG paths (Natural Earth I) for the timeline map prototype."""

import json
import math
import sys

W = 1000.0
SCALE = W / (2 * math.pi * 0.8707)
LAT_MIN, LAT_MAX = -56.0, 83.0
TOL = 0.7
MIN_AREA = 3.0


def ne1(lon, lat):
    lam, phi = math.radians(lon), math.radians(lat)
    p2 = phi * phi
    p4 = p2 * p2
    x = lam * (0.8707 - 0.131979 * p2 + p4 * (-0.013791 + p4 * (0.003971 * p2 - 0.001529 * p4)))
    y = phi * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4)))
    return x * SCALE + W / 2, -y * SCALE


_, Y_TOP = ne1(0, LAT_MAX)
_, Y_BOT = ne1(0, LAT_MIN)
H = Y_BOT - Y_TOP


def proj(lon, lat):
    lat = max(LAT_MIN, min(LAT_MAX, lat))
    x, y = ne1(lon, lat)
    return x, y - Y_TOP


def dp(pts, tol):
    if len(pts) < 3:
        return pts
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        ax, ay = pts[a]
        bx, by = pts[b]
        dx, dy = bx - ax, by - ay
        n = math.hypot(dx, dy)
        best, bi = -1.0, -1
        for i in range(a + 1, b):
            px, py = pts[i]
            if n < 1e-9:
                d = math.hypot(px - ax, py - ay)
            else:
                d = abs(dy * px - dx * py + bx * ay - by * ax) / n
            if d > best:
                best, bi = d, i
        if best > tol:
            keep[bi] = True
            stack += [(a, bi), (bi, b)]
    return [p for p, k in zip(pts, keep) if k]


def area(pts):
    return abs(sum(x1 * y2 - x2 * y1 for (x1, y1), (x2, y2) in zip(pts, pts[1:] + pts[:1]))) / 2


def ring_path(ring):
    # Split where the ring jumps across the antimeridian.
    parts, cur, prev = [], [], None
    for lon, lat in ring:
        if lat < LAT_MIN - 2:
            continue
        if prev is not None and abs(lon - prev) > 180:
            parts.append(cur)
            cur = []
        cur.append(proj(lon, lat))
        prev = lon
    parts.append(cur)
    out = []
    for p in parts:
        if len(p) < 3 or area(p) < MIN_AREA:
            continue
        s = dp(p, TOL)
        if len(s) < 3:
            continue
        out.append("M" + "L".join(f"{x:.1f},{y:.1f}" for x, y in s) + "Z")
    return "".join(out)


def feature_path(geom):
    if geom is None:
        return ""
    polys = geom["coordinates"] if geom["type"] == "MultiPolygon" else [geom["coordinates"]]
    return "".join(ring_path(poly[0]) for poly in polys)


PALETTE = ["#f2d48f", "#b7d7a8", "#f1b3a0", "#a8cde6", "#d9c6ea", "#a9dccf", "#e3d2b4", "#c9dd8f"]
# Fixed picks so the countries the lessons talk about look the same every time.
FIXED = {"India": "#f7b37a", "Russia": "#e9b8b8", "Germany": "#d3d79a", "China": "#f2d48f"}


def modern_colours():
    """One colour per modern country (world_2010), neighbours different, fixed for every decade."""
    from shapely.geometry import shape
    from shapely.strtree import STRtree

    d = json.load(open("w2010.geojson"))
    feats = [(f["properties"].get("NAME") or "", shape(f["geometry"]).buffer(0)) for f in d["features"] if f["geometry"]]
    tree = STRtree([g for _, g in feats])
    near = {i: set() for i in range(len(feats))}
    for i, (_, g) in enumerate(feats):
        for j in tree.query(g.buffer(0.4)):
            if j != i and g.buffer(0.4).intersects(feats[j][1]):
                near[i].add(int(j))
    # Keyed by name: a country split into several features (mainland, islands) gets one colour.
    colour = dict(FIXED)
    for i in sorted(range(len(feats)), key=lambda i: -feats[i][1].area):
        name = feats[i][0]
        if name in colour:
            continue
        used = {colour.get(feats[j][0]) for j in near[i]}
        # Least-used free colour, so the map is not mostly one colour.
        free = [c for c in PALETTE if c not in used] or PALETTE
        counts = {c: list(colour.values()).count(c) for c in free}
        colour[name] = min(free, key=lambda c: (counts[c], PALETTE.index(c)))
    return feats, tree, colour


def colour_for(geom, feats, tree, colour):
    """Colour of the modern country under the shape's main point, so a country keeps its colour."""
    from shapely.geometry import shape

    g = shape(geom).buffer(0)
    # The modern country that covers most of the shape (USSR -> Russia, British Raj -> India).
    best, area = None, 0.0
    for j in tree.query(g):
        a = g.intersection(feats[int(j)][1]).area
        if a > area:
            best, area = int(j), a
    if best is None:
        best = int(tree.nearest(g.representative_point()))
    name = feats[best][0]
    return colour[name], name


def main():
    out = {}
    feats, tree, colour = modern_colours()
    for year in sys.argv[1:]:
        d = json.load(open(f"w{year}.geojson"))
        shapes = []
        for f in d["features"]:
            p = f["properties"]
            path = feature_path(f["geometry"])
            if path:
                c, modern = colour_for(f["geometry"], feats, tree, colour)
                shapes.append({"n": p.get("NAME") or "", "o": modern, "c": c, "d": path})
        out[year] = shapes
        print(year, len(shapes), sum(len(s["d"]) for s in shapes), file=sys.stderr)
    ts = [
        "// PROTOTYPE, throwaway. Generated from aourednik/historical-basemaps (GPL-3.0) by a scratch script.",
        "// Natural Earth I projection, viewBox 0 0 1000 " + f"{H:.0f}.",
        f"export const MAP_W = {W:.0f};",
        f"export const MAP_H = {H:.0f};",
        "export interface Shape { n: string; o: string; c: string; d: string }",
        "export const BORDERS: Record<string, Shape[]> = " + json.dumps(out, ensure_ascii=False) + ";",
    ]
    print("\n".join(ts))


main()
