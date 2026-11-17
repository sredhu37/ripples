import { expect, test } from "@playwright/test";
import { LESSON_ORDER } from "../src/lessons";
import { LABEL, seedProgress, steps } from "./evidence";

test("fx: the same coins afford the toy on day 1 and come up short on day 2", async ({ page }) => {
  const step = await steps(page, "fx-toy");
  await seedProgress(page, { lang: "en", badges: LESSON_ORDER.filter((id) => id !== "fx") });
  await page.goto("./");

  const stop = page.locator(".trail .stop-next button.place");
  await stop.scrollIntoViewIfNeeded();
  await stop.click();
  await expect(page.locator(".lesson-title")).toBeVisible();

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

  await page.getByRole("button", { name: "Swap my coins" }).click();
  await page.getByRole("button", { name: "Buy the toy" }).click();
  await expect(page.getByRole("status").filter({ hasText: "You bought the toy" })).toBeVisible();
  await expect(nav).toBeEnabled();
  await step();

  await page.getByRole("button", { name: "Day 2", exact: true }).click();
  await page.getByRole("button", { name: "Swap my coins" }).click();
  await page.getByRole("button", { name: "Buy the toy" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Not enough coins" })).toBeVisible();
  await step();
});
