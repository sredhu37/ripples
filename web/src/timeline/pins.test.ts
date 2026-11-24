import { describe, expect, it } from "vitest";
import { TIMELINE_ERAS, TIMELINE_EVENTS } from "./data";
import { PINS, TIMELINE_STOPS, pinsByStop, stopForYear } from "./pins";

const pin = (id: string) => {
  const p = PINS.find((x) => x.id === id);
  if (!p) throw new Error(id);
  return p;
};

describe("pins", () => {
  it("keeps all 55 events with unchanged ids", () => {
    expect(PINS).toHaveLength(55);
    expect(PINS.map((p) => p.id)).toEqual(TIMELINE_EVENTS.map((e) => e.id));
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

  it("marks war, genocide, partition and famine pins sensitive, with an institution source", () => {
    expect(PINS.filter((p) => p.sensitive).map((p) => p.id)).toEqual(
      expect.arrayContaining(["ww1", "ww2", "atom", "holocaust", "india1947", "bengal1943"]),
    );
    const institutions = [
      "encyclopedia.ushmm.org",
      "hpmmuseum.jp",
      "museum.manchester.ac.uk",
      "nam.ac.uk",
    ];
    for (const p of PINS) {
      if (!p.sensitive) continue;
      expect(p.source, p.id).not.toMatch(/wikipedia\.org/);
      expect(institutions, p.id).toContain(new URL(p.source).hostname.replace(/^www\./, ""));
    }
  });

  it("tells every line as one sentence, in every language", () => {
    for (const p of PINS) {
      for (const l of ["en", "de", "pl"] as const) {
        const ends = p.line[l].match(/[.!?](\s|$)/g) ?? [];
        expect(ends, `${p.id} ${l}`).toHaveLength(1);
        expect(p.line[l].trim().endsWith("."), `${p.id} ${l}`).toBe(true);
      }
    }
  });

  it("names regimes, not peoples, and gives no death counts or methods", () => {
    const banned = /\b(the Germans|the Japanese|the Jews|die Deutschen|die Juden|Niemcy zabili)\b/i;
    for (const p of PINS) {
      for (const l of ["en", "de", "pl"] as const) {
        expect(p.line[l], `${p.id} ${l}`).not.toMatch(banned);
        expect(p.line[l], `${p.id} ${l}`).not.toMatch(/\b(million|Million|milion)/);
        expect(p.line[l], `${p.id} ${l}`).not.toMatch(/\b(killed|tötete|zabijał\w*)\b/i);
      }
    }
  });

  it("writes German with ß, not ss, in common words", () => {
    for (const p of PINS) expect(p.line.de, p.id).not.toMatch(/\b(gross|strasse|weiss|heiss)\w*/i);
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
