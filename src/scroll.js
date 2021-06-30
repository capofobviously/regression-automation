export async function scrollOnElement(page, selector) {
    await page.$eval(selector, (element) => {
        element.scrollIntoView();
    });
}