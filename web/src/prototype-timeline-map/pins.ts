// PROTOTYPE, throwaway. Pins reuse the existing timeline events (text and sources already in data.ts);
// only the place name and position are new.
import type { Text } from "../lesson/types";
import { TIMELINE_EVENTS } from "../timeline/data";
import type { TimelineEvent } from "../timeline/types";
import { MAP_H, MAP_W } from "./borders";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

export interface Decade {
  start: number;
  /** Which border snapshot the map shows. The dataset has no map for every decade. */
  snapshot: string;
}

export const DECADES: Decade[] = [
  { start: 1900, snapshot: "1900" },
  { start: 1910, snapshot: "1914" },
  { start: 1920, snapshot: "1920" },
  { start: 1930, snapshot: "1930" },
  { start: 1940, snapshot: "1945" },
  { start: 1950, snapshot: "1960" },
  { start: 1960, snapshot: "1960" },
];

interface PinSpec {
  id: string;
  decade: number;
  place: Text;
  lon: number;
  lat: number;
}

const SPECS: PinSpec[] = [
  { id: "wright", decade: 1900, place: T("USA", "USA", "USA"), lon: -75.7, lat: 36.0 },
  { id: "ww1", decade: 1910, place: T("France", "Frankreich", "Francja"), lon: 3.0, lat: 50.3 },
  { id: "gandhi1915", decade: 1910, place: T("India", "Indien", "Indie"), lon: 72.8, lat: 19.0 },
  {
    id: "revolution1917",
    decade: 1910,
    place: T("Russia", "Russland", "Rosja"),
    lon: 30.3,
    lat: 59.9,
  },
  { id: "ottoman1922", decade: 1920, place: T("Turkey", "Türkei", "Turcja"), lon: 29.0, lat: 41.0 },
  { id: "penicillin", decade: 1920, place: T("United Kingdom", "Großbritannien", "Wielka Brytania"), lon: -0.2, lat: 51.5 },
  { id: "ww2", decade: 1940, place: T("Germany", "Deutschland", "Niemcy"), lon: 13.4, lat: 52.5 },
  {
    id: "holocaust",
    decade: 1940,
    place: T("Poland", "Polen", "Polska"),
    lon: 19.2,
    lat: 50.0,
  },
  {
    id: "marshall1948",
    decade: 1940,
    place: T("France", "Frankreich", "Francja"),
    lon: 2.3,
    lat: 48.9,
  },
  { id: "quitindia", decade: 1940, place: T("India", "Indien", "Indie"), lon: 72.8, lat: 19.0 },
  { id: "bengal1943", decade: 1940, place: T("India", "Indien", "Indie"), lon: 88.4, lat: 22.6 },
  { id: "india1947", decade: 1940, place: T("India", "Indien", "Indie"), lon: 77.2, lat: 28.6 },
  { id: "atom", decade: 1940, place: T("Japan", "Japan", "Japonia"), lon: 132.5, lat: 34.4 },
  { id: "prc", decade: 1940, place: T("China", "China", "Chiny"), lon: 116.4, lat: 39.9 },
  { id: "africa1960", decade: 1960, place: T("Nigeria", "Nigeria", "Nigeria"), lon: 3.4, lat: 6.5 },
  { id: "moon", decade: 1960, place: T("USA", "USA", "USA"), lon: -80.6, lat: 28.6 },
];

// Same Natural Earth I projection as the scratch script that drew the borders.
const SCALE = MAP_W / (2 * Math.PI * 0.8707);
function ne1(lon: number, lat: number): [number, number] {
  const lam = (lon * Math.PI) / 180;
  const phi = (lat * Math.PI) / 180;
  const p2 = phi * phi;
  const p4 = p2 * p2;
  const x =
    lam * (0.8707 - 0.131979 * p2 + p4 * (-0.013791 + p4 * (0.003971 * p2 - 0.001529 * p4)));
  const y = phi * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4)));
  return [x * SCALE + MAP_W / 2, -y * SCALE];
}
const Y_TOP = ne1(0, 83)[1];

export function project(lon: number, lat: number): [number, number] {
  const [x, y] = ne1(lon, lat);
  return [x, y - Y_TOP];
}

export interface Pin {
  id: string;
  decade: number;
  place: Text;
  x: number;
  y: number;
  event: TimelineEvent;
}

export const PINS: Pin[] = SPECS.map((s) => {
  const event = TIMELINE_EVENTS.find((e) => e.id === s.id);
  if (!event) throw new Error(`no timeline event ${s.id}`);
  const [x, y] = project(s.lon, s.lat);
  return { id: s.id, decade: s.decade, place: s.place, x, y, event };
});

export const pinsFor = (decade: number) => PINS.filter((p) => p.decade === decade);

export { MAP_H, MAP_W };
