import { expect, test } from "@playwright/test";
import { LABEL, seedProgress, steps } from "./evidence";

test("centralbanks: say no to the mayor, then lend only against collateral", async ({ page }) => {
  const step = await steps(page, "centralbanks-toy");
  await seedProgress(page, { lang: "en", badges: ["centralbanks"] });
  await page.goto("./");
  await page.locator(".trail .stop-done button.place").click();

  const toy = page.locator(".lesson-body .stage-wrap");
  const next = page.getByRole("button", { name: LABEL.next.en, exact: true });
  for (let i = 0; i < 40 && (await toy.count()) === 0; i++) await next.click();
  await expect(toy).toBeVisible();
  await step();

  const quiz = page.locator(".lesson-body .row.nav .btn");
  await expect(quiz).toBeDisabled();

  // Round 1: refuse three times, so bread keeps its price.
  for (let i = 0; i < 3; i++) await page.getByRole("button", { name: "Say no" }).click();
  await expect(page.getByText("Bread: 10")).toBeVisible();
  await step();
  await page.getByRole("button", { name: "Next: the loan window" }).click();

  // Round 2: the quiz unlocks only after every bank has an answer.
  const lend = page.getByRole("button", { name: "Lend coins" });
  const refuse = page.getByRole("button", { name: "Refuse" });
  await lend.nth(0).click();
  await lend.nth(1).click();
  await expect(quiz).toBeDisabled();
  await refuse.nth(2).click();
  await expect(quiz).toBeEnabled();
  await step();
});
