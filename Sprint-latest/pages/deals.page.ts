import { expect, type Locator, type Page } from '@playwright/test';

export class DealsPage {
  readonly page: Page;
  readonly dealsHeader: Locator;
  readonly newDealButton: Locator;
  readonly refreshButton: Locator;
  readonly exportButton: Locator;
  readonly dealsTable: Locator;
  readonly emptyStateText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dealsHeader = page.locator('div.ui.header:has-text("Deals"), span.selectable:has-text("Deals"), header, div:has-text("Deals")');
    this.newDealButton = page.locator('a[href*="/deals/new"], button:has-text("Create"), button:has-text("New")');
    this.refreshButton = page.locator('button:has-text("Refresh"), i.refresh.icon');
    this.exportButton = page.locator('button:has-text("Export"), i.download.icon');
    this.dealsTable = page.locator('table, div[class*="table"], div.table-wrapper');
    this.emptyStateText = page.locator('td:has-text("No records found"), div:has-text("No records found")');
  }

  async open(baseUrl: string): Promise<void> {
    const targetUrl = new URL('/deals', baseUrl).toString();
    await this.page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
  }

  async expectVisible(): Promise<void> {
    await expect(this.dealsHeader.first()).toBeVisible({ timeout: 15000 });
  }

  async expectVisibleInAuthenticatedSession(): Promise<void> {
    await expect(this.page).toHaveURL(/.*\/deals(\/.*)?$/, { timeout: 15000 });
    await expect(this.newDealButton.first()).toBeVisible({ timeout: 15000 });
  }

  async expectPrimaryControls(): Promise<void> {
    await expect(this.newDealButton.first()).toBeVisible({ timeout: 15000 });
  }

  async expectEmptyStateUsability(): Promise<void> {
    const hasTable = await this.dealsTable.first().isVisible().catch(() => false);
    const hasEmptyState = await this.emptyStateText.first().isVisible().catch(() => false);
    const hasControls = await this.newDealButton.first().isVisible().catch(() => false);
    expect(hasTable || hasEmptyState || hasControls).toBeTruthy();
  }

  async clickNewDeal(): Promise<void> {
    await this.page.evaluate(() => {
      const el = document.getElementById('onesignal-slidedown-container');
      if (el) el.remove();
    }).catch(() => {});

    await this.newDealButton.first().click({ force: true });
    await this.page.waitForURL(/.*\/deals\/new/, { timeout: 15000 });
  }

  async expectDealInList(titleOrId: string): Promise<void> {
    await this.page.evaluate(() => {
      const el = document.getElementById('onesignal-slidedown-container');
      if (el) el.remove();
    }).catch(() => {});
    const cell = this.page.locator(`td:has-text("${titleOrId}"), a:has-text("${titleOrId}"), div:has-text("${titleOrId}"), span:has-text("${titleOrId}")`);
    await expect(cell.first()).toBeVisible({ timeout: 15000 });
  }
}
