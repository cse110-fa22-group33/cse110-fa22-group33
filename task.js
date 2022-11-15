/**
 * inside local storage:
 *      a tasks object {key=uid, value=Task object}
 *      a current_task object that holds integer: uid
 *      a task_date object that holds {key=year(integer), value={key=month(integer), value={key=day(integer),value=array of uid(integer)}}}
 *
 * sample usage:
 *      import { Task } from './path/to/task.js'; // put this under script.js to impor this function
 *      localStorage.setItem('task1', task1.toJson()); // put a task to local strage
 *      let task1 = Task.fromJson(localStorage.getItem('task1')); // retrive a task from local strage
 */
export class Task {
  constructor(task_name = 'New Task', uid = null, task_uid = null, category = [], duration = 1, softddl = null,
    ddl = null, decription = null, mintime = 1, maxtime = 3, notes = null,
    recurrent = false, padding = false, difficulty = 3, start_date = null) {
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
  static fromJson(json) {
    let task = new Task();
    task.data = JSON.parse(json);
    return task;
  }
  toJson() {
    return JSON.stringify(this.data);
  }
}