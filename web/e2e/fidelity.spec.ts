import { expect, test } from "@playwright/test";
import { fakeFamily, openTrail, steps } from "./evidence";

const PRIOR_BADGES = [
  "money",
  "work",
  "savings",
  "business",
  "equity",
  "loans",
  "banks",
  "interest",
  "taxes",
  "inflation",
  "printing",
  "rates",
  "profit",
  "sales",
  "ticketsize",
  "marketshare",
  "competition",
  "marketing",
  "hiring",
  "scale",
  "supplydemand",
  "commodities",
  "gold",
  "currencies",
  "fx",
  "stocks",
  "bonds",
  "stocksvsbonds",
  "derivatives",
  "philanthropy",
];

test("fidelity: river trail map and lesson 4 scenario screens", async ({ page }) => {
  const step = await steps(page, "fidelity");

  // 1. River Trail Map Viewport
  await page.setViewportSize({ width: 1280, height: 900 });
  await fakeFamily(page, {
    kids: [{ nickname: "Ava", lang: "en", badges: ["money", "work", "savings"], muted: true }],
  });
  await openTrail(page);
  await page.waitForTimeout(800);

  // Scroll to show the river map wrap with landmarks and trail stops
  await page.locator(".river-map-wrap").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await step();

  // Mobile portrait map
  await page.setViewportSize({ width: 414, height: 896 });
  await page.waitForTimeout(500);
  await step();

  // 2. Lesson 4 (Prices and Scarcity / supply_demand) Scenario Screen
  await page.setViewportSize({ width: 1280, height: 850 });
  await fakeFamily(page, {
    kids: [{ nickname: "Ava", lang: "en", badges: PRIOR_BADGES, muted: true }],
  });
  await openTrail(page);
  await page.waitForTimeout(500);

  // Click continue to open the active lesson (supply_demand)
  const continueBtn = page.locator(".continue");
  await continueBtn.click();
  await expect(page.locator(".lesson-title")).toBeVisible();

  // Click Next through story beats until toy is visible
  const nextBtn = page.getByRole("button", { name: "Next", exact: true });
  while (await nextBtn.isVisible()) {
    await nextBtn.click();
    await page.waitForTimeout(150);
  }

  // Now toy is present: click "- Less" to trigger onDone
  const lessBtn = page.getByRole("button", { name: "- Less", exact: true });
  if (await lessBtn.isVisible()) {
    await lessBtn.click();
    await page.waitForTimeout(200);
  }

  // Click "I'm ready for questions"
  const readyBtn = page.getByRole("button", { name: "I'm ready for questions", exact: false });
  await expect(readyBtn).toBeEnabled();
  await readyBtn.click();
  await page.waitForTimeout(300);

  // Question 1: pick choice and advance
  const choice1 = page.locator(".choice").first();
  await choice1.click();
  await page.waitForTimeout(200);
  const nextQ1 = page.getByRole("button", { name: "Next", exact: true });
  await nextQ1.click();
  await page.waitForTimeout(300);

  // Question 2: pick choice and advance
  const choice2 = page.locator(".choice").first();
  await choice2.click();
  await page.waitForTimeout(200);
  const nextQ2 = page.getByRole("button", { name: "Next", exact: true });
  await nextQ2.click();
  await page.waitForTimeout(300);

  // Question 3: AppleStallScenario
  await expect(page.locator(".apple-stall-scenario")).toBeVisible();
  await page.waitForTimeout(600);
  await step();

  // Mobile portrait lesson
  await page.setViewportSize({ width: 414, height: 896 });
  await page.waitForTimeout(500);
  await step();
});
