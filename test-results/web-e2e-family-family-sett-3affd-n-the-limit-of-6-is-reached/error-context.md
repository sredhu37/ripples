# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web/e2e/family.spec.ts >> family settings: the add form says when the limit of 6 is reached
- Location: web/e2e/family.spec.ts:55:1

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "./", waiting until "load"

```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { fakeFamily, passParentGate, steps } from "./evidence";
  3   | 
  4   | /** Opens family settings from the picker, behind the maths gate. */
  5   | async function openSettings(page: import("@playwright/test").Page, step: () => Promise<void>) {
> 6   |   await page.goto("./");
      |              ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  7   |   await passParentGate(page, step);
  8   |   await expect(page.getByRole("heading", { name: "Family settings" })).toBeVisible();
  9   | }
  10  | 
  11  | test("family settings: add with the hint, a default picture, rename, change picture, delete", async ({
  12  |   page,
  13  | }) => {
  14  |   const step = await steps(page, "family");
  15  |   const api = await fakeFamily(page, { kids: [{ nickname: "Ava" }] });
  16  |   await openSettings(page, step);
  17  | 
  18  |   // Add: the hint is visible and the new profile gets the first unused villager.
  19  |   await page.getByRole("button", { name: "Add profile" }).click();
  20  |   await expect(page.getByText("A real name is not needed.")).toBeVisible();
  21  |   await page.getByLabel("Nickname").fill("Ben");
  22  |   await step();
  23  |   await page.getByRole("button", { name: "Add profile" }).click();
  24  |   await expect(page.getByRole("button", { name: "Edit Ben" })).toBeVisible();
  25  |   expect(api.profiles.map((p) => [p.nickname, p.avatar])).toEqual([
  26  |     ["Ava", "Finn"],
  27  |     ["Ben", "Bea"],
  28  |   ]);
  29  | 
  30  |   // Rename and change the picture.
  31  |   await page.getByRole("button", { name: "Edit Ben" }).click();
  32  |   await page.getByLabel("Nickname").fill("Benno");
  33  |   await page.locator(".profile-form").getByRole("button", { name: "Moss" }).click();
  34  |   await page.getByRole("button", { name: "Save", exact: true }).click();
  35  |   await expect(page.getByRole("button", { name: "Edit Benno" })).toBeVisible();
  36  |   await expect(page.locator(".profile-row .tile-face").nth(1)).toHaveAttribute(
  37  |     "data-avatar",
  38  |     "Moss",
  39  |   );
  40  |   await expect.poll(() => api.profiles[1].nickname).toBe("Benno");
  41  |   expect(api.profiles[1].avatar).toBe("Moss");
  42  |   await step();
  43  | 
  44  |   // Delete asks first: cancel keeps the profile, accept removes it.
  45  |   page.once("dialog", (dialog) => dialog.dismiss());
  46  |   await page.getByRole("button", { name: "Delete Benno" }).click();
  47  |   await expect(page.getByRole("button", { name: "Edit Benno" })).toBeVisible();
  48  |   page.once("dialog", (dialog) => dialog.accept());
  49  |   await page.getByRole("button", { name: "Delete Benno" }).click();
  50  |   await expect(page.getByRole("button", { name: "Edit Benno" })).toHaveCount(0);
  51  |   await expect.poll(() => api.profiles.length).toBe(1);
  52  |   await step();
  53  | });
  54  | 
  55  | test("family settings: the add form says when the limit of 6 is reached", async ({ page }) => {
  56  |   const step = await steps(page, "family-limit");
  57  |   await fakeFamily(page, {
  58  |     kids: ["A", "B", "C", "D", "E", "F"].map((nickname) => ({ nickname })),
  59  |   });
  60  |   await openSettings(page, step);
  61  |   await expect(page.getByText(/A family can have 6 profiles/)).toBeVisible();
  62  |   await expect(page.getByRole("button", { name: "Add profile" })).toHaveCount(0);
  63  |   await step();
  64  | });
  65  | 
  66  | test("family settings: lessons are chosen per profile", async ({ page }) => {
  67  |   const step = await steps(page, "family-lessons");
  68  |   await fakeFamily(page, { kids: [{ nickname: "Ava" }, { nickname: "Ben" }] });
  69  |   await openSettings(page, step);
  70  | 
  71  |   // Turn off the first lesson for Ava only.
  72  |   await page.getByLabel("Lessons for").selectOption({ label: "Ava" });
  73  |   const group = page.locator("details.lesson-group-accordion").first();
  74  |   await group.locator("summary").click();
  75  |   await group.locator("label.lesson-toggle-row").first().click();
  76  |   await expect(group.locator("input.toggle-input").first()).not.toBeChecked();
  77  | 
  78  |   // Ben's list is unchanged.
  79  |   await page.getByLabel("Lessons for").selectOption({ label: "Ben" });
  80  |   await expect(group.locator("input.toggle-input").first()).toBeChecked();
  81  |   await step();
  82  | 
  83  |   // Ava's trail has one stop fewer than Ben's.
  84  |   await page.getByRole("button", { name: "Close" }).click();
  85  |   await page.getByRole("button", { name: "Ava", exact: true }).click();
  86  |   const avaStops = await page.locator(".trail button.place").count();
  87  |   await page.getByRole("button", { name: "Change kid" }).click();
  88  |   await page.getByRole("button", { name: "Ben", exact: true }).click();
  89  |   await expect(page.locator(".trail button.place")).toHaveCount(avaStops + 1);
  90  |   await step();
  91  | });
  92  | 
  93  | test("family settings: log out returns to the login screen", async ({ page }) => {
  94  |   const step = await steps(page, "family-logout");
  95  |   const api = await fakeFamily(page);
  96  |   await openSettings(page, step);
  97  |   await page.getByRole("button", { name: "Log out" }).click();
  98  |   await expect(page.getByLabel("Your email")).toBeVisible();
  99  |   expect(api.loggedIn).toBe(false);
  100 | });
  101 | 
```