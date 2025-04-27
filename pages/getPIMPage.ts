import { Page } from "@playwright/test";

export type GetPIMPageReturn = ReturnType<typeof getPIMPage>;

export const getPIMPage = (page: Page) => ({
  // Navigation
  navigateToPIM: async () => {
    await page.getByRole("link", { name: "PIM" }).click();
  },

  // Search functionality
  searchEmployee: async (employeeName: string) => {
    await page.getByPlaceholder("Type for hints...").first().fill(employeeName);
    await page.getByRole("button", { name: "Search" }).click();
    await page.waitForLoadState("networkidle");
  },

  // Delete employee
  deleteEmployee: async (employeeName: string) => {
    const rows = await page.locator("div.oxd-table-card").all();
    for (const row of rows) {
      const name = await row
        .locator("div")
        .filter({ hasText: employeeName })
        .first()
        .textContent();
      if (name?.includes(employeeName)) {
        await row.locator("i.bi-trash").click();
        await page.getByText("Are you Sure?").waitFor();
        await page.locator("button").filter({ hasText: "Yes, Delete" }).click();
        await page.getByText("Successfully Deleted").waitFor();
        break;
      }
    }
  },

  // Add employee functionality
  clickAddEmployee: async () => {
    await page.getByRole("button", { name: "Add" }).click();
  },

  fillEmployeeDetails: async (
    firstName: string,
    middleName: string | null,
    lastName: string
  ) => {
    await page.getByPlaceholder("First Name").fill(firstName);
    middleName !== null &&
      (await page.getByPlaceholder("Middle Name").fill(middleName));
    await page.getByPlaceholder("Last Name").fill(lastName);
  },

  enableLoginDetails: async () => {
    await page.locator(".oxd-switch-input").click();
  },

  fillLoginDetails: async (username: string, password: string) => {
    await page
      .locator(
        "div:nth-child(4) > .oxd-grid-2 > div > .oxd-input-group > div:nth-child(2) > .oxd-input"
      )
      .fill(username);
    await page.locator('input[type="password"]').first().fill(password);
    await page.locator('input[type="password"]').nth(1).fill(password);
    await page.getByText("Enabled").click();
  },

  saveEmployee: async () => {
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByText("Successfully Saved").waitFor();
  },
});
