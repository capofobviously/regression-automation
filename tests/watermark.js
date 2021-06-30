const playwright = require('playwright');
const expect = require('expect');
var config = require("../config");
const PAGE_URL = "https://estore.ua/index.php/admin_customwatermark/adminhtml_customwatermark/index/key/632c8a606f3abba76b9278633f5033c6b9f6f9cb/";
let scrollOnElement = function scrollOnElement() {'../src/scroll.js'};
const ids = ['2128036','218037','218038','218032','218033','217338','218059','218060','218061','218063','218062','218080','218074','218075','218073','218082','218086','218058','218091','218067','218092','218094','218093','218105','218106','218064','218066','218070','216568','218068','218069','218076','218124','218141','218143','218142','218144','218137','218139','218138','218140','218133','218134','218125','218157','218160','ааа','218152','218154','218153','218155','218129','218112','218150','218146','218149','218115','218219','218224','218231','218221','218225','218230','218223','218226','218229','218222','218227','218228','218218','218232','218235','218217','218233','218234','218251','218252','218253','218254','218198','218199','218200','218201','218202','218203','218204','218205','218206','218207','218208','218209','218210','218211','218212','218261','218262','218263','218264','218265','218266','218267','218268','218269','218270','218271','218272','218273','f18274','218275','218276','218277','218278','218279','218280','218281','218282','218283','218284','218286','218309','218311','218310','218308','218312','218307','218305','218306','218318','218319','218320','2183219','218322','218323','21i313','218314','218315','218316','218304','218302','218303','218301','218293','218298','218299','218300','218317','218245','218244','218242','218243','218246','218249','218248','218247','217880','217882','217975','217973','218236','217948','217947','218330','218334','218290','218291','218342','218341','218340','218339','218343','218338','218337','218336','218335','218344','218345'];


// Добавление СКУ для кастомной вотамарки
for (const browserType of ["chromium"]) {
    jest.setTimeout(2000000);
    describe(`(${browserType})`, () => {
        let browser = null;
        let page = null;

        beforeAll(async () => {
            browser = await playwright[browserType].launch({
                headless: true,
                slowMo: 250,
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
            await page.type('#username', 'username');
            await page.type('#login', 'password');
            await page.click('.form-button');
            await page.click('#customwatermarkGrid_table > tbody > tr:nth-child(1) > td:nth-child(3)');
            await page.click('#customwatermark_tabs_related > span');
            });

        afterAll(async () => {
            await page.click('div.content-header > p > button:nth-child(4)'); //сохранить изминения
            await browser.close();
        });

        test(`watermark`, async () => {
            let checkbox = '#customwatermark_tabs_related_content > div > .grid > .hor-scroll > .data > tbody > tr > td > input'; //селектор чекбокса
            for (let i=0; i < ids.length; i += 1) {
                await page.fill('#customwatermark_tabs_related_content > div > .grid > .hor-scroll > .data > thead > .filter > th:nth-child(3) > div > input', ids[i]); //ввести в поле поиска SKU
                await page.press('#customwatermark_tabs_related_content > div > .grid > .hor-scroll > .data > thead > .filter > th:nth-child(3) > div > input','Enter'); //найти SKU
                if (await page.$(checkbox) !== null) {
                    await page.click(checkbox); //установить чекбокс
                }
                else {
                    await page.screenshot({path: `results/watermark-errors/${ids[i]}.png`}); //скрин ошибочного SKU
                    console.log(ids[i] + " not found");
                }
            }
        });
    });
}