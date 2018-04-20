const puppeteer = require('puppeteer');
const { suite, test } = require('mocha');

async function demoTest() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', (...args) => {
        console.log(args);
    });

    page.setViewport({ width: 1024, height: 768 });

    const url = 'http://localhost:8080';
    const response = await page.goto(url);

    // Puppeteer 1.2 - times out
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.type('#colour', '#234abc', { delay: 50 }),
    ]);

    // Puppeteer 0.11 - works
    // await page.focus('#colour');
    // await page.type('#234abc');
    // await page.waitForNavigation({ waitUntil: 'networkidle' });

    console.log('I am never called');
    browser.close();
}

suite('test', () => {
    test('demo', demoTest);
});