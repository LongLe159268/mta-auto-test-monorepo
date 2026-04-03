import { test, expect } from '@playwright/test';
import { link } from 'fs';

test('has title', async ({ page }) => {
  await page.goto('https://mta.swantech.vn/sso-portal/');

  // Expect a title "to contain" a substring.
  await page.getByRole('link', { name: 'Hệ thống' }).click();
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

// test('sample test', async ({ page }) => {

//   await page.goto('https://example.com/profile');
//   const nameInput = page.locator('#name');

//   await nameInput.click();
//   await page.keyboard.press('Control + A');
//   await nameInput.fill('New Name');
// });
