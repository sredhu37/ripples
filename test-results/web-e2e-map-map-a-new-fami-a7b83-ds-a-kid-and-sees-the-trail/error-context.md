# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web/e2e/map.spec.ts >> map: a new family logs in, adds a kid and sees the trail
- Location: web/e2e/map.spec.ts:13:1

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "./", waiting until "load"

```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { GOOD_CODE, fakeFamily, openTrail, steps } from "./evidence";
  3  | 
  4  | test("map: a Paused lesson is not on the trail and numbers stay consecutive", async ({ page }) => {
  5  |   await fakeFamily(page);
  6  |   await page.route("**/api/features", (route) => route.fulfill({ json: { "show-loans": false } }));
  7  |   await openTrail(page);
  8  |   const stops = page.locator(".trail button.place");
  9  |   await expect(page.getByText("Loans", { exact: true })).toHaveCount(0);
  10 |   await expect(stops.nth(5)).toContainText("6. Banks");
  11 | });
  12 | 
  13 | test("map: a new family logs in, adds a kid and sees the trail", async ({ page }) => {
  14 |   const step = await steps(page, "map");
  15 |   await fakeFamily(page, { loggedIn: false, kids: [] });
> 16 |   await page.goto("./");
     |              ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  17 | 
  18 |   // Log in. A family with no profile lands on the first-run screen.
  19 |   await page.getByLabel("Your email").fill("mum@example.com");
  20 |   await page.getByRole("button", { name: "Send my code" }).click();
  21 |   await page.getByLabel("6-digit code").fill(GOOD_CODE);
  22 |   await page.getByRole("button", { name: "Log in", exact: true }).click();
  23 |   await expect(page.getByRole("heading", { name: "Who is learning with Otto?" })).toBeVisible();
  24 |   await expect(page.getByRole("heading", { name: "Family settings" })).toHaveCount(0);
  25 |   await step();
  26 | 
  27 |   // An empty nickname cannot be sent.
  28 |   await expect(page.getByRole("button", { name: "Add", exact: true })).toBeDisabled();
  29 |   await page.getByLabel("Nickname").fill("Ava");
  30 |   await step();
  31 |   await page.getByRole("button", { name: "Add", exact: true }).click();
  32 |   await expect(page.getByRole("heading", { name: "Who is playing?" })).toBeVisible();
  33 | 
  34 |   // The picker shows Ava; one tap opens her trail.
  35 |   await page.getByRole("button", { name: "Ava", exact: true }).click();
  36 |   await expect(page.getByRole("heading", { level: 1, name: "Ripples" })).toBeVisible();
  37 |   await expect(page.getByText("Hi Ava! Pick a place on the trail.")).toBeVisible();
  38 |   const stops = page.locator(".trail button.place");
  39 |   expect(await stops.count()).toBeGreaterThan(10);
  40 |   await expect(stops.first()).toBeEnabled();
  41 |   await expect(stops.nth(1)).toBeDisabled();
  42 |   await expect(page.getByRole("button", { name: /^Continue: / })).toBeVisible();
  43 |   await step();
  44 | 
  45 |   // Switch language: the trail and greeting follow.
  46 |   await page.getByRole("button", { name: "DE", exact: true }).click();
  47 |   await expect(page.getByText("Hallo Ava! Such dir einen Ort auf dem Pfad aus.")).toBeVisible();
  48 |   await expect(page.getByRole("button", { name: /^Weiter: / })).toBeVisible();
  49 |   await step();
  50 |   await page.getByRole("button", { name: "PL", exact: true }).click();
  51 |   await expect(page.getByText("Cześć Ava! Wybierz miejsce na ścieżce.")).toBeVisible();
  52 |   await page.locator(".trail").scrollIntoViewIfNeeded();
  53 |   await step();
  54 | });
  55 | 
```