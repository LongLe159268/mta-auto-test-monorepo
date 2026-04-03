import { Page } from "@playwright/test";

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  };

  async openPage() {
    //await this.page.goto("http://localhost:3000/lms/home");
    await this.page.goto("https://mta.swantech.vn/sso-portal/");
  };
};
