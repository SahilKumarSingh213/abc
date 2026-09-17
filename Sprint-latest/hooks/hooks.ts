import { After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getRuntimeConfig, type BrowserName } from '../utils/env';
import type { CustomWorld } from '../support/world';

setDefaultTimeout(60000);

function sanitizeForFileName(value: string): string {
  return value.replace(/[^a-zA-Z0-9-_]+/g, '-').replace(/^-+|-+$/g, '');
}

async function launchBrowser(browserName: BrowserName, headless: boolean) {
  const launchOptions: any = {
    headless,
    slowMo: headless ? undefined : 100
  };

  if (browserName === 'firefox') {
    try {
      return await firefox.launch(launchOptions);
    } catch {
      console.warn('[WARN] Firefox binary not found. Falling back to Chromium.');
      return await launchChromium(launchOptions);
    }
  }

  if (browserName === 'webkit') {
    try {
      return await webkit.launch(launchOptions);
    } catch {
      console.warn('[WARN] WebKit binary not found. Falling back to Chromium.');
      return await launchChromium(launchOptions);
    }
  }

  return await launchChromium(launchOptions);
}

async function launchChromium(launchOptions: any) {
  try {
    return await chromium.launch({ ...launchOptions, channel: 'chrome' });
  } catch {
    try {
      return await chromium.launch({ ...launchOptions, channel: 'msedge' });
    } catch {
      return await chromium.launch(launchOptions);
    }
  }
}

Before(async function (this: CustomWorld) {
  const runtimeConfig = getRuntimeConfig();
  this.browser = await launchBrowser(runtimeConfig.browserName, runtimeConfig.headless);
  this.context = await this.browser.newContext({
    viewport: { width: 1280, height: 720 }
  });

  // Transient Resilience: Abort intrusive third-party push notification scripts
  await this.context.route('**/*onesignal*', route => route.abort());

  this.page = await this.context.newPage();

  // Transient Resilience: Auto-dismiss unexpected native browser dialogs
  this.page.on('dialog', async dialog => {
    await dialog.dismiss().catch(() => {});
  });

  this.validDeal = undefined;
  this.invalidDealIdentifier = undefined;
});

After(async function (this: CustomWorld, scenario) {
  const status = scenario.result?.status?.toLowerCase() || 'unknown';

  // Take a full-page screenshot for every test case execution (both PASSED and FAILED)
  if (this.page) {
    try {
      const screenshotBuffer = await this.page.screenshot({ fullPage: true });
      const outputDirectory = path.join(process.cwd(), 'test-results', 'screenshots');
      const fileName = `${sanitizeForFileName(scenario.pickle.name)}-${status}.png`;
      const filePath = path.join(outputDirectory, fileName);

      await mkdir(outputDirectory, { recursive: true });
      await writeFile(filePath, screenshotBuffer);
      await this.attach(screenshotBuffer, 'image/png');
    } catch (err) {
      console.warn(`[WARN] Could not capture screenshot for scenario ${scenario.pickle.name}:`, err);
    }
  }

  if (this.context) {
    await this.context.close().catch(() => {});
  }

  if (this.browser) {
    await this.browser.close().catch(() => {});
  }
});
