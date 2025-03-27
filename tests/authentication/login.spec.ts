import { test, expect } from "@playwright/test";
import { Credentials } from "../../utils/constants";
import {
  getDashboardPage,
  GetDashboardPageReturn,
} from "../../pages/getDashboardPage";
import { getLoginPage, GetLoginPageReturn } from "../../pages/getLoginPage";

test.describe("OrangeHRM Login Tests", () => {
  let dashboardPage: GetDashboardPageReturn;
  let loginPage: GetLoginPageReturn;

  // Before each test, navigate to the login page
  test.beforeEach(async ({ page }) => {
    loginPage = getLoginPage(page);
    dashboardPage = getDashboardPage(page);
    await loginPage.navigateToLogin();
  });

  test("Successful Login", async () => {
    // Enter valid username and password
    await loginPage.login(
      Credentials.admin.username,
      Credentials.admin.password
    );

    // Verify that the dashboard page loads
    const headerText = await dashboardPage.getDashboardHeaderText();
    await expect(headerText).toBe("Dashboard");
  });

  test("Login Failed - Missing Credentials", async ({ page }) => {
    // Leave username and password fields empty
    await loginPage.login("", "");

    // Verify error messages for missing username and password
    await expect(loginPage.getUsernameErrorMessage()).toHaveText("Required");
    await expect(loginPage.getUsernameErrorMessage()).toHaveText("Required");
  });

  test("Login Failed - Incorrect Username or Password", async () => {
    //Enter incorrect username and password
    await loginPage.login(
      Credentials.invalid.username,
      Credentials.invalid.password
    );

    // Verify error message for invalid credentials
    await expect(loginPage.getInvalidCredentialsErrorMessage()).toHaveText(
      "Invalid credentials"
    );
  });

  test("Forgot Password - Click on Forgot your password link", async ({
    page,
  }) => {
    await loginPage.navigateToLogin();
    await loginPage.clickForgotPasswordLink();

    // Step 3: Verify the "Reset Password" page is displayed
    await expect(page).toHaveURL(/requestPasswordResetCode/);
  });
});
