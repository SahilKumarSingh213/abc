import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logoOrHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"], input[name="email"]');
    this.passwordInput = page.locator('input[type="password"], input[name="password"]');
    this.loginButton = page.locator('button:has-text("Login"), div.ui.fluid.large.blue.submit.button, input[type="submit"]');
    this.logoOrHeading = page.locator('a:has-text("Sign Up"), div.header, a.header');
  }

  async openProtectedRoute(baseUrl: string, route: string): Promise<void> {
    const targetUrl = new URL(route, baseUrl).toString();
    await this.page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
  }

  async expectVisible(): Promise<void> {
    await expect(this.emailInput).toBeVisible({ timeout: 15000 });
    await expect(this.passwordInput).toBeVisible({ timeout: 15000 });
  }

  async expectRedirectedFromProtectedPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*login.*|.*ui\.freecrm\.com\/?$/, { timeout: 15000 });
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
