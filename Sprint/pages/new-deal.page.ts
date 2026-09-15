import assert from 'node:assert/strict';
import type { Page } from '@playwright/test';
import type { DealFormData } from '../utils/testData';

export class NewDealPage {
  public constructor(private readonly page: Page) {}

  private get heading() {
    return this.page.getByRole('heading', { name: 'New Deal' });
  }

  private get titleField() {
    return this.page.getByRole('textbox', { name: 'Title' });
  }

  private get closeDateField() {
    return this.page.getByRole('textbox', { name: 'Close Date' });
  }

  private get stageDropdown() {
    return this.page.getByRole('combobox', { name: 'Stage' });
  }

  private get statusDropdown() {
    return this.page.getByRole('combobox', { name: 'Status' });
  }

  private get typeDropdown() {
    return this.page.getByRole('combobox', { name: 'Type' });
  }

  private get sourceDropdown() {
    return this.page.getByRole('combobox', { name: 'Source' });
  }

  private get identifierField() {
    return this.page.getByRole('textbox', { name: 'Identifier' });
  }

  private get saveButton() {
    return this.page.locator('button[type="submit"]');
  }

  public async fillDealForm(deal: Partial<DealFormData>): Promise<void> {
    if (deal.title !== undefined) {
      await this.titleField.fill(deal.title);
    }

    if (deal.identifier !== undefined) {
      await this.identifierField.fill(deal.identifier);
    }

    if (deal.closeDate) {
      await this.closeDateField.fill(deal.closeDate);
    }

    if (deal.stage) {
      await this.stageDropdown.selectOption({ label: deal.stage });
    }

    if (deal.status) {
      await this.statusDropdown.selectOption({ label: deal.status });
    }

    if (deal.type) {
      await this.typeDropdown.selectOption({ label: deal.type });
    }

    if (deal.source) {
      await this.sourceDropdown.selectOption({ label: deal.source });
    }
  }

  public async submit(): Promise<void> {
    await this.saveButton.click();
  }

  public async expectVisible(): Promise<void> {
    await this.heading.waitFor({ state: 'visible' });
  }

  public async expectTitleValidationFeedback(): Promise<void> {
    const titleFieldInvalid = await this.titleField.evaluate((node) => {
      const input = node as HTMLInputElement;
      return input.matches(':invalid') || input.getAttribute('aria-invalid') === 'true' || Boolean(input.validationMessage);
    });

    assert.equal(titleFieldInvalid, true, 'Expected the Title field to expose invalid-state feedback after the failed save attempt.');
  }
}