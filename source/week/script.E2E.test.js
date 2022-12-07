const path = require('path');

describe('Weekly Calendar Tests', () => {
  let currentDate;
  beforeAll(async () => {
    await page.goto("http://127.0.0.1:5500/source/week/weekly.html")
    currentDate = new Date();
  });

  test('Test month and year header', async () => {
    let monthYear = await page.$('#monthYear');
    monthYear = await monthYear.getProperty('innerText');
    expect(await monthYear.jsonValue()).toEqual(`${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.toLocaleString('default', { year: 'numeric' })}`);
  });

  test('Test start and end of week days', async () => {
    for (let index = currentDate.getDay(); index > 0; index--){
      currentDate.setDate(currentDate.getDate() - 1);
    }
    let initialDate = currentDate.getDate();
    currentDate.setDate(initialDate + 6);
    let finalDate = currentDate.getDate();
    let weekDays = await page.$('#weekDays');
    weekDays = await weekDays.getProperty('innerText');
    expect(await weekDays.jsonValue()).toEqual(`${initialDate} - ${finalDate}`);
  });

  test('Test timeslot display', async () => {
    const numRows = await page.$$('.grid-container');
    expect(numRows.length).toBe(25);
  });
});
