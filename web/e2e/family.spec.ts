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

  // The list has no Delete. Delete is inside Edit and asks in the app, never natively.
  let nativeDialogs = 0;
  page.on("dialog", (dialog) => {
    nativeDialogs += 1;
    void dialog.dismiss();
  });
  await expect(page.getByRole("button", { name: /Delete/ })).toHaveCount(0);
  await page.getByRole("button", { name: "Edit Benno" }).click();
  await page.getByRole("button", { name: "Delete Benno" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("Delete Benno and all their badges?");
  await step();
  await dialog.getByRole("button", { name: "Cancel" }).click();
  await expect(dialog).toHaveCount(0);
  expect(api.profiles.length).toBe(2);
  await page.getByRole("button", { name: "Delete Benno" }).click();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await page.getByRole("button", { name: "Delete Benno" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Delete", exact: true }).click();
  await expect(page.getByRole("button", { name: "Edit Benno" })).toHaveCount(0);
  await expect.poll(() => api.profiles.length).toBe(1);
  expect(nativeDialogs).toBe(0);
  await step();
});

test("family settings: the chosen picture shows a check mark, a hovered one does not", async ({
  page,
}) => {
  const step = await steps(page, "family-avatar");
  await fakeFamily(page, { kids: [{ nickname: "Ava" }] });
  await openSettings(page, step);
  await page.getByRole("button", { name: "Edit Ava" }).click();
  const form = page.locator(".profile-form");
  const finn = form.getByRole("button", { name: "Finn" });
  const moss = form.getByRole("button", { name: "Moss" });
  await expect(finn).toHaveAttribute("aria-pressed", "true");
  await expect(finn.locator(".tile-check")).toBeVisible();
  await moss.hover();
  await expect(moss).not.toHaveClass(/tile-on/);
  await expect(moss.locator(".tile-check")).toHaveCount(0);
  await step();
});

test("family settings: nothing sticks out on a phone, Log out is in Account", async ({ page }) => {
  const step = await steps(page, "family-phone");
  await fakeFamily(page, { kids: [{ nickname: "Ava" }, { nickname: "Ben" }] });
  for (const width of [360, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await openSettings(page, step);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    const account = page.locator(".account-section");
    await expect(account.getByRole("button", { name: "Log out" })).toBeVisible();
    await expect(page.locator(".row").getByRole("button", { name: "Log out" })).toHaveCount(0);
    await page.getByRole("button", { name: "Edit Ava" }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  }
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

  // No kid dropdown: lessons live inside each kid.
  await expect(page.getByLabel("Lessons for")).toHaveCount(0);

  // Turn off the first lesson for Ava only.
  await page.getByRole("button", { name: "Edit Ava" }).click();
  const group = page.locator("details.lesson-group-accordion").first();
  await group.locator("summary").click();
  await group.locator("label.lesson-toggle-row").first().click();
  await expect(group.locator("input.toggle-input").first()).not.toBeChecked();

  // Ben's list is unchanged.
  await page.getByRole("button", { name: "Back to kids" }).click();
  await page.getByRole("button", { name: "Edit Ben" }).click();
  await group.locator("summary").click();
  await expect(group.locator("input.toggle-input").first()).toBeChecked();
  await step();

  // Ava's trail has one stop fewer than Ben's.
  await page.getByRole("button", { name: "Back to kids" }).click();
  await page.locator(".back-btn").click();
  await page.getByRole("button", { name: "Ava", exact: true }).click();
  const avaStops = await page.locator(".trail button.place").count();
  await page.getByRole("button", { name: "Switch profile: Ava" }).click();
  await page.getByRole("button", { name: "Ben", exact: true }).click();
  await expect(page.locator(".trail button.place")).toHaveCount(avaStops + 1);
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
