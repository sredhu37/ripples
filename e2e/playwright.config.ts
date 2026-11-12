import { defineConfig } from "@playwright/test";

// The app is served under /ripples/ (vite.config.ts `base`).
const PORT = 4744;

export default defineConfig({
  testDir: ".",
  outputDir: "test-results",
  timeout: 120_000,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [["list"], ["github"]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}/ripples/`,
    // The walkthrough video shows a pointer moving to every click and outlines the clicked element.
    video: {
      mode: "on",
      size: { width: 1280, height: 720 },
      show: {
        actions: {
          duration: 900,
          cursor: "pointer",
          position: "top",
          style: {
            highlight:
              "outline: 4px solid #ff3b30; border-radius: 8px; background: rgba(255, 59, 48, 0.12)",
            point:
              "width: 32px; height: 32px; margin: -16px 0 0 -16px; border-radius: 50%; border: 3px solid #ff3b30; background: rgba(255, 59, 48, 0.35)",
          },
        },
      },
    },
    // Pause after every action so a person can follow the walkthrough.
    launchOptions: { slowMo: 600 },
    actionTimeout: 15_000,
    viewport: { width: 1280, height: 720 },
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
  webServer: {
    command: `npm run build && npm run preview -- --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}/ripples/`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    cwd: "..",
  },
});
