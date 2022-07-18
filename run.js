onst puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(require('puppeteer-extra-plugin-anonymize-ua')())
puppeteer.use(StealthPlugin())


function run () {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({
                headless: true,
                ignoreHTTPSErrors: false,
                defaultViewport: false,
                args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-infobars']
            });
            const page = await browser.newPage();
            await page.goto("https://detail.1688.com/offer/577182016638.html");
            await page.waitForSelector('div.detail-gallery-turn')
            await page.waitForSelector('img.detail-gallery-img')
            await page.waitForSelector('#detail-main-video-content > div > video')
            await page.waitFor(1000);
            let urls = await page.evaluate(() => {
                let results = [];
                try {
                    let video = document.querySelector('#detail-main-video-content > div > video').src
                    let items = document.querySelectorAll('img.detail-gallery-img')
                    items.forEach(item => results.push(item.currentSrc));
                    results.push(video)
                    return results;
                } catch (error) {
                    console.log(error)
                }
            })
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}
run().then(console.log).catch(console.error);
