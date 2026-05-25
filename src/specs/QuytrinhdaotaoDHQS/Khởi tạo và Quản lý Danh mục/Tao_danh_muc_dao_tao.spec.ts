import { test, expect } from "@playwright/test";
import { BasePage } from "../../../pages/BasePage";
import { LoginPage } from "../../../pages/LoginPage";
import { credentials } from "../../../resources/data/credentials";
import { request } from "https";

test.describe("Tạo danh mục đào tạo", () => {
  let basepage: BasePage;
  let loginPage: LoginPage;
  let newUserId: string;

  let xpath = {
    BtnMaBacDT: '//input[@id = "code"]',
    BtnTenBacDT: '//input[@id = "name"]',
    BtnDoituongDT: '//input[@id = "trainingObjectTypeId"]',
    BtnStartYear: '//input[@id = "schoolYearId"]',
    BtnStartSemester: '//input[@id = "semesterStartId"]',
    BtnLanguage: '//input[@id = "trainingLanguageId"]',
    BtnCopyTrainingCourse: '//input[@id = "trainingCourseClone"]',

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
      credentials.admin.password,
    );
    //await page.waitForTimeout(3000);

    await page.getByRole("link", { name: "Đào tạo" }).click();
    //await page.waitForTimeout(2000);
  });

  // Teardown chạy sau mỗi test case
  // test.afterEach(async ({ request }) => {
  //   if (newUserId) {
  //     // Gửi API xóa phần tử vừa tạo
  //     const response = await request.delete(`https://example.com{newUserId}`);
  //     expect(response.status()).toBe(200);
  //   }
  // });

  test("Tạo Bậc đào tạo", async ({ page }) => {
    // Đi đến mục Bậc đào tạo
    //await page.locator(xpath.MenuDanhmuc).dispatchEvent('mouseover');
    //await page.locator('span:has-text("Danh mục")').hover();
    //await page.getByRole('menuitem', { name: 'Danh mục' }).hover();
    await page.getByText("Danh mục").hover({ force: true });
    //await page.getByText("Danh mục").hover();
    await page.waitForLoadState("networkidle");
    //await page.waitForTimeout(2000);
    await page.getByText("Đào tạo", { exact: true }).hover();
    await page.getByRole("link", { name: "Bậc đào tạo" }).click();

    // Nhấn nút thêm mới
    await page.getByRole("button", { name: "Thêm mới" }).click();

    await page.locator(xpath.BtnMaBacDT).fill("1");
    await page.locator(xpath.BtnTenBacDT).fill("Giáo sư");

    //await page.getByRole("button", { name: "Lưu" }).click();
  });

  test("Tạo loại hình đào tạo", async ({ page }) => {
    await page.getByText("Danh mục").hover({ force: true });
    await page.waitForLoadState("networkidle");
    await page.getByText("Đào tạo", { exact: true }).hover();
    await page.getByRole("link", { name: "Loại hình đào tạo" }).click();

    // Nhấn nút thêm mới
    await page.getByRole("button", { name: "Thêm mới" }).click();
    await page.getByPlaceholder("Nhập tên loại hình đào tạo").fill("Online");
    //await page.getByRole("button", { name: "Lưu" }).click();

    // const response = await request.get('https://example.com');
    // const body = await response.json();
    // newUserId = body.id; // Lưu lại để afterEach xóa
  });

  test("Tạo thời gian đào tạo", async ({ page }) => {
    await page.getByText("Danh mục").hover({ force: true });
    await page.waitForLoadState("networkidle");
    await page.getByText("Đào tạo", { exact: true }).hover();
    await page.getByRole("link", {  name: "Thời gian đào tạo", exact: true }).click();

    // Nhấn nút thêm mới
    await page.getByRole("button", { name: "Thêm mới" }).click();
    await page.getByPlaceholder("Nhập mã thời gian đào tạo").fill("4nam");
    await page.getByPlaceholder("Nhập tên thời gian đào tạo").fill("4 năm");
    //await page.getByRole("button", { name: "Lưu" }).click();
  });

  test("Tạo khoá đào tạo", async ({ page }) => {
    await page.getByText("Danh mục").hover({ force: true });
    await page.getByRole("link", { name: "Khoá đào tạo" }).click();

    // Thêm mới Khoá đào tạo
    await page.getByRole("button", { name: "Thêm mới" }).click();

    // Chọn đối tượng đào tạo
    await page.locator(xpath.BtnDoituongDT).click();
    await page.getByRole("option", {name: "Đại học quân sự"}).click();

    // Nhập mã khoá học
    await page.getByPlaceholder("Nhập mã khoá học").fill("k65");

    // Nhâp tên khoá học
    await page.getByPlaceholder("Nhập tên khoá học").fill("Khoá 65");

    // Chọn năm học bắt đầu
    await page.locator(xpath.BtnStartYear).click();
    await page.getByRole("option", {name: "2031-2032"}).click();

    // Chọn kỳ học bắt đầu
    await page.locator(xpath.BtnStartSemester).click();
    await page.getByRole("option", {name: "2031-2032 HK1"}).click();

    // Chọn ngôn ngữ đào tạo
    await page.locator(xpath.BtnLanguage).click();
    await page.getByRole("option", {name: "Tiếng Việt"}).click();

    // Nhập niên khoá
    await page.getByPlaceholder("Nhập niên khoá").fill("2031-2035");

    // Chọn Thời gian đào tạo tối đa
    await page.getByPlaceholder("Nhập thời gian đào tạo").fill("7");

    // Chọn khoá để sao chép thông tin điểm
    await page.locator(xpath.BtnCopyTrainingCourse).click();
    await page.getByRole("option", {name: "Khoá 63"}).click();

    // await page.getByRole("button", { name: "Lưu" }).click();
  });
});
