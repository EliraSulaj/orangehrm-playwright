import { Locator, Page } from "@playwright/test";

export interface GetLoginPageReturn {
  navigateToLogin: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  getUsernameErrorMessage: () => Locator;
  getPasswordErrorMessage: () => Locator;
  getUserNameLoginTitle: () => Locator;
  getInvalidCredentialsErrorMessage: () => Locator;
  clickForgotPasswordLink: () => Promise<void>;
}

// Functional approach to define login page interactions
export const getLoginPage = (page: Page): GetLoginPageReturn => ({
  // Navigate to the login page
  navigateToLogin: async () => {
    await page.goto("https://opensource-demo.orangehrmlive.com/");
  },

  // Log in with the provided username and password
  login: async (username: string, password: string) => {
    if (username)
      await page.getByRole("textbox", { name: /username/i }).fill(username);
    if (password)
      await page.getByRole("textbox", { name: /password/i }).fill(password);
    await page.getByRole("button", { name: /login/i }).click();
  },

  // Get locators for error messages
  getUsernameErrorMessage: () =>
    page.locator('.oxd-input-group:has(input[name="username"]) .oxd-text'),

  getPasswordErrorMessage: () =>
    page.locator('.oxd-input-group:has(input[name="password"]) .oxd-text'),

  getUserNameLoginTitle: () => page.locator(".orangehrm-login-title"),

  getInvalidCredentialsErrorMessage: () =>
    page.locator(".oxd-alert-content-text"),

  clickForgotPasswordLink: () =>
    page.locator("text=Forgot your password?").click(),
});
