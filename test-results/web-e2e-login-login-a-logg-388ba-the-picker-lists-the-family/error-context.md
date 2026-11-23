# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web/e2e/login.spec.ts >> login: a logged-out device opens the login screen, then the picker lists the family
- Location: web/e2e/login.spec.ts:7:1

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "./", waiting until "load"

```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { GOOD_CODE, fakeFamily, steps } from "./evidence";
  3  | 
  4  | // The spec runs against the built app without an API, so fakeFamily answers /api/auth.
  5  | // The real flow (codes, attempts, cookies) is tested against the API in server/auth.test.ts.
  6  | 
  7  | test("login: a logged-out device opens the login screen, then the picker lists the family", async ({
  8  |   page,
  9  | }) => {
  10 |   const step = await steps(page, "login");
  11 |   await fakeFamily(page, { loggedIn: false, kids: [{ nickname: "Ava" }, { nickname: "Ben" }] });
> 12 |   await page.goto("./");
     |              ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  13 |   await expect(page.getByLabel("Your email")).toBeVisible();
  14 |   await step();
  15 | 
  16 |   await page.getByLabel("Your email").fill("mum@example.com");
  17 |   await page.getByRole("button", { name: "Send my code" }).click();
  18 |   await expect(page.getByText("Check your spam folder")).toBeVisible();
  19 |   await expect(page.getByRole("button", { name: /Send a new code in \d+ s/ })).toBeDisabled();
  20 |   await step();
  21 | 
  22 |   // Wrong code: an error, still on the code screen.
  23 |   await page.getByLabel("6-digit code").fill("000000");
  24 |   await page.getByRole("button", { name: "Log in", exact: true }).click();
  25 |   await expect(page.getByRole("alert")).toContainText("not right");
  26 |   await step();
  27 | 
  28 |   // Right code: the picker with both kids.
  29 |   await page.getByLabel("6-digit code").fill(GOOD_CODE);
  30 |   await page.getByRole("button", { name: "Log in", exact: true }).click();
  31 |   await expect(page.getByRole("heading", { name: "Who is playing?" })).toBeVisible();
  32 |   await expect(page.getByRole("button", { name: "Ava", exact: true })).toBeVisible();
  33 |   await expect(page.getByRole("button", { name: "Ben", exact: true })).toBeVisible();
  34 |   await step();
  35 | });
  36 | 
```