import { expect, test } from "@playwright/test";
import { fakeFamily, passParentGate, steps } from "./evidence";

/** Opens family settings from the picker, behind the maths gate. */
async function openSettings(page: import("@playwright/test").Page, step: () => Promise<void>) {
  await page.goto("./");
  await passParentGate(page, step);
  await expect(page.getByRole("heading", { name: "Family settings" })).toBeVisible();
}

test("family settings: add with the hint, a default picture, rename, change picture, delete", async ({
  page,
}) => {
  const step = await steps(page, "family");
  const api = await fakeFamily(page, { kids: [{ nickname: "Ava" }] });
  await openSettings(page, step);

  // Add: the hint is visible and the new profile gets the first unused villager.
  await page.getByRole("button", { name: "Add profile" }).click();
  await expect(page.getByText("A real name is not needed.")).toBeVisible();
  await page.getByLabel("Nickname").fill("Ben");
  await step();
  await page.getByRole("button", { name: "Add profile" }).click();
  await expect(page.getByRole("button", { name: "Edit Ben" })).toBeVisible();
  expect(api.profiles.map((p) => [p.nickname, p.avatar])).toEqual([
    ["Ava", "Finn"],
    ["Ben", "Bea"],
  ]);

  // Rename and change the picture.
  await page.getByRole("button", { name: "Edit Ben" }).click();
  await page.getByLabel("Nickname").fill("Benno");
  await page.locator(".profile-form").getByRole("button", { name: "Moss" }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByRole("button", { name: "Edit Benno" })).toBeVisible();
  await expect(page.locator(".profile-row .tile-face").nth(1)).toHaveAttribute(
    "data-avatar",
    "Moss",
  );
  await expect.poll(() => api.profiles[1].nickname).toBe("Benno");
  expect(api.profiles[1].avatar).toBe("Moss");
  await step();

  // Delete asks first: cancel keeps the profile, accept removes it.
  page.once("dialog", (dialog) => dialog.dismiss());
  await page.getByRole("button", { name: "Delete Benno" }).click();
  await expect(page.getByRole("button", { name: "Edit Benno" })).toBeVisible();
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Delete Benno" }).click();
  await expect(page.getByRole("button", { name: "Edit Benno" })).toHaveCount(0);
  await expect.poll(() => api.profiles.length).toBe(1);
  await step();
});

test("family settings: the add form says when the limit of 6 is reached", async ({ page }) => {
  const step = await steps(page, "family-limit");
  await fakeFamily(page, {
    kids: ["A", "B", "C", "D", "E", "F"].map((nickname) => ({ nickname })),
  });
  await openSettings(page, step);
  await expect(page.getByText(/A family can have 6 profiles/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Add profile" })).toHaveCount(0);
  await step();
});

test("family settings: lessons are chosen per profile", async ({ page }) => {
  const step = await steps(page, "family-lessons");
  await fakeFamily(page, { kids: [{ nickname: "Ava" }, { nickname: "Ben" }] });
  await openSettings(page, step);

  // Turn off the first lesson for Ava only.
  await page.getByLabel("Lessons for").selectOption({ label: "Ava" });
  const group = page.locator("details.lesson-group-accordion").first();
  await group.locator("summary").click();
  await group.locator("label.lesson-toggle-row").first().click();
  await expect(group.locator("input.toggle-input").first()).not.toBeChecked();

  // Ben's list is unchanged.
  await page.getByLabel("Lessons for").selectOption({ label: "Ben" });
  await expect(group.locator("input.toggle-input").first()).toBeChecked();
  await step();

  // Ava's trail starts one lesson later than Ben's.
  await page.getByRole("button", { name: "Close" }).click();
  await page.getByRole("button", { name: "Ava", exact: true }).click();
  await expect(page.locator(".trail button.place").first()).toContainText("1. Work and pay");
  await page.getByRole("button", { name: "Change kid" }).click();
  await page.getByRole("button", { name: "Ben", exact: true }).click();
  await expect(page.locator(".trail button.place").first()).toContainText("1. What is money?");
  await step();
});

test("family settings: log out returns to the login screen", async ({ page }) => {
  const step = await steps(page, "family-logout");
  const api = await fakeFamily(page);
  await openSettings(page, step);
  await page.getByRole("button", { name: "Log out" }).click();
  await expect(page.getByLabel("Your email")).toBeVisible();
  expect(api.loggedIn).toBe(false);
});
