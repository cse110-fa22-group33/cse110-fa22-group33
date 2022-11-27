import JSDOMEnvironment from "jest-environment-jsdom";
import { Task } from "./../skyTasks";


describe('Weekly Calendar Functionality Tests', () => {
  let testTask;
  beforeEach(() => {
    testTask = new Task('Test Task', 1234, 1234, new Date());
    testTask.data.ddl = new Date();
  });

  test('getHeaderAndTasksFromStorage()', () =>{
    const f = require('./script');
    // jest.spyOn(f, 'getHeaderAndTasksFromStorage');
    // Check if date is today
    // f.getHeaderAndTasksFromStorage();

    /*let currDay = testTask.data.ddl.getDay();
    let currTime = testTask.data.ddl.getHours();
    let currDayTime = "" + currDay  + currTime;
    let currCell = document.getElementById(currDayTime);*/

   expect(f.getHeaderAndTasksFromStorage()).toEqual([testTask]);
  });

})