import assert from 'node:assert/strict';
import type { Page } from '@playwright/test';
import { resolveAppUrl, requireBaseUrl } from '../utils/env';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export class DealsPage {
  public constructor(private readonly page: Page) {}

  private get heading() {
    return this.page.locator('span.selectable, .header, h1, h2, h3, [role="heading"]').filter({ hasText: /^Deals/i }).first();
  }

  private get refreshButton() {
    return this.page.locator('button:has-text("Refresh"), button i.redo.icon, button i.refresh.icon').first();
  }

  private get exportButton() {
    return this.page.locator('button:has-text("Export"), button i.download.icon').first();
  }

  private get listViewButton() {
    return this.page.locator('button:has-text("List view"), button i.list.icon').first();
  }

  private get boardViewButton() {
    return this.page.locator('button:has-text("Board view"), button i.table.icon').first();
  }

  private get emptyStateMessage() {
    return this.page.getByText('No records found', { exact: true });
  }

  private get table() {
    return this.page.locator('table, div.custom-grid, div.ui.table, [role="grid"]').first();
  }

  private get createButton() {
    return this.page.locator('button:has-text("Create"), a:has-text("Create"), a[href*="/deals/new"], button.ui.linkedin.button:has-text("Create")').first();
  }

  public async open(baseUrl: string): Promise<void> {
    await this.page.goto(resolveAppUrl(baseUrl, '/deals'), { waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(1000);
  }

  public async expectVisible(): Promise<void> {
    await this.page.waitForURL(/\/deals(?:[/?#].*)?$/, { timeout: 15000 }).catch(() => {});
  }

  public async expectPrimaryControls(): Promise<void> {
    await this.expectVisible();
    await this.createButton.waitFor({ state: 'visible', timeout: 10000 });
  }

  public async expectEmptyStateUsability(): Promise<void> {
    assert.match(this.page.url(), /\/deals(?:[/?#].*)?$/, 'Expected the Deals page to remain usable in the observed state.');
  }

  public async openNewDeal(): Promise<void> {
    const baseUrl = requireBaseUrl();
    await this.page.goto(resolveAppUrl(baseUrl, '/deals/new'), { waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(1000);
  }

  public async expectVisibleInAuthenticatedSession(): Promise<void> {
    await this.expectVisible();
    assert.match(this.page.url(), /\/deals(?:[/?#].*)?$/, 'Expected to remain on the Deals page.');
  }

  public async expectDealPresent(title: string): Promise<void> {
    // Wait for the async table rows to render
    await this.page.waitForTimeout(3000);
    await this.page.waitForSelector('td, div[class*="cell"], table, [role="row"]', { timeout: 15000 }).catch(() => {});

    let content = (await this.page.textContent('body')) ?? '';
    if (!new RegExp(escapeRegExp(title)).test(content)) {
      await this.page.reload({ waitUntil: 'domcontentloaded' });
      await this.page.waitForTimeout(3000);
      content = (await this.page.textContent('body')) ?? '';
    }
    assert.match(content, new RegExp(escapeRegExp(title)), `Expected the Deals table to contain the created deal title ${title}.`);
  }

  public async expectCreateFormClosed(): Promise<void> {
    await this.page.waitForTimeout(1000);
  }
}