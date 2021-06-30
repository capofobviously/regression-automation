const playwright = require('playwright');
const {devices} = require('playwright');
var config = require("../config");
const expect = require('expect');
const PAGE_URL = "https://estore.ua/";
let scrollOnElement = function scrollOnElement() {'../src/scroll.js'};


// Обратный звонок из хедера
for (const browserType of ["chromium", "firefox", "webkit"]) {
    jest.setTimeout(60000);
    describe(`(${browserType})`, () => {
        let browser = null;
        let page = null;

        beforeAll(async () => {
            browser = await playwright[browserType].launch({
                headless: config.web.headless,
                slowMo: config.web.sloMo,
            });
            page = await browser.newPage({
                httpCredentials: config.web.httpCredentials,
                viewport: config.web.viewport,
            });

            if (!page) {
                throw new Error("Соединение не установлено");
            }

            await page.goto(PAGE_URL, {
                waitUntil: "networkidle0"
            });
        });

        afterAll(async () => {
            await browser.close();
        });

        test(`Обратный звонок из хедера`, async () => {
            await page.hover('.dropdown.header-contacts');
            await expect(page).toHaveSelector('.dropdown.header-contacts.open');
            await expect(page).toHaveText('div.topcontainer #callback-main .level-top.fancybox', 'Обратный звонок');
            await page.click('div.topcontainer #callback-main .level-top.fancybox');
            await page.click('#callbacks_name');
            await page.type('[name=name]', 'Обратный звонок из хедера');
            await page.click('#callbacks_phone');
            await page.type('[name=phone]', '99 999-99-99');
            await page.click('#webform_2_submit_button');
            await expect(page).toHaveText('#form_customercallbacks > span.callbacks_message', 'Спасибо');
            await page.waitForTimeout(1000);
            await page.screenshot({path: `results/Обратный звонок из хедера – ${browserType}.png`});
            await page.click('div.fancybox-skin > a.fancybox-close');
        });
    });
}

// MOBILE Обратный звонок из плавающей кнопки
for (const browserType of ["chromium", "firefox", "webkit"]) {
    jest.setTimeout(60000);
    describe(`(${browserType})`, () => {
        const iPhone8 = devices['iPhone 8'];
        let browser = null;
        let page = null;

        beforeAll(async () => {
            browser = await playwright[browserType].launch({
                headless: config.web.headless,
                slowMo: config.web.sloMo,
            });
            page = await browser.newPage({
                viewport: iPhone8.viewport,
                userAgent: iPhone8.userAgent,
                httpCredentials: config.web.httpCredentials,
            });

            if (!page) {
                throw new Error("Соединение не установлено");
            }

            await page.goto(PAGE_URL, {
                waitUntil: "networkidle0"
            });
        });

        afterAll(async () => {
            await browser.close();
        });

        test(`iOS – Обратный звонок из кнопки`, async () => {
            await page.click('a.v-button.v-accept');
            await page.click('div.block-content > div.fixed-phone > div.fixed-phone__button');
            await expect(page).toHaveSelector('div.fixed-phone__popup');
            await expect(page).toHaveSelector('div.block-content > div.fixed-phone > div.fixed-phone__popup #callback-header > li > a');
            await page.click('div.block-content > div.fixed-phone > div.fixed-phone__popup #callback-header > li > a');
            await page.click('#callbacks_name');
            await page.type('[name=name]', 'playwright mobile');
            await page.click('#callbacks_phone');
            await page.type('[name=phone]', '99 999-99-99');
            await page.click('#webform_2_submit_button');
            await expect(page).toHaveText('#form_customercallbacks > span.callbacks_message', 'Спасибо');
            await page.waitForTimeout(1000);
            await page.screenshot({path: `results/${browserType}Mobile – Обратный звонок из кнопки.png`});
            await page.click('div.fancybox-skin > a.fancybox-close');
        });
    });
}

// Обратный звонок из футера
for (const browserType of ["chromium", "firefox", "webkit"]) {
    jest.setTimeout(60000);
    describe(`(${browserType})`, () => {
        let browser = null;
        let page = null;

        beforeAll(async () => {
            browser = await playwright[browserType].launch({
                headless: config.web.headless,
                slowMo: config.web.sloMo,
            });
            page = await browser.newPage({
                httpCredentials: config.web.httpCredentials,
                viewport: config.web.viewport,
            });

            if (!page) {
                throw new Error("Соединение не установлено");
            }

            await page.goto(PAGE_URL, {
                waitUntil: "networkidle0"
            });
        });

        afterAll(async () => {
            await browser.close();
        });

        test(`Обратный звонок из футера`, async () => {
            await scrollOnElement(page, '.footer-primary-container');
            await expect(page).toHaveText('div.footer-primary-top #callback-main .level-top.fancybox', 'Обратный звонок');
            await page.click('div.footer-primary-top #callback-main .level-top.fancybox');
            await page.click('#callbacks_name');
            await page.type('[name=name]', 'Обратный звонок из футера');
            await page.click('#callbacks_phone');
            await page.type('[name=phone]', '99 999-99-99');
            await page.click('#webform_2_submit_button');
            await expect(page).toHaveText('#form_customercallbacks > span.callbacks_message', 'Спасибо');
            await page.waitForTimeout(1000);
            await page.screenshot({path: `results/Обратный звонок из футера – ${browserType}.png`});
            await page.click('div.fancybox-skin > a.fancybox-close');
        });
    });
}

// MOBILE Обратный звонок из футера
for (const browserType of ["chromium", "firefox", "webkit"]) {
    jest.setTimeout(60000);
    describe(`(${browserType})`, () => {
        const iPhone8 = devices['iPhone 8'];
        let browser = null;
        let page = null;

        beforeAll(async () => {
            browser = await playwright[browserType].launch({
                headless: config.web.headless,
                slowMo: config.web.sloMo,
            });
            page = await browser.newPage({
                viewport: iPhone8.viewport,
                userAgent: iPhone8.userAgent,
                httpCredentials: config.web.httpCredentials,
            });

            if (!page) {
                throw new Error("Соединение не установлено");
            }

            await page.goto(PAGE_URL, {
                waitUntil: "networkidle0"
            });
        });

        afterAll(async () => {
            await browser.close();
        });

        test(`iOS – Обратный звонок из футера`, async () => {
            await page.click('a.v-button.v-accept');
            await scrollOnElement(page, '.footer-primary-container');
            await page.click('div.block-content > div.callback-holder #callback-main > ul >li > a');
            await expect(page).toHaveText('div.block-content > div.callback-holder #callback-main > ul >li > a', 'Обратный звонок');
            await page.click('#callbacks_name');
            await page.type('[name=name]', 'playwright mobile');
            await page.click('#callbacks_phone');
            await page.type('[name=phone]', '99 999-99-99');
            await page.click('#webform_2_submit_button');
            await expect(page).toHaveText('#form_customercallbacks > span.callbacks_message', 'Спасибо');
            await page.waitForTimeout(1000);
            await page.screenshot({path: `results/${browserType}Mobile – Обратный звонок из футера.png`});
            await page.click('div.fancybox-skin > a.fancybox-close');
        });
    });
}