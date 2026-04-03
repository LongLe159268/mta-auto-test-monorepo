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
    DaotaoDanhmucBtn2: "xpath=/html/body/div[3]/div/ul/li[6]/div", 
    DTDTBtn: '//input[@id="rc_select_0"]',
    SemesterBtn: '//input[@id="rc_select_1"]',
    SemesterBtn1: '//input[@aria-controls="rc_select_1_list"]',
    DaihocquansuBtn: '//div[@title = "Đại học quân sự"]',
    DaihocdansuBtn: '//div[@title = "Đại học dân sự"]',
    Hocky1_20_21Btn: '//span[@title = "Học kỳ 1 năm 2020 - 2021"]',
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

    await page.waitForTimeout(3000);
  });

  test("test", async ({ page }) => {
    await page.getByRole("link", { name: "Đào tạo" }).click();
    await page.waitForTimeout(3000);

    await page.locator(xpath.DTDTBtn).click();
    await page.locator(xpath.DaihocdansuBtn).click();

    await page.locator(".ant-select-selector").nth(1).click();
    //const tree = page.locator('.ant-select-tree').nth(0);
    // scroll thẳng xuống dưới cùng
    //await tree.evaluate(el => el.scrollTop = el.scrollHeight);
    // // scroll xuống từ từ 
    //await tree.evaluate(el => el.scrollTop += 600);
    // scroll xuống dùng con lăn
    //await page.mouse.wheel(0, 600); // dùng cho toàn page

    // scroll trong thẻ select-tree
    //await page.locator('.ant-select-tree-list').nth(3).evaluate(el => el.scrollTop += 200);

    // scroll trong thẻ select-tree-holder
    //await page.locator('.ant-select-tree-list-holder').nth(3).evaluate(el => el.scrollTop += 400);

    //await page.locator('.rc-virtual-list-holder, .ant-select-tree, .ant-select-tree-list').first().evaluate(el => el.scrollTop += 300);

    //await page.mouse.wheel(0, 10);
    // await page.locator('.ant-select-item-option').nth(1).click();
    // await page.locator(xpath.SemesterBtn).click();
    //await page.locator('.ant-select-tree-list-holder-inner').nth(0).scrollIntoViewIfNeeded();
    //await page.locator(xpath.Hocky1_20_21Btn).scrollIntoViewIfNeeded();

    //await page.getByRole('treeitem', { name: 'Học kỳ 1 năm 2020 - 2021' }).click();
    await page.getByRole('tree').getByTitle('Học kỳ 1 năm 2020 - 2021').click();

    //await page.locator(xpath.Hocky1_20_21Btn).click();

    //await page.locator(xpath.Hocky1_20_21Btn).click();
  });

  test("abcd", async ({ page }) => {
    await page.getByRole("link", { name: "Đào tạo" }).click();
    await page.waitForTimeout(2000);

    await page.getByText("Chương trình đào tạo").hover();
    await page.waitForTimeout(2000);

    // Các cách để hover vào menu Đào tạo
    await page.getByText("Danh mục CTĐT khung", { exact: true }).click();

    await page
      .locator("tbody.ant-table-tbody tr:not(.ant-table-measure-row)")
      .first()
      .click();
    //await page.locator("tbody.ant-table-tbody tr.ant-table-row").first().click();
    //await page.locator("tbody.ant-table-tbody tr.ant-table-row").nth(0).click();
  });
});
