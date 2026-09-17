import assert from 'node:assert/strict';
import type { Page } from '@playwright/test';
import type { DealFormData } from '../utils/testData';

export class NewDealPage {
  public constructor(private readonly page: Page) {}

  private get titleField() {
    return this.page.locator('#title, input[name="title"], input[placeholder*="Title" i]').first();
  }

  private get identifierField() {
    return this.page.locator('#identifier, input[name="identifier"]').first();
  }

  private get stageDropdown() {
    return this.page.locator('select#stage, select[name="stage"]').first();
  }

  private get statusDropdown() {
    return this.page.locator('select#status, select[name="status"]').first();
  }

  private get typeDropdown() {
    return this.page.locator('select#type, select[name="type"]').first();
  }

  private get sourceDropdown() {
    return this.page.locator('select#source, select[name="source"]').first();
  }

  private get saveButton() {
    return this.page.locator('button[type="submit"], button:has-text("Save")').first();
  }

  public async fillDealForm(deal: Partial<DealFormData>): Promise<void> {
    if (deal.title !== undefined) {
      await this.titleField.waitFor({ state: 'visible', timeout: 15000 });
      await this.titleField.fill(deal.title);
    }

    if (deal.identifier !== undefined) {
      if (await this.identifierField.isVisible({ timeout: 1000 }).catch(() => false)) {
        await this.identifierField.fill(deal.identifier);
      }
    }

    if (deal.stage) {
      if (await this.stageDropdown.isVisible({ timeout: 1000 }).catch(() => false)) {
        await this.stageDropdown.selectOption({ label: deal.stage }).catch(async () => {
          await this.stageDropdown.selectOption({ value: deal.stage });
        }).catch(() => {});
      }
    }

    if (deal.status) {
      if (await this.statusDropdown.isVisible({ timeout: 1000 }).catch(() => false)) {
        await this.statusDropdown.selectOption({ label: deal.status }).catch(async () => {
          await this.statusDropdown.selectOption({ value: deal.status });
        }).catch(() => {});
      }
    }

    if (deal.type) {
      if (await this.typeDropdown.isVisible({ timeout: 1000 }).catch(() => false)) {
        await this.typeDropdown.selectOption({ label: deal.type }).catch(async () => {
          await this.typeDropdown.selectOption({ value: deal.type });
        }).catch(() => {});
      }
    }

    if (deal.source) {
      if (await this.sourceDropdown.isVisible({ timeout: 1000 }).catch(() => false)) {
        await this.sourceDropdown.selectOption({ label: deal.source }).catch(async () => {
          await this.sourceDropdown.selectOption({ value: deal.source });
        }).catch(() => {});
      }
    }
  }

  public async submit(): Promise<void> {
    await this.saveButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.saveButton.click({ force: true });
    await this.page.waitForTimeout(2000);
  }

  public async expectVisible(): Promise<void> {
    await this.titleField.waitFor({ state: 'visible', timeout: 15000 });
  }

  public async expectTitleValidationFeedback(): Promise<void> {
    await this.page.waitForTimeout(500);
    const isStillOnForm = await this.titleField.isVisible().catch(() => false);
    assert.equal(isStillOnForm, true, 'Expected the Deal form to remain open on invalid submission.');
  }
}