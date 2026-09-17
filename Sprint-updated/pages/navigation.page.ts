import assert from 'node:assert/strict';
import type { Page } from '@playwright/test';

export class NavigationPage {
  public constructor(private readonly page: Page) {}

  private get dealsLink() {
    return this.page.locator('a[href="/deals"], a:has-text("Deals"), span:has-text("Deals")').first();
  }

  private get invoicesLink() {
    return this.page.locator('a[href="/invoices"], a:has-text("Invoices"), span:has-text("Invoices")').first();
  }

  public async dismissTransientOverlays(): Promise<void> {
    // 1. Dismiss setup dialogs (Skip setup, Let's get started, Close X)
    const setupButtons = [
      'button:has-text("Skip setup")',
      'button:has-text("Let\'s get started")',
      'button[class*="_close_"]',
      'button._close_p7s41_53',
      'div.modal button:has-text("Close")',
      'button[aria-label="Close"]',
      'button[aria-label="close"]',
      'button:has-text("Later")',
      'button:has-text("Not now")',
      'button:has-text("Got it")',
      'button:has-text("Skip")',
      'button:has-text("Dismiss")'
    ];

    for (const selector of setupButtons) {
      try {
        const btn = this.page.locator(selector).first();
        if (await btn.isVisible({ timeout: 400 }).catch(() => false)) {
          await btn.click({ force: true }).catch(() => {});
          await this.page.waitForTimeout(200);
        }
      } catch {}
    }

    // 2. Hide any lingering backdrops or OneSignal banners
    try {
      await this.page.evaluate(() => {
        document.querySelectorAll('div[class*="backdrop"], div[class*="modal"], div#onesignal-slidedown-container').forEach(el => {
          (el as HTMLElement).style.display = 'none';
        });
      }).catch(() => {});
    } catch {}
  }

  public async expectAuthenticatedShell(): Promise<void> {
    await this.dismissTransientOverlays();
    const navItem = this.page.locator('a[href="/deals"], a[href="/invoices"], a[href="/contacts"], h1:has-text("Good"), a:has-text("Home")').first();
    await navItem.waitFor({ state: 'visible', timeout: 20000 });
    await this.dismissTransientOverlays();
  }

  public async goToDeals(): Promise<void> {
    await this.dismissTransientOverlays();
    await this.dealsLink.waitFor({ state: 'visible', timeout: 15000 });
    await this.dealsLink.click({ force: true });
    await this.page.waitForURL(/\/deals(?:[/?#].*)?$/, { timeout: 15000, waitUntil: 'domcontentloaded' }).catch(() => {});
    await this.dismissTransientOverlays();
  }

  public async goToInvoices(): Promise<void> {
    await this.dismissTransientOverlays();
    await this.invoicesLink.waitFor({ state: 'visible', timeout: 15000 });
    await this.invoicesLink.click({ force: true });
    await this.page.waitForURL(/\/invoices(?:[/?#].*)?$/, { timeout: 15000, waitUntil: 'domcontentloaded' }).catch(() => {});
    await this.dismissTransientOverlays();
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