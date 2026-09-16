import assert from 'node:assert/strict';
import type { Page } from '@playwright/test';
import { resolveAppUrl } from '../utils/env';

export class LoginPage {
  public constructor(private readonly page: Page) {}

  private get heading() {
    return this.page.getByRole('heading', { name: 'Login' });
  }

  private get emailField() {
    return this.page.getByRole('textbox', { name: 'Email' });
  }

  private get passwordField() {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  private get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  public async openProtectedRoute(baseUrl: string, route: string): Promise<void> {
    await this.page.goto(resolveAppUrl(baseUrl, route), { waitUntil: 'domcontentloaded' });
  }

  public async expectVisible(): Promise<void> {
    await this.heading.waitFor({ state: 'visible' });
  }

  public async login(email: string, password: string): Promise<void> {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  public async expectRedirectedFromProtectedPage(): Promise<void> {
    await this.expectVisible();
    assert.match(this.page.url(), /login/i, 'Expected the protected route to redirect to the login page.');
  }
}