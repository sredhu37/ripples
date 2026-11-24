import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MAX_PROFILES, type Profile } from "../api";
import { ProfilePicker } from "./ProfilePicker";

// @ts-expect-error test flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

afterEach(() => {
  document.body.innerHTML = "";
});

function profiles(n: number): Profile[] {
  return Array.from({ length: n }, (_, i) => ({
    id: `p${i}`,
    nickname: `Kid${i}`,
    avatar: "Finn",
    lang: "en",
    muted: false,
    badges: [],
    disabledLessons: [],
  })) as Profile[];
}

async function mount(n: number) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const onAddKid = vi.fn();
  await act(async () => {
    createRoot(container).render(
      <ProfilePicker
        lang="en"
        profiles={profiles(n)}
        onLang={() => {}}
        onPick={() => {}}
        onParents={() => {}}
        onAddKid={onAddKid}
        onLegal={() => {}}
      />,
    );
  });
  return { container, onAddKid };
}

function addTile(container: HTMLElement) {
  return Array.from(container.querySelectorAll("button")).find((b) =>
    b.textContent?.includes("Add a kid"),
  );
}

describe("ProfilePicker", () => {
  it("shows the Add a kid tile below the profile limit and calls onAddKid", async () => {
    const { container, onAddKid } = await mount(MAX_PROFILES - 1);
    const tile = addTile(container)!;
    expect(tile).toBeDefined();
    await act(async () => tile.click());
    expect(onAddKid).toHaveBeenCalledTimes(1);
  });

  it("hides the Add a kid tile at the profile limit", async () => {
    const { container } = await mount(MAX_PROFILES);
    expect(addTile(container)).toBeUndefined();
  });
});
