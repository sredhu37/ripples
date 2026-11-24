import type { Text } from "../lesson/types";
import { TIMELINE_EVENTS, eventYear } from "./data";
import { EVENT_SOURCES } from "./meanwhile";
import type { Pin, TimelineEraId, TimelineStop } from "./types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

/** Place of each pin. Ids match TIMELINE_EVENTS. */
const PLACES: Record<string, { country: string; lon: number; lat: number }> = {
  indus: { country: "Pakistan", lon: 68.14, lat: 27.33 },
  giza: { country: "Egypt", lon: 31.13, lat: 29.98 },
  oracle: { country: "China", lon: 114.32, lat: 36.1 },
  olmec: { country: "Mexico", lon: -94.76, lat: 17.73 },
  athens: { country: "Greece", lon: 23.73, lat: 37.98 },
  archimedes: { country: "Italy", lon: 15.29, lat: 37.08 },
  zero: { country: "India", lon: 85.14, lat: 25.59 },
  charlemagne: { country: "Italy", lon: 12.5, lat: 41.9 },
  haytham: { country: "Egypt", lon: 31.24, lat: 30.04 },
  bisheng: { country: "China", lon: 114.31, lat: 34.8 },
  mansa: { country: "Mali", lon: -4.55, lat: 13.91 },
  inca: { country: "Peru", lon: -71.97, lat: -13.52 },
  mughal: { country: "India", lon: 76.97, lat: 29.39 },
  luther: { country: "Germany", lon: 12.65, lat: 51.87 },
  aztec: { country: "Mexico", lon: -99.13, lat: 19.43 },
  manila: { country: "Philippines", lon: 120.98, lat: 14.6 },
  timbuktu: { country: "Mali", lon: -3.0, lat: 16.77 },
  copernicus: { country: "Poland", lon: 19.68, lat: 54.36 },
  galileo: { country: "Italy", lon: 11.88, lat: 45.41 },
  newton: { country: "United Kingdom", lon: 0.12, lat: 52.2 },
  voc: { country: "Netherlands", lon: 4.9, lat: 52.37 },
  taj: { country: "India", lon: 78.04, lat: 27.17 },
  tokugawa: { country: "Japan", lon: 139.69, lat: 35.69 },
  usa1776: { country: "United States", lon: -75.17, lat: 39.95 },
  stephenson: { country: "United Kingdom", lon: -2.77, lat: 53.42 },
  mutiny: { country: "India", lon: 77.71, lat: 28.98 },
  meiji: { country: "Japan", lon: 135.77, lat: 35.01 },
  suez: { country: "Egypt", lon: 32.27, lat: 30.59 },
  rail_us: { country: "United States", lon: -112.55, lat: 41.62 },
  edison: { country: "United States", lon: -74.34, lat: 40.56 },
  pasteur: { country: "France", lon: 2.35, lat: 48.85 },
  wright: { country: "United States", lon: -75.7, lat: 36.07 },
  penicillin: { country: "United Kingdom", lon: -0.17, lat: 51.52 },
  ww2: { country: "Poland", lon: 21.01, lat: 52.23 },
  atom: { country: "Japan", lon: 132.46, lat: 34.39 },
  india1947: { country: "India", lon: 77.21, lat: 28.61 },
  prc: { country: "China", lon: 116.4, lat: 39.9 },
  africa1960: { country: "Nigeria", lon: 3.38, lat: 6.52 },
  moon: { country: "United States", lon: -80.6, lat: 28.57 },
  wall: { country: "Germany", lon: 13.4, lat: 52.52 },
  ww1: { country: "Bosnia and Herzegovina", lon: 18.41, lat: 43.86 },
  gandhi1915: { country: "India", lon: 72.88, lat: 19.08 },
  revolution1917: { country: "Russia", lon: 30.34, lat: 59.93 },
  ottoman1922: { country: "Turkey", lon: 32.85, lat: 39.93 },
  holocaust: { country: "Poland", lon: 19.21, lat: 50.03 },
  quitindia: { country: "India", lon: 72.81, lat: 18.96 },
  bengal1943: { country: "India", lon: 88.36, lat: 22.57 },
  marshall1948: { country: "United States", lon: -77.04, lat: 38.91 },
  web: { country: "Switzerland", lon: 6.05, lat: 46.23 },
  euro: { country: "Germany", lon: 8.68, lat: 50.11 },
  mpesa: { country: "Kenya", lon: 36.82, lat: -1.29 },
  iphone: { country: "United States", lon: -122.03, lat: 37.32 },
  hsr: { country: "China", lon: 117.2, lat: 39.13 },
  upi: { country: "India", lon: 72.88, lat: 19.08 },
  chatgpt: { country: "United States", lon: -122.42, lat: 37.77 },
  hubble: { country: "United States", lon: -80.65, lat: 28.52 },
  liberalisation1991: { country: "India", lon: 72.83, lat: 18.93 },
  mandela1994: { country: "South Africa", lon: 28.19, lat: -25.75 },
  dolly: { country: "United Kingdom", lon: -3.2, lat: 55.86 },
  higgs: { country: "Switzerland", lon: 6.05, lat: 46.23 },
  rosetta: { country: "Germany", lon: 8.62, lat: 49.87 },
  paris2015: { country: "France", lon: 2.43, lat: 48.95 },
  covidvaccine: { country: "United Kingdom", lon: -1.51, lat: 52.41 },
  webb: { country: "France", lon: -52.77, lat: 5.23 },
  chandrayaan3: { country: "India", lon: 80.23, lat: 13.72 },
};

