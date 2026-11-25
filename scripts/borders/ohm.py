"""OpenHistoricalMap country borders (CC0), fetched through Overpass and cached in .cache/ohm.

OpenHistoricalMap is live data, so a rerun a year from now can differ. The border files in git are
the record; this cache only makes reruns on one machine fast and repeatable.
"""

import hashlib
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

from shapely import make_valid
from shapely.geometry import LineString
from shapely.ops import polygonize, unary_union

HERE = Path(__file__).resolve().parent
CACHE = HERE / ".cache" / "ohm"
URL = "https://overpass-api.openhistoricalmap.org/api/interpreter"
CHUNK = 40


def overpass(query: str) -> bytes:
    data = urllib.parse.urlencode({"data": query}).encode()
    last = None
    for attempt in range(6):
        try:
            req = urllib.request.Request(URL, data=data, headers={"User-Agent": "ripples-borders/1 (github.com/sredhu37/ripples)"})
            with urllib.request.urlopen(req, timeout=240) as r:
                return r.read()
        except Exception as ex:  # network and rate limits: wait and try again
            last = ex
            time.sleep(5 * (attempt + 1))
    raise RuntimeError(f"Overpass failed: {last}")


def parse_date(value: str | None) -> float | None:
    """OHM date string to a fractional year, BCE negative. None when missing or not a date."""
    if not value:
        return None
    m = re.match(r"^(-?)(\d+)(?:-(\d\d))?(?:-(\d\d))?$", value)
    if not m:
        return None
    sign = -1 if m.group(1) else 1
    year, month, day = int(m.group(2)), int(m.group(3) or 1), int(m.group(4) or 1)
    return sign * year + (month - 1) / 12 + (day - 1) / 365


def active(tags: dict, year: float) -> bool:
    """Whether a relation exists on 1 January of the year. A missing start or end is open."""
    start = parse_date(tags.get("start_date"))
    end = parse_date(tags.get("end_date_bridged") or tags.get("end_date"))
    if start is not None and start > year:
        return False
    if end is not None and end <= year:
        return False
    return True


# A country that ends and starts again under the same name or Wikidata item within this many years is
# one country with a gap in the data (Romania has no relation from 1944-04-01 to 1945-03-09).
BRIDGE_YEARS = 2.0


def bridge_gaps(all_tags: dict[int, dict]) -> None:
    """Give a relation `end_date` of its successor's start when the data has a short hole between them."""
    by_key: dict[str, list[int]] = {}
    for i, t in all_tags.items():
        for key in (t.get("wikidata"), t.get("name:en") or t.get("name")):
            if key:
                by_key.setdefault(key, []).append(i)
    for i, t in all_tags.items():
        end = parse_date(t.get("end_date"))
        if end is None:
            continue
        starts = []
        for key in (t.get("wikidata"), t.get("name:en") or t.get("name")):
            for j in by_key.get(key, []) if key else []:
                start = parse_date(all_tags[j].get("start_date"))
                if j != i and start is not None and 0 < start - end <= BRIDGE_YEARS:
                    starts.append((start, all_tags[j]["start_date"]))
        if starts:
            t["end_date_bridged"] = min(starts)[1]


def tags() -> dict[int, dict]:
    """Every OHM country relation (admin_level 2) that has a start date, short holes in the data bridged."""
    path = CACHE / "tags.json"
    if not path.exists():
        CACHE.mkdir(parents=True, exist_ok=True)
        query = '[out:json][timeout:200];relation["boundary"]["admin_level"="2"]["start_date"];out tags;'
        path.write_bytes(overpass(query))
    out = {e["id"]: e["tags"] for e in json.loads(path.read_text())["elements"]}
    bridge_gaps(out)
    return out


def fetch(ids: list[int]) -> None:
    """Geometry of the relations, in chunks, skipping chunks already cached."""
    (CACHE / "geom").mkdir(parents=True, exist_ok=True)
    ids = sorted(ids)
    for i in range(0, len(ids), CHUNK):
        chunk = ids[i : i + CHUNK]
        key = hashlib.sha1(",".join(map(str, chunk)).encode()).hexdigest()[:16]
        path = CACHE / "geom" / f"{key}.json"
        if path.exists():
            continue
        print(f"ohm: fetching relations {i + 1} to {i + len(chunk)} of {len(ids)}", flush=True)
        path.write_bytes(overpass("[out:json][timeout:120];rel(id:%s);out geom;" % ",".join(map(str, chunk))))
        time.sleep(1)


def assemble(element: dict):
    """Polygon of one relation from its member ways, or None when the ways do not close."""
    outer, inner = [], []
    for m in element.get("members", []):
        if m["type"] != "way" or "geometry" not in m:
            continue
        pts = [(p["lon"], p["lat"]) for p in m["geometry"] if p]
        if len(pts) >= 2:
            (inner if m.get("role") == "inner" else outer).append(LineString(pts))
    if not outer:
        return None
    polys = list(polygonize(unary_union(outer)))
    if not polys:
        return None
    shape = unary_union([make_valid(p).buffer(0) for p in polys])
    if inner:
        holes = list(polygonize(unary_union(inner)))
        if holes:
            shape = shape.difference(unary_union([make_valid(p).buffer(0) for p in holes]))
    return None if shape.is_empty else shape


def geometries(ids: list[int]) -> dict[int, object]:
    """Polygons for the ids, from the cache (call fetch first)."""
    wanted = set(ids)
    out: dict[int, object] = {}
    for path in sorted((CACHE / "geom").glob("*.json")):
        for e in json.loads(path.read_text())["elements"]:
            if e["id"] in wanted:
                out[e["id"]] = assemble(e)
    return out

