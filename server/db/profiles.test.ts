// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  cleanNickname,
  isUuid,
  parseAvatar,
  parseLang,
  parseLessonIds,
  parseNickname,
} from "./profiles.js";

describe("cleanNickname", () => {
  // The same cases as cleanName in web/src/progress.ts.
  it.each([
    ["  Mia  ", "Mia"],
    ["Mia   Rose", "Mia Rose"],
    ["a\t\nb", "a b"],
    ["x".repeat(25), "x".repeat(20)],
    ["", ""],
    ["   ", ""],
  ])("cleans %j to %j", (raw, clean) => {
    expect(cleanNickname(raw)).toBe(clean);
  });
});

describe("input checks", () => {
  it("refuses an empty nickname and a value that is not text", () => {
    expect(parseNickname("   ")).toBeUndefined();
    expect(parseNickname(5)).toBeUndefined();
    expect(parseNickname("x".repeat(30))).toBe("x".repeat(20));
  });

  it("accepts an avatar of 1 to 32 characters", () => {
    expect(parseAvatar("Finn")).toBe("Finn");
    expect(parseAvatar("")).toBeUndefined();
    expect(parseAvatar("  ")).toBeUndefined();
    expect(parseAvatar("a".repeat(33))).toBeUndefined();
    expect(parseAvatar(undefined)).toBeUndefined();
  });

  it("accepts only known languages", () => {
    expect(parseLang("pl")).toBe("pl");
    expect(parseLang("fr")).toBeUndefined();
  });

  it("checks lesson id lists", () => {
    expect(parseLessonIds(["a", "b", "a"])).toEqual(["a", "b"]);
    expect(parseLessonIds([])).toEqual([]);
    expect(parseLessonIds(["a".repeat(65)])).toBeUndefined();
    expect(parseLessonIds([""])).toBeUndefined();
    expect(parseLessonIds([1])).toBeUndefined();
    expect(parseLessonIds("a")).toBeUndefined();
    expect(parseLessonIds(Array.from({ length: 200 }, (_, i) => `l${i}`))).toHaveLength(200);
    expect(parseLessonIds(Array.from({ length: 201 }, (_, i) => `l${i}`))).toBeUndefined();
    expect(parseLessonIds(["a".repeat(64)])).toHaveLength(1);
  });

  it("recognises a uuid", () => {
    expect(isUuid("3f2b8c1e-4d5a-4b6c-8d7e-9f0a1b2c3d4e")).toBe(true);
    expect(isUuid("1")).toBe(false);
    expect(isUuid("../family")).toBe(false);
  });
});