/** War, genocide, partition and famine pins. Their source must not be Wikipedia. */
const SENSITIVE = new Set(["ww1", "ww2", "holocaust", "india1947", "bengal1943"]);

function decade(year: number, era: TimelineEraId): TimelineStop {
  return { year, label: T(`${year}s`, `${year}er`, `lata ${year}`), era };
}

const stop = (year: number, label: Text, era: TimelineEraId): TimelineStop => ({
  year,
  label,
  era,
});

/** The 22 slider stops, oldest first. */
export const TIMELINE_STOPS: TimelineStop[] = [
  stop(-3000, T("3000 BCE", "3000 v. Chr.", "3000 p.n.e."), "ancient"),
  stop(-600, T("600 BCE", "600 v. Chr.", "600 p.n.e."), "ancient"),
  stop(500, T("500", "500", "500"), "middle_ages"),
  stop(1000, T("1000", "1000", "1000"), "middle_ages"),
  stop(1500, T("1500", "1500", "1500"), "trade_empires"),
  stop(1600, T("1600", "1600", "1600"), "scientific_rev"),
  stop(1700, T("1700", "1700", "1700"), "scientific_rev"),
  stop(1800, T("1800", "1800", "1800"), "industrial"),
  stop(1850, T("1850", "1850", "1850"), "industrial"),
  ...[1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980].map((y) => decade(y, "twentieth")),
  ...[1990, 2000, 2010, 2020].map((y) => decade(y, "digital")),
];

/** The stop for a map year: the last stop at or before it. Undefined before the first stop. */
export function stopForYear(mapYear: number): TimelineStop | undefined {
  let found: TimelineStop | undefined;
  for (const s of TIMELINE_STOPS) if (s.year <= mapYear) found = s;
  return found;
}

export const PINS: Pin[] = TIMELINE_EVENTS.map((e) => {
  const place = PLACES[e.id];
  if (!place) throw new Error(`No place for pin ${e.id}`);
  const source = EVENT_SOURCES[e.id];
  if (!source) throw new Error(`No source for pin ${e.id}`);
  return {
    id: e.id,
    year: e.year,
    mapYear: eventYear(e),
    title: e.title,
    line: e.summary,
    ...place,
    source,
    sensitive: SENSITIVE.has(e.id),
    lessonId: e.lessonId,
  };
});

export interface StopPins {
  stop: TimelineStop;
  pins: Pin[];
  /** Distinct present-day countries of the pins. */
  countries: string[];
}

/** Pins per stop, in stop order, with their distinct countries. */
export function pinsByStop(pins: Pin[] = PINS): StopPins[] {
  return TIMELINE_STOPS.map((stop) => {
    const own = pins
      .filter((p) => stopForYear(p.mapYear)?.year === stop.year)
      .sort((a, b) => a.mapYear - b.mapYear);
    return { stop, pins: own, countries: Array.from(new Set(own.map((p) => p.country))) };
  });
}
