"""Read the inputs and cut every source shape down to land, once, so a year is quick to build.

A prepared shape is valid, clipped to land inside the map box, simplified a little (PREP_TOL), and
knows which present-day country it covers most. Prepared shapes are cached in .cache/prep.pkl.
"""

import json
import pickle
from pathlib import Path

import shapefile
from shapely import make_valid
from shapely.geometry import box, shape
from shapely.ops import unary_union
from shapely.strtree import STRtree

import ohm

HERE = Path(__file__).resolve().parent
CACHE = HERE / ".cache"
INPUTS = CACHE / "inputs"

# The map box. The app draws no polar caps: Antarctica and the far Arctic are left out.
LON_MIN, LON_MAX, LAT_MIN, LAT_MAX = -180.0, 180.0, -58.0, 84.0
# Degrees. Source shapes are thinned this much before anything else is done with them.
PREP_TOL = 0.02
# Fixed picks so the countries the lessons talk about look the same on every map.
PALETTE = ["#f2d48f", "#b7d7a8", "#f1b3a0", "#a8cde6", "#d9c6ea", "#a9dccf", "#e3d2b4", "#c9dd8f"]
FIXED = {"India": "#f7b37a", "Russia": "#e9b8b8", "Germany": "#d3d79a", "China": "#f2d48f"}


def polygons(g):
    """Only the polygon parts of a geometry."""
    if g is None or g.is_empty:
        return None
    parts = [p for p in getattr(g, "geoms", [g]) if p.geom_type in ("Polygon", "MultiPolygon")]
    if not parts:
        return None
    out = unary_union(parts)
    return None if out.is_empty else out


def read_shapefile(folder: Path):
    r = shapefile.Reader(str(next(folder.glob("*.shp"))))
    return [(rec.as_dict(), shape(sh.__geo_interface__)) for rec, sh in zip(r.records(), r.shapes())]


class World:
    """Land and present-day countries (India point of view), plus the colour of each country."""

    def __init__(self) -> None:
        window = box(LON_MIN, LAT_MIN, LON_MAX, LAT_MAX)
        land = unary_union([make_valid(g).buffer(0) for _, g in read_shapefile(INPUTS / "ne_10m_land")])
        self.land = polygons(land.intersection(window)).simplify(PREP_TOL / 2)
        self.full_countries = {}
        for rec, g in read_shapefile(INPUTS / "ne_10m_admin_0_countries_ind"):
            if rec["CONTINENT"] == "Antarctica":
                continue
            clipped = polygons(make_valid(g).buffer(0).intersection(window))
            if clipped is None:
                continue
            name = rec["ADMIN"]
            self.full_countries[name] = unary_union([self.full_countries[name], clipped]) if name in self.full_countries else clipped
        if "India" not in self.full_countries:
            raise SystemExit("borders: India is missing from the India point-of-view file. No fallback (ADR 0016).")
        self.names = sorted(self.full_countries)
        self.countries = [self.full_countries[n].simplify(PREP_TOL) for n in self.names]
        self.tree = STRtree(self.countries)
        self.colour = self._colours()

    def _colours(self) -> dict[str, str]:
        """One colour per present-day country, neighbours different, the same on every map."""
        near: dict[int, set[int]] = {i: set() for i in range(len(self.names))}
        for i, g in enumerate(self.countries):
            grown = g.buffer(0.4)
            for j in self.tree.query(grown):
                if int(j) != i and grown.intersects(self.countries[int(j)]):
                    near[i].add(int(j))
        colour = dict(FIXED)
        order = sorted(range(len(self.names)), key=lambda i: (-self.countries[i].area, self.names[i]))
        for i in order:
            name = self.names[i]
            if name in colour:
                continue
            used = {colour.get(self.names[j]) for j in near[i]}
            free = [c for c in PALETTE if c not in used] or PALETTE
            counts = {c: list(colour.values()).count(c) for c in free}
            colour[name] = min(free, key=lambda c: (counts[c], PALETTE.index(c)))
        return colour

    def country_of(self, g) -> str:
        """The present-day country that the shape covers most."""
        best, area = None, 0.0
        for j in self.tree.query(g):
            a = g.intersection(self.countries[int(j)]).area
            if a > area:
                best, area = int(j), a
        if best is None:
            best = int(self.tree.nearest(g.representative_point()))
        return self.names[best]


def prepare_shape(world: World, g):
    clipped = polygons(make_valid(g).buffer(0).intersection(world.land))
    return None if clipped is None else polygons(clipped.simplify(PREP_TOL))


def prepared(world: World, years: list[int]) -> dict:
    """{"clio": {row: (name, from, to, wkb, country)}, "ohm": {id: (name, None, wkb, country)}}."""
    path = CACHE / "prep.pkl"
    want_clio = [y for y in years if y < 1900]
    want_ohm = [y for y in years if y >= 1900]
    store = pickle.loads(path.read_bytes()) if path.exists() else {"clio": {}, "ohm": {}}
    changed = False

    if want_clio:
        feats = json.loads((INPUTS / "cliopatria.geojson" / "cliopatria_polities_only_v021.geojson").read_text())["features"]
        for n, f in enumerate(feats):
            p = f["properties"]
            if p["Type"] != "POLITY" or p["Name"].startswith("(") or n in store["clio"] or not f["geometry"]:
                continue
            if not any(p["FromYear"] <= y <= p["ToYear"] for y in want_clio):
                continue
            g = prepare_shape(world, shape(f["geometry"]))
            store["clio"][n] = (p["Name"], p["FromYear"], p["ToYear"], g.wkb if g else None, world.country_of(g) if g else None)
            changed = True
    if want_ohm:
        tags = ohm.tags()
        ids = sorted(i for i, t in tags.items() if i not in store["ohm"] and any(ohm.active(t, float(y)) for y in want_ohm))
        ohm.fetch(ids)
        for i, g in ohm.geometries(ids).items():
            g = prepare_shape(world, g) if g is not None else None
            store["ohm"][i] = (tags[i].get("name:en") or tags[i].get("name") or str(i), None, g.wkb if g else None, world.country_of(g) if g else None)
            changed = True
        for i in ids:
            if i not in store["ohm"]:
                store["ohm"][i] = (tags[i].get("name:en") or tags[i].get("name") or str(i), None, None, None)
                changed = True
    if changed:
        path.write_bytes(pickle.dumps(store))
    return store
