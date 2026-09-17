import { Given, Then, When } from '@cucumber/cucumber';
import { DealsPage } from '../../pages/deals.page';
import { LoginPage } from '../../pages/login.page';
import { NavigationPage } from '../../pages/navigation.page';
import { NewDealPage } from '../../pages/new-deal.page';
import type { CustomWorld } from '../../support/world';
import { requireBaseUrl, requireCredentials } from '../../utils/env';
import { buildInvalidDealData, buildValidDealData } from '../../utils/testData';

// --- Authentication & Access Control Steps ---

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

Then('I should see the authenticated FreeCRM area', async function (this: CustomWorld) {
  const navigationPage = new NavigationPage(this.getPage());
  await navigationPage.expectAuthenticatedShell();
});

// --- Navigation Steps ---

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

// --- Deal Creation & Validation Steps ---

Given('I open the New Deal form', async function (this: CustomWorld) {
  const baseUrl = requireBaseUrl();
  const dealsPage = new DealsPage(this.getPage());
  const navigationPage = new NavigationPage(this.getPage());
  const newDealPage = new NewDealPage(this.getPage());

  await dealsPage.open(baseUrl);
  await navigationPage.dismissTransientOverlays();
  await dealsPage.clickNewDeal();
  await newDealPage.expectFormLoaded();
});

When('I submit the New Deal form without a title', async function (this: CustomWorld) {
  const newDealPage = new NewDealPage(this.getPage());
  const invalidData = buildInvalidDealData();
  this.invalidDealIdentifier = invalidData.identifier;

  await newDealPage.fillForm(invalidData);
  await newDealPage.save();
});

Then('I should see deal validation feedback', async function (this: CustomWorld) {
  const newDealPage = new NewDealPage(this.getPage());
  await newDealPage.expectValidationError();
});

Then('the New Deal form should remain open without a successful save', async function (this: CustomWorld) {
  const newDealPage = new NewDealPage(this.getPage());
  await newDealPage.expectFormRemainsOpen();
});

When('I create a valid deal with unique data from test data excel', async function (this: CustomWorld) {
  const newDealPage = new NewDealPage(this.getPage());
  const validData = buildValidDealData();
  this.validDeal = validData;

  await newDealPage.fillForm(validData);
  await newDealPage.save();
  await newDealPage.expectSavedSuccessfully();
});

Then('the deal should be saved and visible in the Deals list', async function (this: CustomWorld) {
  const baseUrl = requireBaseUrl();
  const dealsPage = new DealsPage(this.getPage());
  const navigationPage = new NavigationPage(this.getPage());

  if (!this.validDeal || !this.validDeal.title) {
    throw new Error('Valid deal data is missing in the current scenario context.');
  }

  await dealsPage.open(baseUrl);
  await navigationPage.dismissTransientOverlays();
  await dealsPage.expectDealInList(this.validDeal.title);
});
