import { expect, test } from "@playwright/test";
import { LABEL, seedProgress, steps } from "./evidence";

test("currencies: the note still buys bread after the vault stops swapping gold", async ({
  page,
}) => {
  const step = await steps(page, "currencies-toy");
  await seedProgress(page, { lang: "en", badges: ["currencies"] });
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

  await page.getByRole("button", { name: "Swap gold for a note" }).click();
  await expect(page.locator(".currencies-note")).toHaveCount(1);
  await page.getByRole("button", { name: "Buy bread" }).click();
  await page.getByRole("button", { name: "Stop the gold swap" }).click();
  await expect(nav).toBeDisabled();
  await step();

  await page.getByRole("button", { name: "Buy bread again" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Everyone in town accepts it" }),
  ).toBeVisible();
  await expect(nav).toBeEnabled();
  await step();
});
