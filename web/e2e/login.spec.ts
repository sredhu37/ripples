import { expect, test } from "@playwright/test";
import { GOOD_CODE, fakeFamily, steps } from "./evidence";

// The spec runs against the built app without an API, so fakeFamily answers /api/auth.
// The real flow (codes, attempts, cookies) is tested against the API in server/auth.test.ts.

test("login: a logged-out device opens the login screen, then the picker lists the family", async ({
  page,
}) => {
  const step = await steps(page, "login");
  await fakeFamily(page, { loggedIn: false, kids: [{ nickname: "Ava" }, { nickname: "Ben" }] });
  await page.goto("./");
  await expect(page.getByLabel("Your email")).toBeVisible();
  await step();

  await page.getByLabel("Your email").fill("mum@example.com");
  await page.getByRole("button", { name: "Send my code" }).click();
  await expect(page.getByText("Check your spam folder")).toBeVisible();
  await expect(page.getByRole("button", { name: /Send a new code in \d+ s/ })).toBeDisabled();
  await step();

  // Wrong code: an error, still on the code screen.
  await page.getByLabel("6-digit code").fill("000000");
  await page.getByRole("button", { name: "Log in", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("not right");
  await step();

  // Right code: the picker with both kids.
  await page.getByLabel("6-digit code").fill(GOOD_CODE);
  await page.getByRole("button", { name: "Log in", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Who is playing?" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Ava", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Ben", exact: true })).toBeVisible();
  await step();
});
