import { Task } from "./../skyTasks";

const functions = require('./script.js');

describe('Weekly Calendar Functionality Tests', () => {
  let testTask;
  beforeEach(() => {
    testTask = new Task('Test Task', 1234, 1234, new Date());
    testTask.data.ddl = new Date();
  });

  test('getHeaderAndTasksFromStorage()', () =>{
    // Check if date is today
    functions.getHeaderAndTasksFromStorage();

    let currDay = testTask.data.ddl.getDay();
    let currTime = testTask.data.ddl.getHours();
    let currDayTime = "" + currDay  + currTime;
    let currCell = document.getElementById(currDayTime);

   // expect(currCell.innerHTML).toEqual(testTask.data.task_name);
  });

})