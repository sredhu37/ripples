/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Only the export step of `npm run voices` (scripts/voices-export.ts). Kept out of `npm test` on
// purpose: it writes files.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["scripts/voices-export.ts"],
  },
});
