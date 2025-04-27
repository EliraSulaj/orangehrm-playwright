import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  reporter: "html",
  use: {
    baseURL: "https://opensource-demo.orangehrmlive.com/",
    headless: false, // Set to `true` in CI/CD
    screenshot: "on",
  },
});
