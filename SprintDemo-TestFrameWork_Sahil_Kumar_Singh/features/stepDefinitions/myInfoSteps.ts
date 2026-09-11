import { When, Then } from '@cucumber/cucumber';
import { OrangeHRMPage } from '../../pages/orangeHRMPage';
import { CustomWorld } from '../../support/world';

let orangeHRM: OrangeHRMPage;

When('User opens the My Info page', async function (this: CustomWorld) {
    orangeHRM = new OrangeHRMPage(this.page);
    await orangeHRM.openMyInfo();
});

When('User updates personal details with first name {string}, middle name {string}, and last name {string}', async function (firstName: string, middleName: string, lastName: string) {
    await orangeHRM.fillPersonalInfo(firstName, middleName, lastName);
});

When('User selects nationality {string}', async function (value: string) {
    await orangeHRM.selectNationality(value);
});

When('User selects date of birth {string}', async function (date: string) {
    await orangeHRM.selectDateOfBirth(date);
});

When('User selects blood type {string}', async function (bloodType: string) {
    await orangeHRM.selectBloodType(bloodType);
});

When('User saves personal details', async function () {
    await orangeHRM.savePersonalDetails();
});

When('User searches directory for {string}', async function (value: string) {
    await orangeHRM.searchDirectory(value);
});

Then('User should see {string} in directory results', async function (value: string) {
    await orangeHRM.verifyDirectoryResult(value);
});
