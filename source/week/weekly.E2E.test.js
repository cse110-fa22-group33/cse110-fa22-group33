
describe('Monthly Calendar Tests', () => {
  let currentDate;
  beforeAll(async () => {
    await page.goto("http://localhost:5500/up_/week/weekly.html")
    currentDate = new Date();
  });

  // calculate table specific numbers, rows, cols

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

  test('Test columns', async () => {
    let numColumns = await page.$('#repetition>div');
    numColumns = await numColumns.$$('div');
    expect(numColumns.length).toBe(8);
  })
});
