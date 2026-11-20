import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import type { Mailer } from "./mailer.js";

/** A parent device stays logged in for 90 days. */
export const SESSION_DAYS = 90;
const DAY = 60 * 24 * 60;

export interface AuthOptions {
  /** A `pg` Pool in production, a memory adapter in tests. */
  database: Parameters<typeof betterAuth>[0]["database"];
  mailer: Mailer;
  secret: string;
  /** Public address of the API. Unset: the library derives it from each request. */
  baseUrl?: string;
  /** Extra origins that may call the API (the Vite dev server). */
  trustedOrigins?: string[];
  production: boolean;
  /** Called on every login. Creates the family the first time. */
  onLogin: (userId: string) => Promise<void>;
  log?: (message: string) => void;
}

export function createAuth(options: AuthOptions) {
  const log = options.log ?? console.error;
  return betterAuth({
    database: options.database,
    secret: options.secret,
    baseURL: options.baseUrl,
    trustedOrigins: options.trustedOrigins,
    session: { expiresIn: SESSION_DAYS * DAY, updateAge: DAY },
    // Cookies are httpOnly always; Secure in production.
    advanced: { useSecureCookies: options.production },
    // The library's built-in limit for every route, on in dev too. Codes have a tighter limit below.
    rateLimit: { enabled: true },
    databaseHooks: {
      session: {
        create: {
          after: async (session) => {
            await options.onLogin(session.userId);
          },
        },
      },
    },
    plugins: [
      emailOTP({
        otpLength: 6,
        expiresIn: 300,
        // 3 wrong guesses burn the code. 3 sends per minute per address and IP.
        allowedAttempts: 3,
        rateLimit: { window: 60, max: 3 },
        storeOTP: "hashed",
        async sendVerificationOTP({ email, otp, type }) {
          if (type !== "sign-in") return;
          // Not awaited: the answer time must not show whether the address is known.
          void options.mailer.sendLoginCode(email, otp).catch((error: unknown) => {
            log(`Could not send the login code: ${error instanceof Error ? error.message : error}`);
          });
        },
      }),
    ],
  });
}

export type Auth = ReturnType<typeof createAuth>;
