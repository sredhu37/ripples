const RESEND_URL = "https://api.resend.com/emails";

export interface Mailer {
  sendLoginCode(email: string, code: string): Promise<void>;
}

interface ResendOptions {
  apiKey: string;
  from: string;
  fetch?: typeof fetch;
}

/** Sends the Login code with Resend. */
export function createResendMailer({
  apiKey,
  from,
  fetch: doFetch = fetch,
}: ResendOptions): Mailer {
  return {
    async sendLoginCode(email, code) {
      const res = await doFetch(RESEND_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [email],
          subject: `Ripples: ${code}`,
          text: [
            `Your Ripples login code: ${code}`,
            `Dein Ripples-Code: ${code}`,
            `Twój kod do Ripples: ${code}`,
            "",
            "5 min.",
          ].join("\n"),
        }),
      });
      if (!res.ok) throw new Error(`Resend answered ${res.status}`);
    },
  };
}

/** Self-host mode: no email sender, so the Login code goes to the API log. */
export function createLogMailer(log: (message: string) => void = console.log): Mailer {
  return {
    async sendLoginCode(email, code) {
      log(`Login code for ${email}: ${code}`);
    },
  };
}

export const SELF_HOST_WARNING =
  "RESEND_API_KEY is not set (Self-host mode): login codes are written to this log instead of being emailed.";
