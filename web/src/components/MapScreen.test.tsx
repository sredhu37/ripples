import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { MapScreen } from "./MapScreen";
import { NameScreen } from "./NameScreen";
import { emptyProgress, type Progress } from "../progress";
import { LESSONS } from "../lessons";

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
