import { test, expect } from "@playwright/test";
import { getLoginPage, GetLoginPageReturn } from "../../pages/getLoginPage";
import { getPIMPage, GetPIMPageReturn } from "../../pages/getPIMPage";
import { GetHeaderReturn, getHeader } from "../../components/getHeader";
import { Credentials } from "../../data/credentials";

test.describe("Employee Management", () => {
  let header: GetHeaderReturn;
  let loginPage: GetLoginPageReturn;
  let pimPage: GetPIMPageReturn;

  test.beforeEach(async ({ page }) => {
    loginPage = getLoginPage(page);
    pimPage = getPIMPage(page);
    header = getHeader(page);

    // Common setup: Login as admin and navigate to PIM
    await loginPage.navigateToLogin();
    await loginPage.login(
      Credentials.admin.username,
      Credentials.admin.password
    );
    await pimPage.navigateToPIM();
    await expect(page).toHaveURL(/.*viewEmployeeList/);
  });

  test("show error message when employee already exists", async ({ page }) => {
    // Clean up existing user
    await pimPage.searchEmployee(
      `${Credentials.secondEmployee.firstName} ${Credentials.secondEmployee.middleName}`
    );
    await pimPage.deleteEmployee(
      `${Credentials.secondEmployee.firstName} ${Credentials.secondEmployee.middleName}`
    );

    // Add first employee
    await pimPage.clickAddEmployee();
    await expect(page).toHaveURL(/.*addEmployee/);

    await pimPage.fillEmployeeDetails(
      Credentials.secondEmployee.firstName,
      Credentials.secondEmployee.middleName,
      Credentials.secondEmployee.lastName
    );
    await pimPage.enableLoginDetails();
    await pimPage.fillLoginDetails(
      Credentials.secondEmployee.username,
      Credentials.secondEmployee.password
    );
    await pimPage.saveEmployee();

    // Try to add duplicate employee
    await pimPage.navigateToPIM();
    await expect(page).toHaveURL(/.*viewEmployeeList/);
    await pimPage.clickAddEmployee();
    await expect(page).toHaveURL(/.*addEmployee/);

    // Fill duplicate employee details
    await pimPage.fillEmployeeDetails(
      Credentials.secondEmployee.firstName,
      Credentials.secondEmployee.middleName,
      Credentials.secondEmployee.lastName
    );
    await pimPage.enableLoginDetails();
    await pimPage.fillLoginDetails(
      Credentials.secondEmployee.username,
      Credentials.secondEmployee.password
    );
    await expect(page.getByText("Username already exists")).toBeVisible();
  });
});
