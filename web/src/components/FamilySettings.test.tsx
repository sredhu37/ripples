import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import type { Profile } from "../api";
import { CURRICULUM_GROUPS } from "../lessons";
import { FamilySettings } from "./FamilySettings";

// @ts-expect-error test flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

function changeInput(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

function profile(n: number, extra: Partial<Profile> = {}): Profile {
  return {
    id: `p${n}`,
    nickname: `Kid${n}`,
    avatar: "Finn",
    lang: "en",
    muted: false,
    badges: [],
    disabledLessons: [],
    ...extra,
  };
}

async function render(profiles: Profile[], gated: boolean) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  const fns = {
    onAdd: vi.fn(() => Promise.resolve(true)),
    onChange: vi.fn(),
    onDelete: vi.fn(),
    onToggleLesson: vi.fn(),
  };
  await act(async () => {
    root.render(
      <FamilySettings
        lang="en"
        profiles={profiles}
        gated={gated}
        onLang={() => {}}
        onFacts={() => {}}
        onLogout={() => {}}
        onClose={() => {}}
        {...fns}
      />,
    );
  });
  return {
    container,
    ...fns,
    done: () => {
      root.unmount();
      container.remove();
    },
  };
}

async function solveGate(container: HTMLElement) {
  const form = container.querySelector("form")!;
  const match = form.querySelector("p")!.textContent!.match(/(\d+)\s*×\s*(\d+)/)!;
  const input = container.querySelector("input")!;
  await act(async () => {
    changeInput(input, String(Number(match[1]) * Number(match[2])));
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
}

describe("FamilySettings", () => {
  it("opens behind the maths gate and lists the lesson groups", async () => {
    const { container, done } = await render([profile(1)], true);
    expect(container.textContent).not.toContain("Kid profiles");
    await solveGate(container);
    expect(container.textContent).toContain("Family settings");
    expect(container.querySelectorAll(".lesson-group-accordion").length).toBe(
      CURRICULUM_GROUPS.length,
    );
    expect(container.textContent).not.toMatch(/age group|junior|senior/i);
    expect(container.textContent).not.toMatch(/save progress|restore|start fresh/i);
    done();
  });

  it("toggles a lesson for the selected profile only", async () => {
    const { container, onToggleLesson, done } = await render(
      [profile(1), profile(2, { disabledLessons: ["ww2"] })],
      false,
    );
    const select = container.querySelector("select")!;
    await act(async () => {
      select.value = "p2";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    const row = Array.from(container.querySelectorAll(".lesson-toggle-row")).find((r) =>
      r.textContent?.includes("World War 2"),
    )!;
    expect(row.className).toContain("lesson-toggle-row-off");
    await act(async () => {
      (row.querySelector("input[type='checkbox']") as HTMLInputElement).click();
    });
    expect(onToggleLesson).toHaveBeenCalledWith("p2", "ww2", true);
    done();
  });

  it("opens the add form with the hint and a default villager when the family has no profile", async () => {
    const { container, onAdd, done } = await render([], false);
    expect(container.textContent).toContain("A real name is not needed");
    const input = container.querySelector<HTMLInputElement>("#profile-nickname")!;
    await act(async () => {
      changeInput(input, "Ava");
      container
        .querySelector("form")!
        .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });
    expect(onAdd).toHaveBeenCalledWith("Ava", "Finn");
    done();
  });

  it("says the limit is reached at 6 profiles and offers no add button", async () => {
    const six = [1, 2, 3, 4, 5, 6].map((n) => profile(n));
    const { container, done } = await render(six, false);
    expect(container.textContent).toContain("6 profiles");
    expect(container.textContent).not.toContain("Add profile");
    done();
  });

  it("asks before deleting", async () => {
    const { container, onDelete, done } = await render([profile(1)], false);
    const del = container.querySelector<HTMLButtonElement>("button[aria-label='Delete Kid1']")!;
    const confirm = vi.spyOn(window, "confirm");
    confirm.mockReturnValueOnce(false);
    await act(async () => del.click());
    expect(onDelete).not.toHaveBeenCalled();
    confirm.mockReturnValueOnce(true);
    await act(async () => del.click());
    expect(onDelete).toHaveBeenCalledWith("p1");
    confirm.mockRestore();
    done();
  });
});
