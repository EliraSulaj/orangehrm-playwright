import { test, expect } from "@playwright/test";
import { getLoginPage, GetLoginPageReturn } from "../../pages/getLoginPage";
import { getPIMPage, GetPIMPageReturn } from "../../pages/getPIMPage";
import { getHeader, GetHeaderReturn } from "../../components/getHeader";
import { Credentials } from "../../data/credentials";
import { screenshotPath } from "../../utils/constants";
import * as path from "path";

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
  const csvFilePath = path.resolve(
    __dirname,
    "../../data/import_employees.csv"
  );

  test("should add a new employee and verify login", async ({ page }) => {
    // Clean up existing user
    await pimPage.searchEmployee(Credentials.firstEmployee.firstName);
    await pimPage.deleteEmployee(Credentials.firstEmployee.firstName);

    // Add new employee
    await pimPage.clickAddEmployee();
    await expect(page).toHaveURL(/.*addEmployee/);

    // Fill employee details
    await pimPage.fillEmployeeDetails(
      Credentials.firstEmployee.firstName,
      Credentials.firstEmployee.middleName,
      Credentials.firstEmployee.lastName
    );
    await pimPage.enableLoginDetails();
    await pimPage.fillLoginDetails(
      Credentials.firstEmployee.username,
      Credentials.firstEmployee.password
    );
    await pimPage.saveEmployee();

    // Logout as admin
    await header.logout();

    // Login as new employee
    await loginPage.login(
      Credentials.firstEmployee.username,
      Credentials.firstEmployee.password
    );

    // Verify successful login
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(
      page.getByText(
        `${Credentials.firstEmployee.firstName} ${Credentials.firstEmployee.lastName}`
      )
    ).toBeVisible();
  });

  test("Upload CSV file to PIM Data Import", async ({ page }) => {
    const pimPage: GetPIMPageReturn = getPIMPage(page);

    // Navigate to PIM → Configuration → Data Import
    await pimPage.navigateToPIM();
    await page.click("text=Configuration");
    await page.click("text=Data Import");
    //await expect(page).toHaveURL(/.*importData/);

    // Upload CSV file
    await page.setInputFiles("input[type='file']", csvFilePath);
    await page.click("button:has-text('Upload')");

    try {
      // First check if "No Records Imported" popup appears
      const noRecordsPopup = page.locator('text="No Records Imported"');
      const importDetailsPopup = page.locator('text="Import Details"');

      if (await importDetailsPopup.isVisible()) {
        if (await noRecordsPopup.isVisible()) {
          // Take a screenshot of the error state
          await page.screenshot({ path: screenshotPath, fullPage: true });
          console.log(`Screenshot saved at: ${screenshotPath}`);

          // Click OK button to close the popup
          //await page.click('button:has-text("Ok")');
          await page.locator('button:text("Ok")').click();

          console.log(`Screenshot saved at: ${screenshotPath}`);
        }
      }

      // Check for successful import message
      await expect(page.locator("text=Import Successful")).toBeVisible();
      console.log("CSV file uploaded successfully.");
    } catch (error) {
      console.error("CSV import verification failed:", error.message);

      // Take a screenshot of the error state
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot saved at: ${screenshotPath}`);

      // Log additional page state information
      const pageContent = await page.content();
      console.log("Current page content:", pageContent);

      throw new Error(
        `CSV import verification failed: Import success message not found. Screenshot saved at: ${screenshotPath}`
      );
    }
  });

  test("should add timesheet data", async ({ page }) => {
    //const pimPage: GetPIMPageReturn = getPIMPage(page);
    // Navigate to PIM → Timesheets
    //await pimPage.navigateToPIM();
    //await page.click("text=Timesheets");
  });
});
