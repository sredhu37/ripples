import { expect, test } from "@playwright/test";
import { LABEL, fakeFamily, openTrail, steps } from "./evidence";

test("bailouts: a big enough buffer stops the dominoes before the shops", async ({ page }) => {
  const step = await steps(page, "bailouts-toy");
  await fakeFamily(page, { kids: [{ lang: "en", badges: ["bailouts"] }] });
  await openTrail(page);

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

  // No buffer: every domino falls, the quiz stays locked.
  await page.getByRole("button", { name: "Push the bank domino" }).click();
  await expect(page.locator(".bo-fallen")).toHaveCount(8);
  await expect(page.getByRole("status").filter({ hasText: "Add more buffer" })).toBeVisible();
  await expect(nav).toBeDisabled();
  await step();

  // Buffer 3: a wall appears, only the 2 bank dominoes fall, the quiz unlocks.
  await page.getByRole("slider").fill("3");
  await page.getByRole("button", { name: "Push the bank domino" }).click();
  await expect(page.locator(".bo-wall")).toHaveCount(1);
  await expect(page.locator(".bo-fallen")).toHaveCount(2);
  await expect(page.getByRole("status").filter({ hasText: "The shops stay open" })).toBeVisible();
  await expect(nav).toBeEnabled();
  await step();
});
