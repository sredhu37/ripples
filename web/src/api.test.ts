import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ApiError,
  changeProfile,
  createProfile,
  fetchFamily,
  removeProfile,
  saveBadge,
} from "./api";

const profile = {
  id: "p1",
  nickname: "Ava",
  avatar: "Finn",
  lang: "en",
  muted: false,
  badges: [],
  disabledLessons: [],
};

function mockFetch(impl: () => Promise<unknown>) {
  const fn = vi.fn(impl);
  vi.stubGlobal("fetch", fn);
  return fn;
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("api client", () => {
  it("maps a network failure to ApiError(0)", async () => {
    mockFetch(() => Promise.reject(new TypeError("offline")));
    await expect(fetchFamily()).rejects.toMatchObject({ status: 0 });
  });

  it("maps a non-ok answer to ApiError with the HTTP status", async () => {
    mockFetch(() => Promise.resolve(new Response("{}", { status: 401 })));
    const err = await fetchFamily().catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).status).toBe(401);
  });

  it("maps bad JSON to ApiError(0)", async () => {
    mockFetch(() => Promise.resolve(new Response("<html>", { status: 200 })));
    await expect(fetchFamily()).rejects.toMatchObject({ status: 0 });
    await expect(createProfile("Ava", "Finn")).rejects.toMatchObject({ status: 0 });
  });

  it("fetchFamily sends GET /api/family and returns the profiles", async () => {
    const fn = mockFetch(() => Promise.resolve(jsonResponse({ profiles: [profile] })));
    expect(await fetchFamily()).toEqual([profile]);
    const [url, init] = fn.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/family");
    expect(init.method).toBe("GET");
    expect(init.body).toBeUndefined();
  });

  it("createProfile sends POST /api/profiles with nickname and avatar", async () => {
    const fn = mockFetch(() => Promise.resolve(jsonResponse(profile, 201)));
    expect(await createProfile("Ava", "Finn")).toEqual(profile);
    const [url, init] = fn.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/profiles");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string)).toEqual({ nickname: "Ava", avatar: "Finn" });
  });

  it("changeProfile sends PATCH with the changes", async () => {
    const fn = mockFetch(() => Promise.resolve(new Response(null, { status: 204 })));
    await changeProfile("p1", { muted: true });
    const [url, init] = fn.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/profiles/p1");
    expect(init.method).toBe("PATCH");
    expect(JSON.parse(init.body as string)).toEqual({ muted: true });
  });

  it("saveBadge sends POST to the badges route", async () => {
    const fn = mockFetch(() => Promise.resolve(new Response(null, { status: 204 })));
    await saveBadge("p1", "money");
    const [url, init] = fn.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/profiles/p1/badges");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string)).toEqual({ lessonId: "money" });
  });

  it("removeProfile sends DELETE without a body", async () => {
    const fn = mockFetch(() => Promise.resolve(new Response(null, { status: 204 })));
    await removeProfile("p1");
    const [url, init] = fn.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/profiles/p1");
    expect(init.method).toBe("DELETE");
    expect(init.body).toBeUndefined();
  });
});
