import { expect, test } from "@playwright/test";
import { fakeFamily } from "./evidence";

const WIDTHS = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 820, height: 1180 },
  { width: 1366, height: 900 },
];

for (const size of WIDTHS) {
  test(`trail header: every control fits and is tappable at ${size.width}px`, async ({ page }) => {
    await page.setViewportSize(size);
    await fakeFamily(page);
    await page.goto("./");
    await page.getByRole("button", { name: "Ava", exact: true }).click();

    // The kid's villager and nickname are the profile switch.
    const profile = page.getByRole("button", { name: "Switch profile: Ava" });
    await expect(profile).toBeVisible();
    await expect(profile.locator(".profile-face")).toHaveAttribute("data-avatar", "Finn");
    await expect(profile).toContainText("Ava");
    await expect(page.getByText("Change kid")).toHaveCount(0);
    // The nickname is not clipped.
    const clipped = await profile
      .locator(".profile-name")
      .evaluate((el) => el.scrollWidth > el.clientWidth);
    expect(clipped).toBe(false);

    // Icon buttons carry a visible label.
    await expect(page.locator(".labeled-btn")).toHaveText(["Sound", "Timeline", "Parents"]);

    // No horizontal scroll.
    const widths = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      view: document.documentElement.clientWidth,
    }));
    expect(widths.scroll).toBe(widths.view);

    // Profile switch and labelled buttons meet the 60px touch target.
    for (const c of [profile, ...(await page.locator(".labeled-btn").all())]) {
      expect((await c.boundingBox())!.height).toBeGreaterThanOrEqual(60);
    }

    // Every control is at least 44x44 and a click lands on it (no force).
    const controls = [
      profile,
      page.getByRole("button", { name: "EN", exact: true }),
      page.getByRole("button", { name: "DE", exact: true }),
      page.getByRole("button", { name: "PL", exact: true }),
      page.getByRole("button", { name: "Sound on" }),
      page.getByRole("button", { name: "World Timeline" }),
      page.getByRole("button", { name: "For parents" }),
    ];
    for (const c of controls) {
      const box = await c.boundingBox();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
      await c.click({ trial: true });
    }

    // Tapping the profile switch opens the picker.
    await profile.click();
    await expect(page.getByRole("heading", { name: "Who is playing?" })).toBeVisible();
  });
}
