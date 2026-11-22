import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchFeatures, isFeatureOn, pausedLessons } from "./features";

const IDS = ["money", "loans"];

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("pausedLessons", () => {
  it("pauses a lesson with show-<id>: false", () => {
    expect([...pausedLessons({ "show-loans": false }, IDS)]).toEqual(["loans"]);
  });

  it("pauses nothing for true, a missing flag or other names", () => {
    expect(pausedLessons({ "show-loans": true, "new-badge-shelf": false }, IDS).size).toBe(0);
    expect(pausedLessons({}, IDS).size).toBe(0);
  });

  it("ignores an unknown id and warns once", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(pausedLessons({ "show-lones": false }, IDS).size).toBe(0);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain("show-lones");
  });
});

describe("isFeatureOn", () => {
  it("is on only for true; a missing switch is off", () => {
    expect(isFeatureOn({ a: true, b: false }, "a")).toBe(true);
    expect(isFeatureOn({ a: true, b: false }, "b")).toBe(false);
    expect(isFeatureOn({}, "a")).toBe(false);
  });
});

describe("fetchFeatures", () => {
  it("returns the flags the API sends", async () => {
    vi.stubGlobal("fetch", async () => new Response(JSON.stringify({ "show-loans": false })));
    expect(await fetchFeatures()).toEqual({ "show-loans": false });
  });

  it("returns {} when the request fails or answers an error", async () => {
    vi.stubGlobal("fetch", async () => {
      throw new Error("no api");
    });
    expect(await fetchFeatures()).toEqual({});
    vi.stubGlobal("fetch", async () => new Response("nope", { status: 404 }));
    expect(await fetchFeatures()).toEqual({});
  });
});
