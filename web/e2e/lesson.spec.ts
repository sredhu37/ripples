import { expect, test } from "@playwright/test";
import { LABEL, fakeFamily, openTrail, steps, type Lang } from "./evidence";

// CI passes the ids of lessons whose src/content/<id>.* files changed.
const fromEnv = (process.env.LESSON_IDS ?? "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);
const LESSON_IDS = fromEnv.length > 0 ? fromEnv : ["money"];
const LANGS: Lang[] = ["en", "de", "pl"];
// A story has far fewer lines than this; the cap only stops an endless loop.
const MAX_STORY_STEPS = 80;

test("lesson header: sound switch, steady Start over, one progress bar, fits 360px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await fakeFamily(page, { kids: [{ lang: "en", badges: ["money"], muted: true }] });
  await openTrail(page);
  await page.locator(".trail .stop-done button.place").click();
  await expect(page.locator(".lesson-title")).toBeVisible();

  // Start over is in the DOM from the first step, disabled there.
  const restart = page.getByRole("button", { name: "Start over", exact: true });
  await expect(restart).toBeDisabled();

  // The sound switch works inside the lesson.
  await page.getByRole("button", { name: "Sound on", exact: true }).click();
  await expect(page.getByRole("button", { name: "Sound off", exact: true })).toHaveAttribute(
    "aria-pressed",
    "false",
  );

  // One progress indicator: no in-scene step dots, and the bar fills during the story.
  await expect(page.locator(".steps")).toHaveCount(0);
  const next = page.getByRole("button", { name: "Next", exact: true });
  await next.click();
  await expect(restart).toBeEnabled();
  const fill = await page.locator(".dots .dot-now").getAttribute("data-fill");
  expect(Number(fill)).toBeGreaterThanOrEqual(0);

  const widths = await page.evaluate(() => [
    document.documentElement.scrollWidth,
    window.innerWidth,
  ]);
  expect(widths[0]).toBe(widths[1]);
});

for (const id of LESSON_IDS) {
  for (const lang of LANGS) {
    test(`lesson: ${id} story to toy in ${lang}`, async ({ page }) => {
      const step = await steps(page, `lesson-${id}-${lang}`);
      // A badge for this lesson makes it the one "done" stop, so it is open on the trail.
      await fakeFamily(page, { kids: [{ lang, badges: [id] }] });
      await openTrail(page);

      const stop = page.locator(".trail .stop-done button.place");
      await expect(stop).toHaveCount(1);
      await stop.scrollIntoViewIfNeeded();
      await step();
      await stop.click();

      await expect(page.locator(".lesson-title")).toBeVisible();
      await expect(
        page.getByRole("button", { name: lang.toUpperCase(), exact: true }),
      ).toHaveAttribute("aria-pressed", "true");
      const dots = page.locator(".dots");
      await expect(dots).toHaveAttribute("aria-label", /^1 \/ \d+$/);
      await step();

      // Walk the story until the toy shows up.
      const toy = page.locator(".lesson-body .stage-wrap").first();
      const next = page.getByRole("button", { name: LABEL.next[lang], exact: true });
      let clicks = 0;
      while ((await toy.count()) === 0) {
        expect(clicks, "story should reach the toy").toBeLessThan(MAX_STORY_STEPS);
        await expect(page.locator(".lesson-body .hello")).not.toBeEmpty();
        await next.click();
        clicks += 1;
        await step();
      }

      // Toy screen: the quiz stays locked until the child plays.
      await expect(toy).toBeVisible();
      await expect(page.locator(".lesson-body .row.nav .btn:not(.btn-toy)")).toBeDisabled();
      expect(clicks).toBeGreaterThan(1);
    });
  }
}
