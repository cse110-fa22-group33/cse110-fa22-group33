import { Task } from "./skyTasks";

describe('Task Class Tests', () => {
  let testTask;
  beforeEach(() => {
    testTask = new Task('Test Task', 1000);
  });

  test('Test Task Creation', () =>{
    //Check if the task created in before all exists
    expect(testTask).toBeInstanceOf(Task);
  });

  test('Convert Task to JSON string then back to task object', ()=>{
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
})