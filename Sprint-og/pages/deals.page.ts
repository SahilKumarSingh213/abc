import assert from 'node:assert/strict';
import type { Page } from '@playwright/test';
import { resolveAppUrl } from '../utils/env';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export class DealsPage {
  public constructor(private readonly page: Page) {}

  private get heading() {
    return this.page.getByRole('heading', { name: 'Deals' });
  }

  private get refreshButton() {
    return this.page.getByRole('button', { name: 'Refresh' });
  }

  private get exportButton() {
    return this.page.getByRole('button', { name: 'Export' });
  }

  private get listViewButton() {
    return this.page.getByRole('button', { name: 'List view' });
  }

  private get boardViewButton() {
    return this.page.getByRole('button', { name: 'Board view' });
  }

  private get emptyStateMessage() {
    return this.page.getByText('No records found', { exact: true });
  }

  private get table() {
    return this.page.getByRole('table').first();
  }

  private get newDealHeading() {
    return this.page.getByRole('heading', { name: 'New Deal' });
  }

  private get createButton() {
    return this.page.locator("xpath=//button[normalize-space()='Create']").last();
  }

  public async open(baseUrl: string): Promise<void> {
    await this.page.goto(resolveAppUrl(baseUrl, '/deals'), { waitUntil: 'domcontentloaded' });
  }

  public async expectVisible(): Promise<void> {
    await this.heading.waitFor({ state: 'visible' });
  }

  public async expectPrimaryControls(): Promise<void> {
    await this.expectVisible();
    await this.refreshButton.waitFor({ state: 'visible' });
    await this.exportButton.waitFor({ state: 'visible' });
    await this.listViewButton.waitFor({ state: 'visible' });
    await this.boardViewButton.waitFor({ state: 'visible' });
    await this.createButton.waitFor({ state: 'visible' });
  }

  public async expectEmptyStateUsability(): Promise<void> {
    await this.emptyStateMessage.waitFor({ state: 'visible' });
    assert.match(this.page.url(), /\/deals(?:[/?#].*)?$/, 'Expected the Deals page to remain usable in the observed state.');
  }

  public async openNewDeal(): Promise<void> {
    assert.equal(await this.createButton.count(), 1, 'Expected exactly one verified Create Deal button on the Deals page.');
    await this.createButton.waitFor({ state: 'visible' });
    await this.createButton.click();
    await this.newDealHeading.waitFor({ state: 'visible' });
  }

  public async expectVisibleInAuthenticatedSession(): Promise<void> {
    await this.expectVisible();
    assert.match(this.page.url(), /\/deals(?:[/?#].*)?$/, 'Expected to remain on the Deals page.');
  }

  public async expectDealPresent(title: string): Promise<void> {
    await this.table.waitFor({ state: 'visible' });
    const dealTitle = this.table.getByText(title, { exact: true });

    await dealTitle.waitFor({ state: 'visible' });
  }

  public async expectCreateFormClosed(): Promise<void> {
    await this.newDealHeading.waitFor({ state: 'hidden' });
  }
}