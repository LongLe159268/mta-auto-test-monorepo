import { test, expect } from "@playwright/test";
import { BasePage } from "../../../pages/BasePage";
import { LoginPage } from "../../../pages/LoginPage";
import { credentials } from "../../../resources/data/credentials";

test.describe("Tạo danh mục đào tạo", () => {
  let basepage: BasePage;
  let loginPage: LoginPage;

  let xpath = {
    BtnMaBacDT: '//input[@id = "code"]',
    BtnTenBacDT: '//input[@id = "name"]',
  };

  test.beforeEach(async ({ page }) => {
    // Đi tới trang chủ
    basepage = new BasePage(page);
    await basepage.openPage();
    await page.waitForTimeout(2000);

    // Đăng nhập tài khoản
    loginPage = new LoginPage(page);
    await loginPage.login(credentials.P2qldt.username, credentials.P2qldt.password);
    //await page.waitForTimeout(3000);

    await page.getByRole("link", { name: "Đào tạo" }).click();
    //await page.waitForTimeout(2000);
  });

  test("Tạo Bậc đào tạo", async ({ page }) => {
    // Đi đến mục Bậc đào tạo
    await page.getByText("Danh mục").hover();
    await page.waitForTimeout(2000);
    await page.getByText("Đào tạo", { exact: true }).hover();
    await page.getByRole("link", { name: "Bậc đào tạo" }).click();

    // Nhấn nút thêm mới
    await page.getByRole("button", { name: "Thêm mới" }).click();

    await page.locator(xpath.BtnMaBacDT).fill("1");
    await page.locator(xpath.BtnTenBacDT).fill("Giáo sư");

    await page.getByRole("button", { name: "Lưu" }).click();
  });
});
