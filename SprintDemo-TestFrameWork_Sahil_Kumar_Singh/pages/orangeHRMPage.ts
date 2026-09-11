import { Page, expect } from '@playwright/test';

export class OrangeHRMPage {
    constructor(private page: Page) {}

    async openApp() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async login(username: string, password: string) {
        await this.page.locator('input[name="username"]').fill(username);
        await this.page.locator('input[name="password"]').fill(password);
        await this.page.locator('button[type="submit"]').click();
        await this.page.waitForURL('**/dashboard/index');
    }

    async openBuzz() {
        await this.page.getByRole('link', { name: 'Buzz' }).click();
        await this.page.waitForLoadState('networkidle');
    }

    async postBuzz(message: string) {
        const input = this.page.getByRole('textbox', { name: "What's on your mind?" });
        await input.click();
        await input.fill(message);
        await this.page.getByRole('button', { name: 'Post', exact: true }).click();
        await this.page.getByText('Successfully Saved').waitFor({ timeout: 15000 });
    }

    async verifyBuzzPosted(message: string) {
        await expect(this.page.locator('body')).toContainText(message, { timeout: 20000 });
    }

    async openMyInfo() {
        await this.page.getByRole('link', { name: 'My Info' }).click();
    }

    async fillPersonalInfo(firstName: string, middleName: string, lastName: string) {
        await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
        await this.page.getByRole('textbox', { name: 'Middle Name' }).fill(middleName);
        await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
        await this.page.getByRole('textbox').nth(4).fill('sahil');
        await this.page.getByRole('textbox').nth(5).fill('sahil');
    }

    async selectNationality(value: string) {
        const field = this.page.locator('.oxd-input-group').filter({ hasText: 'Nationality' }).first();
        await field.locator('.oxd-select-text').click();
        await this.page.locator('[role="option"]').filter({ hasText: value }).click();
    }

    async selectDateOfBirth(date: string) {
        const dobField = this.page.locator('.oxd-input-group').filter({ hasText: 'Date of Birth' }).first().locator('input');
        await dobField.fill(date);
        await dobField.press('Tab');
    }

    async selectBloodType(value: string) {
        const field = this.page.locator('.oxd-input-group').filter({ hasText: 'Blood Type' }).first();
        await field.locator('.oxd-select-text').click();
        await this.page.locator('[role="option"]').filter({ hasText: value }).click();
    }

    async savePersonalDetails() {
        const saveButtons = this.page.locator('button[type="submit"]');
        await saveButtons.last().click();
        await this.page.getByText('Successfully Saved').waitFor({ timeout: 15000 });
    }

    async searchDirectory(value: string) {
        await this.page.getByRole('link', { name: 'Dashboard' }).click();
        await this.page.getByRole('link', { name: 'Directory' }).click();
        const query = value.split(/\s+/)[0];
        const hintBox = this.page.getByRole('textbox', { name: 'Type for hints...' });
        await hintBox.click();
        await hintBox.fill(query);
        await this.page.getByText(value, { exact: true }).click();
        await this.page.getByRole('button', { name: 'Search' }).click();
    }

    async verifyDirectoryResult(value: string) {
        await expect(this.page.locator('#app')).toContainText(value);
    }
}

function monthToText(month: number) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month - 1];
}
