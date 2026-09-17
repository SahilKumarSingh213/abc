import { After, Before, Status, setDefaultTimeout } from '@cucumber/cucumber';
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
  const isDebug = process.env.PWDEBUG === '1' || process.env.INSPECT === 'true' || !headless;
  const launchOptions: any = {
    headless,
    slowMo: isDebug ? 200 : undefined
  };

  if (browserName === 'firefox') {
    try {
      return await firefox.launch(launchOptions);
    } catch (err: any) {
      console.warn(`[WARN] Firefox standalone binary not found. Falling back to Chromium.`);
      return await launchChromium(launchOptions);
    }
  }

  if (browserName === 'webkit') {
    try {
      return await webkit.launch(launchOptions);
    } catch (err: any) {
      console.warn(`[WARN] WebKit standalone binary not found. Falling back to Chromium.`);
      return await launchChromium(launchOptions);
    }
  }

  return await launchChromium(launchOptions);
}

async function launchChromium(launchOptions: any) {
  try {
    return await chromium.launch(launchOptions);
  } catch (err: any) {
    try {
      return await chromium.launch({ ...launchOptions, channel: 'chrome' });
    } catch {
      return await chromium.launch({ ...launchOptions, channel: 'msedge' });
    }
  }
}

Before(async function (this: CustomWorld) {
  const runtimeConfig = getRuntimeConfig();
  this.browser = await launchBrowser(runtimeConfig.browserName, runtimeConfig.headless);
  this.context = await this.browser.newContext({
    viewport: { width: 1280, height: 720 },
    permissions: []
  });

  // Block intrusive notification scripts that trigger push notification popups
  await this.context.route('**/*onesignal*', route => route.abort());

  this.page = await this.context.newPage();

  // Auto-dismiss any native browser dialogs (alert/confirm/prompt)
  this.page.on('dialog', async dialog => {
    await dialog.dismiss().catch(() => {});
  });

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
    await this.context.close().catch(() => {});
  }

  if (this.browser) {
    await this.browser.close().catch(() => {});
  }
});