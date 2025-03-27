import { Locator, Page } from "@playwright/test";

export interface GetNavigationMenuReturn {
  clickToggle: () => Promise<void>;
  getMenuSider: () => Locator;
  getMenuList: () => Locator;
  search: (text: string) => Promise<void>;
}

export const getNavigationMenu = (page: Page): GetNavigationMenuReturn => ({
  clickToggle: () => page.locator(".oxd-main-menu-button").click(),
  getMenuSider: () => page.locator("aside.oxd-sidepanel"),
  search: (text) => page.locator('input[placeholder="Search"]').fill(text),
  getMenuList: () => page.locator("ul.oxd-main-menu > li"),
});
