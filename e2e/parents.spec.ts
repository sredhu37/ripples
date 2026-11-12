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
  await page.getByRole("heading", { name: "Age group" }).scrollIntoViewIfNeeded();

  // Age group switch.
  const senior = page.getByRole("button", { name: /Senior/ });
  const junior = page.getByRole("button", { name: /Junior/ });
  await senior.click();
  await expect(senior).toHaveAttribute("aria-pressed", "true");
  await step();
  await junior.click();
  await expect(junior).toHaveAttribute("aria-pressed", "true");

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
