import { test, expect } from "@playwright/test";
import {
  getDashboardPage,
  GetDashboardPageReturn,
} from "../../pages/getDashboardPage";
import { getLoginPage, GetLoginPageReturn } from "../../pages/getLoginPage";
import { getHeader, GetHeaderReturn } from "../../components/getHeader";
import { Credentials } from "../../utils/constants";

test.describe("OrangeHRM Logout Tests", () => {
  let dashboardPage: GetDashboardPageReturn;
  let loginPage: GetLoginPageReturn;
  let header: GetHeaderReturn;

  test.beforeEach(async ({ page }) => {
    loginPage = getLoginPage(page);
    dashboardPage = getDashboardPage(page);
    header = getHeader(page);
    await loginPage.navigateToLogin();
  });

  test("Logout from Dashboard", async ({ page }) => {
    // Step 1: Log in
    await loginPage.navigateToLogin();
    await loginPage.login(
      Credentials.admin.username,
      Credentials.admin.password
    );

    // Step 2: Log out
    await header.logout();

    // Step 3: Verify the login page is displayed
    await expect(loginPage.getUserNameLoginTitle()).toBeVisible();
  });
});
