import { expect, test, type Page } from "@playwright/test";
import manifestDe from "../src/voice/manifest.de.json" with { type: "json" };
import manifestEn from "../src/voice/manifest.en.json" with { type: "json" };
import { lineKey } from "../src/voice/key";
import { fakeFamily, openTrail, steps } from "./evidence";

const MANIFEST: Record<string, Record<string, string>> = { en: manifestEn, de: manifestDe };

/** Counts what the app plays (the kid has sound on; the spy keeps the run silent): voice files (Web Audio) and device-voice lines. */
async function spyOnSound(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as { played: { files: number; device: string[] } };
    w.played = { files: 0, device: [] };
    const start = AudioBufferSourceNode.prototype.start;
    AudioBufferSourceNode.prototype.start = function (...args: Parameters<typeof start>) {
      w.played.files += 1;
      return start.apply(this, args);
    };
    speechSynthesis.speak = (u: SpeechSynthesisUtterance) => {
      w.played.device.push(u.text);
    };
  });
}

const played = (page: Page) =>
  page.evaluate(
    () => (window as unknown as { played: { files: number; device: string[] } }).played,
  );

/** The voice file the app asks for while `tap` runs. */
async function fileFor(page: Page, tap: () => Promise<void>) {
  const response = page.waitForResponse((r) => r.url().includes("/audio/"));
  await tap();
  return response;
}

test("voice: Otto's greeting plays its voice file, also offline after the first play", async ({
  page,
  context,
}) => {
  const step = await steps(page, "voice");
  await spyOnSound(page);
  await fakeFamily(page, { kids: [{ muted: false }] });
  await openTrail(page);
  // The service worker keeps each voice file, so wait until it controls the page.
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise((r) => navigator.serviceWorker.addEventListener("controllerchange", r));
    }
  });
  await expect(page.locator(".bubble")).toContainText("Hi Ava!");
  await step();

  // The greeting shows the kid's name; its voice file says the line without it.
  const speaker = page.getByRole("button", { name: "Read aloud" });
  const first = await fileFor(page, () => speaker.click());
  const id = MANIFEST.en[lineKey("Hi! Pick a place on the trail.")];
  expect(first.url()).toContain(`/audio/en/${id}.m4a`);
  expect(first.status()).toBe(200);
  await expect.poll(async () => (await played(page)).files, { timeout: 10_000 }).toBe(1);
  expect((await played(page)).device).toEqual([]);
  await step();

  // Offline, the same line still plays: the service worker answers from its cache.
  await context.setOffline(true);
  const again = await fileFor(page, () => speaker.click());
  expect(again.fromServiceWorker()).toBe(true);
  await expect.poll(async () => (await played(page)).files, { timeout: 10_000 }).toBe(2);
  expect((await played(page)).device).toEqual([]);
  await context.setOffline(false);
  await step();
});

test("voice: a German kid hears Kerstin's file for the German greeting", async ({ page }) => {
  await spyOnSound(page);
  await fakeFamily(page, { kids: [{ lang: "de", muted: false }] });
  await openTrail(page);
  const response = await fileFor(page, () =>
    page.getByRole("button", { name: "Vorlesen" }).click(),
  );
  const id = MANIFEST.de[lineKey("Hallo! Such dir einen Ort auf dem Pfad aus.")];
  expect(response.url()).toContain(`/audio/de/${id}.m4a`);
  await expect.poll(async () => (await played(page)).files, { timeout: 10_000 }).toBe(1);
});

test("voice: a line without a voice file falls back to the device voice", async ({
  page,
  context,
}) => {
  await spyOnSound(page);
  await fakeFamily(page, { kids: [{ muted: false }] });
  // On the context, not the page: the service worker's own fetch must also get the 404.
  await context.route("**/audio/**", (route) => route.fulfill({ status: 404 }));
  await openTrail(page);
  await page.getByRole("button", { name: "Read aloud" }).click();
  await expect
    .poll(async () => (await played(page)).device, { timeout: 10_000 })
    .toEqual(["Hi Ava! Pick a place on the trail."]);
  expect((await played(page)).files).toBe(0);
});
