import {Given, When, Then} from '@cucumber/cucumber';
import {chromium, Page, Browser, expect} from 'playwright/test';

let browser: Browser;
let page: Page;


Given('I navigates to the application', async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('https://parabank.parasoft.com/parabank/index.htm?');
    });

Given('I am on the login page', async function() {
    const loginHeader = await page.locator("//h2[normalize-space(text())='Customer Login']").textContent();
    console.log(`Login header: ${loginHeader}`);
});


When('I enter valid username {string} and password {string}', async function (username: string, password: string) {
    
    await page.locator("input[name='username']").fill(username);
    await page.locator("input[type='password']").fill(password);
});

Then('I should see a welcome message', async function () {
    const welcomeMessage = await page.locator("p.smallText").textContent();
    console.log(`Welcome message: ${welcomeMessage}`);
    await browser.close();
});

Then('I should see an error message', async function () {
    const actualErrorMessage = await page.locator("p.error").textContent();
    console.log(`Error message: ${actualErrorMessage}`);
    await expect(actualErrorMessage).toContain('The username and password could not be verified.');
    await browser.close();

});

Then('I should see a logout message', async function () {
    const loginHeader = await page.locator("//h2[normalize-space(text())='Customer Login']").textContent();
    console.log(`Login header: ${loginHeader}`);
    await expect(loginHeader).toBe('Customer Login');
    await browser.close();
});

When('I click the logout button', async function () {
    await page.locator("//a[normalize-space(text())='Log Out']").click();
});


When('I enter invalid username {string} and password {string}', async function (invalidUsername: string, invalidPassword: string) {
    await page.locator("input[name='username']").fill(invalidUsername);
    await page.locator("input[type='password']").fill(invalidPassword);
});

When('I click the login button', async function () {
    await page.locator("input[value='Log In']").click();
});