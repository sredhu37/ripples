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
  await expect(page.locator(".tile-grid .tile")).toHaveCount(3); // two kids and Add a kid
  await expect(page.locator(".tile-grid .tile-face").first()).toHaveAttribute(
    "data-avatar",
    "Finn",
  );
  await expect(page.locator(".tile-grid .tile-name")).toHaveText(["Ava", "Ben", "Add a kid"]);
  await step();

  // Ava: German, one badge, sound on.
  await page.getByRole("button", { name: "Ava", exact: true }).click();
  await expect(page.getByText("Willkommen zurück, Ava!")).toBeVisible();
  await expect(page.locator(".shelf-row .medal-on")).toHaveCount(1);
  await expect(page.getByRole("button", { name: "Ton aus" })).toBeVisible();
  await step();

  // Change kid: the picker is back. Ben has no badge, English, sound off.
  await page.getByRole("button", { name: "Kind wechseln" }).click();
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

test("picker: readable names and an Add a kid tile through the gate", async ({ page }) => {
  const step = await steps(page, "picker-add");
  const api = await fakeFamily(page, {
    kids: [{ nickname: "Ava" }, { nickname: "Ben" }, { nickname: "Cleo" }],
  });
  await page.setViewportSize({ width: 360, height: 700 });
  await page.goto("./");

  // Names are at least 20 px and the tiles fit a 360 px phone without sideways scroll.
  await expect(page.locator(".tile-grid .tile-btn")).toHaveCount(4);
  const size = await page
    .locator(".tile-grid .tile-name")
    .first()
    .evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(size).toBeGreaterThanOrEqual(20);
  const widths = await page.evaluate(() => [
    document.documentElement.scrollWidth,
    window.innerWidth,
  ]);
  expect(widths[0]).toBe(widths[1]);
  const box = await page.getByRole("button", { name: "Add a kid" }).boundingBox();
  expect(box!.width).toBeGreaterThanOrEqual(44);
  expect(box!.height).toBeGreaterThanOrEqual(44);
  await step();

  // A wrong gate answer stays on the gate.
  await page.getByRole("button", { name: "Add a kid" }).click();
  const question = page.locator("form.panel p").first();
  const [a, b] = ((await question.textContent()) ?? "").match(/\d+/g)!.map(Number);
  const input = page.getByRole("textbox");
  await input.fill(String(a * b + 1));
  await page.getByRole("button", { name: "Open" }).click();
  await expect(page.getByRole("alert")).toBeVisible();
  await input.fill(String(a * b));
  await page.getByRole("button", { name: "Open" }).click();

  // The add form is open with the nickname focused. Saving returns to the picker.
  await expect(page.getByLabel("Nickname")).toBeFocused();
  await page.getByLabel("Nickname").fill("Dan");
  await step();
  await page.getByRole("button", { name: "Add profile" }).click();
  await expect(page.getByRole("heading", { name: "Who is playing?" })).toBeVisible();
  await expect(page.locator(".tile-grid .tile-name")).toHaveText([
    "Ava",
    "Ben",
    "Cleo",
    "Dan",
    "Add a kid",
  ]);
  expect(api.profiles.map((p) => p.nickname)).toContain("Dan");
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
