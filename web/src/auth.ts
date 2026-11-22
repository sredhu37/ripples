/** Calls to the login routes of the API (Better Auth, under /api/auth). The cookie is httpOnly: the app never sees it. */

export type SendResult = "sent" | "too_many" | "failed";
export type VerifyResult = "ok" | "wrong" | "too_many" | "failed";

async function post(path: string, body: unknown): Promise<Response | null> {
  try {
    return await fetch(`/api/auth/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(body),
    });
  } catch {
    return null;
  }
}

export async function sendLoginCode(email: string): Promise<SendResult> {
  const res = await post("email-otp/send-verification-otp", { email, type: "sign-in" });
  if (!res) return "failed";
  if (res.status === 429) return "too_many";
  return res.ok ? "sent" : "failed";
}

export async function verifyLoginCode(email: string, otp: string): Promise<VerifyResult> {
  const res = await post("sign-in/email-otp", { email, otp });
  if (!res) return "failed";
  if (res.ok) return "ok";
  // 429: the rate limit. 403: the code used up its 3 tries.
  if (res.status === 429 || res.status === 403) return "too_many";
  return res.status === 400 ? "wrong" : "failed";
}

/** The email of the logged-in parent, or null. */
export async function getSessionEmail(): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/get-session", { credentials: "same-origin" });
    // The preview server has no API and answers with the app page: that is logged out.
    if (!res.ok || !res.headers.get("content-type")?.includes("json")) return null;
    const data = (await res.json()) as { user?: { email?: string } } | null;
    return data?.user?.email ?? null;
  } catch {
    return null;
  }
}

export async function logOut(): Promise<void> {
  await post("sign-out", {});
}
