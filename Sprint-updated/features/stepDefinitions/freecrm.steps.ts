import assert from 'node:assert/strict';
import { Given, Then, When } from '@cucumber/cucumber';
import { DealsPage } from '../../pages/deals.page';
import { LoginPage } from '../../pages/login.page';
import { NavigationPage } from '../../pages/navigation.page';
import { NewDealPage } from '../../pages/new-deal.page';
import type { CustomWorld } from '../../support/world';
import { requireBaseUrl, requireCredentials } from '../../utils/env';
import { buildInvalidDealData, buildValidDealData } from '../../utils/testData';

Given('I open the protected {string} route as an unauthenticated user', async function (this: CustomWorld, route: string) {
  const baseUrl = requireBaseUrl();
  const loginPage = new LoginPage(this.getPage());

  await loginPage.openProtectedRoute(baseUrl, route);
});

Then('I should be redirected to the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.getPage());
  await loginPage.expectRedirectedFromProtectedPage();
});

Given('I am logged into FreeCRM with valid credentials', async function (this: CustomWorld) {
  const baseUrl = requireBaseUrl();
  const credentials = requireCredentials();
  const loginPage = new LoginPage(this.getPage());
  const navigationPage = new NavigationPage(this.getPage());

  await loginPage.openProtectedRoute(baseUrl, '/deals');
  await loginPage.expectVisible();
  await loginPage.login(credentials.email, credentials.password);
  await navigationPage.expectAuthenticatedShell();
  await navigationPage.dismissTransientOverlays();
});

When('I open the Deals page', async function (this: CustomWorld) {
  const baseUrl = requireBaseUrl();
  const dealsPage = new DealsPage(this.getPage());

  await dealsPage.open(baseUrl);
  await dealsPage.expectVisible();
});

When('I navigate to the Invoices page', async function (this: CustomWorld) {
  const navigationPage = new NavigationPage(this.getPage());

  await navigationPage.goToInvoices();
});

When('I refresh the current protected page', async function (this: CustomWorld) {
  const navigationPage = new NavigationPage(this.getPage());

  await navigationPage.refreshProtectedPage();
});

Then('I should remain in an authenticated session on the Invoices page', async function (this: CustomWorld) {
  const navigationPage = new NavigationPage(this.getPage());

  await navigationPage.expectAuthenticatedShell();
  await navigationPage.expectPath('/invoices');
});

Then('I should see the authenticated FreeCRM area', async function (this: CustomWorld) {
  const navigationPage = new NavigationPage(this.getPage());

  await navigationPage.expectAuthenticatedShell();
});

When('I navigate back to the Deals page', async function (this: CustomWorld) {
  const navigationPage = new NavigationPage(this.getPage());

  await navigationPage.goToDeals();
});

Then('I should see the Deals page in an authenticated session', async function (this: CustomWorld) {
  const navigationPage = new NavigationPage(this.getPage());
  const dealsPage = new DealsPage(this.getPage());

  await navigationPage.expectAuthenticatedShell();
  await dealsPage.expectVisibleInAuthenticatedSession();
});

Then('I should see the Deals page primary controls', async function (this: CustomWorld) {
  const dealsPage = new DealsPage(this.getPage());

  await dealsPage.expectPrimaryControls();
});

Then('I should see the Deals empty-state usability evidence', async function (this: CustomWorld) {
  const dealsPage = new DealsPage(this.getPage());

  await dealsPage.expectEmptyStateUsability();
});

Given('I open the New Deal form', async function (this: CustomWorld) {
  const baseUrl = requireBaseUrl();
  const dealsPage = new DealsPage(this.getPage());
  const navigationPage = new NavigationPage(this.getPage());
  const newDealPage = new NewDealPage(this.getPage());

  await dealsPage.open(baseUrl);
  await navigationPage.dismissTransientOverlays();
  await dealsPage.expectVisible();
  await dealsPage.openNewDeal();
  await newDealPage.expectVisible();
});

When('I submit the New Deal form without a title', async function (this: CustomWorld) {
  const invalidDealData = buildInvalidDealData();
  const newDealPage = new NewDealPage(this.getPage());

  this.invalidDealIdentifier = invalidDealData.identifier;
  await newDealPage.fillDealForm(invalidDealData);
  await newDealPage.submit();
});

Then('I should see deal validation feedback', async function (this: CustomWorld) {
  const newDealPage = new NewDealPage(this.getPage());

  await newDealPage.expectTitleValidationFeedback();
});

Then('the New Deal form should remain open without a successful save', async function (this: CustomWorld) {
  const newDealPage = new NewDealPage(this.getPage());

  await newDealPage.expectVisible();
});

When('I create a valid deal with unique data', async function (this: CustomWorld) {
  const validDeal = buildValidDealData();
  const newDealPage = new NewDealPage(this.getPage());

  this.validDeal = validDeal;
  await newDealPage.fillDealForm(validDeal);
  await newDealPage.submit();
});

When('I create a valid deal with unique data from test data excel', async function (this: CustomWorld) {
  const validDeal = buildValidDealData();
  const newDealPage = new NewDealPage(this.getPage());

  this.validDeal = validDeal;
  await newDealPage.fillDealForm(validDeal);
  await newDealPage.submit();
});

Then('the deal should be saved and visible in the Deals list', async function (this: CustomWorld) {
  assert.ok(this.validDeal && this.validDeal.title, 'Expected valid deal data with a title to be captured before verifying the saved deal.');

  const baseUrl = requireBaseUrl();
  const dealsPage = new DealsPage(this.getPage());

  await dealsPage.expectCreateFormClosed();
  await dealsPage.open(baseUrl);
  await dealsPage.expectVisible();
  await dealsPage.expectDealPresent(this.validDeal.title);
});