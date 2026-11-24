import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { MapScreen } from "./MapScreen";
import { NameScreen } from "./NameScreen";
import { emptyProgress, type Progress } from "../progress";
import { CURRICULUM_GROUPS, LESSONS } from "../lessons";

// Tell React it is in a test environment so act(...) warnings are suppressed
// @ts-expect-error test flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

function changeInput(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

async function renderMap(progress: Progress, paused?: ReadonlySet<string>) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  const onSwitchProfile = vi.fn();
  await act(async () => {
    root.render(
      <MapScreen
        progress={progress}
        paused={paused}
        returning={false}
        onLang={() => {}}
        onToggleMute={() => {}}
        onOpenLesson={() => {}}
        onParents={() => {}}
        onTimeline={() => {}}
        avatar="Finn"
        onSwitchProfile={onSwitchProfile}
      />,
    );
  });
  return {
    container,
    onSwitchProfile,
    done: () => {
      root.unmount();
      container.remove();
    },
  };
}

describe("MapScreen with a Paused lesson", () => {
  it("leaves the lesson out but keeps its badge in progress", async () => {
    const progress: Progress = { ...emptyProgress(), name: "Child", badges: ["loans"] };
    const { container, done } = await renderMap(progress, new Set(["loans"]));
    expect(container.querySelectorAll(".trail .stop").length).toBe(LESSONS.length - 1);
    expect(container.querySelectorAll(".shelf-row .medal").length).toBe(LESSONS.length - 1);
    expect(container.textContent).not.toContain("Loans");
    // Trail numbers stay consecutive: "Loans" was 6, "Banks" is now 6.
    expect(container.querySelectorAll(".trail .stop")[5].textContent).toContain("6. Banks");
    expect(progress.badges).toEqual(["loans"]);
    done();

    const again = await renderMap(progress);
    expect(again.container.querySelectorAll(".shelf-row .medal-on").length).toBe(1);
    again.done();
  });
});

describe("MapScreen with disabled lessons", () => {
  it("hides disabled lessons from trail and renumbers remaining stops consecutively", async () => {
    const progress: Progress = { ...emptyProgress(), name: "Child", disabledLessons: ["work"] };
    const { container, done } = await renderMap(progress);
    const trailStops = container.querySelectorAll(".trail .stop");
    expect(trailStops.length).toBe(LESSONS.length - 1);
    expect(trailStops[0].textContent).toContain("1. What is money?");
    // "Work and pay" was skipped, so stop 2 is "Savings".
    expect(trailStops[1].textContent).toContain("2. Savings");
    expect(container.textContent).not.toContain("Work and pay");
    expect(container.querySelectorAll(".shelf-row .medal").length).toBe(LESSONS.length - 1);
    done();
  });

  it("skips disabled lessons for the continue button", async () => {
    const progress: Progress = { ...emptyProgress(), name: "Child", disabledLessons: ["money"] };
    const { container, done } = await renderMap(progress);
    expect(container.querySelector(".continue")?.textContent).toContain("Work and pay");
    done();
  });
});

describe("MapScreen order", () => {
  it("follows the curriculum groups and continues after the last badge of Group 1", async () => {
    const group1 = CURRICULUM_GROUPS[0].lessonIds;
    const progress: Progress = { ...emptyProgress(), name: "Child", badges: [...group1] };
    const { container, done } = await renderMap(progress);
    const stops = container.querySelectorAll(".trail .stop");
    expect(stops[23].textContent).toContain("24. Currencies");
    expect(stops[stops.length - 1].textContent).not.toContain("GDP");
    const first = LESSONS.find((l) => l.id === CURRICULUM_GROUPS[1].lessonIds[0])!;
    expect(container.querySelector(".continue")?.textContent).toContain(first.title.en);
    done();
  });
});

describe("MapScreen kid switch", () => {
  it("shows the kid's villager and name as the profile switch", async () => {
    const { container, onSwitchProfile, done } = await renderMap({
      ...emptyProgress(),
      name: "Ava",
    });
    const button = container.querySelector<HTMLButtonElement>(".profile-btn")!;
    expect(button.textContent).toBe("Ava");
    expect(button.getAttribute("aria-label")).toBe("Switch profile: Ava");
    expect(button.querySelector(".profile-face")?.getAttribute("data-avatar")).toBe("Finn");
    await act(async () => {
      button.click();
    });
    expect(onSwitchProfile).toHaveBeenCalledTimes(1);
    expect(container.textContent).not.toContain("Change kid");
    done();
  });

  it("labels the sound, timeline and parents buttons", async () => {
    const { container, done } = await renderMap({ ...emptyProgress(), name: "Ava" });
    const labels = Array.from(container.querySelectorAll(".labeled-btn")).map((b) => b.textContent);
    expect(labels).toEqual(["Sound", "Timeline", "Parents"]);
    done();
  });
});

describe("NameScreen", () => {
  it("has no age choice and submits only the name", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    const onDone = vi.fn();

    await act(async () => {
      root.render(<NameScreen lang="en" onLang={() => {}} onDone={onDone} />);
    });

    const input = container.querySelector("input")!;
    expect(container.textContent).not.toMatch(/age group|junior|senior/i);

    await act(async () => {
      changeInput(input, "Alex");
      const form = container.querySelector("form")!;
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    expect(onDone).toHaveBeenCalledWith("Alex");

    root.unmount();
    container.remove();
  });
});
