import { expect, test } from "@playwright/test";
import { LABEL, seedProgress, steps } from "./evidence";

test("deficit: a gap adds to the debt, interest takes a slice, a balanced year unlocks the quiz", async ({
  page,
}) => {
  const step = await steps(page, "deficit-toy");
  await seedProgress(page, { lang: "en", badges: ["deficit"] });
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

  // Year 1: build everything (12 coins) against a pot of 10. The gap is 2.
  for (const name of ["School (3)", "Road (3)", "Park (2)", "Harbour wall (4)"]) {
    await page.getByRole("button", { name }).click();
  }
  await expect(page.getByRole("status").filter({ hasText: "borrows 2" })).toBeVisible();
  await expect(nav).toBeDisabled();
  await step();

  // Year 2: the debt of 2 costs 1 coin of interest. Build only the school: balanced.
  await page.getByRole("button", { name: "Close the year" }).click();
  await expect(page.getByText("Year 2 of 3")).toBeVisible();
  await expect(page.getByText("Interest takes 1 from the pot.")).toBeVisible();
  await page.getByRole("button", { name: "School (3)" }).click();
  await expect(page.getByRole("status").filter({ hasText: "The year balances" })).toBeVisible();
  await page.getByRole("button", { name: "Close the year" }).click();
  await expect(nav).toBeEnabled();
  await step();
});
