const path = require('path');

describe('Monthly Calendar Tests', () => {
  let currentDate;
  beforeAll(async () => {
    await page.goto("http://127.0.0.1:5500/source/week/weekly.html")
  });

  // calculate table specific numbers, rows, cols

  /*test('Test month and year header', async () => {
    let monthYear = await page.$('#monthYear');
    monthYear = await monthYear.getProperty('innerText');
    expect(await monthYear.jsonValue()).toEqual(`${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.toLocaleString('default', { year: 'numeric' })}`);
  });

  test('Test start and end of week days', async () => {
    let weekDays = await page.$('#weekDays');
    weekDays = await weekDays.getProperty('innerText');
    expect(await weekDays.jsonValue()).toEqual(`${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.toLocaleString('default', { year: 'numeric' })}`);
  });

  test('Test padding display', async () => {
    const numDays = await page.$$('.day');
    expect(numDays.length).toBe(35);
  });

  test('Test task display', async () => {
    const numDays = await page.$$('.day');
    expect(numDays.length).toBe(35);
  });*/
});
