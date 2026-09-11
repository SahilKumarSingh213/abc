import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';
import { OrangeHRMPage } from '../../pages/orangeHRMPage';

let orangeHRM: OrangeHRMPage;

Given('User opens OrangeHRM', async function (this: CustomWorld) {
    orangeHRM = new OrangeHRMPage(this.page);
    await orangeHRM.openApp();
});

When('User logs in with username {string} and password {string}', async function (username: string, password: string) {
    await orangeHRM.login(username, password);
});

When('User opens the Buzz page', async function () {
    await orangeHRM.openBuzz();
});

When('User posts the message {string}', async function (message: string) {
    await orangeHRM.postBuzz(message);
});

Then('User should see the buzz {string}', async function (message: string) {
    await orangeHRM.verifyBuzzPosted(message);
});
