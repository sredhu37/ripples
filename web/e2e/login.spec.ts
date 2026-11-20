import { expect, test } from "@playwright/test";
import { passParentGate, seedProgress, steps } from "./evidence";

// The spec runs against the built app without an API, so the /api/auth calls are answered here.
// The real flow (codes, attempts, cookies) is tested against the API in server/auth.test.ts.
const GOOD_CODE = "123456";

test("login: a parent asks for a code, gets one wrong, then logs in and lands on the profile screen", async ({
  page,
}) => {
  const step = await steps(page, "login");
  const sent: unknown[] = [];
  await page.route("**/api/auth/**", async (route) => {
    const url = route.request().url();
    const json = (status: number, body: unknown) =>
      route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
    if (url.endsWith("/get-session")) return json(200, null);
    if (url.endsWith("/send-verification-otp")) {
      sent.push(route.request().postDataJSON());
      return json(200, { success: true });
    }
    if (url.endsWith("/sign-in/email-otp")) {
      const { otp } = route.request().postDataJSON() as { otp: string };
      return otp === GOOD_CODE
        ? json(200, { token: "t", user: { email: "mum@example.com" } })
        : json(400, { code: "INVALID_OTP", message: "Invalid OTP" });
    }
    return json(404, {});
  });

  await seedProgress(page);
  await page.goto("./");
  await passParentGate(page, step);

  await page.getByRole("button", { name: "Log in", exact: true }).click();
  await expect(page.getByLabel("Your email")).toBeVisible();
  await step();

  await page.getByLabel("Your email").fill("mum@example.com");
  await page.getByRole("button", { name: "Send my code" }).click();
  expect(sent).toEqual([{ email: "mum@example.com", type: "sign-in" }]);
  await expect(page.getByText("Check your spam folder")).toBeVisible();
  await expect(page.getByRole("button", { name: /Send a new code in \d+ s/ })).toBeDisabled();
  await step();

  // Wrong code: an error, still on the code screen.
  await page.getByLabel("6-digit code").fill("000000");
  await page.getByRole("button", { name: "Log in", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("not right");
  await step();

  // Right code: the profile screen.
  await page.getByLabel("6-digit code").fill(GOOD_CODE);
  await page.getByRole("button", { name: "Log in", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Your family" })).toBeVisible();
  await expect(page.getByText("Logged in as mum@example.com")).toBeVisible();
  await step();
});
