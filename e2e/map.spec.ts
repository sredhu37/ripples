import { expect, test } from "@playwright/test";
import { steps } from "./evidence";

test("map: a new child names herself and sees the trail", async ({ page }) => {
  const step = await steps(page, "map");
  await page.goto("./");

  // First visit: the name screen.
  const name = page.getByRole("textbox");
  await expect(name).toBeVisible();
  // One age group: the name screen has no age choice.
  await expect(page.getByText(/age group|junior|senior/i)).toHaveCount(0);
  await step();
  await name.fill("Ava");
  await step();
  await page.getByRole("button", { name: "Let's go" }).click();

  // The map greets her and only the first trail stop is open.
  await expect(page.getByRole("heading", { level: 1, name: "Ripples" })).toBeVisible();
  await expect(page.getByText("Hi Ava! Pick a place on the trail.")).toBeVisible();
  const stops = page.locator(".trail button.place");
  expect(await stops.count()).toBeGreaterThan(10);
  await expect(stops.first()).toBeEnabled();
  await expect(stops.nth(1)).toBeDisabled();
  await expect(page.getByRole("button", { name: /^Continue: / })).toBeVisible();
  await step();

  // Switch language: the trail and greeting follow.
  await page.getByRole("button", { name: "DE", exact: true }).click();
  await expect(page.getByText("Hallo Ava! Such dir einen Ort auf dem Pfad aus.")).toBeVisible();
  await expect(page.getByRole("button", { name: /^Weiter: / })).toBeVisible();
  await step();
  await page.getByRole("button", { name: "PL", exact: true }).click();
  await expect(page.getByText("Cześć Ava! Wybierz miejsce na ścieżce.")).toBeVisible();
  await page.locator(".trail").scrollIntoViewIfNeeded();
  await step();
});
