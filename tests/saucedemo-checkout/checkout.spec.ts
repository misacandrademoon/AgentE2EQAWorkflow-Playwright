import { test, expect } from '@playwright/test';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

async function login(page: any) {
  await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await expect(page.locator('[data-test="username"]')).toBeVisible({ timeout: 30000 });
  await page.locator('[data-test="username"]').fill(USERNAME);
  await page.locator('[data-test="password"]').fill(PASSWORD);
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/\/inventory\.html$/, { timeout: 30000 });
}

async function addOneProductAndGoToCart(page: any) {
  await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible({ timeout: 30000 });
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/\/cart\.html$/, { timeout: 30000 });
}

async function fillCheckoutFields(page: any) {
  await expect(page.locator('[data-test="firstName"]')).toBeVisible({ timeout: 30000 });
  await page.locator('[data-test="firstName"]').fill('Jane');
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').fill('12345');
}

test.describe('SauceDemo checkout workflow', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('adds items, reviews cart, and completes a successful checkout', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();

    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);

    await fillCheckoutFields(page);
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(page.locator('.summary_info')).toBeVisible();
    await expect(page.locator('[data-test="finish"]')).toBeVisible();

    await page.locator('[data-test="finish"]').click();

    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  });

  test('blocks checkout until required information is entered', async ({ page }) => {
    await addOneProductAndGoToCart(page);

    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/, { timeout: 30000 });

    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('.error-message-container')).toBeVisible({ timeout: 30000 });
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/, { timeout: 30000 });

    await page.locator('[data-test="firstName"]').fill('Jane');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/\/checkout-step-two\.html$/, { timeout: 30000 });
  });

  test('returns the user to the cart when cancel action is used during checkout', async ({ page }) => {
    await addOneProductAndGoToCart(page);
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);

    await page.locator('[data-test="cancel"]').click();
    await expect(page).toHaveURL(/\/cart\.html$/);

    await page.locator('[data-test="checkout"]').click();
    await fillCheckoutFields(page);
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);

    await page.locator('[data-test="cancel"]').click();
    await expect(page).toHaveURL(/\/cart\.html$/);
  });
});
