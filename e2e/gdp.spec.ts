import { expect, test } from "@playwright/test";
import { LABEL, seedProgress, steps } from "./evidence";

test("gdp: selling moves the bar, giving bread away leaves it still", async ({ page }) => {
  const step = await steps(page, "gdp-toy");
  await seedProgress(page, { lang: "en", badges: ["gdp"] });
  await page.goto("./");

  const stop = page.locator(".trail .stop-done button.place");
  await expect(stop).toHaveCount(1);
  await stop.scrollIntoViewIfNeeded();
  await stop.click();
  await expect(page.locator(".lesson-title")).toBeVisible();

  // Walk the story until the toy shows up.
  const toy = page.locator(".lesson-body .stage-wrap");
  const next = page.getByRole("button", { name: LABEL.next.en, exact: true });
  let clicks = 0;
  while ((await toy.count()) === 0) {
    expect(clicks).toBeLessThan(80);
    await next.click();
    clicks += 1;
  }
  await expect(toy).toBeVisible();
  const nav = page.locator(".lesson-body .row.nav .btn");
  await expect(nav).toBeDisabled();
  await step();

  const fish = page.getByLabel(/Finn's fish/);
  const bread = page.getByLabel(/Bea's bread/);

  // Start: 2 fish and 2 loaves, all sold: 8 coins.
  await expect(page.getByText("GDP of the town: 8 coins")).toBeVisible();

  // Sell more fish: the bar moves.
  await fish.fill("5");
  await expect(page.getByText("GDP of the town: 14 coins")).toBeVisible();
  await expect(nav).toBeDisabled();
  await step();

  // Give the bread away: the bread drops out of the bar.
  await page.getByRole("button", { name: "Give the bread away" }).click();
  await expect(page.getByText("GDP of the town: 10 coins")).toBeVisible();
  await expect(page.getByRole("status")).toContainText("Bread given away");

  // More bread given away: the bar stays where it was.
  await bread.fill("9");
  await expect(page.getByText("GDP of the town: 10 coins")).toBeVisible();
  await expect(nav).toBeEnabled();
  await step();
});
