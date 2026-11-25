import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TimelineMap } from "./TimelineMap";
import { PINS } from "../timeline/pins";
import { resetBorderCache } from "../timeline/useBorders";
import { MAP_W, SELECTED_SCALE } from "../timeline/mapView";
import type { Pin } from "../timeline/types";

// @ts-expect-error test flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const CREDIT =
  "Historical borders derived from Cliopatria (Seshat Global History Databank, CC BY 4.0)";

const pin = (id: string, lessonId?: string): Pin => ({
  ...PINS.find((p) => p.id === id)!,
  lessonId,
});
// London and Paris: 3.7 map units apart, so one bubble on the whole world and two pins when zoomed.
const LONDON = pin("penicillin", "money");
const PARIS = pin("pasteur");
const TOKYO = pin("meiji");

let fetched: string[] = [];
let width = 1000;
let sizeSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  resetBorderCache();
  fetched = [];
  // "gEgEgEgE" is a ring of two points; enough to draw a path.
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      fetched.push(url);
      const body = url.endsWith("land.json")
        ? { rings: ["gEgEgEgE"] }
        : { year: 0, shapes: [{ country: "India", colour: "#abcdef", rings: ["gEgEgEgE"] }] };
      return { ok: true, json: async () => body };
    }),
  );
  sizeSpy = vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(() => width);
  width = 1000;
  window.innerWidth = 1280;
  window.innerHeight = 800;
});

afterEach(() => {
  sizeSpy.mockRestore();
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
});

async function mount(pins: Pin[], onReadMore = (_id: string) => {}, defaultYear = 1900) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  await act(async () => {
    root.render(
      <TimelineMap lang="en" pins={pins} defaultYear={defaultYear} onReadMore={onReadMore} />,
    );
  });
  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
  });
  return container;
}

