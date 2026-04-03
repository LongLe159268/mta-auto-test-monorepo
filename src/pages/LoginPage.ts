import { Page } from "@playwright/test";

export class LoginPage {
  page: Page;
  xpathSignInUsername = "//input[@id='username']"
  xpathSignInpassword = "//input[@id='password']"
  xpathBtnToggle = "//button[@id = 'toggle-password']"
  xpathRememberMe = "//input[@id = 'rememberMe']"
  btnSignIn = "//button[@id='kc-login']"
  linkForgotPassword = "//a[@id='forgot-password']"

  constructor(page: Page) {
    this.page = page;
  };

  async login(username: string, password: string) {
    await this.page.locator(this.xpathSignInUsername).pressSequentially(username, { delay: 100 });
    await this.page.locator(this.xpathBtnToggle).click();
    await this.page.locator(this.xpathSignInpassword).pressSequentially(password, { delay: 100 });
    await this.page.click(this.btnSignIn);
  };
};
