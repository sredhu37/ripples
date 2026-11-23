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
  const onChangeKid = vi.fn();
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
        onChangeKid={onChangeKid}
      />,
    );
  });
  return {
    container,
    onChangeKid,
    done: () => {
      root.unmount();
      container.remove();
    },
  };
}

describe("MapScreen with a Paused lesson", () => {
  it("leaves the lesson out but keeps its badge in progress", async () => {
    const earlier = ["money", "work", "savings", "business", "equity"];
    const progress: Progress = {
      ...emptyProgress(),
      name: "Child",
      badges: [...earlier, "loans"],
    };
    const { container, done } = await renderMap(progress, new Set(["loans"]));
    // The Paused badge is not on the shelf and not counted.
    expect(container.querySelectorAll(".shelf-row .medal-on").length).toBe(5);
    expect(container.querySelector(".shelf-count")?.textContent).toBe(`5 of ${LESSONS.length - 1}`);
    expect(container.textContent).not.toContain("Loans");
    // Trail numbers stay consecutive: "Loans" was 6, "Banks" is now 6.
    expect(container.querySelectorAll(".trail .stop")[5].textContent).toContain("6. Banks");
    expect(progress.badges).toContain("loans");
    done();

    const again = await renderMap(progress);
    expect(again.container.querySelectorAll(".shelf-row .medal-on").length).toBe(6);
    again.done();
  });
});

describe("MapScreen with disabled lessons", () => {
  it("hides disabled lessons from trail and renumbers remaining stops consecutively", async () => {
    const progress: Progress = { ...emptyProgress(), name: "Child", disabledLessons: ["work"] };
    const { container, done } = await renderMap(progress);
    const trailStops = container.querySelectorAll(".trail .stop");
    expect(trailStops[0].textContent).toContain("1. What is money?");
    // "Work and pay" was skipped, so stop 2 is "Savings".
    expect(trailStops[1].textContent).toContain("2. Savings");
    expect(container.textContent).not.toContain("Work and pay");
    expect(container.querySelector(".shelf-count")?.textContent).toBe(`0 of ${LESSONS.length - 1}`);
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
    // 12 done, then the next stop and two locked ones: 12 + 3 = 15 in full, numbered on.
    expect(stops[12].textContent).toContain("13. ");
    expect(stops.length).toBe(15);
    const first = LESSONS.find((l) => l.id === CURRICULUM_GROUPS[1].lessonIds[0])!;
    expect(container.querySelector(".continue")?.textContent).toContain(first.title.en);
    done();
  });
});

describe("MapScreen fresh profile", () => {
  it("shows 0 of N, no empty medals, a heading per group and few locked stops", async () => {
    const { container, done } = await renderMap({ ...emptyProgress(), name: "Child" });
    expect(container.querySelector(".shelf-count")?.textContent).toBe(`0 of ${LESSONS.length}`);
    expect(container.querySelector(".shelf-empty")?.textContent).toBe(
      "Your first badge is waiting",
    );
    expect(container.querySelectorAll(".shelf-row .medal").length).toBe(0);
    expect(container.querySelectorAll(".trail h2").length).toBe(CURRICULUM_GROUPS.length);
    expect(container.querySelectorAll(".trail .stop-locked").length).toBe(2);
    expect(container.querySelectorAll(".trail .stop-next").length).toBe(1);
    expect(container.querySelector(".trail-group-muted")?.textContent).toContain("Lessons:");
    done();
  });

  it("leaves out a group whose lessons are all disabled", async () => {
    const progress: Progress = {
      ...emptyProgress(),
      name: "Child",
      disabledLessons: [...CURRICULUM_GROUPS[1].lessonIds],
    };
    const { container, done } = await renderMap(progress);
    expect(container.querySelectorAll(".trail h2").length).toBe(CURRICULUM_GROUPS.length - 1);
    done();
  });
});

describe("MapScreen kid switch", () => {
  it("has a Change kid button", async () => {
    const { container, onChangeKid, done } = await renderMap({ ...emptyProgress(), name: "Ava" });
    const button = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent === "Change kid",
    );
    expect(button).toBeDefined();
    await act(async () => {
      button!.click();
    });
    expect(onChangeKid).toHaveBeenCalledTimes(1);
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
