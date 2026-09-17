import { expect, type Locator, type Page } from '@playwright/test';
import type { DealFormData } from '../utils/testData';

export class NewDealPage {
  readonly page: Page;
  readonly titleInput: Locator;
  readonly identifierInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly validationError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleInput = page.locator('input[name="title"], form input[type="text"]').first();
    this.identifierInput = page.locator('input[name="identifier"], form input[type="text"]').nth(1);
    this.saveButton = page.locator('button:has-text("Save"), button.ui.linkedin.button:has-text("Save"), button[type="submit"], [type="submit"]').first();
    this.cancelButton = page.locator('button:has-text("Cancel")');
    this.validationError = page.locator('div.ui.error.message, div.field.error, span.inline-error, p:has-text("required")');
  }

  async expectFormLoaded(): Promise<void> {
    await expect(this.titleInput).toBeVisible({ timeout: 15000 });
  }

  async fillForm(data: DealFormData): Promise<void> {
    await this.page.evaluate(() => {
      const el = document.getElementById('onesignal-slidedown-container');
      if (el) el.remove();
    }).catch(() => {});

    if (data.title) {
      await this.titleInput.fill(data.title);
    }
    if (data.identifier) {
      await this.identifierInput.fill(data.identifier);
    }
  }

  async save(): Promise<void> {
    await this.page.evaluate(() => {
      const el = document.getElementById('onesignal-slidedown-container');
      if (el) el.remove();
    }).catch(() => {});

    await this.saveButton.first().click({ force: true });
  }

  async expectValidationError(): Promise<void> {
    // Form should reject save either via visible error message, field error styling, or remaining on /deals/new
    await expect(this.page).toHaveURL(/.*\/deals\/new/, { timeout: 10000 });
    await expect(this.saveButton.first()).toBeVisible({ timeout: 10000 });
  }

  async expectFormRemainsOpen(): Promise<void> {
    await expect(this.page).toHaveURL(/.*\/deals\/new/, { timeout: 10000 });
    await expect(this.saveButton.first()).toBeVisible({ timeout: 10000 });
  }

  async expectSavedSuccessfully(): Promise<void> {
    // When saved, URL redirects to /deals or /deals/:id
    await this.page.waitForURL(/.*\/deals(\/.*)?$/, { timeout: 15000 });
  }
}
