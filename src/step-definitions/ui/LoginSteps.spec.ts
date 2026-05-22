import { Given, When } from "@cucumber/cucumber";
import { LoginPage } from "../../pages/LoginPage";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../utils/world";

Given('doctor logs in successfully', async function (this: CustomWorld) {
    await this.page.goto('/login');

    const loginPage = new LoginPage(this.page);
    await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);

    await expect(this.page).not.toHaveURL(/\/login/);
});

When('user navigates to {string}', async function (this: CustomWorld, url: string) {
    await this.page.goto(url);
});