import fs from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

/** Pause before each screenshot so a human can follow the video. */
export const PAUSE_MS = 800;

export type Lang = "en" | "de" | "pl";

/**
 * Screenshot recorder for one test. Each call to the returned function waits
 * PAUSE_MS and saves test-results/<name>/step-<k>.png. It also writes
 * video.txt with the path of the test's video, so CI can find it.
 */
export async function steps(page: Page, name: string): Promise<() => Promise<void>> {
  const dir = path.join(test.info().project.outputDir, name);
  fs.mkdirSync(dir, { recursive: true });
  // Playwright moves the video here when the test ends.
  fs.writeFileSync(path.join(dir, "video.txt"), path.join(test.info().outputDir, "video.webm"));
  let k = 0;
  return async () => {
    await page.waitForTimeout(PAUSE_MS);
    k += 1;
    await page.screenshot({ path: path.join(dir, `step-${k}.png`) });
  };
}

/** Saved progress the app reads on load (key and shape from src/progress.ts). */
export async function seedProgress(
  page: Page,
  progress: { lang?: Lang; badges?: string[]; disabledLessons?: string[] } = {},
) {
  const value = JSON.stringify({
    name: "Ava",
    lang: progress.lang ?? "en",
    muted: true,
    badges: progress.badges ?? [],
    disabledLessons: progress.disabledLessons ?? [],
  });
  await page.addInitScript((v) => {
    window.localStorage.setItem("ripples.progress.v1", v);
  }, value);
}

/** Labels from src/i18n.ts that the specs click or check. */
export const LABEL = {
  parents: { en: "For parents", de: "Fuer Eltern", pl: "Strefa rodzica" },
  gateGo: { en: "Open", de: "Oeffnen", pl: "Otwórz" },
  next: { en: "Next", de: "Weiter", pl: "Dalej" },
  factCards: { en: "Fact cards", de: "Fakten-Karten", pl: "Karty faktów" },
  worldTimeline: { en: "World Timeline", de: "Weltzeitleiste", pl: "Oś czasu świata" },
} as const;

/** Opens the parent gate from the map and answers the maths question. */
export async function passParentGate(page: Page, step: () => Promise<void>, lang: Lang = "en") {
  await page.getByRole("button", { name: LABEL.parents[lang] }).click();
  const question = page.locator("form.panel p").first();
  await expect(question).toContainText("×");
  const [a, b] = ((await question.textContent()) ?? "").match(/\d+/g)!.map(Number);
  const input = page.getByRole("textbox");
  await input.fill(String(a * b + 1));
  await page.getByRole("button", { name: LABEL.gateGo[lang] }).click();
  await expect(page.getByRole("alert")).toBeVisible();
  await step();
  await input.fill(String(a * b));
  await step();
  await page.getByRole("button", { name: LABEL.gateGo[lang] }).click();
}
