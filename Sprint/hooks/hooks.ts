import { After, Before, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getRuntimeConfig, type BrowserName } from '../utils/env';
import type { CustomWorld } from '../support/world';

setDefaultTimeout(30000);

function sanitizeForFileName(value: string): string {
  return value.replace(/[^a-zA-Z0-9-_]+/g, '-').replace(/^-+|-+$/g, '');
}

async function launchBrowser(browserName: BrowserName, headless: boolean) {
  if (browserName === 'firefox') {
    return firefox.launch({ headless });
  }

  if (browserName === 'webkit') {
    return webkit.launch({ headless });
  }

  return chromium.launch({ headless });
}

Before(async function (this: CustomWorld) {
  const runtimeConfig = getRuntimeConfig();
  this.browser = await launchBrowser(runtimeConfig.browserName, runtimeConfig.headless);
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.validDeal = undefined;
  this.invalidDealIdentifier = undefined;
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshotBuffer = await this.page.screenshot({ fullPage: true });
    const outputDirectory = path.join(process.cwd(), 'test-results', 'screenshots');
    const fileName = `${sanitizeForFileName(scenario.pickle.name)}.png`;
    const filePath = path.join(outputDirectory, fileName);

    await mkdir(outputDirectory, { recursive: true });
    await writeFile(filePath, screenshotBuffer);
    await this.attach(screenshotBuffer, 'image/png');
  }

  if (this.context) {
    await this.context.close();
  }

  if (this.browser) {
    await this.browser.close();
  }
});