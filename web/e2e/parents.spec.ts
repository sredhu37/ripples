import { expect, test } from "@playwright/test";
import { passParentGate, seedProgress, steps } from "./evidence";

test("parents: the panel sits behind the maths gate and controls the trail", async ({ page }) => {
  const step = await steps(page, "parents");
  await seedProgress(page);
  await page.goto("./");
  const stops = page.locator(".trail button.place");
  const before = await stops.count();
  await step();

  await passParentGate(page, step);

  // Save code is shown.
  const code = page.getByRole("textbox", { name: "Save progress" });
  await expect(code).toHaveValue(/^RIP1\./);
  await code.scrollIntoViewIfNeeded();
  await step();

  // One age group: the panel has no age section.
  await expect(page.getByRole("heading", { name: "Age group" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Lesson selection" })).toBeVisible();

  // Turn off the first lesson of the first group.
  const group = page.locator("details.lesson-group-accordion").first();
  await group.locator("summary").click();
  const toggle = group.locator("input.toggle-input").first();
  await expect(toggle).toBeChecked();
  // The checkbox is drawn as a switch; click its row like a parent would.
  await group.locator("label.lesson-toggle-row").first().click();
  await expect(toggle).not.toBeChecked();
  await step();

  // Close: the trail has one stop fewer.
  await page.getByRole("button", { name: "Close" }).click();
  await expect(stops).toHaveCount(before - 1);
  await step();
});
