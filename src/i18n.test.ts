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

  it("translates every single UI key in English, German, and Polish with non-empty values", () => {
    const keys = [
      "appName", "tagline", "askName", "namePlaceholder", "nameGo", "welcome",
      "welcomeBack", "continue", "nextUp", "comingSoon", "locked", "badges",
      "back", "readAloud", "mute", "unmute", "language", "parents",
      "lessonBuilding", "allDone", "gateQuestion", "gateWrong", "gateGo",
      "saveTitle", "saveHelp", "copy", "copied", "restoreTitle", "restoreHelp",
      "restoreGo", "restoreBad", "restoreOk", "resetTitle", "resetHelp",
      "resetGo", "resetSure", "close", "next", "prev", "ready", "check",
      "tryAgain", "rightLine", "getBadge", "badgeEarned", "badgeAgain",
      "askDad", "toTrail", "allLessons", "restartLesson", "factCards",
      "factCardsHelp", "claims", "simplified", "noLessons",
      "lessonSelectionTitle", "lessonSelectionHelp", "lessonEnabled", "lessonDisabled",
      "ageGroupTitle", "ageGroupHelp", "ageJunior", "ageSenior", "ageJuniorDesc", "ageSeniorDesc",
    ] as const;

    for (const key of keys) {
      for (const lang of languages) {
        const val = t(lang, key);
        expect(val.trim(), `key ${key} in ${lang}`).not.toBe("");
      }
      if (key !== "appName") {
        expect(t("de", key), `key ${key} de differs`).not.toBe(t("en", key));
        expect(t("pl", key), `key ${key} pl differs`).not.toBe(t("en", key));
      }
    }
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
