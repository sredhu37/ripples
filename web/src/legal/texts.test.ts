import { describe, expect, it } from "vitest";
import { IMPRESSUM_LABELS, TEXTS, type LegalPage } from "./texts";

const PAGES = Object.keys(TEXTS) as LegalPage[];
const LANGS = ["en", "de", "pl"] as const;

describe("legal texts", () => {
  it("has every page in EN, DE and PL with the same number of sections", () => {
    for (const page of PAGES) {
      const counts = LANGS.map((l) => TEXTS[page][l].sections.length);
      expect(new Set(counts).size, page).toBe(1);
      for (const l of LANGS) {
        expect(TEXTS[page][l].title, `${page} ${l}`).not.toBe("");
        for (const s of TEXTS[page][l].sections) {
          expect(s.heading).not.toBe("");
          expect(s.paragraphs.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("names the processors and Frankfurt in every language of the privacy policy", () => {
    for (const l of LANGS) {
      const all = TEXTS.privacy[l].sections.flatMap((s) => s.paragraphs).join(" ");
      for (const word of ["Neon", "Resend", "Stripe", "Google Cloud", "Frankfurt"]) {
        expect(all, `${l} ${word}`).toContain(word);
      }
    }
  });

  it("has no em or en dashes", () => {
    const all = JSON.stringify([TEXTS, IMPRESSUM_LABELS]);
    expect(all).not.toMatch(/[–—]/);
  });
});
