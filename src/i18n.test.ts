import { describe, expect, it } from "vitest";
import { t, formatDate, formatNumber, SPEECH_LANG, CURRENCY_SYMBOL, type Lang } from "./i18n";

describe("i18n core", () => {
  const languages: Lang[] = ["en", "de", "pl"];

  it("has speech codes defined for all three languages", () => {
    expect(SPEECH_LANG.en).toBe("en-IN");
    expect(SPEECH_LANG.de).toBe("de-DE");
    expect(SPEECH_LANG.pl).toBe("pl-PL");
  });

  it("has cultural currency symbols for all three languages", () => {
    expect(CURRENCY_SYMBOL.en).toBe("₹");
    expect(CURRENCY_SYMBOL.de).toBe("€");
    expect(CURRENCY_SYMBOL.pl).toBe("zł");
  });

  it("translates key UI labels in Polish, German, and English", () => {
    for (const lang of languages) {
      expect(t(lang, "appName")).not.toBe("");
      expect(t(lang, "parents")).not.toBe("");
      expect(t(lang, "factCards")).not.toBe("");
      expect(t(lang, "back")).not.toBe("");
      expect(t(lang, "next")).not.toBe("");
      expect(t(lang, "ready")).not.toBe("");
      expect(t(lang, "badges")).not.toBe("");
      expect(t(lang, "continue")).not.toBe("");
      expect(t(lang, "restartLesson")).not.toBe("");
    }

    expect(t("pl", "appName")).toBe("Ripples");
    expect(t("pl", "language")).toBe("Język");
    expect(t("pl", "parents")).toBe("Strefa rodzica");
    expect(t("pl", "factCards")).toBe("Karty faktów");
    expect(t("pl", "back")).toBe("Wstecz");
    expect(t("pl", "next")).toBe("Dalej");
  });

  it("interpolates parameters in Polish strings", () => {
    const welcome = t("pl", "welcome", { name: "Ania" });
    expect(welcome).toContain("Ania");

    const gate = t("pl", "gateQuestion", { a: 7, b: 8 });
    expect(gate).toBe("Dla rodziców: ile to jest 7 × 8?");
  });

  it("formats numbers properly for Polish locale", () => {
    const formattedPl = formatNumber(10000, "pl");
    // Polish standard grouping uses space/non-breaking space
    expect(formattedPl.replace(/\s/g, " ")).toBe("10 000");

    const formattedDe = formatNumber(10000, "de");
    expect(formattedDe).toBe("10.000");

    const formattedEn = formatNumber(10000, "en");
    expect(formattedEn).toBe("10,000");
  });

  it("formats dates properly for Polish locale", () => {
    const date = new Date(2026, 10, 5); // Nov 5, 2026
    const formattedPl = formatDate(date, "pl");
    expect(formattedPl).toContain("2026");
  });
});
