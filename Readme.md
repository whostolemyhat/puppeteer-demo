Requires Node 9.*
Start a local server in the `src` folder to serve the HTML:
`cd src && http-server`

While the page is being served, run the tests: `npm test` (test expects page to be served on `localhost:8080`)

The page makes a fetch request when something is typed into the input, with a slight delay.
The test types a colour hex into the input, and is waiting for all network requests to finish before passing the test.

With Puppeteer 1.2/1.3, the test always times out and never completes. With Puppeteer 0.11, the test passes (when updated to match syntax).

Puppeteer 1.2
```
await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    page.type('#colour', '#234abc', { delay: 50 }),
]);
```

Puppeteer 0.11
```
await page.focus('#colour');
await page.type('#234abc');
await page.waitForNavigation({ waitUntil: 'networkidle' });
```