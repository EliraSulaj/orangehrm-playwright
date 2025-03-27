import { Page } from "@playwright/test";

// Define the type for the return object of the DashboardPage function
export interface GetDashboardPageReturn {
  getDashboardHeaderText: () => Promise<string>;
}

// Functional approach to define dashboard page interactions
export const getDashboardPage = (page: Page): GetDashboardPageReturn => ({
  // Return the dashboard header text for validation in tests
  getDashboardHeaderText: async () => {
    const dashboardHeader = page.locator(".oxd-topbar-header-breadcrumb > h6");
    return dashboardHeader.innerText();
  },
});
