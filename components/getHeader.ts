import { Page } from "@playwright/test";

// Define the type for the return object of the DashboardPage function
export interface GetHeaderReturn {
  logout: () => Promise<void>;
}

// Functional approach to define dashboard page interactions
export const getHeader = (page: Page): GetHeaderReturn => ({
  // Return the dashboard header text for validation in tests
  logout: async () => {
    page.locator(".oxd-userdropdown-tab").click();
    const logoutButton = page.getByText("Logout");
    return await logoutButton.click();
  },
});
