import { expect, test } from "@playwright/test";
import { LABEL, seedProgress, steps } from "./evidence";

test("timeline: eras and regions filter the world events", async ({ page }) => {
  const step = await steps(page, "timeline");
  await seedProgress(page);
  await page.goto("./");
  await step();

  await page.getByRole("button", { name: LABEL.worldTimeline.en }).click();
  await expect(page.getByRole("heading", { level: 1, name: LABEL.worldTimeline.en })).toBeVisible();
  const eras = page.getByRole("tab");
  expect(await eras.count()).toBeGreaterThan(1);
  await expect(eras.first()).toHaveAttribute("aria-selected", "true");
  await step();

  // Pick the second era: its heading and cards change.
  const firstEraTitle = await page.locator(".timeline-era-head h2").textContent();
  await eras.nth(1).click();
  await expect(eras.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page.locator(".timeline-era-head h2")).not.toHaveText(firstEraTitle ?? "");
  const cards = page.locator(".timeline-card");
  expect(await cards.count()).toBeGreaterThan(0);
  await step();

  // One region only: a single lane remains.
  await page.locator(".timeline-regions button").nth(1).click();
  await expect(page.locator(".timeline-regions button").nth(1)).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(await page.locator(".timeline-lane").count()).toBeLessThanOrEqual(1);
  await step();

  await page.getByRole("button", { name: "DE", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1, name: LABEL.worldTimeline.de })).toBeVisible();
  await step();

  await page.getByRole("button", { name: "Zurueck" }).click();
  await expect(page.locator(".trail")).toBeVisible();
  await step();
});
