import { test, expect } from "@playwright/test";
import { Credentials } from "../../utils/constants";
import {
  getDashboardPage,
  GetDashboardPageReturn,
} from "../../pages/getDashboardPage";
import { getLoginPage, GetLoginPageReturn } from "../../pages/getLoginPage";
import {
  getNavigationMenu,
  GetNavigationMenuReturn,
} from "../../components/getNavigationMenu";
import { generateRandomString } from "../../utils/helpers";

test.describe("OrangeHRM Navigation Tests", () => {
  let dashboardPage: GetDashboardPageReturn;
  let loginPage: GetLoginPageReturn;
  let navigationMenu: GetNavigationMenuReturn;

  test.beforeEach(async ({ page }) => {
    loginPage = getLoginPage(page);
    dashboardPage = getDashboardPage(page);
    navigationMenu = getNavigationMenu(page);
    await loginPage.navigateToLogin();
    await loginPage.login(
      Credentials.admin.username,
      Credentials.admin.password
    );
  });

  test("Side menu to be visible", async () => {
    const sidebar = navigationMenu.getMenuSider();
    await expect(sidebar).toBeVisible();
  });

  test("Collapse side menu", async () => {
    await navigationMenu.clickToggle();

    const sidebar = navigationMenu.getMenuSider();

    expect(sidebar).toHaveClass("oxd-sidepanel toggled");
  });

  test("Expand side menu", async () => {
    await navigationMenu.clickToggle();

    await navigationMenu.clickToggle();

    const sidebar = navigationMenu.getMenuSider();

    expect(sidebar).toHaveClass("oxd-sidepanel");
  });

  test("Verify all menu items contain a certain text", async ({ page }) => {
    await navigationMenu.search("rec");

    const menuList = navigationMenu.getMenuList();

    const allTexts = await menuList.allInnerTexts();

    // Check if all texts contain the search text
    const allContainText =
      allTexts[0] === "Recruitment" && allTexts[1] === "Directory";

    expect(allContainText).toBeTruthy();
  });
});
