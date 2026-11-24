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

async function render(
  profiles: Profile[],
  gated: boolean,
  activeId: string | null = null,
  extra: { addKid?: boolean; saved?: boolean } = {},
) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  const fns = {
    onAdd: vi.fn(() => Promise.resolve(extra.saved ?? true)),
    onAdded: vi.fn(),
    onChange: vi.fn(),
    onDelete: vi.fn(),
    onToggleLesson: vi.fn(),
  };
  await act(async () => {
    root.render(
      <FamilySettings
        lang="en"
        profiles={profiles}
        activeId={activeId}
        gated={gated}
        addKid={extra.addKid}
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
  it("opens behind the maths gate and shows the kid list without lessons or Delete", async () => {
    const { container, done } = await render([profile(1)], true);
    expect(container.textContent).not.toContain("Kid profiles");
    await solveGate(container);
    expect(container.textContent).toContain("Family settings");
    expect(container.querySelector(".lesson-group-accordion")).toBeNull();
    expect(container.querySelector("select")).toBeNull();
    expect(container.querySelector(".btn-danger")).toBeNull();
    expect(container.textContent).not.toContain("Delete");
    done();
  });

  it("puts Log out in its own Account section, away from Close", async () => {
    const { container, done } = await render([profile(1)], false);
    const account = container.querySelector(".account-section")!;
    expect(account.textContent).toContain("Account");
    expect(account.textContent).toContain("Log out");
    expect(account.textContent).not.toContain("Close");
    done();
  });

  it("opens a kid's detail with their lesson groups", async () => {
    const { container, done } = await render([profile(1), profile(2)], false);
    await act(async () => {
      container.querySelector<HTMLButtonElement>("button[aria-label='Edit Kid2']")!.click();
    });
    expect(container.textContent).toContain("Lessons for Kid2");
    expect(container.querySelectorAll(".lesson-group-accordion").length).toBe(
      CURRICULUM_GROUPS.length,
    );
    expect(container.textContent).not.toMatch(/age group|junior|senior/i);
    expect(container.textContent).not.toMatch(/save progress|restore|start fresh/i);
    await act(async () => {
      Array.from(container.querySelectorAll("button"))
        .find((b) => b.textContent === "Back to kids")!
        .click();
    });
    expect(container.querySelector(".lesson-group-accordion")).toBeNull();
    done();
  });

  it("toggles a lesson for the open kid only", async () => {
    const { container, onToggleLesson, done } = await render(
      [profile(1), profile(2, { disabledLessons: ["ww2"] })],
      false,
      "p2",
    );
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

  it("starts on the detail of the kid whose trail opened it", async () => {
    const { container, onToggleLesson, done } = await render([profile(1), profile(2)], false, "p2");
    expect(container.textContent).toContain("Lessons for Kid2");
    await act(async () => {
      container.querySelector<HTMLInputElement>(".lesson-toggle-row input")!.click();
    });
    expect(onToggleLesson).toHaveBeenCalledWith("p2", CURRICULUM_GROUPS[0].lessonIds[0], false);
    done();
  });

  it("starts on the kid list when no kid is active", async () => {
    const { container, done } = await render([profile(1), profile(2)], false);
    expect(container.textContent).toContain("Kid profiles");
    expect(container.textContent).not.toContain("Lessons for");
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

  async function submitNickname(container: HTMLElement, name: string) {
    const input = container.querySelector<HTMLInputElement>("#profile-nickname")!;
    await act(async () => {
      changeInput(input, name);
      container
        .querySelector("form")!
        .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });
  }

  it("addKid opens the add form with the nickname focused", async () => {
    const { container, done } = await render([profile(1)], false, null, { addKid: true });
    const input = container.querySelector<HTMLInputElement>("#profile-nickname")!;
    expect(input).not.toBeNull();
    expect(document.activeElement).toBe(input);
    done();
  });

  it("addKid calls onAdded after a successful save", async () => {
    const { container, onAdd, onAdded, done } = await render([profile(1)], false, null, {
      addKid: true,
    });
    await submitNickname(container, "Ava");
    expect(onAdd).toHaveBeenCalled();
    expect(onAdded).toHaveBeenCalledTimes(1);
    done();
  });

  it("addKid does not call onAdded when the save fails", async () => {
    const { container, onAdd, onAdded, done } = await render([profile(1)], false, null, {
      addKid: true,
      saved: false,
    });
    await submitNickname(container, "Ava");
    expect(onAdd).toHaveBeenCalled();
    expect(onAdded).not.toHaveBeenCalled();
    done();
  });

  it("does not call onAdded for a normal add", async () => {
    const { container, onAdded, done } = await render([profile(1)], false);
    await act(async () => {
      Array.from(container.querySelectorAll("button"))
        .find((b) => b.textContent === "Add profile")!
        .click();
    });
    await submitNickname(container, "Ava");
    expect(onAdded).not.toHaveBeenCalled();
    done();
  });

  it("says the limit is reached at 6 profiles and offers no add button", async () => {
    const six = [1, 2, 3, 4, 5, 6].map((n) => profile(n));
    const { container, done } = await render(six, false);
    expect(container.textContent).toContain("6 profiles");
    expect(container.textContent).not.toContain("Add profile");
    done();
  });

  it("asks in the app before deleting, never with a native dialog", async () => {
    const { container, onDelete, done } = await render([profile(1)], false, "p1");
    const confirm = vi.spyOn(window, "confirm");
    const button = (label: string) =>
      Array.from(container.querySelectorAll("button")).find((b) => b.textContent === label)!;
    await act(async () => button("Delete Kid1").click());
    const dialog = container.querySelector("[role='dialog']")!;
    expect(dialog.textContent).toContain("Delete Kid1 and all their badges?");
    await act(async () => button("Cancel").click());
    expect(container.querySelector("[role='dialog']")).toBeNull();
    expect(onDelete).not.toHaveBeenCalled();
    await act(async () => button("Delete Kid1").click());
    await act(async () => {
      container
        .querySelector("[role='dialog']")!
        .dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    expect(container.querySelector("[role='dialog']")).toBeNull();
    await act(async () => button("Delete Kid1").click());
    await act(async () => button("Delete").click());
    expect(onDelete).toHaveBeenCalledWith("p1");
    expect(confirm).not.toHaveBeenCalled();
    confirm.mockRestore();
    done();
  });
});
