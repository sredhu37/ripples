// The border files of the world map (web/public/borders/<map year>.json), made by `npm run borders`
// (scripts/borders/README.md). One file per map year, loaded when a stop or pin opens. Spec:
// docs/specs/world-timeline-map.md, section 4.

export type LonLat = [lon: number, lat: number];

/** One country or empire as drawn in one map year. */
export interface BorderShape {
  /** Present-day country the shape covers most. Its colour is the same on every map. */
  country: string;
  colour: string;
  /** Polylines, see decodeRing. Fill even-odd: a ring inside a ring is a hole. */
  rings: string[];
}

export interface Borders {
  year: number;
  /** In drawing order: big shapes first, so small ones sit on top. */
  shapes: BorderShape[];
}

/** All land, drawn neutral under every map: land that no polity held stays unassigned (spec D4). */
export interface Land {
  /** Polylines, see decodeRing. Fill even-odd. */
  rings: string[];
}

/** Where the land file lives. Like the border files, the service worker keeps it after the first load. */
export function landUrl(): string {
  return `${import.meta.env.BASE_URL}borders/land.json`;
}

/** Where the border file for a map year lives. The service worker keeps it after the first load. */
export function bordersUrl(year: number): string {
  return `${import.meta.env.BASE_URL}borders/${year}.json`;
}

/**
 * Longitude and latitude of a ring. The string holds the points in hundredths of a degree, each as
 * the difference to the point before, in the polyline format map libraries use: a number is
 * zigzagged (negative numbers odd), cut into 5-bit pieces from the low end, and every piece is
 * written as one character with 63 added, plus 32 on all pieces but the last.
 */
export function decodeRing(encoded: string): LonLat[] {
  const points: LonLat[] = [];
  let index = 0;
  let lon = 0;
  let lat = 0;
  const next = (): number => {
    let result = 0;
    let shift = 0;
    let code: number;
    do {
      code = encoded.charCodeAt(index++) - 63;
      result += (code % 32) * 2 ** shift;
      shift += 5;
    } while (code >= 32);
    return result % 2 === 1 ? -(result + 1) / 2 : result / 2;
  };
  while (index < encoded.length) {
    lon += next();
    lat += next();
    points.push([lon / 100, lat / 100]);
  }
  return points;
}

/** Whether a point is inside a shape. Even-odd over all its rings, the same rule as the fill. */
export function shapeContains(shape: BorderShape, lon: number, lat: number): boolean {
  let inside = false;
  for (const ring of shape.rings) {
    const pts = decodeRing(ring);
    let hit = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i];
      const [xj, yj] = pts[j];
      if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) hit = !hit;
    }
    if (hit) inside = !inside;
  }
  return inside;
}
