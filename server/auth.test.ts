// @vitest-environment node
import { memoryAdapter } from "better-auth/adapters/memory";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "./app.js";
import { createAuth, SESSION_DAYS } from "./auth.js";
import { createLogMailer, createResendMailer, type Mailer } from "./mailer.js";

const EMAIL = "parent@example.com";
let codes: string[];
let families: string[];
let logged: string[];

function setup(mailer?: Mailer) {
  codes = [];
  families = [];
  logged = [];
  const auth = createAuth({
    database: memoryAdapter({ user: [], session: [], account: [], verification: [] }),
    mailer: mailer ?? {
      sendLoginCode: async (_email, code) => {
        codes.push(code);
      },
    },
    secret: "test-secret-test-secret-test-secret-123",
    baseUrl: "http://localhost:8080",
    production: false,
    onLogin: async (userId) => {
      families.push(userId);
    },
    log: (m) => logged.push(m),
  });
  return createApp({ db: { query: async () => ({}) }, auth });
}

type App = ReturnType<typeof setup>;

// Each test uses its own address range for the rate limiter (it keys on the client IP).
let ip = 0;
const post = (app: App, path: string, body: unknown, from = `10.0.0.${ip}`) =>
  app.request(`/api/auth/${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": from },
    body: JSON.stringify(body),
  });
const sendCode = (app: App, from?: string) =>
  post(app, "email-otp/send-verification-otp", { email: EMAIL, type: "sign-in" }, from);
const signIn = (app: App, otp: string, from?: string) =>
  post(app, "sign-in/email-otp", { email: EMAIL, otp }, from);

beforeEach(() => {
  ip += 1;
});

describe("parent login with a 6-digit code", () => {
  it("sends a 6-digit code, logs the parent in and keeps a 90-day httpOnly cookie", async () => {
    const app = setup();
    expect((await sendCode(app)).status).toBe(200);
    expect(codes).toHaveLength(1);
    expect(codes[0]).toMatch(/^\d{6}$/);

    const res = await signIn(app, codes[0]);
    expect(res.status).toBe(200);
    const cookie = res.headers.get("set-cookie") ?? "";
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain(`Max-Age=${SESSION_DAYS * 24 * 60 * 60}`);

    const session = await app.request("/api/auth/get-session", {
      headers: { cookie: cookie.split(";")[0] },
    });
    expect(((await session.json()) as { user: { email: string } }).user.email).toBe(EMAIL);
  });

  it("creates the family hook call on login", async () => {
    const app = setup();
    await sendCode(app);
    await signIn(app, codes[0]);
    expect(families).toHaveLength(1);
  });

  it("marks the cookie Secure in production", async () => {
    codes = [];
    const auth = createAuth({
      database: memoryAdapter({ user: [], session: [], account: [], verification: [] }),
      mailer: {
        sendLoginCode: async (_e, code) => {
          codes.push(code);
        },
      },
      secret: "test-secret-test-secret-test-secret-123",
      baseUrl: "https://ripples.example",
      production: true,
      onLogin: async () => {},
    });
    const app = createApp({ db: { query: async () => ({}) }, auth });
    await sendCode(app);
    const res = await signIn(app, codes[0]);
    expect(res.headers.get("set-cookie")).toContain("Secure");
  });

  it("refuses a wrong code", async () => {
    const app = setup();
    await sendCode(app);
    const wrong = codes[0] === "000000" ? "111111" : "000000";
    const res = await signIn(app, wrong);
    expect(res.status).toBe(400);
    expect(((await res.json()) as { code: string }).code).toBe("INVALID_OTP");
    expect(res.headers.get("set-cookie")).toBeNull();
  });

  it("burns the code after 3 wrong guesses, even from other addresses", async () => {
    const app = setup();
    await sendCode(app);
    const wrong = codes[0] === "000000" ? "111111" : "000000";
    for (let i = 0; i < 3; i++) await signIn(app, wrong, `10.1.${ip}.${i}`);
    const res = await signIn(app, codes[0], `10.1.${ip}.9`);
    expect(res.status).toBe(403);
    expect(((await res.json()) as { code: string }).code).toBe("TOO_MANY_ATTEMPTS");
  });

  it("limits how often one address can check a code", async () => {
    const app = setup();
    await sendCode(app);
    const wrong = codes[0] === "000000" ? "111111" : "000000";
    for (let i = 0; i < 3; i++) await signIn(app, wrong);
    expect((await signIn(app, codes[0])).status).toBe(429);
  });

  it("limits how often a code can be sent", async () => {
    const app = setup();
    const statuses: number[] = [];
    for (let i = 0; i < 4; i++) statuses.push((await sendCode(app)).status);
    expect(statuses).toEqual([200, 200, 200, 429]);
  });

  it("logs a failed send and still answers 200", async () => {
    const app = setup({
      sendLoginCode: async () => {
        throw new Error("Resend answered 500");
      },
    });
    expect((await sendCode(app)).status).toBe(200);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(logged).toEqual(["Could not send the login code: Resend answered 500"]);
  });
});

describe("mailers", () => {
  it("self-host mode writes the code to the log", async () => {
    const lines: string[] = [];
    await createLogMailer((m) => lines.push(m)).sendLoginCode(EMAIL, "123456");
    expect(lines).toEqual([`Login code for ${EMAIL}: 123456`]);
  });

  it("Resend gets the key, sender, recipient and code", async () => {
    const calls: { url: string; init: RequestInit }[] = [];
    const mailer = createResendMailer({
      apiKey: "re_test",
      from: "Ripples <login@example.com>",
      fetch: (async (url: string, init: RequestInit) => {
        calls.push({ url, init });
        return new Response("{}", { status: 200 });
      }) as typeof fetch,
    });
    await mailer.sendLoginCode(EMAIL, "123456");
    expect(calls[0].url).toBe("https://api.resend.com/emails");
    expect((calls[0].init.headers as Record<string, string>).Authorization).toBe("Bearer re_test");
    const body = JSON.parse(calls[0].init.body as string);
    expect(body.to).toEqual([EMAIL]);
    expect(body.from).toBe("Ripples <login@example.com>");
    expect(body.text).toContain("123456");
  });

  it("Resend errors are thrown", async () => {
    const mailer = createResendMailer({
      apiKey: "k",
      from: "f",
      fetch: (async () => new Response("no", { status: 403 })) as unknown as typeof fetch,
    });
    await expect(mailer.sendLoginCode(EMAIL, "1")).rejects.toThrow("403");
  });
});
