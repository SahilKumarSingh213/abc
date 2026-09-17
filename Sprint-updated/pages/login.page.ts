import assert from 'node:assert/strict';
import type { Page } from '@playwright/test';
import { resolveAppUrl } from '../utils/env';

export class LoginPage {
  public constructor(private readonly page: Page) {}

  private get heading() {
    return this.page.locator('h1, h2, h3, .header, form').filter({ hasText: /Login|Sign in/i }).first();
  }

  private get emailField() {
    return this.page.locator('#email, input[name="email"], input[type="email"], input[placeholder*="Email" i]').first();
  }

  private get passwordField() {
    return this.page.locator('#password, input[name="password"], input[type="password"], input[placeholder*="Password" i]').first();
  }

  private get loginButton() {
    return this.page.locator('button[type="submit"], button:has-text("Login"), .ui.fluid.large.blue.submit.button, div.ui.button:has-text("Login")').first();
  }

  public async openProtectedRoute(baseUrl: string, route: string): Promise<void> {
    await this.page.goto(resolveAppUrl(baseUrl, route), { waitUntil: 'domcontentloaded' });
  }

  public async expectVisible(): Promise<void> {
    await this.emailField.waitFor({ state: 'visible', timeout: 15000 });
  }

  public async login(email: string, password: string): Promise<void> {
    await this.emailField.waitFor({ state: 'visible', timeout: 15000 });
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
    // Wait for the login form to transition away
    await this.page.waitForTimeout(3000);
  }

  public async expectRedirectedFromProtectedPage(): Promise<void> {
    await this.expectVisible();
    assert.match(this.page.url(), /login/i, 'Expected the protected route to redirect to the login page.');
  }
}