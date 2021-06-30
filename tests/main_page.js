const {chromium, firefox, webkit} = require('playwright');
const expect = require('expect');
const PAGE_URL = "https://estore.ua/";
let scrollOnElement = function scrollOnElement() {'../src/scroll.js'};
let browser;
let page;


beforeAll(async () => {
    browser = await webkit.launch({headless: false,});
});
afterAll(async () => {
    await browser.close();
});
beforeEach(async () => {
    page = await browser.newPage();
});
afterEach(async () => {
    await page.close();
});


it('Добавить в корзину – Новинки', async () => {
    jest.setTimeout(20000);
    const context = await browser.newContext({
        httpCredentials: config.web.httpCredentials,
        viewport: config.web.viewport,
        userAgent: 'Playwright'
    });
    const page = await context.newPage();
    await page.goto(PAGE_URL);
    await scrollOnElement(page, 'div.like_h3'[1]);
    await page.click('#itemslider-new > div.owl-wrapper-outer:nth-of-type(1) > div > div:nth-child(1) > div > div > div.actions > button');
    await expect(page).toHaveText('span.section-title.fancybox-title', ' Вам может пригодиться 👇 ');
    await expect(page).toHaveSelector('#shopping-cart-table > div.footer-t > div:nth-child(2) > div > button.button.btn-update.btn-inline');
    await expect(page).toHaveText('div.page-title.title-buttons > h1', 'Корзина');
    await page.screenshot({path: `results/Добавить в корзину – Новинки.png`});
    await page.click('.fancybox-item.fancybox-close');
});

it('Добавить в корзину – Хиты', async () => {
    jest.setTimeout(20000);
    const context = await browser.newContext({
        httpCredentials: config.web.httpCredentials,
        viewport: config.web.viewport,
        userAgent: 'Playwright'
    });
    const page = await context.newPage();
    await page.goto(PAGE_URL);
    await scrollOnElement(page, 'div.like_h3'[1]);
    await page.click('#itemslider-featured-a6061220641485f5f014159ceb126e15-hits > div.owl-wrapper-outer:nth-of-type(1) > div > div:nth-child(1) > div > div > div.actions > button');
    await expect(page).toHaveText('span.section-title.fancybox-title', ' Вам может пригодиться 👇 ');
    await expect(page).toHaveSelector('#shopping-cart-table > div.footer-t > div:nth-child(2) > div > button.button.btn-update.btn-inline');
    await expect(page).toHaveText('div.page-title.title-buttons > h1', 'Корзина');
    await page.screenshot({path: `results/Добавить в корзину – Хиты.png`});
    await page.click('.fancybox-item.fancybox-close');
});