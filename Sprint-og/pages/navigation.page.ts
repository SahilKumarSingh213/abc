import assert from 'node:assert/strict';
import type { Page } from '@playwright/test';

export class NavigationPage {
  public constructor(private readonly page: Page) {}

  private get setupDialog() {
    return this.page.getByRole('dialog').filter({ hasText: 'Welcome aboard!' });
  }

  private get setupCloseButton() {
    return this.setupDialog.getByRole('button', { name: 'Close' });
  }

  private get notificationLaterButton() {
    return this.page.getByRole('button', { name: 'Later' });
  }

  private get visibleCloseButtons() {
    return this.page.locator('button[aria-label="Close"]:visible, button[title="Close"]:visible');
  }

  private get dealsLink() {
    return this.page.getByRole('link', { name: 'Deals' });
  }

  private get invoicesLink() {
    return this.page.getByRole('link', { name: 'Invoices' });
  }

  private get globalSearch() {
    return this.page.getByRole('searchbox', { name: 'Search' });
  }

  private get loginHeading() {
    return this.page.getByRole('heading', { name: 'Login' });
  }

  public async dismissTransientOverlays(): Promise<void> {
    if (await this.setupCloseButton.isVisible().catch(() => false)) {
      await this.setupCloseButton.click();
    }

    if (await this.notificationLaterButton.isVisible().catch(() => false)) {
      await this.notificationLaterButton.click();
    }

    for (let attempt = 0; attempt < 5 && await this.visibleCloseButtons.count(); attempt += 1) {
      await this.visibleCloseButtons.first().click();
    }
  }

  public async expectAuthenticatedShell(): Promise<void> {
    await this.dismissTransientOverlays();
    await this.globalSearch.waitFor({ state: 'visible' });
    assert.equal(await this.loginHeading.count(), 0, 'The login page is still visible, so the session did not stay authenticated.');
  }

  public async goToDeals(): Promise<void> {
    await this.dismissTransientOverlays();
    await this.dealsLink.click();
    await this.page.waitForURL(/\/deals(?:[/?#].*)?$/, { waitUntil: 'domcontentloaded' });
  }

  public async goToInvoices(): Promise<void> {
    await this.dismissTransientOverlays();
    assert.equal(await this.invoicesLink.getAttribute('href'), '/invoices', 'The Invoices navigation link must target /invoices.');
    await this.invoicesLink.click();
    await this.page.waitForURL(/\/invoices(?:[/?#].*)?$/, { waitUntil: 'domcontentloaded' });
  }

  public async refreshProtectedPage(): Promise<void> {
    await this.dismissTransientOverlays();
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    await this.dismissTransientOverlays();
  }

  public async expectPath(pathname: string): Promise<void> {
    const currentPath = new URL(this.page.url()).pathname;
    assert.equal(currentPath, pathname, `Expected current path to be ${pathname} but received ${currentPath}.`);
  }
}