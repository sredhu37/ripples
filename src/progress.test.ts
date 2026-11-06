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
  setAgeGroup,
  toggleLesson,
  type Progress,
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

  it("saves and loads Polish progress", () => {
    const s = memoryStorage();
    const p = earnBadge({ ...emptyProgress(), name: "Stanisław", lang: "pl" }, "money");
    saveProgress(s, p);
    expect(loadProgress(s)).toEqual(p);
  });

  it("falls back to empty progress for corrupt data", () => {
    const s = { getItem: () => "{not json" };
    expect(loadProgress(s)).toEqual(emptyProgress());
  });

  it("ignores wrong types in stored data", () => {
    const s = { getItem: () => JSON.stringify({ name: 5, lang: "fr", badges: ["a", 3, "a"] }) };
    expect(loadProgress(s)).toEqual({ name: "", lang: "en", muted: false, badges: ["a"], disabledLessons: [], ageGroup: "junior" });
  });
});

describe("save and restore code", () => {
  it("round-trips name, language and badges, including umlauts", () => {
    const p = earnBadge(earnBadge({ ...emptyProgress(), name: "Jörg", lang: "de" }, "money"), "savings");
    const restored = importCode(exportCode(p, order), order);
    expect(restored).toEqual({ ...p, muted: false });
  });

  it("round-trips Polish progress with diacritics", () => {
    const p = earnBadge(earnBadge({ ...emptyProgress(), name: "Zosia Ł.", lang: "pl" }, "money"), "work");
    const restored = importCode(exportCode(p, order), order);
    expect(restored).toEqual({ ...p, muted: false });
  });

  it("round-trips when badges include lessons beyond index 31", () => {
    const longOrder = Array.from({ length: 45 }, (_, i) => `lesson_${i}`);
    let p: Progress = { ...emptyProgress(), name: "Akbar", lang: "en" };
    p = earnBadge(p, "lesson_0");
    p = earnBadge(p, "lesson_32");
    p = earnBadge(p, "lesson_41");
    const code = exportCode(p, longOrder);
    const restored = importCode(code, longOrder);
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

describe("disabled lessons", () => {
  it("defaults to empty disabled lessons list", () => {
    expect(emptyProgress().disabledLessons).toEqual([]);
  });

  it("toggles lesson disabled and enabled states cleanly", () => {
    let p = emptyProgress();
    p = toggleLesson(p, "work", false);
    expect(p.disabledLessons).toEqual(["work"]);

    // Disabling again is idempotent
    p = toggleLesson(p, "work", false);
    expect(p.disabledLessons).toEqual(["work"]);

    // Disabling another lesson appends
    p = toggleLesson(p, "loans", false);
    expect(p.disabledLessons).toEqual(["work", "loans"]);

    // Enabling removes it
    p = toggleLesson(p, "work", true);
    expect(p.disabledLessons).toEqual(["loans"]);

    // Enabling a lesson not disabled is a no-op
    p = toggleLesson(p, "money", true);
    expect(p.disabledLessons).toEqual(["loans"]);
  });

  it("skips disabled lessons when finding nextLessonId", () => {
    let p = emptyProgress();
    // Initially first lesson is money
    expect(nextLessonId(p, order)).toBe("money");

    // Parent disables money -> next lesson jumps to work
    p = toggleLesson(p, "money", false);
    expect(nextLessonId(p, order)).toBe("work");

    // Child completes work -> next lesson jumps to savings
    p = earnBadge(p, "work");
    expect(nextLessonId(p, order)).toBe("savings");

    // Parent also disables savings -> next lesson jumps to loans
    p = toggleLesson(p, "savings", false);
    expect(nextLessonId(p, order)).toBe("loans");
  });

  it("marks disabled lessons as locked and does not assign them next status", () => {
    let p = emptyProgress();
    p = toggleLesson(p, "money", false);
    expect(lessonState(p, order, "money")).toBe("locked");
    expect(lessonState(p, order, "work")).toBe("next");
    expect(lessonState(p, order, "savings")).toBe("locked");
  });

  it("preserves earned badge in progress even when lesson is disabled", () => {
    let p = emptyProgress();
    p = earnBadge(p, "money");
    expect(p.badges).toContain("money");

    // Disable money
    p = toggleLesson(p, "money", false);
    expect(p.badges).toContain("money");

    // Re-enable money -> badge remains intact
    p = toggleLesson(p, "money", true);
    expect(p.badges).toContain("money");
    expect(lessonState(p, order, "money")).toBe("done");
  });

  it("saves and loads disabled lessons in storage", () => {
    const s = memoryStorage();
    const p = toggleLesson(emptyProgress(), "savings", false);
    saveProgress(s, p);
    expect(loadProgress(s).disabledLessons).toEqual(["savings"]);
  });

  it("round-trips disabled lessons in exportCode and importCode", () => {
    let p: Progress = { ...emptyProgress(), name: "Lukas", lang: "de" };
    p = toggleLesson(p, "work", false);
    p = toggleLesson(p, "loans", false);
    p = earnBadge(p, "money");

    const code = exportCode(p, order);
    const restored = importCode(code, order);
    expect(restored).toEqual({ ...p, muted: false });
    expect(restored?.disabledLessons).toEqual(["work", "loans"]);
  });

  it("imports legacy save codes without disabledLessons field as empty array", () => {
    // Generate code from progress without disabled lessons
    const p: Progress = { ...emptyProgress(), name: "Maya", lang: "en", badges: ["money"] };
    const code = exportCode(p, order);
    const restored = importCode(code, order);
    expect(restored?.disabledLessons).toEqual([]);
    expect(restored?.ageGroup).toBe("junior");
  });

  it("updates and round-trips senior ageGroup in progress and save code", () => {
    let p = emptyProgress();
    expect(p.ageGroup).toBe("junior");
    p = setAgeGroup(p, "senior");
    expect(p.ageGroup).toBe("senior");

    const code = exportCode(p, order);
    const restored = importCode(code, order);
    expect(restored?.ageGroup).toBe("senior");
  });
});
