/**
 * inside local storage:
 *      a bunch of classes stored in first level {key=uid, value=Task object}
 *      a large_tasks object {key=task_uid, value=array of uid}
 *      a current_task object that holds a integer: uid
 *      a task_date object that holds {key=year(integer), value={key=month(integer), value={key=day(integer),value=array of uid(integer)}}}
 *      a all_tasks array that holds a array of all UIDs
 *      a task_difficulty array that holds a array of all UIDs
 *      a task_category array that holds a array of all UIDs
 *      a task_priority array that holds a array of all UIDs
 *      a last_ddl that stores the latest date of any tasks
 *
 * sample usage:
 *      import { Task } from './path/to/task.js'; // put this under script.js to import this class
 *      let mytask = new Task('task name', 1000);
 *      mytask.addToLocalStorage(); // put a task to local strage
 *      let retrived_task = Task.getTaskFromUID(1000); retrive a task from local strage
 */
 export class Task {
  constructor(task_name = 'New Task', uid = null, task_uid = null, start_date = new Date(), category = [], duration = 1, softddl = new Date(),
    ddl = new Date(), decription = null, mintime = 1, maxtime = 3, notes = null,
    recurrent = false, padding = false, difficulty = 3, priority=3) {
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
      priority: priority, // a integer from 1-5, 1 is lowest priority and 5 is hardest, not required
    };
    if (padding==true) {
      this.data.recurrent = true;
      this.data.priority = 6;
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

  setToPadding() {
    this.data.recurrent = true;
    this.data.priority = 6;
    return this;
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

  // get a unique UID
  static getUniqueUID() {
    let uid = Task.getAllUIDs();
    if (uid==null || uid.length===0) {return 0};
    function getMaxOfArray(numArray) {
      return Math.max.apply(null, numArray);
    }
    return getMaxOfArray(uid)+1;
  }

  // return 2d array of tasks, where a single array of tasks represent a large task
  static getAllTasks() {
    let all_tasks = [];
    let large_tasks = JSON.parse(localStorage.getItem('large_tasks'));
    if (large_tasks===undefined) {return all_tasks};
    for (let [key, value] of Object.entries(large_tasks)){
      try {
        let tasks=[];
          for (let uid of value) {
            tasks.push(Task.getTaskFromUID(uid));
          };
          all_tasks.push(tasks);
        }
        catch (e){
          console.log(e);
          all_tasks.push([]);  
        }
    }
    return all_tasks;
  }

  // return a array of all task UIDs
  static getAllTaskUIDs() {
    let large_tasks = JSON.parse(localStorage.getItem('large_tasks'));
    if (large_tasks===undefined) {return []};
    return Object.keys(large_tasks);
  }

  // return a array of all UIDs
  static getAllUIDs() {
    let large_tasks = JSON.parse(localStorage.getItem('all_tasks'));
    if (large_tasks===undefined) {return []};
    return large_tasks;
  }

  // return a 1-d array of all tasks
  static getAllTasksFlat() {
    try {
      let tasks_uid = JSON.parse(localStorage.getItem('all_tasks'))
      let tasks=[];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    }catch (e){
      return [];
    }
  }

  // get all tasks in local strage of the given task_uid
  static getTasksFromTaskUID(task_uid) {
    try {
      let tasks_uid = JSON.parse(localStorage.getItem('large_tasks'))[task_uid]
      let tasks=[];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    }catch (e){
      return [];
    }
  }

  // get all tasks in local strage of the given difficulty
  static getTasksFromDifficulty(difficulty) {
    try {
      let tasks_uid = JSON.parse(localStorage.getItem('task_difficulty'))[difficulty]
      let tasks=[];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    }catch (e){
      return [];
    }}

  // get all tasks in local strage of the given priority
  static getTasksFromPriority(priority) {
    try {
      let tasks_uid = JSON.parse(localStorage.getItem('task_priority'))[priority]
      let tasks=[];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    }catch (e){
      return [];
    }}

  // get all tasks in local strage of the given category
  static getTasksFromCategory(category) {
    try {
      let tasks_uid = JSON.parse(localStorage.getItem('task_category'))[category]
      let tasks=[];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    }catch (e){
      return [];
    }}

    
  // get single task in local strage from uid
  static getTaskFromUID(uid) {
    return Task.fromJson(localStorage.getItem(uid)) || null;
  }

  // get all tasks of a given day
  static getTasksFromDate(date) {
    let all_tasks_uid = JSON.parse(localStorage.getItem('task_date'));
    let month = date.getMonth() + 1; //months from 1-12
    let day = date.getDate();
    let year = date.getFullYear();
    let tasks_uid;
    try {
      tasks_uid = all_tasks_uid[year][month][day]
      let tasks=[];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    }catch (e){
      return [];
    }
  }

  // get all tasks between two dates, return a array of tasks
  static getTaskBetweenDate(date1, date2) {
    let out = [];
    for (let d = new Date(date1); d <= date2; d.setDate(d.getDate() + 1)) {
      out = out.concat(this.getTasksFromDate(d));
    }
    return out;
  }

  // get all tasks after of a given day, return a array of tasks
  static getTasksAfterDate(date) {
    return (this.getTaskBetweenDate(date,new Date(JSON.parse(localStorage.getItem('last_ddl')))));
  }

  // custom compare based on difficulty
  static compareDifficulty(a,b){
    return (a.data.difficulty - b.data.difficulty);
  }

  // custom compare based on difficulty
  static comparePriority(a,b){
    return (a.data.priority - b.data.priority);
  }

  // custom compare based on deadline
  static compareDDL(a,b){
    return (a.data.ddl > b.data.ddl);
  }

  // custom compare based on start date
  static compareStartDate(a,b){
    return (a.data.start_date > b.data.start_date);
  }

  // reschedule all tasks based on all tasks in the local storage
  // (break up to smaller tasks using mintime maxtime during) -> priority -> (softddl -> ddl) -> difficulty
  static schedule() {
    // to be filled
    let task_need_schedule = Task.getTasksAfterDate(new Date());
    task_need_schedule.sort(Task.comparePriority).reverse();
    for (let task of task_need_schedule) {
      //let 
    }
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

    all_tasks_uid = JSON.parse(localStorage.getItem('task_priority'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
    let task_priority = all_tasks_uid[this.data.priority] = all_tasks_uid[this.data.priority] || [];
    dup = false;
    for (let uid of task_priority) {
      if (uid === this.data.uid) {dup = true};
    };
    if (!dup) {task_priority.push(this.data.uid)};
    all_tasks_uid[this.data.priority] = task_priority;
    localStorage.setItem('task_priority', JSON.stringify(all_tasks_uid));

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

    let last_ddl = JSON.parse(localStorage.getItem('last_ddl'));
    last_ddl = last_ddl = last_ddl || new Date(-8640000000000000);;
    last_ddl = new Date(last_ddl);
    if (this.data.ddl>last_ddl) {
      localStorage.setItem('last_ddl', JSON.stringify(this.data.ddl));
    };

  }
}

