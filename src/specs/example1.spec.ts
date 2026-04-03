// import { credentials } from "../resources/data/credentials";
import { test, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { LoginPage } from "../pages/LoginPage";
import { credentials } from "../resources/data/credentials";

test.describe("MTA Swantech Tests", () => {
  let basepage: BasePage;
  let loginPage: LoginPage;

  let xpath = {
    DaotaoDanhmucBtn: "//a[text() = 'Đào tạo']",
    DaotaoDanhmucBtn1: "xpath=/html/body/div[8]/div/ul/li[6]/div/span/a",
    DaotaoDanhmucBtn2: "xpath=/html/body/div[3]/div/ul/li[6]/div", ///html/body/div[3]/div/ul/li[5]/span/a
  };

  test.beforeEach(async ({ page }) => {
    // Đi tới trang chủ
    basepage = new BasePage(page);
    await basepage.openPage();
    await page.waitForTimeout(2000);

    // Đăng nhập tài khoản
    loginPage = new LoginPage(page);
    await loginPage.login(
      credentials.admin.username,
      credentials.admin.password
    );
  });

  test("abcd", async ({ page }) => {
    await page.getByRole("link", { name: "Đào tạo" }).click();
    await page.waitForTimeout(3000);

    await page.getByText("Danh mục").hover();
    await page.waitForTimeout(2000);

    // Các cách để hover vào menu Đào tạo
    //await page.getByText("Đào tạo", { exact: true }).click();
    await page.getByText("Đào tạo", { exact: true }).hover();
    //await page.getByText("Đào tạo").click(); // Ko nên
    //await page.locator(xpath.DaotaoDanhmucBtn1).hover(); // Ko nên
    //await page.locator('.ant-menu-submenu-title:has-text("Đào tạo")').hover(); // Ko nên
    //await page.locator('a:has-text("Đào tạo")').hover(); Ko nên
    //await page.getByRole("menuitem", { name: "Đào tạo" }).hover(); // Ko nên
    //await page.locator('text="Đào tạo"').hover(); // NÊN
    //await page.waitForTimeout(5000);

    // Các cách để click vào menu Khu vực đào tạo
    await page.getByRole("link", { name: "Khu vực đào tạo" }).click();
    //await page.getByText("Khu vực đào tạo").click();
    //await page.locator('a:has-text("Khu vực đào tạo")').click();
    //await page.waitForTimeout(1000);

    // Click button đầu tiên của bảng
    const expandBtn = page.locator("tr.ant-table-row >> button.ant-table-row-expand-icon").first();
    await expandBtn.click();

    // Cách click hàng đầu tiên
    // const firstRow = page.locator('tbody.ant-table-tbody tr').first();
    // const firstRow = page.locator('tbody.ant-table-tbody tr').nth(0);
    // await firstRow.click();
    // const firstCell = page.locator("tbody.ant-table-tbody tr").first().locator("td").first();
    // await page.locator('tbody.ant-table-tbody tr >> td').first().click();
    // await firstCell.click();


    // cách lấy icon đầu tiên
    //await page.locator("td.ant-table-cell-fix-right svg.lucide-pencil").click();
    await page.locator("td svg").first().click();
    // cách lấy icon thứ 2
    // await page.locator("td.ant-table-cell-fix-right").locator("svg").nth(1).click();
    // // cách lấy icon thứ 3
    // await page.locator("td.ant-table-cell-fix-right").locator("svg").nth(2).click();
  });
});
