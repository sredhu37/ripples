import { describe, expect, it } from "vitest";
import { PINS, TIMELINE_STOPS } from "./pins";
import { decodeRing, shapeContains, type Borders, type Land } from "./borders";
import controlPoints from "./india-control-points.json";

// Border files are made by `npm run borders`. These tests read the files that are in git, so CI needs
// no map software: they fail when a map year has no file, a file is unused, a file is too big, or
// India is drawn differently from ADR 0016.

const RUN = "run `npm run borders` (scripts/borders/README.md)";
const MAX_BYTES = 70_000;
/** From this year India is drawn as the Natural Earth India point of view (spec section 4.2). */
const INDIA_FROM = 1858;

const RAW = import.meta.glob("/public/borders/*.json", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;
const FILES = new Map<number, string>();
let LAND_TEXT = "";
for (const [path, text] of Object.entries(RAW)) {
  const name = path
    .split("/")
    .pop()!
    .replace(/\.json$/, "");
  if (name === "land") LAND_TEXT = text;
  else FILES.set(Number(name), text);
}
const MAPS = new Map([...FILES].map(([year, text]) => [year, JSON.parse(text) as Borders]));

const NEEDED = [
  ...new Set([...PINS.map((p) => p.mapYear), ...TIMELINE_STOPS.map((s) => s.year)]),
].sort((a, b) => a - b);

/** The polyline encoder, only to test the decoder. */
function encodeValue(value: number): string {
  let v = value < 0 ? ~(value << 1) : value << 1;
  let out = "";
  while (v >= 0x20) {
    out += String.fromCharCode((0x20 | (v % 32)) + 63);
    v >>= 5;
  }
  return out + String.fromCharCode(v + 63);
}
function encodeRing(points: [number, number][]): string {
  let lon = 0;
  let lat = 0;
  let out = "";
  for (const [x, y] of points) {
    const ix = Math.round(x * 100);
    const iy = Math.round(y * 100);
    out += encodeValue(ix - lon) + encodeValue(iy - lat);
    lon = ix;
    lat = iy;
  }
  return out;
}

describe("decodeRing", () => {
  it("reads what the polyline format writes, also across zero and for large steps", () => {
    const ring: [number, number][] = [
      [68.5, 23.9],
      [-0.01, 0.02],
      [-179.99, -57.99],
      [179.99, 83.99],
      [0, 0],
    ];
    expect(decodeRing(encodeRing(ring))).toEqual(ring);
  });

  it("reads a fixed example: two points one degree apart", () => {
    // 100 hundredths is 200 zigzagged: the pieces 8 and 6 are written as "g" and "E".
    expect(decodeRing("gEgEgEgE")).toEqual([
      [1, 1],
      [2, 2],
    ]);
  });
});

describe("border files", () => {
  it(`has a file for every map year of a pin or a stop, and no unused file (${RUN})`, () => {
    expect(NEEDED.length).toBeGreaterThan(90);
    expect([...FILES.keys()].sort((a, b) => a - b)).toEqual(NEEDED);
  });

  it("names its own year", () => {
    for (const [year, map] of MAPS) expect(map.year, `${year}.json`).toBe(year);
  });

  it(`is at most ${MAX_BYTES / 1000} KB a file`, () => {
    for (const [year, text] of FILES)
      expect(text.length, `${year}.json`).toBeLessThanOrEqual(MAX_BYTES);
  });

  it("draws every shape as closed rings inside the map", () => {
    const problems: string[] = [];
    for (const [year, map] of MAPS) {
      if (map.shapes.length === 0) problems.push(`${year}: no shapes`);
      for (const shape of map.shapes) {
        const where = `${year} ${shape.country}`;
        if (!/^#[0-9a-f]{6}$/.test(shape.colour)) problems.push(`${where}: colour ${shape.colour}`);
        if (shape.rings.length === 0) problems.push(`${where}: no rings`);
        for (const ring of shape.rings) {
          const pts = decodeRing(ring);
          if (pts.length < 3) problems.push(`${where}: ring of ${pts.length} points`);
          if (pts.some(([lon, lat]) => lon < -180 || lon > 180 || lat < -58 || lat > 84))
            problems.push(`${where}: a point outside the map box`);
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it(`has a land file for the neutral ground, at most ${MAX_BYTES / 1000} KB, inside the map box`, () => {
    expect(LAND_TEXT.length, "land.json").toBeGreaterThan(0);
    expect(LAND_TEXT.length, "land.json").toBeLessThanOrEqual(MAX_BYTES);
    const land = JSON.parse(LAND_TEXT) as Land;
    expect(Object.keys(land)).toEqual(["rings"]);
    expect(land.rings.length).toBeGreaterThan(100);
    for (const ring of land.rings) {
      const pts = decodeRing(ring);
      expect(pts.length).toBeGreaterThanOrEqual(3);
      expect(pts.every(([lon, lat]) => lon >= -180 && lon <= 180 && lat >= -58 && lat <= 84)).toBe(
        true,
      );
    }
  });

  it("gives a country the same colour on every map", () => {
    const colour = new Map<string, string>();
    for (const [year, map] of MAPS) {
      for (const s of map.shapes) {
        const known = colour.get(s.country);
        if (known) expect(s.colour, `${year} ${s.country}`).toBe(known);
        else colour.set(s.country, s.colour);
      }
    }
  });

  it("holds only what the app reads: country, colour and rings", () => {
    for (const [year, map] of MAPS) {
      expect(Object.keys(map).sort(), `${year}.json`).toEqual(["shapes", "year"]);
      for (const s of map.shapes)
        expect(Object.keys(s).sort(), `${year}.json`).toEqual(["colour", "country", "rings"]);
    }
  });
});

describe("India on every map (ADR 0016)", () => {
  const years = NEEDED.filter((y) => y >= INDIA_FROM);

  it("has maps from 1858 to check", () => {
    expect(years.length).toBeGreaterThan(50);
  });

  for (const point of controlPoints.points) {
    it(`draws ${point.name} inside India and inside no other country, from 1858`, () => {
      for (const year of years) {
        const holders = MAPS.get(year)!
          .shapes.filter((s) => shapeContains(s, point.lon, point.lat))
          .map((s) => s.country);
        expect(holders, `${year} ${point.name}`).toEqual(["India"]);
      }
    });
  }
});
