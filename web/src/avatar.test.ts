import { describe, expect, it } from "vitest";
import { VILLAGERS, defaultAvatar, villagerOf } from "./avatar";

describe("villagerOf", () => {
  it("returns a known villager", () => {
    expect(villagerOf("Bea")).toBe("Bea");
  });

  it("falls back to the first villager for a value it cannot draw", () => {
    expect(villagerOf("Dragon")).toBe(VILLAGERS[0]);
    expect(villagerOf("")).toBe(VILLAGERS[0]);
  });
});

describe("defaultAvatar", () => {
  it("is the first villager for an empty family", () => {
    expect(defaultAvatar([])).toBe(VILLAGERS[0]);
  });

  it("skips villagers that profiles already use", () => {
    expect(defaultAvatar([{ avatar: VILLAGERS[0] }, { avatar: VILLAGERS[2] }])).toBe(VILLAGERS[1]);
  });

  it("always finds a free villager with 6 profiles", () => {
    const six = VILLAGERS.slice(0, 6).map((avatar) => ({ avatar }));
    expect(defaultAvatar(six)).toBe(VILLAGERS[6]);
  });
});
