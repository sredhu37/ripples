// @vitest-environment node
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Profile } from "./apiTypes.js";
import { createApp } from "./app.js";
import { createAuth } from "./auth.js";
import { ensureFamily } from "./db/family.js";
import { createTestDatabase, type TestDatabase } from "./db/testDb.js";

const adminUrl = process.env.DATABASE_URL;

// Real Postgres, a throwaway database per run. CI's `ci` job has a Postgres service.
describe.skipIf(!adminUrl)("profile routes on a real Postgres", () => {
  let testDb: TestDatabase;
  let app: ReturnType<typeof createApp>;
  let lastCode = "";
  let ip = 0;
  let pool: ReturnType<TestDatabase["pool"]>;

  beforeAll(async () => {
    testDb = await createTestDatabase(adminUrl!);
    await testDb.migrate();
    pool = testDb.pool();
    const auth = createAuth({
      database: pool,
      mailer: {
        sendLoginCode: async (_email, code) => {
          lastCode = code;
        },
      },
      secret: "test-secret-test-secret-test-secret-123",
      baseUrl: "http://localhost:8080",
      production: false,
      onLogin: (userId) => ensureFamily(pool, userId),
    });
    app = createApp({ db: pool, auth });
  });

  afterAll(() => testDb.drop());

  const authPost = (path: string, body: unknown) => {
    ip += 1;
    return app.request(`/api/auth/${path}`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": `10.9.${ip}.1` },
      body: JSON.stringify(body),
    });
  };

  /** Logs in and returns the session cookie. Each call is a new device. */
  async function login(email: string): Promise<string> {
    await authPost("email-otp/send-verification-otp", { email, type: "sign-in" });
    const res = await authPost("sign-in/email-otp", { email, otp: lastCode });
    expect(res.status).toBe(200);
    return (res.headers.get("set-cookie") ?? "").split(";")[0];
  }

  const call = (cookie: string | undefined, method: string, path: string, body?: unknown) =>
    app.request(`/api${path}`, {
      method,
      headers: { ...(cookie ? { cookie } : {}), "content-type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  const profilesOf = async (cookie: string) =>
    ((await (await call(cookie, "GET", "/family")).json()) as { profiles: Profile[] }).profiles;
  const add = async (cookie: string, nickname: string, avatar = "Finn") =>
    (await (await call(cookie, "POST", "/profiles", { nickname, avatar })).json()) as Profile;

  it("answers 401 on every route without a session", async () => {
    const id = "3f2b8c1e-4d5a-4b6c-8d7e-9f0a1b2c3d4e";
    const routes: [string, string, unknown?][] = [
      ["GET", "/family"],
      ["POST", "/profiles", { nickname: "A", avatar: "Finn" }],
      ["PATCH", `/profiles/${id}`, { muted: true }],
      ["POST", `/profiles/${id}/badges`, { lessonId: "x" }],
      ["DELETE", `/profiles/${id}`],
    ];
    for (const [method, path, body] of routes) {
      const res = await call(undefined, method, path, body);
      expect(res.status, `${method} ${path}`).toBe(401);
      expect(await res.json()).toEqual({ error: "unauthorized" });
    }
  });

  it("keeps the JSON 404 for an unknown API path", async () => {
    const res = await call(undefined, "GET", "/nope");
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "not_found" });
  });

  it("adds, lists, changes and deletes a profile", async () => {
    const cookie = await login("crud@example.com");
    expect(await profilesOf(cookie)).toEqual([]);

    const res = await call(cookie, "POST", "/profiles", {
      nickname: "  Mia   Rose ",
      avatar: "Finn",
    });
    expect(res.status).toBe(201);
    const mia = (await res.json()) as Profile;
    expect(mia).toEqual({
      id: mia.id,
      nickname: "Mia Rose",
      avatar: "Finn",
      lang: "en",
      muted: false,
      badges: [],
      disabledLessons: [],
    });

    const patched = await call(cookie, "PATCH", `/profiles/${mia.id}`, {
      nickname: "x".repeat(30),
      avatar: "Otto",
      lang: "de",
      muted: true,
      disabledLessons: ["a", "b"],
    });
    expect(patched.status).toBe(200);
    expect(await patched.json()).toMatchObject({
      nickname: "x".repeat(20),
      avatar: "Otto",
      lang: "de",
      muted: true,
      disabledLessons: ["a", "b"],
    });
    expect(await profilesOf(cookie)).toHaveLength(1);

    expect((await call(cookie, "DELETE", `/profiles/${mia.id}`)).status).toBe(204);
    expect(await profilesOf(cookie)).toEqual([]);
    expect((await call(cookie, "DELETE", `/profiles/${mia.id}`)).status).toBe(404);
  });

  it("lists profiles oldest first", async () => {
    const cookie = await login("order@example.com");
    for (const name of ["One", "Two", "Three"]) await add(cookie, name);
    expect((await profilesOf(cookie)).map((p) => p.nickname)).toEqual(["One", "Two", "Three"]);
  });

  it("shows two sessions of one family the same profiles and badges", async () => {
    const first = await login("twice@example.com");
    const second = await login("twice@example.com");
    expect(second).not.toBe(first);
    const kid = await add(first, "Ola");
    await call(first, "POST", `/profiles/${kid.id}/badges`, { lessonId: "money" });
    expect(await profilesOf(second)).toEqual(await profilesOf(first));
    expect((await profilesOf(second))[0].badges).toEqual(["money"]);
  });

  it("keeps badges and settings of two profiles apart", async () => {
    const cookie = await login("apart@example.com");
    const a = await add(cookie, "A");
    const b = await add(cookie, "B");
    await call(cookie, "POST", `/profiles/${a.id}/badges`, { lessonId: "l1" });
    await call(cookie, "PATCH", `/profiles/${a.id}`, { muted: true, lang: "pl" });
    const [pa, pb] = await profilesOf(cookie);
    expect(pa).toMatchObject({ badges: ["l1"], muted: true, lang: "pl" });
    expect(pb).toMatchObject({ id: b.id, badges: [], muted: false, lang: "en" });
  });

  it("gives a second family 404 for the first family's profile and changes nothing", async () => {
    const owner = await login("owner@example.com");
    const other = await login("other@example.com");
    const kid = await add(owner, "Mine");
    const before = await profilesOf(owner);

    const attempts = [
      call(other, "PATCH", `/profiles/${kid.id}`, { nickname: "Hacked" }),
      call(other, "POST", `/profiles/${kid.id}/badges`, { lessonId: "x" }),
      call(other, "DELETE", `/profiles/${kid.id}`),
    ];
    for (const res of await Promise.all(attempts)) {
      expect(res.status).toBe(404);
      expect(await res.json()).toEqual({ error: "not_found" });
    }
    expect(await profilesOf(owner)).toEqual(before);
    expect(await profilesOf(other)).toEqual([]);
  });

  it("answers 404 for an id that is not a uuid or does not exist", async () => {
    const cookie = await login("ids@example.com");
    for (const id of ["1", "nope", "3f2b8c1e-4d5a-4b6c-8d7e-9f0a1b2c3d4e"]) {
      expect((await call(cookie, "PATCH", `/profiles/${id}`, { muted: true })).status).toBe(404);
      expect((await call(cookie, "DELETE", `/profiles/${id}`)).status).toBe(404);
    }
  });

  it("adds a badge once and keeps the order earned", async () => {
    const cookie = await login("badge@example.com");
    const kid = await add(cookie, "B");
    for (const id of ["b", "a", "b"]) {
      const res = await call(cookie, "POST", `/profiles/${kid.id}/badges`, { lessonId: id });
      expect(res.status).toBe(200);
    }
    expect((await profilesOf(cookie))[0].badges).toEqual(["b", "a"]);
  });

  it("keeps two simultaneous badges", async () => {
    const cookie = await login("race-badge@example.com");
    const kid = await add(cookie, "R");
    await Promise.all(
      ["l1", "l2", "l3", "l4"].map((lessonId) =>
        call(cookie, "POST", `/profiles/${kid.id}/badges`, { lessonId }),
      ),
    );
    expect((await profilesOf(cookie))[0].badges.sort()).toEqual(["l1", "l2", "l3", "l4"]);
  });

  it("stops at 6 profiles, also for two simultaneous adds", async () => {
    const cookie = await login("limit@example.com");
    for (let i = 0; i < 5; i++) await add(cookie, `K${i}`);
    const results = await Promise.all([
      call(cookie, "POST", "/profiles", { nickname: "X", avatar: "Finn" }),
      call(cookie, "POST", "/profiles", { nickname: "Y", avatar: "Finn" }),
    ]);
    expect(results.map((r) => r.status).sort()).toEqual([201, 409]);
    const refused = results.find((r) => r.status === 409)!;
    expect(await refused.json()).toEqual({ error: "profile_limit" });
    expect(await profilesOf(cookie)).toHaveLength(6);
  });

  it("answers 400 and changes nothing for bad input", async () => {
    const cookie = await login("bad@example.com");
    const kid = await add(cookie, "Keep", "Finn");
    const before = await profilesOf(cookie);

    const bad: [string, string, unknown][] = [
      ["POST", "/profiles", { nickname: "", avatar: "Finn" }],
      ["POST", "/profiles", { nickname: "   ", avatar: "Finn" }],
      ["POST", "/profiles", { nickname: "A" }],
      ["POST", "/profiles", { nickname: "A", avatar: "  " }],
      ["POST", "/profiles", { nickname: "A", avatar: "a".repeat(33) }],
      ["POST", "/profiles", "not an object"],
      ["PATCH", `/profiles/${kid.id}`, { nickname: " " }],
      ["PATCH", `/profiles/${kid.id}`, { lang: "fr" }],
      ["PATCH", `/profiles/${kid.id}`, { muted: "yes" }],
      ["PATCH", `/profiles/${kid.id}`, { avatar: "" }],
      ["PATCH", `/profiles/${kid.id}`, { muted: true, lang: "fr" }],
      ["PATCH", `/profiles/${kid.id}`, { disabledLessons: ["a".repeat(65)] }],
      ["PATCH", `/profiles/${kid.id}`, { disabledLessons: Array(201).fill("a") }],
      ["PATCH", `/profiles/${kid.id}`, {}],
      ["POST", `/profiles/${kid.id}/badges`, { lessonId: "a".repeat(65) }],
      ["POST", `/profiles/${kid.id}/badges`, { lessonId: "" }],
      ["POST", `/profiles/${kid.id}/badges`, {}],
    ];
    for (const [method, path, body] of bad) {
      const res = await call(cookie, method, path, body);
      expect(res.status, `${method} ${path} ${JSON.stringify(body)}`).toBe(400);
      expect(await res.json()).toEqual({ error: "invalid" });
    }
    const broken = await app.request("/api/profiles", {
      method: "POST",
      headers: { cookie, "content-type": "application/json" },
      body: "{",
    });
    expect(broken.status).toBe(400);
    expect(await profilesOf(cookie)).toEqual(before);
  });

  it("creates the family when the first-login hook failed", async () => {
    const cookie = await login("late@example.com");
    await pool.query(
      `DELETE FROM family WHERE parent_user_id IN (SELECT id FROM "user" WHERE email = 'late@example.com')`,
    );
    expect(await profilesOf(cookie)).toEqual([]);
    expect(await add(cookie, "After")).toMatchObject({ nickname: "After" });
  });
});
