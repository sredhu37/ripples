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
    video: "on",
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
