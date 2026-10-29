import { describe, expect, it } from "vitest";
import {
  cleanName,
  earnBadge,
  emptyProgress,
  exportCode,
  importCode,
  lessonState,
  loadProgress,
  nextLessonId,
  saveProgress,
} from "./progress";

const order = ["money", "work", "savings", "loans"];

function memoryStorage() {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
  };
}

describe("next lesson", () => {
  it("starts at the first lesson", () => {
    expect(nextLessonId(emptyProgress(), order)).toBe("money");
  });

  it("moves on after a badge, so the next day starts at the next lesson", () => {
    const p = earnBadge(emptyProgress(), "money");
    expect(nextLessonId(p, order)).toBe("work");
  });

  it("is null when every lesson has a badge", () => {
    const p = order.reduce(earnBadge, emptyProgress());
    expect(nextLessonId(p, order)).toBeNull();
  });
});

describe("lesson state", () => {
  it("marks done, next and locked", () => {
    const p = earnBadge(emptyProgress(), "money");
    expect(lessonState(p, order, "money")).toBe("done");
    expect(lessonState(p, order, "work")).toBe("next");
    expect(lessonState(p, order, "savings")).toBe("locked");
  });

  it("keeps an earned badge once and replays stay done", () => {
    const p = earnBadge(earnBadge(emptyProgress(), "money"), "money");
    expect(p.badges).toEqual(["money"]);
  });
});

describe("storage", () => {
  it("saves and loads on the same device", () => {
    const s = memoryStorage();
    const p = earnBadge({ ...emptyProgress(), name: "Mia", lang: "de" }, "money");
    saveProgress(s, p);
    expect(loadProgress(s)).toEqual(p);
  });

  it("falls back to empty progress for corrupt data", () => {
    const s = { getItem: () => "{not json" };
    expect(loadProgress(s)).toEqual(emptyProgress());
  });

  it("ignores wrong types in stored data", () => {
    const s = { getItem: () => JSON.stringify({ name: 5, lang: "fr", badges: ["a", 3, "a"] }) };
    expect(loadProgress(s)).toEqual({ name: "", lang: "en", muted: false, badges: ["a"] });
  });
});

describe("save and restore code", () => {
  it("round-trips name, language and badges, including umlauts", () => {
    const p = earnBadge(earnBadge({ ...emptyProgress(), name: "Jörg", lang: "de" }, "money"), "savings");
    const restored = importCode(exportCode(p, order), order);
    expect(restored).toEqual({ ...p, muted: false });
  });

  it("rejects a code with a changed character", () => {
    const code = exportCode({ ...emptyProgress(), name: "Mia" }, order);
    const broken = code.replace(/\.(.)/, (_m, c: string) => "." + (c === "A" ? "B" : "A"));
    expect(importCode(broken, order)).toBeNull();
  });

  it("rejects text that is not a code", () => {
    expect(importCode("hello", order)).toBeNull();
    expect(importCode("", order)).toBeNull();
  });
});

describe("names", () => {
  it("trims and limits length", () => {
    expect(cleanName("  Mia   Lou  ")).toBe("Mia Lou");
    expect(cleanName("x".repeat(50))).toHaveLength(20);
  });
});
