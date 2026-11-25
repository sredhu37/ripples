import { expect, test } from "@playwright/test";
import { LABEL, fakeFamily, openTrail, steps } from "./evidence";

// The slider's stop labels are non-interactive ticks (60 px touch targets: range input, era band,
// Earlier, Later).
test("timeline: the world map with a slider, pins, cloud and Read more", async ({ page }) => {
  const step = await steps(page, "timeline");
  const borders: string[] = [];
  page.on("request", (r) => {
    const m = /\/borders\/(?!land)([^/]+)\.json/.exec(r.url());
    if (m) borders.push(m[1]);
  });
  await fakeFamily(page);
  await openTrail(page);
  await step();

  await page.getByRole("button", { name: LABEL.worldTimeline.en }).click();
  await expect(page.getByRole("heading", { level: 1, name: LABEL.worldTimeline.en })).toBeVisible();
  await expect(page.locator(".tm-stage")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Pick a time" })).toBeVisible();
  await expect(page.locator(".time-current-stop")).toHaveText("3000 BCE");
  await expect(page.locator(".time-current-era")).toHaveText("Ancient Civilizations");
  await expect(page.getByRole("button", { name: "Ancient" })).toBeVisible();
  await expect(page.getByText(/Cliopatria/)).toBeVisible();
  // The old list screen is gone.
  await expect(page.getByRole("tab")).toHaveCount(0);
  expect(await page.locator(".timeline-card").count()).toBe(0);
  await step();

  // Later: the second stop (600 BCE) opens and draws its start year.
  await page.getByRole("button", { name: /Later/ }).click();
  await expect(page.locator(".time-stop-on")).toHaveText("600 BCE");
  await expect(page.locator(".time-current-stop")).toHaveText("600 BCE");
  await expect.poll(() => borders.at(-1)).toBe("-600");
  await step();

  // Athens sits in a bubble on the start view. Tapping the bubble zooms in on it.
  await page.getByRole("button", { name: /pins here/ }).click();
  await expect(page.getByRole("button", { name: /^Greece, 508 BCE/ })).toBeVisible();
  await step();

  // Open the pin. The cloud shows, stays within the stage, and the map draws the pin's year (508 BCE).
  await page.getByRole("button", { name: /^Greece, 508 BCE/ }).click();
  const cloud = page.locator(".tm-cloud");
  await expect(cloud).toBeVisible();
  const cloudBox = (await cloud.boundingBox())!;
  const stageBox = (await page.locator(".tm-stage").boundingBox())!;
  expect(cloudBox.y).toBeGreaterThanOrEqual(stageBox.y);
  expect(cloudBox.y + cloudBox.height).toBeLessThanOrEqual(stageBox.y + stageBox.height + 2);
  await expect.poll(() => borders.at(-1)).toBe("-508");
  await step();

  // Closing the cloud goes back to the stop's year.
  await cloud.getByRole("button", { name: "Close" }).click();
  await expect(cloud).toBeHidden();
  await expect(page.locator(".tm-map")).toHaveAttribute("data-year", "-600");

  // Read more opens the lesson.
  await page.getByRole("button", { name: /^Greece, 508 BCE/ }).click();
  await cloud.getByRole("button", { name: /Read more/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: LABEL.worldTimeline.en })).toHaveCount(
    0,
  );
  await step();
});

test("timeline: German and the back button", async ({ page }) => {
  const step = await steps(page, "timeline-de");
  await fakeFamily(page);
  await openTrail(page);
  await page.getByRole("button", { name: LABEL.worldTimeline.en }).click();

  await page.getByRole("button", { name: "DE", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1, name: LABEL.worldTimeline.de })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Zeit wählen" })).toBeVisible();
  await expect(page.locator(".time-current-stop")).toHaveText("3000 v. Chr.");
  await expect(page.locator(".time-current-era")).toHaveText("Alte Hochkulturen");
  await step();

  // The back button is the first button, names the trail and goes there.
  await expect(page.locator("button").first()).toHaveText(/Alle Lektionen/);
  await page.getByRole("button", { name: "Alle Lektionen" }).click();
  await expect(page.locator(".trail")).toBeVisible();
  await step();
});
