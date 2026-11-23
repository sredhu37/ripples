import { expect, test } from "@playwright/test";
import { fakeFamily, steps } from "./evidence";

test("picker: each kid keeps their own badges, language and mute", async ({ page }) => {
  const step = await steps(page, "picker");
  const api = await fakeFamily(page, {
    kids: [
      { nickname: "Ava", lang: "de", muted: false, badges: ["money"] },
      { nickname: "Ben", lang: "en", muted: true },
    ],
  });
  await page.goto("./");

  // The picker shows a picture and the nickname of each profile. No password.
  await expect(page.getByRole("heading", { name: "Who is playing?" })).toBeVisible();
  await expect(page.locator(".tile-grid .tile")).toHaveCount(2);
  await expect(page.locator(".tile-grid .tile-face").first()).toHaveAttribute(
    "data-avatar",
    "Finn",
  );
  await expect(page.locator(".tile-grid .tile-name")).toHaveText(["Ava", "Ben"]);
  await step();

  // Ava: German, one badge, sound on.
  await page.getByRole("button", { name: "Ava", exact: true }).click();
  await expect(page.getByText("Willkommen zurueck, Ava!")).toBeVisible();
  await expect(page.locator(".shelf-row .medal-on")).toHaveCount(1);
  await expect(page.getByRole("button", { name: "Ton aus" })).toBeVisible();
  await step();

  // Switch profile: the picker is back. Ben has no badge, English, sound off.
  await page.getByRole("button", { name: "Profil wechseln: Ava" }).click();
  await page.getByRole("button", { name: "Ben", exact: true }).click();
  await expect(page.getByText("Hi Ben! Pick a place on the trail.")).toBeVisible();
  await expect(page.locator(".shelf-row .medal-on")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Sound on" })).toBeVisible();
  await step();

  // A change saves once through the API and is there after a reload.
  await page.getByRole("button", { name: "Sound on" }).click();
  await expect(page.getByRole("button", { name: "Sound off" })).toBeVisible();
  await expect.poll(() => api.writes.length).toBe(1);
  expect(api.writes[0].method).toBe("PATCH");
  expect(api.writes[0].body).toEqual({ muted: false });
  await page.reload();
  await page.getByRole("button", { name: "Ben", exact: true }).click();
  await expect(page.getByRole("button", { name: "Sound off" })).toBeVisible();
  // The picker does not remember the last kid, and Ava is unchanged.
  expect(api.profiles[0].muted).toBe(false);
  expect(api.profiles[0].badges).toEqual(["money"]);
  await step();
});

test("picker: a failed save shows a notice and the change stays", async ({ page }) => {
  const api = await fakeFamily(page);
  await page.goto("./");
  await page.getByRole("button", { name: "Ava", exact: true }).click();
  api.failWrites = true;
  await page.getByRole("button", { name: "Sound on" }).click();
  await expect(page.getByText("Not saved. Check your connection.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Sound off" })).toBeVisible();
});

test("picker: a 401 returns to the login screen", async ({ page }) => {
  const api = await fakeFamily(page);
  await page.goto("./");
  await page.getByRole("button", { name: "Ava", exact: true }).click();
  api.sessionExpired = true;
  await page.getByRole("button", { name: "Sound on" }).click();
  await expect(page.getByLabel("Your email")).toBeVisible();
});
