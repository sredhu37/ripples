import { expect, test } from "@playwright/test";
import { fakeFamily, steps } from "./evidence";

// The spec runs without an API, so /api/legal is answered here and the rest by fakeFamily.
test("legal pages: linked from login, Impressum details come from the API, in EN and DE", async ({
  page,
}) => {
  const step = await steps(page, "legal");
  await page.route("**/api/legal", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        name: "Test Person",
        address: ["Test Street 1", "00000 Testtown"],
        email: "legal@example.com",
        phone: null,
        vatId: null,
      }),
    }),
  );

  // A logged-out device opens the login screen.
  await fakeFamily(page, { loggedIn: false });
  await page.goto("./");
  await expect(page.getByLabel("Your email")).toBeVisible();

  // From the login screen.
  await page.getByRole("button", { name: "Legal notice" }).click();
  await expect(page.getByRole("heading", { name: "Legal notice (Impressum)" })).toBeVisible();
  await expect(page.getByText("Test Person")).toBeVisible();
  await expect(page.getByText("legal@example.com")).toBeVisible();
  await step();

  await page.getByRole("button", { name: "Privacy policy" }).click();
  await expect(page.getByRole("heading", { name: "Privacy policy", level: 2 })).toBeVisible();
  await expect(page.getByText("Frankfurt").first()).toBeVisible();
  await step();

  await page.getByRole("button", { name: "Terms" }).click();
  await expect(page.getByRole("heading", { name: "Terms", level: 2 })).toBeVisible();
  await step();

  // German.
  await page.getByRole("button", { name: "DE", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Nutzungsbedingungen", level: 2 })).toBeVisible();
  await step();

  // Back to the login screen.
  await page.getByRole("button", { name: "Zurück" }).click();
  await expect(page.getByRole("button", { name: "Impressum" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Datenschutz" })).toBeVisible();
  await step();
});
