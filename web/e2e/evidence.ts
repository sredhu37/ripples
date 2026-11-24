import fs from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

/** Pause before each screenshot so a human can follow the video. */
export const PAUSE_MS = 800;

export type Lang = "en" | "de" | "pl";

/**
 * Screenshot recorder for one test. Each call to the returned function waits
 * PAUSE_MS and saves test-results/<name>/step-<k>.png. It also writes
 * video.txt with the path of the test's video, so CI can find it.
 */
export async function steps(page: Page, name: string): Promise<() => Promise<void>> {
  const dir = path.join(test.info().project.outputDir, name);
  fs.mkdirSync(dir, { recursive: true });
  // Playwright moves the video here when the test ends.
  fs.writeFileSync(path.join(dir, "video.txt"), path.join(test.info().outputDir, "video.webm"));
  let k = 0;
  return async () => {
    await page.waitForTimeout(PAUSE_MS);
    k += 1;
    await page.screenshot({ path: path.join(dir, `step-${k}.png`) });
  };
}

/** The code the fake API accepts at login. */
export const GOOD_CODE = "123456";

export interface FakeKid {
  /** Default "Ava". */
  nickname?: string;
  /** A villager name. Default: the first one no other kid uses. */
  avatar?: string;
  lang?: Lang;
  /** Default true, so a spec never plays sound. */
  muted?: boolean;
  badges?: string[];
  disabledLessons?: string[];
}

export interface FakeProfile {
  id: string;
  nickname: string;
  avatar: string;
  lang: Lang;
  muted: boolean;
  badges: string[];
  disabledLessons: string[];
}

/** One recorded call to /api/family or /api/profiles. */
export interface FakeCall {
  method: string;
  path: string;
  body: unknown;
}

/** The state of the fake API. It lives in memory, so a spec can add a profile and see it. */
export interface FakeFamily {
  loggedIn: boolean;
  profiles: FakeProfile[];
  /** Writes: calls other than GET. */
  writes: FakeCall[];
  /** True: every write answers 500. */
  failWrites: boolean;
  /** True: every /api/family and /api/profiles call answers 401. */
  sessionExpired: boolean;
}

const VILLAGERS = [
  "Finn",
  "Bea",
  "Sam",
  "Pim",
  "Moss",
  "Pip",
  "Clara",
  "Luca",
  "Leo",
  "Maya",
  "Mira",
];

/**
 * Answers /api/auth/*, /api/family and /api/profiles from memory, like the real API
 * (shapes from server/apiTypes.ts). The preview server has no API. Starts logged in
 * with one kid, Ava, unless told otherwise. The real flow is tested in server/*.test.ts.
 */
export async function fakeFamily(
  page: Page,
  options: { loggedIn?: boolean; kids?: FakeKid[] } = {},
): Promise<FakeFamily> {
  const state: FakeFamily = {
    loggedIn: options.loggedIn ?? true,
    profiles: [],
    writes: [],
    failWrites: false,
    sessionExpired: false,
  };
  let nextId = 1;
  const addKid = (kid: FakeKid) => {
    const used = state.profiles.map((p) => p.avatar);
    state.profiles.push({
      id: `00000000-0000-4000-8000-${String(nextId++).padStart(12, "0")}`,
      nickname: kid.nickname ?? "Ava",
      avatar: kid.avatar ?? VILLAGERS.find((v) => !used.includes(v)) ?? VILLAGERS[0],
      lang: kid.lang ?? "en",
      muted: kid.muted ?? true,
      badges: kid.badges ?? [],
      disabledLessons: kid.disabledLessons ?? [],
    });
  };
  for (const kid of options.kids ?? [{}]) addKid(kid);

  await page.route("**/api/auth/**", async (route) => {
    const url = route.request().url();
    const json = (status: number, body: unknown) =>
      route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
    if (url.endsWith("/get-session")) {
      return json(200, state.loggedIn ? { user: { email: "mum@example.com" } } : null);
    }
    if (url.endsWith("/send-verification-otp")) return json(200, { success: true });
    if (url.endsWith("/sign-in/email-otp")) {
      const { otp } = route.request().postDataJSON() as { otp: string };
      if (otp !== GOOD_CODE) return json(400, { code: "INVALID_OTP", message: "Invalid OTP" });
      state.loggedIn = true;
      return json(200, { token: "t", user: { email: "mum@example.com" } });
    }
    if (url.endsWith("/sign-out")) {
      state.loggedIn = false;
      return json(200, { success: true });
    }
    return json(404, {});
  });

  await page.route(/\/api\/(family|profiles)/, async (route) => {
    const request = route.request();
    const method = request.method();
    const path = new URL(request.url()).pathname;
    const json = (status: number, body: unknown) =>
      route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
    if (!state.loggedIn || state.sessionExpired) return json(401, { error: "unauthorized" });
    if (method === "GET" && path === "/api/family") return json(200, { profiles: state.profiles });

    const body: unknown = request.postDataJSON();
    state.writes.push({ method, path, body });
    if (state.failWrites) return json(500, { error: "failed" });
    const b = (body ?? {}) as Record<string, unknown>;

    if (method === "POST" && path === "/api/profiles") {
      if (state.profiles.length >= 6) return json(409, { error: "profile_limit" });
      addKid({ nickname: b.nickname as string, avatar: b.avatar as string, muted: false });
      return json(201, state.profiles[state.profiles.length - 1]);
    }
    const [, , , id, rest] = path.split("/");
    const profile = state.profiles.find((p) => p.id === id);
    if (!profile) return json(404, { error: "not_found" });
    if (method === "POST" && rest === "badges") {
      const lessonId = b.lessonId as string;
      if (!profile.badges.includes(lessonId)) profile.badges.push(lessonId);
      return json(200, profile);
    }
    if (method === "PATCH") {
      Object.assign(profile, b);
      return json(200, profile);
    }
    if (method === "DELETE") {
      state.profiles = state.profiles.filter((p) => p !== profile);
      return route.fulfill({ status: 204 });
    }
    return json(404, { error: "not_found" });
  });

  return state;
}

/** Opens the app and taps a kid on the picker. */
export async function openTrail(page: Page, nickname = "Ava") {
  await page.goto("./");
  await page.getByRole("button", { name: nickname, exact: true }).click();
}

/** Labels from src/i18n.ts that the specs click or check. */
export const LABEL = {
  parents: { en: "For parents", de: "Für Eltern", pl: "Strefa rodzica" },
  gateGo: { en: "Open", de: "Öffnen", pl: "Otwórz" },
  next: { en: "Next", de: "Weiter", pl: "Dalej" },
  factCards: { en: "Fact cards", de: "Fakten-Karten", pl: "Karty faktów" },
  worldTimeline: { en: "World Timeline", de: "Weltzeitleiste", pl: "Oś czasu świata" },
} as const;

/** Opens the parent gate from the map and answers the maths question. */
export async function passParentGate(page: Page, step: () => Promise<void>, lang: Lang = "en") {
  await page.getByRole("button", { name: LABEL.parents[lang] }).click();
  const question = page.locator("form.panel p").first();
  await expect(question).toContainText("×");
  const [a, b] = ((await question.textContent()) ?? "").match(/\d+/g)!.map(Number);
  const input = page.getByRole("textbox");
  await input.fill(String(a * b + 1));
  await page.getByRole("button", { name: LABEL.gateGo[lang] }).click();
  await expect(page.getByRole("alert")).toBeVisible();
  await step();
  await input.fill(String(a * b));
  await step();
  await page.getByRole("button", { name: LABEL.gateGo[lang] }).click();
}
