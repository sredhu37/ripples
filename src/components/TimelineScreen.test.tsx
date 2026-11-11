import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { TimelineScreen } from "./TimelineScreen";
import { TIMELINE_ERAS, eventsFor } from "../timeline/data";

// @ts-expect-error test flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

async function mount(
  ageGroup: "junior" | "senior",
  lang: "en" | "de" | "pl" = "en",
  onClose = () => {},
) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  await act(async () => {
    root.render(
      <TimelineScreen lang={lang} ageGroup={ageGroup} onLang={() => {}} onClose={onClose} />,
    );
  });
  return container;
}

describe("TimelineScreen", () => {
  it("shows the first era cards", async () => {
    const c = await mount("junior");
    expect(c.querySelectorAll(".timeline-card").length).toBe(eventsFor("ancient", "all").length);
    expect(c.textContent).toContain("Indus Valley cities");
  });

  it("switches era and shows other cards", async () => {
    const c = await mount("junior");
    const tabs = c.querySelectorAll<HTMLButtonElement>("[role=tab]");
    expect(tabs).toHaveLength(TIMELINE_ERAS.length);
    await act(async () => tabs[3].click());
    expect(c.textContent).toContain("Newton explains gravity");
  });

  it("filters by region", async () => {
    const c = await mount("junior");
    const tabs = c.querySelectorAll<HTMLButtonElement>("[role=tab]");
    await act(async () => tabs[3].click());
    const chips = Array.from(c.querySelectorAll<HTMLButtonElement>(".timeline-regions .chip"));
    const science = chips.find((b) => b.textContent?.includes("Science"))!;
    await act(async () => science.click());
    expect(c.querySelectorAll(".timeline-card").length).toBe(
      eventsFor("scientific_rev", "science").length,
    );
    expect(c.textContent).not.toContain("Taj Mahal");
  });

  it("shows senior or junior summary by age group", async () => {
    const junior = await mount("junior");
    expect(junior.textContent).toContain("People build neat cities");
    const senior = await mount("senior");
    expect(senior.textContent).toContain("standard weights");
  });

  it("renders in German and calls onClose", async () => {
    const onClose = vi.fn();
    const c = await mount("junior", "de", onClose);
    expect(c.textContent).toContain("Weltzeitleiste");
    await act(async () => c.querySelector<HTMLButtonElement>(".topbar .btn")!.click());
    expect(onClose).toHaveBeenCalled();
  });
});
