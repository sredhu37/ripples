import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { ParentPanel } from "./ParentPanel";
import { MapScreen } from "./MapScreen";
import { NameScreen } from "./NameScreen";
import { emptyProgress, type Progress } from "../progress";
import { LESSONS, CURRICULUM_GROUPS } from "../lessons";
import { getLesson, registerSeniorLesson } from "../content";

// Tell React it is in a test environment so act(...) warnings are suppressed
// @ts-expect-error test flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

function changeInput(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

describe("ParentPanel", () => {
  it("renders the gate and opens the panel upon correct answer", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const onToggle = vi.fn();
    const progress: Progress = { ...emptyProgress(), name: "Child", lang: "en" };

    await act(async () => {
      root.render(
        <ParentPanel
          progress={progress}
          onRestore={() => {}}
          onReset={() => {}}
          onFacts={() => {}}
          onClose={() => {}}
          onToggleLesson={onToggle}
        />
      );
    });

    const form = container.querySelector("form");
    expect(form).not.toBeNull();

    const label = form?.querySelector("p")?.textContent ?? "";
    const match = label.match(/(\d+)\s*×\s*(\d+)/);
    expect(match).not.toBeNull();
    const product = String(Number(match![1]) * Number(match![2]));

    const input = container.querySelector("input");
    expect(input).not.toBeNull();

    await act(async () => {
      changeInput(input!, product);
      form!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    // Panel is now open
    expect(container.textContent).toContain("Lesson selection");

    // All curriculum groups rendered
    const groups = container.querySelectorAll(".lesson-group-accordion");
    expect(groups.length).toBe(CURRICULUM_GROUPS.length);

    // Group 1 has 12 lessons
    const firstGroupToggles = groups[0].querySelectorAll(".lesson-toggle-row");
    expect(firstGroupToggles.length).toBe(12);

    // Toggle the first lesson off
    const firstCheckbox = firstGroupToggles[0].querySelector("input[type='checkbox']") as HTMLInputElement;
    expect(firstCheckbox.checked).toBe(true);

    await act(async () => {
      firstCheckbox.click();
    });

    expect(onToggle).toHaveBeenCalledWith("money", false);

    root.unmount();
    container.remove();
  });

  it("reflects disabled lessons with disabled status and unchecked switch", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const onToggle = vi.fn();
    const progress: Progress = {
      ...emptyProgress(),
      name: "Child",
      lang: "en",
      disabledLessons: ["ww2"],
    };

    await act(async () => {
      root.render(
        <ParentPanel
          progress={progress}
          onRestore={() => {}}
          onReset={() => {}}
          onFacts={() => {}}
          onClose={() => {}}
          onToggleLesson={onToggle}
        />
      );
    });

    // Solve gate
    const form = container.querySelector("form")!;
    const match = form.querySelector("p")!.textContent!.match(/(\d+)\s*×\s*(\d+)/)!;
    const product = String(Number(match[1]) * Number(match[2]));
    const input = container.querySelector("input")!;

    await act(async () => {
      changeInput(input, product);
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    // Group 5 (History) has ww2 disabled: 7 / 8 active
    const group5 = container.querySelectorAll(".lesson-group-accordion")[4];
    expect(group5.querySelector(".lesson-group-count")?.textContent?.trim()).toBe("7 / 8");

    const ww2Row = Array.from(group5.querySelectorAll(".lesson-toggle-row")).find((row) =>
      row.textContent?.includes("World War 2")
    );
    expect(ww2Row).toBeDefined();
    expect(ww2Row?.className).toContain("lesson-toggle-row-off");
    expect(ww2Row?.textContent).toContain("Disabled");

    const ww2Checkbox = ww2Row!.querySelector("input[type='checkbox']") as HTMLInputElement;
    expect(ww2Checkbox.checked).toBe(false);

    await act(async () => {
      ww2Checkbox.click();
    });

    expect(onToggle).toHaveBeenCalledWith("ww2", true);

    root.unmount();
    container.remove();
  });
});

describe("MapScreen with disabled lessons", () => {
  it("hides disabled lessons from trail and renumbers remaining stops consecutively", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    // Disable lesson 2 ("work")
    const progress: Progress = {
      ...emptyProgress(),
      name: "Child",
      lang: "en",
      disabledLessons: ["work"],
    };

    await act(async () => {
      root.render(
        <MapScreen
          progress={progress}
          returning={false}
          onLang={() => {}}
          onToggleMute={() => {}}
          onOpenLesson={() => {}}
          onParents={() => {}}
          onTimeline={() => {}}
        />
      );
    });

    // Trail stops
    const trailStops = container.querySelectorAll(".trail .stop");
    expect(trailStops.length).toBe(LESSONS.length - 1);

    // Stop 1 is "1. What is money?"
    expect(trailStops[0].textContent).toContain("1. What is money?");

    // Stop 2 is now "2. Savings" (consecutively renumbered, "Work and pay" was skipped)
    expect(trailStops[1].textContent).toContain("2. Savings");
    expect(container.textContent).not.toContain("Work and pay");

    // Shelf also excludes "work"
    const medals = container.querySelectorAll(".shelf-row .medal");
    expect(medals.length).toBe(LESSONS.length - 1);

    root.unmount();
    container.remove();
  });

  it("skips disabled lessons for the continue button", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    // If "money" is disabled, continue button should offer "Work and pay"
    const progress: Progress = {
      ...emptyProgress(),
      name: "Child",
      lang: "en",
      disabledLessons: ["money"],
    };

    await act(async () => {
      root.render(
        <MapScreen
          progress={progress}
          returning={false}
          onLang={() => {}}
          onToggleMute={() => {}}
          onOpenLesson={() => {}}
          onParents={() => {}}
          onTimeline={() => {}}
        />
      );
    });

    const continueBtn = container.querySelector(".continue");
    expect(continueBtn?.textContent).toContain("Work and pay");

    root.unmount();
    container.remove();
  });
});

describe("Age Groups integration", () => {
  it("renders age group selector in ParentPanel and calls onAgeGroup", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const onAgeGroup = vi.fn();
    const progress: Progress = { ...emptyProgress(), name: "Child", lang: "en", ageGroup: "junior" };

    await act(async () => {
      root.render(
        <ParentPanel
          progress={progress}
          onRestore={() => {}}
          onReset={() => {}}
          onFacts={() => {}}
          onClose={() => {}}
          onToggleLesson={() => {}}
          onAgeGroup={onAgeGroup}
        />
      );
    });

    // Solve gate
    const form = container.querySelector("form")!;
    const match = form.querySelector("p")!.textContent!.match(/(\d+)\s*×\s*(\d+)/)!;
    const product = String(Number(match[1]) * Number(match[2]));
    const input = container.querySelector("input")!;

    await act(async () => {
      changeInput(input, product);
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    expect(container.textContent).toContain("Age group");
    const pills = container.querySelectorAll(".age-pill-btn");
    expect(pills.length).toBe(2);
    expect(pills[0].classList.contains("active")).toBe(true);
    expect(pills[1].classList.contains("active")).toBe(false);

    await act(async () => {
      (pills[1] as HTMLButtonElement).click();
    });

    expect(onAgeGroup).toHaveBeenCalledWith("senior");

    root.unmount();
    container.remove();
  });

  it("selects senior age group in NameScreen and submits", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const onDone = vi.fn();

    await act(async () => {
      root.render(
        <NameScreen
          lang="en"
          onLang={() => {}}
          onDone={onDone}
        />
      );
    });

    const input = container.querySelector("input")!;
    const pills = container.querySelectorAll(".age-pill-btn");
    expect(pills.length).toBe(2);

    // Select Senior
    await act(async () => {
      (pills[1] as HTMLButtonElement).click();
      changeInput(input, "Alex");
      const form = container.querySelector("form")!;
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    expect(onDone).toHaveBeenCalledWith("Alex", "senior");

    root.unmount();
    container.remove();
  });

  it("falls back to junior lesson when senior lesson is not registered", () => {
    const junior = getLesson("ticketsize", "junior");
    expect(junior).toBeDefined();

    // ticketsize has not yet been forked for seniors, so it cleanly falls back
    const senior = getLesson("ticketsize", "senior");
    expect(senior).toBe(junior);
  });

  it("returns registered senior lesson when present", () => {
    const dummySenior = { ...getLesson("money")!, id: "money", askDad: { en: "Senior prompt", de: "Senior prompt", pl: "Senior prompt" } };
    registerSeniorLesson("money", dummySenior);

    expect(getLesson("money", "senior")).toBe(dummySenior);
    expect(getLesson("money", "junior")).not.toBe(dummySenior);
  });
});
