/**
 * inside local storage:
 *      a bunch of classes stored in first level {key=uid, value=Task object}
 *      a large_tasks object {key=task_uid, value=array of uid}
 *      a current_task object that holds a integer: uid
 *      a task_date object that holds {key=year(integer), value={key=month(integer), value={key=day(integer),value=array of uid(integer)}}}
 *      a all_tasks array that holds a array of all UIDs
 *      a task_difficulty array that holds a array of all UIDs
 *      a task_category array that holds a array of all UIDs
 *      a task_priorty array that holds a array of all UIDs
 *
 * sample usage:
 *      import { Task } from './path/to/task.js'; // put this under script.js to import this class
 *      let mytask = new Task('task name', 1000);
 *      mytask.addToLocalStorage(); // put a task to local strage
 *      let retrived_task = Task.getTaskFromUID(1000); retrive a task from local strage
 */
 export class Task {
  constructor(task_name = 'New Task', uid = null, task_uid = null, start_date = new Date(), category = [], duration = 1, softddl = null,
    ddl = null, decription = null, mintime = 1, maxtime = 3, notes = null,
    recurrent = false, padding = false, difficulty = 3, priorty=3) {
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
      priorty: priorty, // a integer from 1-5, 1 is lowest priorty and 5 is hardest, not required
    };
    if (padding) {
      this.data.recurrent = true;
      this.data.priorty = 6;
    };
  }

  // return task from a json data file
  static fromJson(json) {
    let task = new Task();
    task.data = JSON.parse(json);
    task.data.start_date = new Date(task.data.start_date);
    task.data.softddl = new Date(task.data.softddl);
    task.data.ddl = new Date(task.data.ddl);
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
    return JSON.parse(localStorage.getItem('large_tasks'))[task_uid] || null;
  }

  static getTasksFromDifficulty(difficulty) {
    return JSON.parse(localStorage.getItem('task_difficulty'))[difficulty] || null;
  }

  static getTasksFromPriorty(priorty) {
    return JSON.parse(localStorage.getItem('task_priorty'))[priorty] || null;
  }

  static getTasksFromCategory(category) {
    return JSON.parse(localStorage.getItem('task_category'))[category] || null;
  }

  // get single task in local strage from uid
  static getTaskFromUID(uid) {
    return Task.fromJson(localStorage.getItem(uid)) || null;
  }

  // get all tasks of a given day
  static getTasksFromDate(date) {
    let all_tasks_uid = JSON.parse(localStorage.getItem('task_date'));
    let month = date.getUTCMonth() + 1; //months from 1-12
    let day = date.getUTCDate();
    let year = date.getUTCFullYear();
    let tasks_uid = all_tasks_uid[year][month][day];
    if (tasks_uid===undefined){
      return [];
    }
    let tasks=[];
    for (let uid of tasks_uid) {
      tasks.push(Task.getTaskFromUID(uid));
    };
    return tasks;
  }

  // reschedule all tasks based on all tasks in the local storage
  // (break up to smaller tasks using mintime maxtime during) -> priorty -> (softddl -> ddl) -> difficulty
  static schedule() {
    // to be filled
  }

  // add current task to local strage
  addToLocalStorage() {
    localStorage.setItem(this.data.uid, this.toJson());

    let date = this.data.start_date;
    let month = date.getUTCMonth() + 1; //months from 1-12
    let day = date.getUTCDate();
    let year = date.getUTCFullYear();
    let all_tasks_uid = JSON.parse(localStorage.getItem('task_date'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
    let year_tasks_uid = all_tasks_uid[year] = all_tasks_uid[year] || {};
    let month_tasks_uid = year_tasks_uid[month] = year_tasks_uid[month] || {};
    let day_tasks_uid = month_tasks_uid[day] = month_tasks_uid[day] || [];
    let dup = false;
    for (let uid of day_tasks_uid) {
      if (uid === this.data.uid) {dup = true};
    };
    if (!dup) {day_tasks_uid.push(this.data.uid)};
    all_tasks_uid[year][month][day] = day_tasks_uid;
    localStorage.setItem('task_date', JSON.stringify(all_tasks_uid));

    all_tasks_uid = JSON.parse(localStorage.getItem('large_tasks'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
    let large_tasks_uid = all_tasks_uid[this.data.task_uid] = all_tasks_uid[this.data.task_uid] || [];
    dup = false;
    for (let uid of large_tasks_uid) {
      if (uid === this.data.uid) {dup = true};
    };
    if (!dup) {large_tasks_uid.push(this.data.uid)};
    all_tasks_uid[this.data.task_uid] = large_tasks_uid;
    localStorage.setItem('large_tasks', JSON.stringify(all_tasks_uid));

    all_tasks_uid = JSON.parse(localStorage.getItem('task_difficulty'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
    let task_difficulty = all_tasks_uid[this.data.difficulty] = all_tasks_uid[this.data.difficulty] || [];
    dup = false;
    for (let uid of task_difficulty) {
      if (uid === this.data.uid) {dup = true};
    };
    if (!dup) {task_difficulty.push(this.data.uid)};
    all_tasks_uid[this.data.difficulty] = task_difficulty;
    localStorage.setItem('task_difficulty', JSON.stringify(all_tasks_uid));

    all_tasks_uid = JSON.parse(localStorage.getItem('task_priorty'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
    let task_priorty = all_tasks_uid[this.data.priorty] = all_tasks_uid[this.data.priorty] || [];
    dup = false;
    for (let uid of task_priorty) {
      if (uid === this.data.uid) {dup = true};
    };
    if (!dup) {task_priorty.push(this.data.uid)};
    all_tasks_uid[this.data.priorty] = task_priorty;
    localStorage.setItem('task_priorty', JSON.stringify(all_tasks_uid));

    for (let category of this.data.category){
      all_tasks_uid = JSON.parse(localStorage.getItem('task_category'));
      all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
      let task_category = all_tasks_uid[category] = all_tasks_uid[category] || [];
      dup = false;
      for (let uid of task_category) {
        if (uid === this.data.uid) {dup = true};
      };
      if (!dup) {task_category.push(this.data.uid)};
      all_tasks_uid[category] = task_category;
      localStorage.setItem('task_category', JSON.stringify(all_tasks_uid));
    };

    all_tasks_uid = JSON.parse(localStorage.getItem('all_tasks'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || [];
    dup = false;
    for (let uid of all_tasks_uid) {
      if (uid === this.data.uid) {dup = true};
    };
    if (!dup) {all_tasks_uid.push(this.data.uid)};
    localStorage.setItem('all_tasks', JSON.stringify(all_tasks_uid));
  }
}

