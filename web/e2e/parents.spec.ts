import { expect, test } from "@playwright/test";
import { fakeFamily, openTrail, passParentGate, steps } from "./evidence";

test("parents: a Paused lesson is missing from the lesson list", async ({ page }) => {
  await fakeFamily(page);
  await page.route("**/api/features", (route) => route.fulfill({ json: { "show-loans": false } }));
  await openTrail(page);
  await passParentGate(page, async () => {});
  const group = page.locator("details.lesson-group-accordion").first();
  await group.locator("summary").click();
  await expect(group.locator("label.lesson-toggle-row").filter({ hasText: "Loans" })).toHaveCount(
    0,
  );
  await expect(group.locator("label.lesson-toggle-row").filter({ hasText: "Banks" })).toHaveCount(
    1,
  );
});

test("parents: settings opened from a kid's trail change that kid's lessons", async ({ page }) => {
  const api = await fakeFamily(page, { kids: [{ nickname: "Ava" }, { nickname: "Ben" }] });
  await openTrail(page, "Ben");
  const stops = page.locator(".trail button.place");
  const before = await stops.count();

  await passParentGate(page, async () => {});
  await expect(page.getByLabel("Lessons for")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Lessons for Ben" })).toBeVisible();

  const group = page.locator("details.lesson-group-accordion").first();
  await group.locator("summary").click();
  await group.locator("label.lesson-toggle-row").first().click();
  await expect.poll(() => api.profiles[1].disabledLessons.length).toBe(1);
  expect(api.profiles[0].disabledLessons).toEqual([]);

  await page.getByRole("button", { name: "Back to kids" }).click();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(stops).toHaveCount(before - 1);
});

test("parents: family settings sit behind the maths gate and control the trail", async ({
  page,
}) => {
  const step = await steps(page, "parents");
  const api = await fakeFamily(page);
  await openTrail(page);
  const stops = page.locator(".trail button.place");
  const before = await stops.count();
  await step();

  await passParentGate(page, step);

  // Opened from the trail, the screen lands on that kid's detail with their lessons.
  await expect(page.getByRole("heading", { name: "Lessons for Ava" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Save progress|Restore progress|Start fresh/ }),
  ).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Age group" })).toHaveCount(0);

  // Turn off the first lesson of the first group.
  const group = page.locator("details.lesson-group-accordion").first();
  await group.locator("summary").click();
  const toggle = group.locator("input.toggle-input").first();
  await expect(toggle).toBeChecked();
  // The checkbox is drawn as a switch; click its row like a parent would.
  await group.locator("label.lesson-toggle-row").first().click();
  await expect(toggle).not.toBeChecked();
  await step();
  await expect.poll(() => api.profiles[0].disabledLessons.length).toBe(1);

  // Back to the kid list, which has the family title. Close: the trail has one stop fewer.
  await page.getByRole("button", { name: "Back to kids" }).click();
  await expect(page.getByRole("heading", { name: "Family settings" })).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(stops).toHaveCount(before - 1);
  await step();
});
