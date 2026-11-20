import { expect, test } from "@playwright/test";
import { passParentGate, seedProgress, steps } from "./evidence";

// The spec runs without an API, so /api/auth and /api/legal are answered here.
test("legal pages: linked from login and profile, Impressum details come from the API, in EN and DE", async ({
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
  await page.route("**/api/auth/**", (route) => {
    const url = route.request().url();
    const body = url.endsWith("/get-session") ? "null" : "{}";
    return route.fulfill({ status: 200, contentType: "application/json", body });
  });

  await seedProgress(page);
  await page.goto("./");
  await passParentGate(page, step);
  await page.getByRole("button", { name: "Log in", exact: true }).click();

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
  await page.getByRole("button", { name: "Zurueck" }).click();
  await expect(page.getByRole("button", { name: "Impressum" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Datenschutz" })).toBeVisible();
  await step();
});
