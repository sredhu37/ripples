import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TimelineScreen } from "./TimelineScreen";
import { TIMELINE_STOPS, pinsByStop } from "../timeline/pins";
import { bordersUrl } from "../timeline/borders";
import { resetBorderCache } from "../timeline/useBorders";

// @ts-expect-error test flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let sizeSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  resetBorderCache();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      // The colour carries the year, so a test can tell which year is drawn.
      const body = url.endsWith("land.json")
        ? { rings: ["gEgEgEgE"] }
        : { year: 0, shapes: [{ country: "India", colour: url, rings: ["gEgEgEgE"] }] };
      return { ok: true, json: async () => body };
    }),
  );
  sizeSpy = vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(() => 1000);
  window.innerWidth = 1280;
  window.innerHeight = 800;
});

afterEach(() => {
  sizeSpy.mockRestore();
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
});

async function mount(
  lang: "en" | "de" | "pl" = "en",
  onClose = () => {},
  onReadMore = (_id: string) => {},
) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  await act(async () => {
    root.render(
      <TimelineScreen lang={lang} onLang={() => {}} onClose={onClose} onReadMore={onReadMore} />,
    );
  });
  return container;
}

const pinButtons = (c: HTMLElement) => c.querySelectorAll<SVGElement>(".tm-pin:not(.tm-group)");
/** The border file the map draws now. */
const drawn = (c: HTMLElement) => c.querySelector(".tm-shape")?.getAttribute("fill");

describe("TimelineScreen", () => {
  it("shows the map and the slider, and none of the old list", async () => {
    const c = await mount();
    expect(c.querySelector(".tm")).not.toBeNull();
    expect(c.querySelector(".time-slider")).not.toBeNull();
    expect(c.querySelector(".timeline-lane")).toBeNull();
    expect(c.querySelector(".timeline-regions")).toBeNull();
    expect(c.querySelector("[role=tab]")).toBeNull();
  });

  it("draws the start year of the first stop and its pins", async () => {
    const c = await mount();
    expect(drawn(c)).toBe(bordersUrl(TIMELINE_STOPS[0].year));
    const first = pinsByStop()[0];
    const shown = pinButtons(c).length + c.querySelectorAll(".tm-group").length;
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThanOrEqual(first.pins.length);
  });

  it("draws the new stop's start year when the slider moves", async () => {
    const c = await mount();
    const range = c.querySelector<HTMLInputElement>("input[type=range]")!;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
    await act(async () => {
      setter.call(range, "9");
      range.dispatchEvent(new Event("input", { bubbles: true }));
    });
    expect(drawn(c)).toBe(bordersUrl(TIMELINE_STOPS[9].year));
  });

  it("draws a pin's map year while it is open and goes back to the stop's year on close", async () => {
    const c = await mount();
    const stopUrl = bordersUrl(TIMELINE_STOPS[0].year);
    const first = pinsByStop()[0].pins.find((p) => p.mapYear !== TIMELINE_STOPS[0].year);
    expect(first).toBeDefined();
    const pin = Array.from(pinButtons(c)).find((b) =>
      b.getAttribute("aria-label")?.includes(first!.title.en),
    );
    expect(pin).toBeDefined();
    await act(async () => pin!.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(drawn(c)).toBe(bordersUrl(first!.mapYear));
    await act(async () => c.querySelector<HTMLButtonElement>(".tm-x")!.click());
    expect(c.querySelector(".tm-cloud")).toBeNull();
    expect(drawn(c)).toBe(stopUrl);
  });

  it("renders in German and calls onClose", async () => {
    const onClose = vi.fn();
    const c = await mount("de", onClose);
    expect(c.textContent).toContain("Weltzeitleiste");
    const back = c.querySelector<HTMLButtonElement>("button")!;
    expect(back.className).toContain("back-btn");
    expect(back.textContent).toBe("← Alle Lektionen");
    await act(async () => back.click());
    expect(onClose).toHaveBeenCalled();
  });
});
