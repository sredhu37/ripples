// View maths of the world map: projection, zoom, pan, pin clusters and where the thought cloud goes.
// Pure functions, no React. Spec: docs/specs/world-timeline-map.md, section 1.

import type { LonLat } from "./borders";

/** The map is drawn flat: one unit is one degree. Border files stop at 58 degrees south and 84 north. */
export const MAP_W = 360;
export const MAP_H = 142;
const LAT_TOP = 84;

/** How many times wider than the world the closest zoom still shows. */
const MAX_ZOOM = 12;
export const MIN_VIEW_W = MAP_W / MAX_ZOOM;

/** Pins closer than this on screen group into a bubble. */
export const CLUSTER_PX = 44;
/** The open pin is drawn this many times its size. */
export const SELECTED_SCALE = 1.7;

/** x, y, width, height of the part of the map on screen, in map units. */
export type ViewBox = [number, number, number, number];

export function project([lon, lat]: LonLat): [number, number] {
  return [lon + 180, LAT_TOP - lat];
}

/** The whole world, full width, centred vertically for a stage of height over width `a`. */
export function worldView(a: number): ViewBox {
  const h = MAP_W * a;
  return [0, (MAP_H - h) / 2, MAP_W, h];
}

/**
 * First view. A tall stage (phone, portrait iPad) fills the height and starts on Europe to Asia,
 * centred on 50 degrees east. A wide stage shows the whole world.
 */
export function startView(a: number): ViewBox {
  const w = MAP_H / a;
  if (w >= MAP_W) return worldView(a);
  return [project([50, 0])[0] - w / 2, 0, w, MAP_H];
}

/** Keeps a view inside the map and at a legal zoom. `a` is the stage height over width. */
export function clampView([x, y, w]: ViewBox, a: number): ViewBox {
  const vw = Math.max(MIN_VIEW_W, Math.min(MAP_W, w));
  const vh = vw * a;
  const cy = vh >= MAP_H ? (MAP_H - vh) / 2 : Math.max(0, Math.min(MAP_H - vh, y));
  return [Math.max(0, Math.min(MAP_W - vw, x)), cy, vw, vh];
}

/** Zoom by factor f and keep the map point under screen point (sx, sy) of a W x H stage in place. */
export function zoomAt(
  v: ViewBox,
  f: number,
  sx: number,
  sy: number,
  W: number,
  H: number,
): ViewBox {
  const mx = v[0] + (sx / W) * v[2];
  const my = v[1] + (sy / H) * v[3];
  const nw = Math.max(MIN_VIEW_W, Math.min(MAP_W, v[2] / f));
  const nh = nw * (v[3] / v[2]);
  return [mx - (sx / W) * nw, my - (sy / H) * nh, nw, nh];
}

export interface Placed {
  id: string;
  x: number;
  y: number;
}

export interface Cluster<T extends Placed = Placed> {
  pins: T[];
  x: number;
  y: number;
}

/** Groups pins closer than `radius` map units. A group sits at the middle of its pins. */
export function clusterPins<T extends Placed>(pins: T[], radius: number): Cluster<T>[] {
  const out: Cluster<T>[] = [];
  for (const p of pins) {
    const c = out.find((k) => Math.hypot(k.x - p.x, k.y - p.y) < radius);
    if (c) {
      c.pins.push(p);
      c.x = c.pins.reduce((s, q) => s + q.x, 0) / c.pins.length;
      c.y = c.pins.reduce((s, q) => s + q.y, 0) / c.pins.length;
    } else out.push({ pins: [p], x: p.x, y: p.y });
  }
  return out;
}

/** The view a tap on a bubble zooms to: the closest two pins of it end up about 80 px apart. */
export function clusterTarget(c: Cluster, W: number, a: number): ViewBox {
  let minD = Infinity;
  for (const p of c.pins)
    for (const q of c.pins) if (p !== q) minD = Math.min(minD, Math.hypot(p.x - q.x, p.y - q.y));
  const w = Math.max(MIN_VIEW_W, Math.min(MAP_W * 0.6, (minD * W) / 80));
  return [c.x - w / 2, c.y - (w * a) / 2, w, w * a];
}

const CLOUD_MAX_W = 340;
/** Room the cloud needs above or below the pin, in px. */
const CLOUD_ROOM = 230;

/** Where the cloud goes for a pin at screen point (px, py) on a W x H stage, with its trail dots. */
export function cloudPlacement(px: number, py: number, W: number, H: number) {
  const width = Math.min(CLOUD_MAX_W, W - 16);
  const left = Math.max(8, Math.min(W - width - 8, px - width / 2));
  const roomAbove = py - 58;
  const roomBelow = H - py - 34;
  const above = roomAbove >= CLOUD_ROOM || (roomBelow < CLOUD_ROOM && roomAbove > roomBelow);
  const maxOffset = Math.max(8, H - CLOUD_ROOM - 8);
  const style = above
    ? { left, bottom: Math.max(8, Math.min(maxOffset, H - py + 58)), width, maxHeight: H - 16 }
    : { left, top: Math.max(8, Math.min(maxOffset, py + 34)), width, maxHeight: H - 16 };
  const dots = above
    ? [
        { x: px + 6, y: py - 42, r: 5 },
        { x: px + 12, y: py - 54, r: 7 },
      ]
    : [
        { x: px + 6, y: py + 10, r: 5 },
        { x: px + 12, y: py + 22, r: 7 },
      ];
  return { style, dots };
}
