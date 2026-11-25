import { describe, expect, it } from "vitest";
import {
  MAP_H,
  MAP_W,
  MIN_VIEW_W,
  clampView,
  cloudPlacement,
  clusterPins,
  clusterTarget,
  project,
  startView,
  worldView,
  zoomAt,
} from "./mapView";

describe("project", () => {
  it("puts the corners of the border box on the corners of the map", () => {
    expect(project([-180, 84])).toEqual([0, 0]);
    expect(project([180, -58])).toEqual([MAP_W, MAP_H]);
  });
});

describe("views", () => {
  it("shows the whole world on a wide stage", () => {
    const a = 0.3;
    expect(startView(a)).toEqual(worldView(a));
  });

  it("starts on Europe to Asia on a tall stage, full height", () => {
    const [x, y, w, h] = startView(1.15);
    expect(w).toBeLessThan(MAP_W);
    expect(y).toBe(0);
    expect(h).toBeCloseTo(MAP_H);
    // 50 degrees east is the middle.
    expect(x + w / 2).toBeCloseTo(project([50, 0])[0]);
    // Lisbon (-9) and Bangkok (100) are both inside.
    expect(x).toBeLessThan(project([-9, 0])[0]);
    expect(x + w).toBeGreaterThan(project([100, 0])[0]);
  });

  it("keeps a view inside the map and above the closest zoom", () => {
    expect(clampView([-50, -50, 1000, 500], 0.5)).toEqual([
      0,
      (MAP_H - MAP_W * 0.5) / 2,
      MAP_W,
      MAP_W * 0.5,
    ]);
    const [x, , w] = clampView([500, 0, 1, 0.5], 0.5);
    expect(w).toBe(MIN_VIEW_W);
    expect(x).toBe(MAP_W - MIN_VIEW_W);
  });

  it("zooms around a screen point and keeps the map point under it", () => {
    const v: [number, number, number, number] = [100, 20, 120, 60];
    const [x, y, w, h] = zoomAt(v, 2, 250, 100, 500, 250);
    expect(w).toBe(60);
    expect(h).toBe(30);
    // Screen point (250, 100) was map point (160, 44) and still is.
    expect(x + (250 / 500) * w).toBeCloseTo(160);
    expect(y + (100 / 250) * h).toBeCloseTo(44);
  });
});

describe("clusterPins", () => {
  const pin = (id: string, x: number, y: number) => ({ id, x, y });

  it("groups pins closer than the radius and leaves far ones alone", () => {
    const out = clusterPins([pin("a", 0, 0), pin("b", 5, 0), pin("c", 100, 0)], 10);
    expect(out.map((c) => c.pins.map((p) => p.id))).toEqual([["a", "b"], ["c"]]);
    expect(out[0].x).toBe(2.5);
  });

  it("splits the same pins at a smaller radius", () => {
    expect(clusterPins([pin("a", 0, 0), pin("b", 5, 0)], 4)).toHaveLength(2);
  });

  it("zooms a bubble so its closest pins are 80 px apart", () => {
    const c = clusterPins([pin("a", 100, 40), pin("b", 104, 40)], 10)[0];
    const [, , w] = clusterTarget(c, 800, 0.5);
    // 4 map units across 800 / w px per unit: 80 px.
    expect((4 * 800) / w).toBeCloseTo(80);
  });
});

describe("cloudPlacement", () => {
  it("goes above a pin low on the stage and below a pin high on it", () => {
    expect(cloudPlacement(300, 380, 600, 400).style).toHaveProperty("bottom");
    expect(cloudPlacement(300, 60, 600, 400).style).toHaveProperty("top");
  });

  it("stays inside the stage at the edges", () => {
    const { style } = cloudPlacement(2, 200, 400, 400);
    expect(style.left).toBe(8);
    const right = cloudPlacement(398, 200, 400, 400).style;
    expect((right.left as number) + (right.width as number)).toBeLessThanOrEqual(392);
  });
});
