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

const TRUE_VALUES = new Set(['1', 'true', 'yes', 'y']);

function readEnv(name: string): string {
  return (process.env[name] ?? '').trim();
}

function readBoolean(name: string, defaultValue: boolean): boolean {
  const rawValue = readEnv(name).toLowerCase();
  if (!rawValue) {
    return defaultValue;
  }

  return TRUE_VALUES.has(rawValue);
}

function readBrowserName(): BrowserName {
  const rawValue = readEnv('BROWSER').toLowerCase();
  if (rawValue === 'firefox' || rawValue === 'webkit') {
    return rawValue;
  }

  return 'chromium';
}

export function getRuntimeConfig(): RuntimeConfig {
  return {
    baseUrl: readEnv('FREECRM_BASE_URL') || readEnv('BASE_URL'),
    email: readEnv('FREECRM_EMAIL'),
    password: readEnv('FREECRM_PASSWORD'),
    browserName: readBrowserName(),
    headless: readBoolean('HEADLESS', true)
  };
}

export function requireBaseUrl(): string {
  const { baseUrl } = getRuntimeConfig();
  if (!baseUrl) {
    throw new Error('FREECRM_BASE_URL must be set before running the BDD automation.');
  }

  return baseUrl;
}

export function requireCredentials(): { email: string; password: string } {
  const { email, password } = getRuntimeConfig();
  if (!email || !password) {
    throw new Error('FREECRM_EMAIL and FREECRM_PASSWORD must be set before running authenticated BDD automation.');
  }

  return { email, password };
}

export function resolveAppUrl(baseUrl: string, routeOrUrl: string): string {
  if (/^https?:\/\//i.test(routeOrUrl)) {
    return routeOrUrl;
  }

  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const normalizedRoute = routeOrUrl.startsWith('/') ? routeOrUrl.slice(1) : routeOrUrl;
  return new URL(normalizedRoute, normalizedBaseUrl).toString();
}