const tap = (el: Element) =>
  act(async () => {
    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
const pinButtons = (c: HTMLElement) => c.querySelectorAll<SVGElement>(".tm-pin:not(.tm-group)");
const groupButtons = (c: HTMLElement) => c.querySelectorAll<SVGElement>(".tm-group");
const viewBox = (c: HTMLElement) =>
  c.querySelector("svg.tm-map")!.getAttribute("viewBox")!.split(" ").map(Number);
const scaleOf = (el: Element) =>
  Number(/scale\(([\d.e-]+)\)/.exec(el.getAttribute("transform")!)![1]);

describe("TimelineMap borders", () => {
  it("loads the border file of the default year and draws it in the file's colours over neutral land", async () => {
    const c = await mount([TOKYO]);
    expect(fetched).toContain("/borders/1900.json");
    expect(fetched).toContain("/borders/land.json");
    expect(c.querySelector(".tm-shape")!.getAttribute("fill")).toBe("#abcdef");
    // Land no polity held has no label and no title.
    const land = c.querySelector(".tm-land")!;
    expect(land.getAttribute("fill")).not.toBe("#abcdef");
    expect(c.querySelector("svg.tm-map title")).toBeNull();
  });

  it("loads the border file of an open pin's map year", async () => {
    const c = await mount([TOKYO]);
    await tap(pinButtons(c)[0]);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(fetched).toContain(`/borders/${TOKYO.mapYear}.json`);
  });

  it("shows the credit line", async () => {
    const c = await mount([]);
    expect(c.textContent).toContain(CREDIT);
  });
});

describe("TimelineMap pins", () => {
  it("makes each pin a button labelled with country, year and title", async () => {
    const c = await mount([TOKYO]);
    const [b] = pinButtons(c);
    expect(b.getAttribute("role")).toBe("button");
    expect(b.getAttribute("aria-label")).toBe(
      `${TOKYO.country}, ${TOKYO.year.en}: ${TOKYO.title.en}`,
    );
  });

  it("draws the selected pin 1.7 times its size", async () => {
    const c = await mount([TOKYO, LONDON]);
    const before = pinButtons(c);
    expect(before).toHaveLength(2);
    const plain = scaleOf(before[0]);
    expect(scaleOf(before[1])).toBeCloseTo(plain);
    await tap(before[0]);
    const selected = c.querySelector('.tm-pin[aria-pressed="true"]')!;
    const other = c.querySelector('.tm-pin[aria-pressed="false"]')!;
    expect(scaleOf(selected) / scaleOf(other)).toBeCloseTo(SELECTED_SCALE);
    expect(SELECTED_SCALE).toBe(1.7);
  });
});

describe("TimelineMap clusters and zoom", () => {
  it("groups pins closer than 44 px into a bubble with a count", async () => {
    const c = await mount([LONDON, PARIS, TOKYO]);
    expect(pinButtons(c)).toHaveLength(1);
    const groups = groupButtons(c);
    expect(groups).toHaveLength(1);
    expect(groups[0].textContent).toBe("2");
    expect(groups[0].getAttribute("aria-label")).toBe("2 pins here, tap to zoom in");
  });

  it("zooms in when the bubble is tapped, and the pins separate", async () => {
    const c = await mount([LONDON, PARIS]);
    const width0 = viewBox(c)[2];
    await tap(groupButtons(c)[0]);
    expect(viewBox(c)[2]).toBeLessThan(width0);
    expect(groupButtons(c)).toHaveLength(0);
    expect(pinButtons(c)).toHaveLength(2);
  });

  it("zooms with the + and - buttons", async () => {
    const c = await mount([TOKYO]);
    const zoomIn = c.querySelector<HTMLButtonElement>('button[aria-label="Zoom in"]')!;
    const zoomOut = c.querySelector<HTMLButtonElement>('button[aria-label="Zoom out"]')!;
    expect(zoomOut.disabled).toBe(true);
    await tap(zoomIn);
    const zoomed = viewBox(c)[2];
    expect(zoomed).toBeLessThan(MAP_W);
    expect(zoomOut.disabled).toBe(false);
    await tap(zoomOut);
    expect(viewBox(c)[2]).toBeGreaterThan(zoomed);
  });

  it("zooms with the scroll wheel", async () => {
    const c = await mount([TOKYO]);
    const stage = c.querySelector(".tm-stage")!;
    await act(async () => {
      stage.dispatchEvent(
        new WheelEvent("wheel", { deltaY: -400, bubbles: true, cancelable: true }),
      );
    });
    expect(viewBox(c)[2]).toBeLessThan(MAP_W);
  });

  it("starts on Europe to Asia on a phone", async () => {
    width = 390;
    window.innerWidth = 390;
    window.innerHeight = 800;
    const c = await mount([TOKYO]);
    const [x, , w] = viewBox(c);
    expect(w).toBeLessThan(MAP_W);
    expect(x).toBeGreaterThan(0);
    // 50 degrees east, in the middle.
    expect(x + w / 2).toBeCloseTo(230);
  });

  it("starts on the whole world on a wide screen", async () => {
    const c = await mount([TOKYO]);
    expect(viewBox(c)[2]).toBe(MAP_W);
  });
});

describe("TimelineMap thought cloud", () => {
  it("opens at the pin with Otto telling the line, and closing shows the pins again", async () => {
    const c = await mount([TOKYO, LONDON]);
    expect(c.querySelector(".tm-cloud")).toBeNull();
    await tap(pinButtons(c)[0]);
    const cloud = c.querySelector(".tm-cloud")!;
    expect(cloud).not.toBeNull();
    expect(cloud.querySelector('[aria-label="Otto the otter"]')).not.toBeNull();
    expect(cloud.textContent).toContain(TOKYO.line.en);
    expect(cloud.textContent).toContain(TOKYO.title.en);
    await tap(cloud.querySelector('button[aria-label="Close"]')!);
    expect(c.querySelector(".tm-cloud")).toBeNull();
    expect(pinButtons(c)).toHaveLength(2);
  });

  it("closes when the map is tapped or Escape is pressed", async () => {
    const c = await mount([TOKYO]);
    await tap(pinButtons(c)[0]);
    await tap(c.querySelector("svg.tm-map")!);
    expect(c.querySelector(".tm-cloud")).toBeNull();
    await tap(pinButtons(c)[0]);
    await act(async () => {
      c.querySelector(".tm-stage")!.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
    });
    expect(c.querySelector(".tm-cloud")).toBeNull();
  });

  it("opens from the keyboard", async () => {
    const c = await mount([TOKYO]);
    await act(async () => {
      pinButtons(c)[0].dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    });
    expect(c.querySelector(".tm-cloud")).not.toBeNull();
  });

  it("shows Read more only for a pin with a lesson, and opens that lesson", async () => {
    const onReadMore = vi.fn();
    const c = await mount([TOKYO, LONDON], onReadMore);
    const [without, withLesson] = [...pinButtons(c)];
    await tap(without);
    expect(c.querySelector(".tm-read")).toBeNull();
    await tap(withLesson);
    const read = c.querySelector<HTMLButtonElement>(".tm-read")!;
    expect(read.textContent).toContain("Read more");
    await tap(read);
    expect(onReadMore).toHaveBeenCalledWith("money");
  });

  it("closes when its pin leaves the list", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    const render = (pins: Pin[]) =>
      act(async () => {
        root.render(<TimelineMap lang="en" pins={pins} defaultYear={1900} onReadMore={() => {}} />);
      });
    await render([TOKYO]);
    await tap(pinButtons(container)[0]);
    expect(container.querySelector(".tm-cloud")).not.toBeNull();
    await render([LONDON]);
    expect(container.querySelector(".tm-cloud")).toBeNull();
  });
});
