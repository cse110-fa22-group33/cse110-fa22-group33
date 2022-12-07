/**
 * @jest-environment jsdom
 */
import { Task } from "./../skyTasks";

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './weekly.html'), 'utf8');
const f = require('./script');



describe('Weekly Calendar Functionality Tests', () => {
  let testTask;
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();

    testTask = new Task('Test Task', 1234, 1234, new Date("2022-12-4"));
    testTask.data.ddl = new Date();
    testTask.addToLocalStorage();
  });

  afterEach(() => {
    // restore the original func after test
    jest.resetModules();
  });

  test('Check if render function works', () => {
    f.render();
  });

  test('getHeaderAndTasksFromStorage()', () =>{
    f.render();
    expect(f.getHeaderAndTasksFromStorage(new Date("2022-12-4"))).toEqual([]);
  });

 test('setTasksForDay()', () =>{
    f.render();
    console.log(testTask);
    expect(f.setTasksForDay(new Date("2022-12-4"))).toEqual([]);
  });

  test('subtractTimeFromDate()', () => {
    const testDate = new Date("2022-11-29");
    const outputDate = new Date("2022-11-25");

    expect(f.subtractTimeFromDate(testDate, 4)).toEqual(outputDate);
  });

  test('addTimeToDate()', () => {
    const testDate = new Date("2022-11-25");
    const outputDate = new Date("2022-11-29");

    expect(f.addTimeToDate(testDate, 4)).toEqual(outputDate);
  });

  test('currentMonth()', () => {
    const testMonth = "January";
    expect(f.currentMonth(0)).toEqual(testMonth);
  });
})