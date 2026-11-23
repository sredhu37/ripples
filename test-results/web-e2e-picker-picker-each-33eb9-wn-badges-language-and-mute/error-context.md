# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web/e2e/picker.spec.ts >> picker: each kid keeps their own badges, language and mute
- Location: web/e2e/picker.spec.ts:4:1

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "./", waiting until "load"

```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { fakeFamily, steps } from "./evidence";
  3  | 
  4  | test("picker: each kid keeps their own badges, language and mute", async ({ page }) => {
  5  |   const step = await steps(page, "picker");
  6  |   const api = await fakeFamily(page, {
  7  |     kids: [
  8  |       { nickname: "Ava", lang: "de", muted: false, badges: ["money"] },
  9  |       { nickname: "Ben", lang: "en", muted: true },
  10 |     ],
  11 |   });
> 12 |   await page.goto("./");
     |              ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  13 | 
  14 |   // The picker shows a picture and the nickname of each profile. No password.
  15 |   await expect(page.getByRole("heading", { name: "Who is playing?" })).toBeVisible();
  16 |   await expect(page.locator(".tile-grid .tile")).toHaveCount(2);
  17 |   await expect(page.locator(".tile-grid .tile-face").first()).toHaveAttribute(
  18 |     "data-avatar",
  19 |     "Finn",
  20 |   );
  21 |   await expect(page.locator(".tile-grid .tile-name")).toHaveText(["Ava", "Ben"]);
  22 |   await step();
  23 | 
  24 |   // Ava: German, one badge, sound on.
  25 |   await page.getByRole("button", { name: "Ava", exact: true }).click();
  26 |   await expect(page.getByText("Willkommen zurueck, Ava!")).toBeVisible();
  27 |   await expect(page.locator(".shelf-row .medal-on")).toHaveCount(1);
  28 |   await expect(page.getByRole("button", { name: "Ton aus" })).toBeVisible();
  29 |   await step();
  30 | 
  31 |   // Change kid: the picker is back. Ben has no badge, English, sound off.
  32 |   await page.getByRole("button", { name: "Kind wechseln" }).click();
  33 |   await page.getByRole("button", { name: "Ben", exact: true }).click();
  34 |   await expect(page.getByText("Hi Ben! Pick a place on the trail.")).toBeVisible();
  35 |   await expect(page.locator(".shelf-row .medal-on")).toHaveCount(0);
  36 |   await expect(page.getByRole("button", { name: "Sound on" })).toBeVisible();
  37 |   await step();
  38 | 
  39 |   // A change saves once through the API and is there after a reload.
  40 |   await page.getByRole("button", { name: "Sound on" }).click();
  41 |   await expect(page.getByRole("button", { name: "Sound off" })).toBeVisible();
  42 |   await expect.poll(() => api.writes.length).toBe(1);
  43 |   expect(api.writes[0].method).toBe("PATCH");
  44 |   expect(api.writes[0].body).toEqual({ muted: false });
  45 |   await page.reload();
  46 |   await page.getByRole("button", { name: "Ben", exact: true }).click();
  47 |   await expect(page.getByRole("button", { name: "Sound off" })).toBeVisible();
  48 |   // The picker does not remember the last kid, and Ava is unchanged.
  49 |   expect(api.profiles[0].muted).toBe(false);
  50 |   expect(api.profiles[0].badges).toEqual(["money"]);
  51 |   await step();
  52 | });
  53 | 
  54 | test("picker: a failed save shows a notice and the change stays", async ({ page }) => {
  55 |   const api = await fakeFamily(page);
  56 |   await page.goto("./");
  57 |   await page.getByRole("button", { name: "Ava", exact: true }).click();
  58 |   api.failWrites = true;
  59 |   await page.getByRole("button", { name: "Sound on" }).click();
  60 |   await expect(page.getByText("Not saved. Check your connection.")).toBeVisible();
  61 |   await expect(page.getByRole("button", { name: "Sound off" })).toBeVisible();
  62 | });
  63 | 
  64 | test("picker: a 401 returns to the login screen", async ({ page }) => {
  65 |   const api = await fakeFamily(page);
  66 |   await page.goto("./");
  67 |   await page.getByRole("button", { name: "Ava", exact: true }).click();
  68 |   api.sessionExpired = true;
  69 |   await page.getByRole("button", { name: "Sound on" }).click();
  70 |   await expect(page.getByLabel("Your email")).toBeVisible();
  71 | });
  72 | 
```