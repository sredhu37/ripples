import { describe, expect, it } from "vitest";
import { loadDeviceLang, saveDeviceLang } from "./deviceLang";

function fakeStorage(initial: Record<string, string> = {}) {
  const data = { ...initial };
  return {
    data,
    getItem: (k: string) => data[k] ?? null,
    setItem: (k: string, v: string) => {
      data[k] = v;
    },
  };
}

describe("device language", () => {
  it("defaults to English", () => {
    expect(loadDeviceLang(fakeStorage())).toBe("en");
    expect(loadDeviceLang(fakeStorage({ "ripples.lang": "xx" }))).toBe("en");
  });

  it("round-trips through the ripples.lang key", () => {
    const s = fakeStorage();
    saveDeviceLang(s, "pl");
    expect(s.data["ripples.lang"]).toBe("pl");
    expect(loadDeviceLang(s)).toBe("pl");
  });
});
