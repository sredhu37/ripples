import { act, useState } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { TimelineSlider } from "./TimelineSlider";
import { TIMELINE_ERAS } from "../timeline/data";
import { TIMELINE_STOPS } from "../timeline/pins";

// @ts-expect-error test flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

function Host({ lang, start }: { lang: "en" | "de" | "pl"; start: number }) {
  const [i, setI] = useState(start);
  return <TimelineSlider lang={lang} index={i} onChange={setI} />;
}

async function mount(lang: "en" | "de" | "pl" = "en", start = 0) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  await act(async () => {
    root.render(<Host lang={lang} start={start} />);
  });
  return container;
}

const stops = (c: HTMLElement) => c.querySelectorAll<HTMLElement>(".time-stop");
const range = (c: HTMLElement) => c.querySelector<HTMLInputElement>("input[type=range]")!;
const step = (c: HTMLElement, label: RegExp) =>
  Array.from(c.querySelectorAll<HTMLButtonElement>(".time-steps button")).find((b) =>
    label.test(b.textContent ?? ""),
  )!;

describe("TimelineSlider", () => {
  it("shows the box, hint and one label per stop", async () => {
    const c = await mount();
    expect(c.textContent).toContain("Pick a time");
    expect(c.textContent).toContain("tap an era");
    expect(stops(c)).toHaveLength(TIMELINE_STOPS.length);
    expect(stops(c)[0].textContent).toBe("3000 BCE");
  });

  it("stop labels are not tappable and are hidden from screen readers", async () => {
    const c = await mount();
    expect(c.querySelectorAll(".time-stops button")).toHaveLength(0);
    expect(c.querySelector(".time-stops")!.getAttribute("aria-hidden")).toBe("true");
  });

  it("clamps an out-of-range index", async () => {
    const c = await mount("en", 99);
    expect(range(c).value).toBe(String(TIMELINE_STOPS.length - 1));
  });

  it("fills up to the current stop", async () => {
    const c = await mount("en", 9);
    expect(range(c).value).toBe("9");
    expect(c.querySelectorAll(".time-stop-past")).toHaveLength(10);
    expect(c.querySelector<HTMLElement>(".time-track")!.style.getPropertyValue("--fill")).toBe(
      `${(9 / 21) * 100}%`,
    );
  });

  it("picks a stop by dragging the thumb", async () => {
    const c = await mount();
    const input = range(c);
    await act(async () => {
      const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
      set.call(input, "4");
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    expect(stops(c)[4].className).toContain("time-stop-on");
    expect(input.getAttribute("aria-valuetext")).toContain("Global Trade and Empires");
  });

  it("shows the 7 era labels, each as wide as its stops", async () => {
    const c = await mount();
    const segs = c.querySelectorAll<HTMLButtonElement>(".era-seg");
    expect(segs).toHaveLength(7);
    TIMELINE_ERAS.forEach((era, i) => {
      expect(segs[i].textContent).toBe(era.label.en);
      expect(segs[i].style.flexGrow).toBe(
        String(TIMELINE_STOPS.filter((s) => s.era === era.id).length),
      );
    });
  });

  it("jumps to the first stop of a tapped era and marks it current", async () => {
    const c = await mount();
    const segs = c.querySelectorAll<HTMLButtonElement>(".era-seg");
    await act(async () => segs[5].click());
    expect(TIMELINE_STOPS[Number(range(c).value)].year).toBe(1900);
    expect(segs[5].getAttribute("aria-current")).toBe("true");
    expect(segs[0].getAttribute("aria-current")).toBeNull();
  });

  it("steps with Earlier and Later and disables them at the ends", async () => {
    const c = await mount("en", 0);
    expect(step(c, /Earlier/).disabled).toBe(true);
    await act(async () => step(c, /Later/).click());
    expect(range(c).value).toBe("1");
    expect(step(c, /Earlier/).disabled).toBe(false);
    await act(async () => step(c, /Earlier/).click());
    expect(range(c).value).toBe("0");

    const end = await mount("en", TIMELINE_STOPS.length - 1);
    expect(step(end, /Later/).disabled).toBe(true);
    expect(step(end, /Earlier/).disabled).toBe(false);
  });

  it("has labels in German and Polish", async () => {
    const de = await mount("de");
    expect(de.textContent).toContain("Zeit wählen");
    expect(step(de, /Später/)).toBeTruthy();
    expect(stops(de)[0].textContent).toBe("3000 v. Chr.");
    const pl = await mount("pl");
    expect(pl.textContent).toContain("Wybierz czas");
    expect(step(pl, /Wcześniej/)).toBeTruthy();
    expect(range(pl).getAttribute("aria-label")).toBe("Wybierz czas");
  });
});
