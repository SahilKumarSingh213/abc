import { expect, type Locator, type Page } from '@playwright/test';

export class NavigationPage {
  readonly page: Page;
  readonly topHeaderMenu: Locator;
  readonly dealsNav: Locator;
  readonly invoicesNav: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topHeaderMenu = page.locator('nav, header, div#top-header-menu, div.ui.top.fixed.menu, span.user-display, [class*="_nav_"], [class*="_header_"]');
    this.dealsNav = page.locator('a[href="/deals"], a[href*="/deals"], a:has-text("Deals")');
    this.invoicesNav = page.locator('a[href="/invoices"], a[href*="/invoices"], a:has-text("Invoices")');
  }

  async dismissTransientOverlays(): Promise<void> {
    const dismissLocators = [
      this.page.locator('button#onesignal-slidedown-cancel-button'),
      this.page.locator('div#onesignal-slidedown-container button'),
      this.page.locator('div.ui.modal button:has-text("Dismiss")'),
      this.page.locator('div.ui.modal i.close.icon'),
      this.page.locator('button.close-modal'),
      this.page.locator('div.actions button:has-text("Cancel")')
    ];

    for (const locator of dismissLocators) {
      if (await locator.isVisible({ timeout: 1500 }).catch(() => false)) {
        await locator.click({ force: true }).catch(() => {});
      }
    }

    // Hide any lingering slidedown container via CSS
    await this.page.evaluate(() => {
      const el = document.getElementById('onesignal-slidedown-container');
      if (el) el.remove();
    }).catch(() => {});
  }

  async expectAuthenticatedShell(): Promise<void> {
    await this.dismissTransientOverlays();
    await expect(this.topHeaderMenu.first()).toBeVisible({ timeout: 20000 });
  }

  async goToDeals(): Promise<void> {
    await this.dismissTransientOverlays();
    await this.dealsNav.first().click();
    await this.page.waitForURL(/.*\/deals(\/.*)?$/, { timeout: 15000 });
  }

  async goToInvoices(): Promise<void> {
    await this.dismissTransientOverlays();
    await this.invoicesNav.first().click();
    await this.page.waitForURL(/.*\/invoices(\/.*)?$/, { timeout: 15000 });
  }

  async refreshProtectedPage(): Promise<void> {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    await this.dismissTransientOverlays();
  }

  async expectPath(pathRegexOrSub: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(pathRegexOrSub), { timeout: 15000 });
  }
}
