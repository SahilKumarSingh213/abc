import { setWorldConstructor, World, type IWorldOptions } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from '@playwright/test';
import type { DealFormData } from '../utils/testData';

export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  validDeal?: DealFormData;
  invalidDealIdentifier?: string;

  public constructor(options: IWorldOptions) {
    super(options);
  }

  public getPage(): Page {
    if (!this.page) {
      throw new Error('Playwright page is not initialized for the current scenario.');
    }

    return this.page;
  }
}

setWorldConstructor(CustomWorld);