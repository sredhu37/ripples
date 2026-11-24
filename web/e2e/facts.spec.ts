import { expect, test } from "@playwright/test";
import { LABEL, fakeFamily, openTrail, passParentGate, steps } from "./evidence";

test("facts: a parent opens the fact cards behind the maths gate", async ({ page }) => {
  const step = await steps(page, "facts");
  await fakeFamily(page);
  await openTrail(page);
  await step();

  await passParentGate(page, step);
  // Opened from the trail, the screen starts on the kid's detail; the fact cards are on the list.
  await page.getByRole("button", { name: "Back to kids" }).click();
  await page.getByRole("button", { name: LABEL.factCards.en }).click();

  await expect(page.getByRole("heading", { level: 1, name: LABEL.factCards.en })).toBeVisible();
  const cards = page.locator("article.fact-card");
  expect(await cards.count()).toBeGreaterThan(10);
  // Every claim on the first card links to a source.
  const firstCard = cards.first();
  const claims = firstCard.locator("ol > li");
  expect(await claims.count()).toBeGreaterThan(0);
  await expect(firstCard.locator("ol > li a[href^='http']")).toHaveCount(await claims.count());
  // Parent wording, grouped by curriculum, readable source links.
  await expect(page.locator("main")).not.toContainText(/claiming|verified/i);
  await expect(page.locator("h2.fact-group-title")).toHaveCount(6);
  const link = firstCard.locator("a.fact-link").first();
  await expect(link).toContainText(/^Source: \S+\.\S+/);
  expect(await link.evaluate((el) => getComputedStyle(el).color)).not.toBe("rgb(0, 0, 238)");
  const box = (await link.boundingBox())!;
  expect(box.height).toBeGreaterThanOrEqual(44);
  await step();

  await cards.nth(1).scrollIntoViewIfNeeded();
  await step();

  await page.getByRole("button", { name: "DE", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1, name: LABEL.factCards.de })).toBeVisible();
  await expect(page.locator("a.fact-link").first()).toContainText("Quelle");
  await step();
  await page.getByRole("button", { name: "PL", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1, name: LABEL.factCards.pl })).toBeVisible();
  await expect(page.locator("a.fact-link").first()).toContainText("Źródło");
  await step();

  for (const width of [360, 390, 820, 1366]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  }

  // The back button is first and names Family settings, which asks the maths question again.
  await expect(page.locator("button").first()).toHaveText(/Ustawienia rodziny|Family settings/);
  const backBox = await page.locator(".back-btn").boundingBox();
  expect(backBox?.height ?? 0).toBeGreaterThanOrEqual(60);
  await page.locator(".back-btn").click();
  await expect(page.locator("form.panel p").first()).toContainText("×");
  await step();
});
