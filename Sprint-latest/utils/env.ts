import dotenv from 'dotenv';

dotenv.config();

export type BrowserName = 'chromium' | 'firefox' | 'webkit';

export interface RuntimeConfig {
  baseUrl: string;
  email: string;
  password: string;
  browserName: BrowserName;
  headless: boolean;
}

function readEnv(name: string, fallback: string = ''): string {
  return (process.env[name] ?? fallback).trim();
}

function readBoolean(name: string, defaultValue: boolean): boolean {
  const raw = readEnv(name).toLowerCase();
  if (!raw) return defaultValue;
  return raw === 'true' || raw === '1' || raw === 'yes' || raw === 'y';
}

function readBrowserName(): BrowserName {
  const raw = readEnv('BROWSER', 'chromium').toLowerCase();
  if (raw === 'firefox' || raw === 'webkit') return raw;
  return 'chromium';
}

export function getRuntimeConfig(): RuntimeConfig {
  const isDebug = process.env.PWDEBUG === '1' || process.env.INSPECT === 'true';
  return {
    baseUrl: readEnv('FREECRM_BASE_URL', 'https://ui.freecrm.com'),
    email: readEnv('FREECRM_EMAIL'),
    password: readEnv('FREECRM_PASSWORD'),
    browserName: readBrowserName(),
    headless: isDebug ? false : readBoolean('HEADLESS', false)
  };
}

export function requireBaseUrl(): string {
  const { baseUrl } = getRuntimeConfig();
  if (!baseUrl) {
    throw new Error('FREECRM_BASE_URL must be configured in .env before running tests.');
  }
  return baseUrl;
}

export function requireCredentials(): { email: string; password: string } {
  const { email, password } = getRuntimeConfig();
  if (!email || !password) {
    throw new Error('FREECRM_EMAIL and FREECRM_PASSWORD must be configured in .env before running tests.');
  }
  return { email, password };
}
