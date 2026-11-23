import { expect, test } from "@playwright/test";
import { LABEL, fakeFamily, openTrail, passParentGate, steps } from "./evidence";

test("facts: a parent opens the fact cards behind the maths gate", async ({ page }) => {
  const step = await steps(page, "facts");
  await fakeFamily(page);
  await openTrail(page);
  await step();

  await passParentGate(page, step);
  await page.getByRole("button", { name: LABEL.factCards.en }).click();

  await expect(page.getByRole("heading", { level: 1, name: LABEL.factCards.en })).toBeVisible();
  const cards = page.locator("article.fact-card");
  expect(await cards.count()).toBeGreaterThan(10);
  // Every claim on the first card links to a source.
  const firstCard = cards.first();
  const claims = firstCard.locator("ol > li");
  expect(await claims.count()).toBeGreaterThan(0);
  await expect(firstCard.locator("ol > li a[href^='http']")).toHaveCount(await claims.count());
  await step();

  await cards.nth(1).scrollIntoViewIfNeeded();
  await step();

  await page.getByRole("button", { name: "DE", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1, name: LABEL.factCards.de })).toBeVisible();
  await step();
  await page.getByRole("button", { name: "PL", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1, name: LABEL.factCards.pl })).toBeVisible();
  await step();

  // The back button is first and names Family settings, which asks the maths question again.
  await expect(page.locator("button").first()).toHaveText(/Ustawienia rodziny|Family settings/);
  const box = await page.locator(".back-btn").boundingBox();
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(60);
  await page.locator(".back-btn").click();
  await expect(page.locator("form.panel p").first()).toContainText("×");
  await step();
});
