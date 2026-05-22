import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, request } from '@playwright/test';
import { CustomWorld } from './world';

setDefaultTimeout(60 * 1000);

const BASE_URL = process.env.UI_BASE_URL || 'https://codewise-clinic-portal.lovable.app';

Before({ tags: '@ui' }, async function (this: CustomWorld) {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext({ baseURL: BASE_URL });
    this.page = await this.context.newPage();
});

After({ tags: '@ui' }, async function (this: CustomWorld) {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
});

Before({ tags: '@api' }, async function (this: CustomWorld) {
    this.request = await request.newContext();
});

After({ tags: '@api' }, async function (this: CustomWorld) {
    await this.request?.dispose();
});
