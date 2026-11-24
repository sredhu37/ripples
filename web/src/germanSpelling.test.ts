import { describe, expect, it } from "vitest";

// Raw source of every lesson and timeline file. German text sits in plain arrays and
// ternaries as well as `de:` keys, so the source is scanned, not the lesson objects.
const sources = {
  ...import.meta.glob<string>(["./content/*.{ts,tsx}", "!./content/*.test.*"], {
    query: "?raw",
    import: "default",
    eager: true,
  }),
  ...import.meta.glob<string>(["./timeline/*.ts", "!./timeline/*.test.*"], {
    query: "?raw",
    import: "default",
    eager: true,
  }),
};

// Umlauts written as ae/oe/ue and ß written as ss. None of these occur in English or Polish.
const TRANSLITERATIONS = [
  "fuer",
  "ueber",
  "zurueck",
  "koenn",
  "koenig",
  "moecht",
  "waehl",
  "waehrend",
  "naechst",
  "loes",
  "pruef",
  "fuehr",
  "gruend",
  "muenz",
  "staedt",
  "laend",
  "groess",
  "muess",
  "noetig",
  "heisst",
  "schliess",
  "strasse",
];

describe("German text in lessons and the timeline", () => {
  it("finds the source files", () => {
    expect(Object.keys(sources).length).toBeGreaterThan(50);
  });

  it("spells umlauts and ß, not ae/oe/ue/ss", () => {
    const found: string[] = [];
    for (const [file, src] of Object.entries(sources)) {
      const text = src
        .replace(/https?:\/\/\S+/g, "")
        .toLowerCase()
        .replace(/blueberr/g, "");
      for (const bad of TRANSLITERATIONS) {
        if (text.includes(bad)) found.push(`${file}: ${bad}`);
      }
    }
    expect(found).toEqual([]);
  });
});
