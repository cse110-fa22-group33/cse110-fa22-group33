/**
 * @jest-environment node
 */

import { Task } from "./skyTasks";

describe('Task Class Tests', () => {
  let testTask;
  beforeEach(() => {
    testTask = new Task('Test Task', 1000);
    //testTask.addToLocalStorage();
  });

  test('Test Task Creation', () => {
    //Check if the task created in before all exists
    expect(testTask).toBeInstanceOf(Task);
  });

  test('Convert Task to JSON string then back to task object', () => {
    let jsonString = testTask.toJson();
    expect(JSON.parse(jsonString)).toBeInstanceOf(Object);
    expect(JSON.parse(jsonString)).toHaveProperty("task_name");
    let taskObjectFromJSON = Task.fromJson(jsonString);
    expect(taskObjectFromJSON).toBeInstanceOf(Task);
    expect(taskObjectFromJSON.data.task_name).toEqual("Test Task");
    expect(taskObjectFromJSON.data.uid).toBe(1000);
  })

  test('Check padding branch in constructor', () => {
    let paddingTest = new Task('padding test', 1000, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, true);
    expect(paddingTest.data.priority).toBe(6);
    expect(paddingTest.data.padding).toBe(true);
  })

  test('Test setToPadding()', () => {
    testTask.setToPadding();
    expect(testTask.data.padding).toBe(true);
    expect(testTask.data.priority).toBe(6);
  })

  test('Test setRecursiveToPadding()', () => {
    testTask.setToRecursivePadding();
    expect(testTask.data.padding).toBe(true);
    expect(testTask.data.priority).toBe(6);
    expect(testTask.data.recurrent).toBe(true);
  })

  //how bruh?!
  test('Test splitTask()', () => {
    Task.removeAllTasks();
    testTask.addToLocalStorage();

    //test preferHour greater than Duration
    testTask.data.duration = 3;
    let prefer = 4;
    let result = Task.splitTask(testTask, prefer);
    expect(result).toBe(undefined);

    //testTask = new Task('Test Task', 1000);

    //test preferHour 2, duration 7

    testTask.data.duration = 7;
    prefer = 2;

    Task.splitTask(testTask, prefer);

    let currArray = Task.getAllTasks();

    console.log(currArray);

    expect(currArray[0].length).toBe(4);

  })

  test('Test getUniqueUID()', () => {
    //used localStorage, need to fix
    testTask.addToLocalStorage();
    let newUID = Task.getUniqueUID();
    expect(newUID).toBe(testTask.data.uid + 1);
  })

  
  test('Test getUniqueTaskUID()', () => {
    //same concept as above test
    let newTaskUID = Task.getUniqueTaskUID();
    expect(newTaskUID).toBe(NaN);
  })

  test('Test getAllTasks()', () => {

    //initial test has nothing loaded
    //load the testTask, see if it is present
    //add 2 more tasks, check if all 3 tasks are shown    
    Task.removeAllTasks();
    let currArray = Task.getAllTasks();
    expect(currArray.length).toBe(0);

    testTask.addToLocalStorage();
    currArray = Task.getAllTasks();
    expect(currArray[0][0]).toStrictEqual(testTask);
    //load the testTask, check if that UID is present
    let task1 = new Task('task1', 2000);
    task1.data.duration = 9;
    task1.addToLocalStorage();
    Task.splitTask(task1, 3);
    let task2 = new Task('task2', 3000);
    task2.addToLocalStorage();
    currArray = Task.getAllTasks();
    //console.log(currArray[0].length);
    expect(currArray[0].length).toBe(5);
  })

  test('Test getAllTaskUIDs()', () => {
    Task.removeAllTasks();
    testTask.data.task_uid = 10;
    testTask.data.duration = 10;
    testTask.addToLocalStorage();

    Task.splitTask(testTask, 2);

    let currArray = Task.getAllTaskUIDs();
    
    expect(currArray.length).toBe(1);
  })

  test('Test getAllUIDs()', () => {
    //initial test that has nothing loaded
    Task.removeAllTasks();
    let currArray = Task.getAllUIDs();
    expect(currArray.length).toBe(0);

    testTask.addToLocalStorage();
    currArray = Task.getAllUIDs();
    expect(currArray[0]).toStrictEqual(testTask.data.uid);
    //load the testTask, check if that UID is present
    let task1 = new Task('task1', 2000);
    task1.addToLocalStorage();
    let task2 = new Task('task2', 3000);
    task2.addToLocalStorage();
    currArray = Task.getAllUIDs();
    expect(currArray.length).toBe(3);
    //add two other tasks, check if all 3 UIDs are present
  })

  test('Test getAllTasksFlat()', () => {
    Task.removeAllTasks();
    let currArray = Task.getAllTasksFlat();
    expect(currArray.length).toBe(0);

    testTask.addToLocalStorage();
    currArray = Task.getAllTasksFlat();
    expect(currArray[0]).toStrictEqual(testTask);
    //load the testTask, check if that UID is present
    let task1 = new Task('task1', 2000);
    task1.data.duration = 9;
    task1.addToLocalStorage();
    Task.splitTask(task1, 3);
    let task2 = new Task('task2', 3000);
    task2.addToLocalStorage();
    currArray = Task.getAllTasksFlat();
    //console.log(currArray);
    expect(currArray.length).toBe(5);
  })

  test('Test getAllPaddings()', () => {
    Task.removeAllTasks();
    let currArray = Task.getAllPaddings();
    expect(currArray.length).toBe(0);

    let task1 = new Task('task1', 2000);
    task1.data.padding = true;
    task1.addToLocalStorage();

    let task2 = new Task('task2', 3000);
    task2.data.padding = true;
    task2.addToLocalStorage();
    currArray = Task.getAllPaddings();

    expect(currArray.length).toBe(2);

  })

  test('Test getAllRecuringPaddings()', () => {
    Task.removeAllTasks();
    let currArray = Task.getAllRecuringPaddings();
    expect(currArray.length).toBe(0);

    testTask.setToRecursivePadding();
    testTask.addToLocalStorage();

    currArray = Task.getAllRecuringPaddings();

    expect(currArray.length).toBe(1);
  })

  test('Test getTasksFromTaskUID()', () => {
    let task1 = new Task('task1', 2000, 1);
    let taskUID = task1.data.task_uid;
    task1.data.duration = 9;
    task1.addToLocalStorage();
    Task.splitTask(task1, 3);
    let currArray = Task.getTasksFromTaskUID(taskUID);
    expect(currArray.length).toBe(3);
  })

  //use this test case for ones below
  test('Test getTasksFromDifficulty()', () => {
    //test wrong difficulty, then test the right one!
    //again, right test case only works if I add to local storage, is there a way around!?
    //FIX!
    testTask.data.difficulty = 5;
    testTask.addToLocalStorage();
    
    let testDiff = 0;
    let result = [];
    expect(Task.getTasksFromDifficulty(testDiff).length).toBe(result.length);
    testDiff = 5;
    expect(Task.getTasksFromDifficulty(testDiff).length).toBe(1);
  })

  test('Test getTasksFromPriority()', () => {
    testTask.data.priority = 5;
    testTask.addToLocalStorage();
    let testPri = 1;
    let result = [];
    expect(Task.getTasksFromPriority(testPri).length).toBe(result.length);
    testPri = 5;
    expect(Task.getTasksFromPriority(testPri).length).toBe(1);
  })

  test('Test getTasksFromCategory()', () => {
    testTask.data.category = "personal";
    testTask.addToLocalStorage();
    let testCat = "other";
    let result = [];
    expect(Task.getTasksFromCategory(testCat).length).toBe(result.length);
    testCat = "personal";
    //expect(Task.getTasksFromCategory(testCat).length).toBe(1);
  })

  test('Test getTaskFromUID()', () => {
    //THIS CASE WORKS ONLY IF I ADD TO LOCALSTORAGE!
    //check with a false UID, then test the right one
    testTask.addToLocalStorage();
    //console.log(testTask);
    //console.log(testTask.data.start_date);
    let currUID = testTask.data.uid;
    //expect(Task.getTaskFromUID(falseUID)).toBe(null);
    //toBe wont work, will have to use toStrictEqual!
    expect(Task.getTaskFromUID(currUID)).toStrictEqual(testTask);
  })

  test('Test getTasksFromDate()', () => {
    Task.removeAllTasks();
    let myTask = new Task('task', Task.getUniqueUID(), Task.getUniqueTaskUID());
    myTask.data.ddl = new Date('November 28, 2023 10:00:00');
    myTask.data.start_date = new Date('November 28, 2023 10:00:00');
    myTask.addToLocalStorage();
    
    let retrivedTask = Task.getTasksFromDate(new Date('November 28, 2023 10:00:00'));
    expect(myTask.data.task_name).toBe(retrivedTask[0].data.task_name);
    
  })

  test('Test getTasksFromDDL()', () => {
    Task.removeAllTasks();
    let myTask = new Task('task', Task.getUniqueUID(), Task.getUniqueTaskUID());
    myTask.data.ddl = new Date('November 28, 2023 10:00:00');
    myTask.data.start_date = new Date('November 28, 2023 10:00:00');
    myTask.addToLocalStorage();
    
    let retrivedTask = Task.getTasksFromDDL(new Date('November 28, 2023 10:00:00'));
    expect(myTask.data.task_name).toBe(retrivedTask[0].data.task_name);
    
  })

  test('Test getTasksBetweenDate()', () => {
    Task.removeAllTasks();
    let myTask = new Task('task', Task.getUniqueUID(), Task.getUniqueTaskUID());
    myTask.data.ddl = new Date('November 28, 2023 10:00:00');
    myTask.data.start_date = new Date('November 28, 2023 10:00:00');
    myTask.addToLocalStorage();
    
    let retrivedTask = Task.getTaskBetweenDate(new Date('November 27, 2023 10:00:00'),new Date('November 29, 2023 10:00:00'));
    expect(myTask.data.task_name).toBe(retrivedTask[0].data.task_name);
    
  })

  test('Test getTasksBetweenDDL()', () => {
    Task.removeAllTasks();
    let myTask = new Task('task', Task.getUniqueUID(), Task.getUniqueTaskUID());
    myTask.data.ddl = new Date('November 28, 2023 10:00:00');
    myTask.data.start_date = new Date('November 28, 2023 10:00:00');
    myTask.addToLocalStorage();
    
    let retrivedTask = Task.getTaskBetweenDDL(new Date('November 27, 2023 10:00:00'),new Date('November 29, 2023 10:00:00'));
    expect(myTask.data.task_name).toBe(retrivedTask[0].data.task_name);
    
  })

  test('Test getTasksAfterDate()', () => {
    Task.removeAllTasks();
    let myTask = new Task('task', Task.getUniqueUID(), Task.getUniqueTaskUID());
    myTask.data.ddl = new Date('November 28, 2023 10:00:00');
    myTask.data.start_date = new Date('November 28, 2023 10:00:00');
    myTask.addToLocalStorage();
    
    let retrivedTask = Task.getTasksAfterDate(new Date('November 27, 2023 10:00:00'));
    expect(myTask.data.task_name).toBe(retrivedTask[0].data.task_name);
    
  })

  test('Test getTasksAfterDDL()', () => {
    Task.removeAllTasks();
    let myTask = new Task('task', Task.getUniqueUID(), Task.getUniqueTaskUID());
    myTask.data.ddl = new Date('November 28, 2023 10:00:00');
    myTask.data.start_date = new Date('November 28, 2023 10:00:00');
    myTask.addToLocalStorage();
    
    let retrivedTask = Task.getTasksAfterDDL(new Date('November 27, 2023 10:00:00'));
    expect(myTask.data.task_name).toBe(retrivedTask[0].data.task_name);
    
  })

  //This is easy, use same test for ones below!
  test('Test compareDifficulty()', () => {
    testTask.data.difficulty = 5;
    let otherTask = new Task('Other Task');
    otherTask.data.difficulty = 3;
    expect(Task.compareDifficulty(testTask, otherTask)).toBe(2);

  })

  test('Test comparePriority()', () => {
    testTask.data.priority = 5;
    let otherTask = new Task('Other Task');
    otherTask.data.priority = 1
    expect(Task.comparePriority(testTask, otherTask)).toBe(4);
  })

  test('Test compareDDL()', () => {
    testTask.data.ddl = new Date("2022-12-25")
    let otherTask = new Task('Other Task');
    otherTask.data.ddl = new Date("2023-01-25");
    expect(Task.compareDDL(testTask, otherTask)).toBeLessThan(0);
  })

  test('Test compareSoftDDL()', () => {
    testTask.data.softddl = new Date("2023-01-01");
    let otherTask = new Task('Other Task');
    otherTask.data.softddl = new Date("2022-12-05");
    expect(Task.compareSoftDDL(testTask, otherTask)).toBeGreaterThan(0);
  })

  test('Test compareStartDate()', () => {
    testTask.data.start_date = new Date();
    let otherTask = new Task('Other Task');
    otherTask.data.start_date = new Date("2023-12-04");
    expect(Task.compareStartDate(testTask, otherTask)).toBeLessThan(0);
  })

  //whats difference between compareStartDate and compareTimeInterval?
  //we should delete this method, it is not being used!
  test('Test compareTimeInterval()', () => {
    let date = new Date();
    testTask.data.start_date = new Date();
    let otherTask = new Task('Other Task');
    otherTask.data.start_date = new Date("2023-12-04");
    //console.log(Task.compareTimeInterval(testTask, otherTask));
    expect(Task.compareTimeInterval(testTask, otherTask)).toBe(false);

  })

  test('Test firstAvailable()', () => {

  })

  test('Test dateRangeOverlaps()', () => {

  })

  test('Test sortOccupied()', () => {
    let occupied = [];

    let task1 = new Task('t1');
    task1.setToPadding();
    task1.data.ddl = new Date("2023-12-17");
    task1.data.duration = 7;
    occupied.push([new Date(task1.data.ddl), Number.parseInt(task1.data.duration)]);

    let task2 = new Task('t2');
    task2.setToPadding();
    task2.data.ddl = new Date("2022-01-02");
    task2.data.duration = 5;
    occupied.push([new Date(task2.data.ddl), Number.parseInt(task2.data.duration)]);

    let task3 = new Task('t3');
    task3.setToPadding();
    task3.data.ddl = new Date("2023-01-25");
    task3.data.duration = 3;
    occupied.push([new Date(task3.data.ddl), Number.parseInt(task3.data.duration)]);

    let newOccupied = Task.sortOccupied(occupied);

    console.log(newOccupied.length);

    expect(newOccupied.length).toBe(3);
  })
  
  test('Test schedule()', () => {
    Task.removeAllTasks();
    let mytask10 = new Task('10 3 3', Task.getUniqueUID(), Task.getUniqueTaskUID());
    mytask10.data.ddl = new Date('November 28, 2023 10:00:00');
    mytask10.addToLocalStorage();
    let mytask = new Task('10 5 3', Task.getUniqueUID(), Task.getUniqueTaskUID());
    mytask.data.ddl = new Date('November 28, 2023 10:00:00');
    mytask.addToLocalStorage();
    mytask = new Task('10 5 5', Task.getUniqueUID(), Task.getUniqueTaskUID());
    mytask.data.ddl = new Date('November 28, 2023 10:00:00');
    mytask.data.priority = 5;
    mytask.data.difficulty = 5;
    mytask.addToLocalStorage();
    mytask = new Task('10 5 1', Task.getUniqueUID(), Task.getUniqueTaskUID());
    mytask.data.ddl = new Date('November 28, 2023 10:00:00');
    mytask.data.priority = 5;
    mytask.data.difficulty = 1;
    mytask.addToLocalStorage();

    Task.schedule();

    let all_tasks = Task.getAllTasksFlat();
    all_tasks.sort(Task.compareStartDate);
    expect(all_tasks[0].data.task_name).toBe('10 5 5');
    expect(all_tasks[1].data.task_name).toBe('10 5 1');
    expect(all_tasks[2].data.task_name).toBe('10 3 3');
    expect(all_tasks[3].data.task_name).toBe('10 5 3');

  })
  
  test('Test addToLocalStorage()', () => {
    Task.removeAllTasks();
    let myTask = new Task('task1', Task.getUniqueUID(), Task.getUniqueTaskUID());
    myTask.addToLocalStorage();
    let sameTask = Task.getAllTasksFlat()[0];

    expect(myTask.data.task_name).toBe(sameTask.data.task_name);
    expect(myTask.data.uid).toBe(sameTask.data.uid);
    expect(myTask.data.task_uid).toBe(sameTask.data.task_uid);
    expect(myTask.data.ddl.toISOString()).toBe(sameTask.data.ddl.toISOString());
    expect(myTask.data.difficulty).toBe(sameTask.data.difficulty);
    expect(myTask.data.priority).toBe(sameTask.data.priority);
    expect(myTask.data.mintime).toBe(sameTask.data.mintime);
    expect(myTask.data.padding).toBe(sameTask.data.padding);

  })

  test('Test removeFromLocalStorage()', () => {
    Task.removeAllTasks();
    let myTask = new Task('task1', Task.getUniqueUID(), Task.getUniqueTaskUID());
    myTask.addToLocalStorage();
    Task.removeFromLocalStorage(myTask.data.uid);

    expect(Task.getAllTasksFlat().length).toBe(0);
  })

  test('Test removeAllTasks()', () => {
    Task.removeAllTasks();
    new Task('task1', Task.getUniqueUID(), Task.getUniqueTaskUID()).addToLocalStorage();
    new Task('task1', Task.getUniqueUID(), Task.getUniqueTaskUID()).addToLocalStorage();
    new Task('task1', Task.getUniqueUID(), Task.getUniqueTaskUID()).addToLocalStorage();
    new Task('task1', Task.getUniqueUID(), Task.getUniqueTaskUID()).addToLocalStorage();
    new Task('task1', Task.getUniqueUID(), Task.getUniqueTaskUID()).addToLocalStorage();
    new Task('task1', Task.getUniqueUID(), Task.getUniqueTaskUID()).addToLocalStorage();
    Task.removeAllTasks();

    expect(Task.getAllTasksFlat().length).toBe(0);
  })

  test('Test removeLargeTask()', () => {
    Task.removeAllTasks();
    new Task('task1', Task.getUniqueUID(), 110).addToLocalStorage();
    new Task('task1', Task.getUniqueUID(), 110).addToLocalStorage();
    new Task('task1', Task.getUniqueUID(), 110).addToLocalStorage();
    new Task('task1', Task.getUniqueUID(), 110).addToLocalStorage();
    new Task('task1', Task.getUniqueUID(), 110).addToLocalStorage();
    new Task('task1', Task.getUniqueUID(), 111).addToLocalStorage();

    Task.removeLargeTask(110);
    let taskList = Task.getAllTasksFlat();

    expect(taskList.length).toBe(1);
    expect(taskList[0].data.task_uid).toBe(111);
  })
})