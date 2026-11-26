import { expect, test } from "@playwright/test";
import { GOOD_CODE, fakeFamily, openTrail, steps } from "./evidence";

test("map: a Paused lesson is not on the trail and numbers stay consecutive", async ({ page }) => {
  await fakeFamily(page, {
    kids: [{ lang: "en", badges: ["money", "work", "savings", "business", "equity"] }],
  });
  await page.route("**/api/features", (route) => route.fulfill({ json: { "show-loans": false } }));
  await openTrail(page);
  const stops = page.locator(".trail button.place");
  await expect(page.getByText("Loans", { exact: true })).toHaveCount(0);
  await expect(stops.nth(5)).toContainText("6. Banks");
});

test("map: group sections, badge count and the first stop above the fold on a phone", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await fakeFamily(page);
  await openTrail(page);
  await expect(page.locator(".shelf-count")).toHaveText(/^0 of \d+$/);
  await expect(page.locator(".shelf-row .medal")).toHaveCount(0);
  await expect(page.locator(".trail h2")).toHaveCount(6);
  await expect(page.locator(".trail .stop-locked")).toHaveCount(2);
  const viewportHeight = 844;
  const continueBox = await page.locator(".continue").boundingBox();
  const stopBox = await page.locator(".trail button.place").first().boundingBox();
  expect(continueBox!.y + continueBox!.height).toBeLessThanOrEqual(viewportHeight);
  expect(stopBox!.y + stopBox!.height).toBeLessThanOrEqual(viewportHeight);
  for (const width of [360, 390, 820, 1366]) {
    await page.setViewportSize({ width, height: 844 });
    // The shelf and the trail fit. The header row is ticket #331 and is not checked here.
    const right = await page.evaluate(() =>
      Math.max(
        ...Array.from(document.querySelectorAll(".shelf, .trail, .trail *")).map(
          (el) => el.getBoundingClientRect().right,
        ),
      ),
    );
    expect(right).toBeLessThanOrEqual(width);
  }
});

test("map: a new family logs in, adds a kid and sees the trail", async ({ page }) => {
  const step = await steps(page, "map");
  await fakeFamily(page, { loggedIn: false, kids: [] });
  await page.goto("./");

  // Log in. A family with no profile lands on the first-run screen.
  await page.getByLabel("Your email").fill("mum@example.com");
  await page.getByRole("button", { name: "Send my code" }).click();
  await page.getByLabel("6-digit code").fill(GOOD_CODE);
  await page.getByRole("button", { name: "Log in", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Who is learning with Otto?" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Family settings" })).toHaveCount(0);
  await step();

  // An empty nickname cannot be sent.
  await expect(page.getByRole("button", { name: "Add", exact: true })).toBeDisabled();
  await page.getByLabel("Nickname").fill("Ava");
  await step();
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Who is playing?" })).toBeVisible();

  // The picker shows Ava; one tap opens her trail.
  await page.getByRole("button", { name: "Ava", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Ripples" })).toBeVisible();
  await expect(page.getByText("Hi Ava! Pick a place on the trail.")).toBeVisible();
  await expect(page.locator(".river-svg-bg")).toBeVisible();
  const stops = page.locator(".trail button.place");
  await expect(stops).toHaveCount(3);
  await expect(stops.first()).toBeEnabled();
  await expect(stops.nth(1)).toBeDisabled();
  await expect(page.getByRole("button", { name: /^Continue: / })).toBeVisible();
  // The trail has one section per curriculum group, in order.
  await expect(page.locator(".trail h2").first()).toHaveText("Money and Work");
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
