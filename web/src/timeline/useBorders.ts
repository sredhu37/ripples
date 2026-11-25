import { useEffect, useState } from "react";
import { bordersUrl, decodeRing, landUrl, type Borders, type Land } from "./borders";
import { project } from "./mapView";

/** One shape ready to draw: an SVG path in map units, even-odd fill. */
export interface DrawnShape {
  country: string;
  colour: string;
  d: string;
}

export function ringsToPath(rings: string[]): string {
  return rings
    .map((ring) => {
      const pts = decodeRing(ring).map((p) => project(p));
      return `M${pts.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join("L")}Z`;
    })
    .join("");
}

// A file is fetched once per page. The service worker keeps it for offline use.
const files = new Map<string, Promise<unknown>>();

function load<T>(url: string): Promise<T> {
  let p = files.get(url);
  if (!p) {
    p = fetch(url).then((res) => {
      if (!res.ok) throw new Error(`${url}: ${res.status}`);
      return res.json();
    });
    files.set(url, p);
    // A failed load is tried again next time.
    p.catch(() => files.delete(url));
  }
  return p as Promise<T>;
}

/** Forgets what was loaded. For tests. */
export function resetBorderCache(): void {
  files.clear();
}

/**
 * The shapes of a map year, and the neutral land under every map. Loaded when the year first shows
 * (spec D2). The map before stays on screen until the next one has arrived. Offline and not kept yet:
 * the land stays and the shapes are missing.
 */
export function useBorders(year: number): { land: string | null; shapes: DrawnShape[] } {
  const [land, setLand] = useState<string | null>(null);
  const [drawn, setDrawn] = useState<DrawnShape[]>([]);

  useEffect(() => {
    let live = true;
    load<Land>(landUrl())
      .then((l) => live && setLand(ringsToPath(l.rings)))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    let live = true;
    load<Borders>(bordersUrl(year))
      .then(
        (b) =>
          live &&
          setDrawn(
            b.shapes.map((s) => ({
              country: s.country,
              colour: s.colour,
              d: ringsToPath(s.rings),
            })),
          ),
      )
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [year]);

  return { land, shapes: drawn };
}
