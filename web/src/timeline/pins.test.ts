import { describe, expect, it } from "vitest";
import { TIMELINE_ERAS, TIMELINE_EVENTS } from "./data";
import { PINS, TIMELINE_STOPS, pinsByStop, stopForYear } from "./pins";

const pin = (id: string) => {
  const p = PINS.find((x) => x.id === id);
  if (!p) throw new Error(id);
  return p;
};

describe("pins", () => {
  it("has one pin per event, in the same order", () => {
    expect(PINS.map((p) => p.id)).toEqual(TIMELINE_EVENTS.map((e) => e.id));
    for (const id of ["indus", "giza", "athens", "ww2", "chatgpt"]) pin(id);
  });

  it("has 4 to 8 pins in at least 3 countries at each of the 9 stops before 1900", () => {
    const before = pinsByStop().filter((g) => g.stop.year < 1900);
    expect(before).toHaveLength(9);
    for (const g of before) {
      expect(g.pins.length, `${g.stop.year} pins`).toBeGreaterThanOrEqual(4);
      expect(g.pins.length, `${g.stop.year} pins`).toBeLessThanOrEqual(8);
      expect(g.countries.length, `${g.stop.year} countries`).toBeGreaterThanOrEqual(3);
    }
  });

  it("has a place, a line and a start year for every pin", () => {
    for (const p of PINS) {
      expect(p.country, p.id).not.toBe("");
      expect(p.lon, p.id).toBeGreaterThanOrEqual(-180);
      expect(p.lon, p.id).toBeLessThanOrEqual(180);
      expect(p.lat, p.id).toBeGreaterThanOrEqual(-90);
      expect(p.lat, p.id).toBeLessThanOrEqual(90);
      expect(Number.isInteger(p.mapYear), p.id).toBe(true);
      for (const l of ["en", "de", "pl"] as const) expect(p.line[l].trim(), p.id).not.toBe("");
    }
    expect(pin("giza").mapYear).toBe(-2560);
    expect(pin("ww2").mapYear).toBe(1939);
  });

  it("uses an https source for every pin", () => {
    for (const p of PINS) expect(p.source, p.id).toMatch(/^https:\/\//);
  });

  it("keeps sensitive pins off Wikipedia", () => {
    expect(PINS.filter((p) => p.sensitive).map((p) => p.id)).toEqual(
      expect.arrayContaining(["ww1", "ww2", "holocaust", "india1947", "bengal1943"]),
    );
    for (const p of PINS) if (p.sensitive) expect(p.source, p.id).not.toMatch(/wikipedia\.org/);
  });
});

describe("slider stops", () => {
  it("has 22 stops in order", () => {
    expect(TIMELINE_STOPS).toHaveLength(22);
    const years = TIMELINE_STOPS.map((s) => s.year);
    expect(years).toEqual([...years].sort((a, b) => a - b));
    expect(years.slice(0, 9)).toEqual([-3000, -600, 500, 1000, 1500, 1600, 1700, 1800, 1850]);
    expect(years.slice(9)).toEqual([
      1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020,
    ]);
  });

  it("returns the last stop at or before a map year", () => {
    expect(stopForYear(1900)?.year).toBe(1900);
    expect(stopForYear(1949)?.year).toBe(1940);
    expect(stopForYear(2024)?.year).toBe(2020);
    expect(stopForYear(-3001)).toBeUndefined();
  });

  it("puts Giza on 3000 BCE and Athens on 600 BCE", () => {
    expect(stopForYear(pin("giza").mapYear)?.year).toBe(-3000);
    expect(stopForYear(pin("athens").mapYear)?.year).toBe(-600);
  });

  it("gives every pin a stop", () => {
    for (const p of PINS) expect(stopForYear(p.mapYear), p.id).toBeDefined();
  });

  it("groups every pin once, with distinct countries", () => {
    const groups = pinsByStop();
    expect(groups).toHaveLength(22);
    expect(groups.reduce((n, g) => n + g.pins.length, 0)).toBe(PINS.length);
    const first = groups[0];
    expect(first?.pins.map((p) => p.id)).toContain("giza");
    for (const g of groups) {
      expect(g.countries).toEqual(Array.from(new Set(g.pins.map((p) => p.country))));
    }
  });

  it("uses only known eras", () => {
    const eraIds = TIMELINE_ERAS.map((e) => e.id);
    for (const s of TIMELINE_STOPS) expect(eraIds).toContain(s.era);
  });
});

describe("era ranges", () => {
  it("do not overlap", () => {
    const sorted = [...TIMELINE_ERAS].sort((a, b) => a.from - b.from);
    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1];
      const cur = sorted[i];
      expect(prev?.to, prev?.id).not.toBeNull();
      expect(cur?.from, cur?.id).toBeGreaterThan(prev?.to ?? Infinity);
    }
  });

  it("end the 20th Century in 1989 and start the Digital Era in 1990, in every language", () => {
    const twentieth = TIMELINE_ERAS.find((e) => e.id === "twentieth");
    const digital = TIMELINE_ERAS.find((e) => e.id === "digital");
    expect(twentieth?.to).toBe(1989);
    expect(digital?.from).toBe(1990);
    for (const l of ["en", "de", "pl"] as const) {
      expect(twentieth?.dateRange[l]).toContain("1989");
      expect(digital?.dateRange[l]).toContain("1990");
    }
  });

  it("start each era at its first stop", () => {
    for (const era of TIMELINE_ERAS) {
      const first = TIMELINE_STOPS.find((s) => s.era === era.id);
      expect(first?.year, era.id).toBe(era.from);
    }
  });
});
