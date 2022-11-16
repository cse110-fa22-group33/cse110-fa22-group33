/**
 * inside local storage:
 *      a bunch of classes stored in first level {key=uid, value=Task object}
 *      a large_tasks object {key=task_uid, value=array of uid}
 *      a current_task object that holds a integer: uid
 *      a task_date object that holds {key=year(integer), value={key=month(integer), value={key=day(integer),value=array of uid(integer)}}}
 *
 * sample usage:
 *      import { Task } from './path/to/task.js'; // put this under script.js to import this class
 *      let mytask = new Task('task name', 1000);
 *      mytask.addToLocalStorage(); // put a task to local strage
 *      let retrived_task = Task.getTaskFromUID(1000); retrive a task from local strage
 */
export class Task {
  constructor(task_name = 'New Task', uid = null, task_uid = null, start_date = null, category = [], duration = 1, softddl = null,
    ddl = null, decription = null, mintime = 1, maxtime = 3, notes = null,
    recurrent = false, padding = false, difficulty = 3) {
    this.data = {
      task_name: task_name, //a string, the name of the task, not required
      uid: uid, // an integer, the unique identifier of the splitted task, required (expect when task is padding)
      task_uid: task_uid, // an integer, the unique identifier of the same task, all splitted task have the same task_uid, required (expect when task is padding)
      category: category, // an array of string, include all categories, not required
      decription: decription, // a string, destription of the task, not required
      duration: duration, // a integer, the estimated duration of task (in hour), not required
      softddl: softddl, // a date object, soft deadline, not required
      ddl: ddl, // a date object, hard deadline, requried (expect padding)
      mintime: mintime, // an integer, min time to work on a task consecutively, in hour, not required
      maxtime: maxtime, // an integer, max time to work on a task consecutively, in hour, not required
      notes: notes, // a string, not required
      recurrent: recurrent, // a boolean, true means recurrent tasks, not required
      padding: padding, // a boolean, indicate if the task is a padding (user-defined busy period), not required
      difficulty: difficulty, // a integer from 1-5, 1 is lowest difficulty and 5 is hardest, not required
      start_date: start_date, // a date object, not required
    };
    if (padding) { this.data.recurrent = true; };
  }

  // return task from a json data file
  static fromJson(json) {
    let task = new Task();
    task.data = JSON.parse(json);
    return task;
  }

  // return json data file from current task
  toJson() {
    return JSON.stringify(this.data);
  }

  //split one tasks into two, and first tasks have a certain duration
  static splitTask(task, firstTaskHour=1) {
    // to be filled
    // create two tasks, first one have firstTaskHour duration, second one have the rest o duration
    // delete the original task from local strage
  }

  // delete all tasks in local strage of the same task_uid
  static deleteTask(task_uid) {
    // to be filled
  }

  // get all tasks in local strage of the same task_uid
  static getTasksFromTaskUID(task_uid) {
    // to be filled
  }

  // get single task in local strage from uid
  static getTaskFromUID(uid) {
    return Task.fromJson(localStorage.getItem(uid));
  }

  // get all tasks of a given day
  static getTasksFromDate(date) {
    let all_tasks_index = localStorage.getItem('task_date');
    let month = date.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let tasks_index = all_tasks_index[year][month][day];
    let tasks=[];
    for (let index of tasks_index) {
      tasks.apend(Task.fromJson(localStorage.getItem('index')));
    };
    return tasks;
  }

  // reschedule all tasks based on all tasks in the local storage
  static schedule() {
    // to be filled
  }

  // add current task to local strage
  addToLocalStorage() {
    localStorage.setItem(this.data.uid, this.toJson());
    // to-do: add current task to large_tasks object index
    // to-do: add current task to task_date object index
    Task.schedule();
  }
}