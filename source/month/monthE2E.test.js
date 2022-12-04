const path = require('path');

describe('Monthly Calendar Tests', () => {
  let currentDate;
  beforeAll(async () => {
    await page.goto("http://127.0.0.1:5500/source/month/month.html")
    currentDate = new Date();
  });

  test('Test correct number of day divs', async () => {
    const numDays = await page.$$('.day');
    expect(numDays.length).toBe(35);
  });

  test('Test correct month', async () => {
    let monthTitle = await page.$('#monthTitle');
    monthTitle = await monthTitle.getProperty('innerText');
    expect(await monthTitle.jsonValue()).toEqual(`${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.toLocaleString('default', { year: 'numeric' })}`);
  });

  test('Test back button', async () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    let backButton = await page.$('#back');
    await backButton.click();
    let monthTitle = await page.$('#monthTitle');
    monthTitle = await monthTitle.getProperty('innerText');
    expect(await monthTitle.jsonValue()).toEqual('November 2022');
  })

  test('Test next button', async () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    let nextButton = await page.$('#next');
    await nextButton.click();
    let monthTitle = await page.$('#monthTitle');
    monthTitle = await monthTitle.getProperty('innerText');
    expect(await monthTitle.jsonValue()).toEqual('December 2022');
  });
});