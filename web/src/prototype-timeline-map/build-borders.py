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


def main():
    out = {}
    for year in sys.argv[1:]:
        d = json.load(open(f"w{year}.geojson"))
        shapes = []
        for f in d["features"]:
            p = f["properties"]
            path = feature_path(f["geometry"])
            if path:
                shapes.append({"n": p.get("NAME") or "", "o": p.get("SUBJECTO") or p.get("NAME") or "", "d": path})
        out[year] = shapes
        print(year, len(shapes), sum(len(s["d"]) for s in shapes), file=sys.stderr)
    ts = [
        "// PROTOTYPE, throwaway. Generated from aourednik/historical-basemaps (GPL-3.0) by a scratch script.",
        "// Natural Earth I projection, viewBox 0 0 1000 " + f"{H:.0f}.",
        f"export const MAP_W = {W:.0f};",
        f"export const MAP_H = {H:.0f};",
        "export interface Shape { n: string; o: string; d: string }",
        "export const BORDERS: Record<string, Shape[]> = " + json.dumps(out, ensure_ascii=False) + ";",
    ]
    print("\n".join(ts))


main()
