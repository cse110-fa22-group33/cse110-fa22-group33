const path = require('path');

describe('Monthly Calendar Tests', () => {
  beforeAll(async () => {
    await page.goto("http://127.0.0.1:5500/source/month/month.html")
  })

  test('Test correct number of day divs', async () => {
    const numDays = await page.$$('.day');
    expect(numDays.length).toBe(35);
  });

  test('Test correct month', async () => {
    let monthTitle = await page.$('#monthTitle');
    monthTitle = await monthTitle.getProperty('innerText');
    expect(await monthTitle.jsonValue()).toEqual('December 2022');

  });

})