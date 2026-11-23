import { expect, test } from "@playwright/test";
import { GOOD_CODE, fakeFamily, openTrail, steps } from "./evidence";

test("map: a Paused lesson is not on the trail and numbers stay consecutive", async ({ page }) => {
  await fakeFamily(page);
  await page.route("**/api/features", (route) => route.fulfill({ json: { "show-loans": false } }));
  await openTrail(page);
  const stops = page.locator(".trail button.place");
  await expect(page.getByText("Loans", { exact: true })).toHaveCount(0);
  await expect(stops.nth(5)).toContainText("6. Banks");
});

test("map: a new family logs in, adds a kid and sees the trail", async ({ page }) => {
  const step = await steps(page, "map");
  await fakeFamily(page, { loggedIn: false, kids: [] });
  await page.goto("./");

  // Log in. A family with no profile lands on family settings with the add form open.
  await page.getByLabel("Your email").fill("mum@example.com");
  await page.getByRole("button", { name: "Send my code" }).click();
  await page.getByLabel("6-digit code").fill(GOOD_CODE);
  await page.getByRole("button", { name: "Log in", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Family settings" })).toBeVisible();
  await step();

  await page.getByLabel("Nickname").fill("Ava");
  await step();
  await page.getByRole("button", { name: "Add profile" }).click();
  await expect(page.getByRole("button", { name: "Edit Ava" })).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();

  // The picker shows Ava; one tap opens her trail.
  await page.getByRole("button", { name: "Ava", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Ripples" })).toBeVisible();
  await expect(page.getByText("Hi Ava! Pick a place on the trail.")).toBeVisible();
  const stops = page.locator(".trail button.place");
  expect(await stops.count()).toBeGreaterThan(10);
  await expect(stops.first()).toBeEnabled();
  await expect(stops.nth(1)).toBeDisabled();
  await expect(page.getByRole("button", { name: /^Continue: / })).toBeVisible();
  // The trail follows the curriculum groups: Currencies (Group 3) is stop 24, GDP is not last.
  await expect(stops.nth(23)).toContainText("24. Currencies");
  await expect(stops.last()).not.toContainText("GDP");
  await step();

  // Switch language: the trail and greeting follow.
  await page.getByRole("button", { name: "DE", exact: true }).click();
  await expect(page.getByText("Hallo Ava! Such dir einen Ort auf dem Pfad aus.")).toBeVisible();
  await expect(page.getByRole("button", { name: /^Weiter: / })).toBeVisible();
  await step();
  await page.getByRole("button", { name: "PL", exact: true }).click();
  await expect(page.getByText("Cześć Ava! Wybierz miejsce na ścieżce.")).toBeVisible();
  await page.locator(".trail").scrollIntoViewIfNeeded();
  await step();
});
