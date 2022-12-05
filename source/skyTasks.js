/**
 * inside local storage:
 *      a bunch of classes stored in first level {key=uid, value=Task object}
 *      a large_tasks object {key=task_uid, value=array of uid}
 *      a current_task object that holds a integer: uid
 *      a task_date object that holds {key=year(integer), value={key=month(integer), value={key=day(integer),value=array of uid(integer)}}}
 *      a ddl_date object that holds {key=year(integer), value={key=month(integer), value={key=day(integer),value=array of uid(integer)}}}
 *      a all_tasks array that holds a array of all UIDs
 *      a task_difficulty array that holds a array of all UIDs
 *      a task_category array that holds a array of all UIDs
 *      a task_priority array that holds a array of all UIDs
 *      a last_ddl that stores the latest date of any tasks
 *      a padding_tasks that stores all the paddings
 *
 * sample usage:
 *      import { Task } from './path/to/task.js'; // put this under script.js to import this class
 *      let mytask = new Task('task name', 1000);
 *      mytask.addToLocalStorage(); // put a task to local strage
 *      let retrived_task = Task.getTaskFromUID(1000); retrive a task from local strage
 */
export class Task {
  /**
   * Task Constructor Method
   * 
   * Creates task object to be used across Current Tasks, Weekly, and Monthly Schedule display pages
   * Refer below for detailed description on parameter information
   * @returns task object
   */
  constructor(task_name = 'New Task', uid = null, task_uid = null, start_date = new Date(), category = [], duration = 1, softddl = new Date(),
    ddl = new Date(), decription = null, mintime = 2, maxtime = 3, notes = null,
    recurrent = false, padding = false, difficulty = 3, priority = 3) {
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
    if (padding) {
      this.data.priority = 6;
    };
  }

  // return task from a json data file
  /**
   * fromJson Method
   * 
   * Get current task from the json data file
   * @returns task object
   */
  static fromJson(json) {
    // create task object
    let task = new Task();
    // parse json
    task.data = JSON.parse(json);
    // store data
    task.data.start_date = new Date(task.data.start_date);
    task.data.softddl = new Date(task.data.softddl);
    task.data.ddl = new Date(task.data.ddl);
    return task;  // return
  }

  /**
   * toJson Method
   * 
   * Get the json data file from current task
   * @returns json data file
   */
  toJson() {
    return JSON.stringify(this.data);
  }

  /**
   * setToPadding Method
   * 
   * Toggle the padding of this task object
   * @returns this task object
   */
  setToPadding() {
    // toggle on
    this.data.padding = true;
    // increment priority to max
    this.data.priority = 6;
    return this;
  }

  /**
   * setToRecursivePadding Method
   * 
   * Toggle the recursive padding of this task object
   * @returns this task object
   */
  setToRecursivePadding() {
    // toggle recurrent and padding
    this.data.recurrent = true;
    this.data.padding = true;
    // increment priority to max
    this.data.priority = 6;
    return this;
  }

  /**
   * splitTask Method
   * 
   * split one tasks into two, and first tasks have a certain duration.
   * Save both new tasks to local storage, and remove the old tasks
   * @param task - task object input
   * @param preferHour - the prefered hours that split the first task by
   */
  static splitTask(task, preferHour = 2) {
    let hour_left = Number.parseInt(task.data.duration);
    if (preferHour >= hour_left) {return};
    console.log('Tasks splitted!');
    let new_tasks = [];
    // this while loop will check if the remaining hour is still larger than preferd hour
    // if that is true, we split the task further
    while (preferHour < hour_left) {
      let new_task = new Task();
      new_task.data = {...task.data};
      new_task.data.duration = preferHour;
      new_tasks.push(new_task);
      hour_left = hour_left-preferHour;
    }
    let new_task = new Task();
    new_task.data = {...task.data};
    new_task.data.duration = hour_left;
    new_tasks.push(new_task);

    // replace the old single big long task with the new list of splited tasks
    Task.removeFromLocalStorage(task.data.uid);
    for (let task of new_tasks) {
      task.data.uid = Task.getUniqueUID();
      task.addToLocalStorage();
    }
  }

  /**
   * getUniqueUID Method
   * 
   * Generates a UID which is unique to all UIDs
   * @returns Integer identifier referring to UID
   */
  static getUniqueUID() {
    // store all uids
    let uid = Task.getAllUIDs();
    if (uid == null || uid.length === 0) { return 0 };
    // find largest uid currently stored
    function getMaxOfArray(numArray) {
      return Math.max.apply(null, numArray);
    }
    // increment for new unique uid
    return getMaxOfArray(uid) + 1;
  }

  /**
   * getUniqueTaskUID Method
   * 
   * Generates a Task UID which is unique to all Task UIDs
   * @returns Integer identifier referring to Task UID
   */
  static getUniqueTaskUID() {
    // store all task uids
    let uid = Task.getAllTaskUIDs();
    if (uid == null || uid.length === 0) { return 0 };
    // find largest task uid currently stored
    function getMaxOfArray(numArray) {
      return Math.max.apply(null, numArray);
    }
    // increment for new unique task uid
    return getMaxOfArray(uid) + 1;
  }

  /**
   * getAllTasks Method
   * 
   * Get all tasks with single array of tasks representing larger task
   * @returns 2d array of all tasks
   */
  static getAllTasks() {
    let all_tasks = [];
    // larger tasks are outer array
    let large_tasks = JSON.parse(localStorage.getItem('large_tasks'));
    if (large_tasks === undefined || large_tasks === null) { return all_tasks };
    for (let [key, value] of Object.entries(large_tasks)) {
      try {
        let tasks = [];
        for (let uid of value) {
          tasks.push(Task.getTaskFromUID(uid));   // store tasks by using uid
        };
        all_tasks.push(tasks);
      }
      catch (e) {
        console.log(e);       // error log
        all_tasks.push([]);
      }
    }
    return all_tasks;   // returning all task objects as 2d array
  }

  /**
   * getAllTaskUIDs Method
   * 
   * Get all task_uid's in local storage
   * @returns array of all task_uid's
   */
  static getAllTaskUIDs() {
    // parse for large task uid
    let large_tasks = JSON.parse(localStorage.getItem('large_tasks'));
    if (large_tasks === undefined || large_tasks === null) { return [] };
    return Object.keys(large_tasks);
  }

  /**
   * getAllUIDs Method
   * 
   * Get all UIDs in local storage
   * @returns array of all UIDs
   */
  static getAllUIDs() {
    // parse for all task uid
    let large_tasks = JSON.parse(localStorage.getItem('all_tasks'));
    if (large_tasks === undefined || large_tasks === null) { return [] };
    return large_tasks;
  }

  /**
   * getAllTasksFlat Method
   * 
   * Get all tasks in local storage
   * @returns array of all tasks
   */
  static getAllTasksFlat() {
    try {
      let tasks_uid = JSON.parse(localStorage.getItem('all_tasks'))
      let tasks = [];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    } catch (e) {
      return [];
    }
  }

  /**
   * getAllPaddings Method
   * 
   * Get all paddings in local storage
   * @returns array of all tasks
   */
  static getAllPaddings() {
    try {
      let tasks_uid = JSON.parse(localStorage.getItem('padding_tasks'))
      let tasks = [];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    } catch (e) {
      return [];
    }
  }



  /**
   * getAllRecuringPaddings Method
   * 
   * Get all Recuring paddings in local storage
   * @returns array of all tasks
   */
   static getAllRecuringPaddings() {
    try {
      let tasks_uid = JSON.parse(localStorage.getItem('padding_tasks'))
      let tasks = [];
      for (let uid of tasks_uid) {
        let myTask = Task.getTaskFromUID(uid);
        if (myTask.data.recurrent) {tasks.push(myTask)};
      };
      return tasks;
    } catch (e) {
      return [];
    }
  }


  /**
   * getTaskFromTaskUID Method
   * 
   * Get all tasks in local storage from given task_uid
   * @param task_uid - Task_uid input
   * @returns array of tasks
   */
  static getTasksFromTaskUID(task_uid) {
    try {
      let tasks_uid = JSON.parse(localStorage.getItem('large_tasks'))[task_uid]
      let tasks = [];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    } catch (e) {
      return [];
    }
  }

  /**
   * getTasksFromDifficulty Method
   * 
   * Get all tasks in local storage of the given difficulty
   * @param difficulty - Task difficulty input
   * @returns array of tasks
   */
  static getTasksFromDifficulty(difficulty) {
    try {
      let tasks_uid = JSON.parse(localStorage.getItem('task_difficulty'))[difficulty]
      let tasks = [];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    } catch (e) {
      return [];
    }
  }

  /**
   * getTasksFromPriority Method
   * 
   * Get all tasks in local storage of the given priority
   * @param priority - Task priority input
   * @returns array of tasks
   */
  static getTasksFromPriority(priority) {
    try {
      let tasks_uid = JSON.parse(localStorage.getItem('task_priority'))[priority]
      let tasks = [];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    } catch (e) {
      return [];
    }
  }



  /**
   * getAllLargeTasks Method
   * 
   * Get tasks in local storage of the given priority
   * @returns [array of tasks, array of duration]
   */
   static getAllLargeTasks() {
    try {
      let large_tasks = JSON.parse(localStorage.getItem('large_tasks'));
      let total_duration = [];
      let total_tasks = [];
      for (let [_,small_tasks_uid] of Object.entries(large_tasks)){
        let each_duration = 0;
        let first_task = Task.getTaskFromUID(small_tasks_uid[0]);
        if (first_task.data.recurrent && first_task.data.padding) {continue};
        total_tasks.push(first_task);
        for (let uid of small_tasks_uid) {
          each_duration = each_duration + Task.getTaskFromUID(uid).data.duration;
        };
        total_duration.push(Number.parseInt(each_duration));
      }
      return [total_tasks,total_duration];
    } catch (e) {
      return [];
    }
  }



  /**
   * getTasksFromCategory Method
   * 
   * Get all tasks in local storage of the given category
   * @param category - Task category input
   * @returns array of tasks
   */
  static getTasksFromCategory(category) {
    try {
      let tasks_uid = JSON.parse(localStorage.getItem('task_category'))[category]
      let tasks = [];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    } catch (e) {
      return [];
    }
  }

  static getTasksFromName(name) {
    try {
      let tasks_uid = JSON.parse(localStorage.getItem('task_name'))[name]
      let tasks = [];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    } catch (e) {
      return [];
    }
  }

  /**
   * getTaskFromUID Method
   * 
   * Get single task in local storage from given uid
   * @param uid - Task uid input
   * @returns single task object
   */
  static getTaskFromUID(uid) {
    return Task.fromJson(localStorage.getItem(uid)) || null;
  }

  /**
   * getTasksFromDate Method
   * 
   * Get all tasks of a given day
   * @param date - Date object 
   * @returns array of tasks
   */
  static getTasksFromDate(date) {
    let all_tasks_uid = JSON.parse(localStorage.getItem('task_date'));
    let month = date.getMonth() + 1; //months from 1-12
    let day = date.getDate();
    let year = date.getFullYear();
    let tasks_uid;
    try {
      tasks_uid = all_tasks_uid[year][month][day]
      let tasks = [];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    } catch (e) {
      return [];
    }
  }

  /**
   * getTasksFromDDL Method
   * 
   * Get all tasks of a given deadline
   * @param date - Date object 
   * @returns array of tasks
   */
  static getTasksFromDDL(date) {
    let all_tasks_uid = JSON.parse(localStorage.getItem('ddl_date'));
    let month = date.getMonth() + 1; //months from 1-12
    let day = date.getDate();
    let year = date.getFullYear();
    let tasks_uid;
    try {
      tasks_uid = all_tasks_uid[year][month][day]
      let tasks = [];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    } catch (e) {
      return [];
    }
  }

  /**
   * getTasksBetweenDate Method
   * 
   * Get all tasks between two dates
   * @param date1 - Date1 object 
   * @param date2 - Date2 object
   * @returns array of tasks
   */
  static getTaskBetweenDate(date1, date2) {
    let out = [];
    let end_day = new Date(date2);
    end_day.setDate(end_day.getDate() + 1);
    for (let d = new Date(date1); d <= end_day; d.setDate(d.getDate() + 1)) {
      out = out.concat(this.getTasksFromDate(d));
    }
    return out;
  }

  /**
   * getTaskBetweenDDL Method
   * 
   * Get all tasks between two deadline
   * @param date1 - Date1 object 
   * @param date2 - Date2 object
   * @returns array of tasks
   */
   static getTaskBetweenDDL(date1, date2) {
    let out = [];
    let end_day = new Date(date2);
    end_day.setDate(end_day.getDate() + 1);
    for (let d = new Date(date1); d <= end_day; d.setDate(d.getDate() + 1)) {
      out = out.concat(this.getTasksFromDDL(d));
    }
    return out;
  }

  /**
   * getTasksAfterDate Method
   * 
   * Get all tasks after of a given day
   * @param date - Date object 
   * @returns array of tasks
   */
  static getTasksAfterDate(date) {
    return (this.getTaskBetweenDate(date, new Date(JSON.parse(localStorage.getItem('last_ddl')))));
  }

  /**
   * getTasksAfterDDL Method
   * 
   * Get all tasks after of a given day based on deadline
   * @param date - Date object 
   * @returns array of tasks
   */
   static getTasksAfterDDL(date) {
    return (this.getTaskBetweenDDL(date, new Date(JSON.parse(localStorage.getItem('last_ddl')))));
  }

  /**
   * compareDifficulty Method
   * 
   * Checks if difficulty of a is easier than b
   * @param a - Date object a 
   * @param b - Date object b
   * @returns Difference in difficulty between a and b
   */
  static compareDifficulty(a, b) {
    return a.data.difficulty - b.data.difficulty;
  }

  /**
   * comparePriority Method
   * 
   * Checks if priorty of a is earlier than b
   * @param a - Date object a 
   * @param b - Date object b
   * @returns Difference in priority between a and b
   */
  static comparePriority(a, b) {
    return a.data.priority - b.data.priority;
  }

  /**
   * compareDDL Method
   * 
   * Checks if ddl of a is earlier than b
   * @param a - Date object a 
   * @param b - Date object b
   * @returns true if ddl of a comes before b
   */
  static compareDDL(a, b) {
    return a.data.ddl - b.data.ddl;
  }


  /**
   * compareSoftDDL Method
   * 
   * Checks if ddl of a is earlier than b
   * @param a - Date object a 
   * @param b - Date object b
   * @returns true if soft ddl of a comes before b
   */
   static compareSoftDDL(a, b) {
    return (a.data.softddl - b.data.softddl);
  }

  /**
   * compareStartDate Method
   * 
   * Checks if start_date of a is earlier than b
   * @param a - Date object a 
   * @param b - Date object b
   * @returns true if start_date of a comes before b
   */
  static compareStartDate(a, b) {
    return (a.data.start_date - b.data.start_date);
  }

  /**
   * compareTimeInterval Method
   * 
   * Compares two date objects
   * @param a - Date object a 
   * @param b - Date object b
   * @returns true if Date object a comes before b
   */
  static compareTimeInterval(a, b) {
    if (a[0] == b[0]) {
      return (a[1] > b[1]);
    }
    else {
      return (a[0] > b[0]);
    }
  }

  /**
   * firstAvailable Method
   * 
   * Takes occupied array and task object and finds earliest time slot
   * to allocate the task
   * @param occupied_in - array with uned intervals  
   * @param task - task object to be assigned
   * @returns date object for first available time to assign the task
   */
  static firstAvailable(occupied_in, task) {
    // Sort the list of occupied intervals
    let occupied = Task.sortOccupied(occupied_in);
    let result = new Date();

    // Round the result date to the closest hour
    result.setHours(result.getHours() + Math.ceil(result.getMinutes() / 60));
    result.setMinutes(0, 0, 0);

    // Inner function checks if current time slot will fit the task
    let isOccupied = function (opid, time, duration) {
      for (let time_block of opid) {
        let storage = new Date(time_block[0]);
        storage.setHours(time_block[0].getHours() + time_block[1]);
        let storage2 = new Date(time);
        storage2.setHours(time.getHours() + Number.parseInt(duration));
        if (Task.dateRangeOverlaps(time_block[0], storage, time, storage2)) {
          return true;
        }
      }
      return false;
    }

    // Increment until a valid time slot is found
    while (isOccupied(occupied, result, Number.parseInt(task.data.duration))) {
      result.setHours(result.getHours() + 1);
    }
    return result;
  }

  /**
   * dateRangeOverlaps Method
   * 
   * Compares start and end values of two date objects to see if they conflict
   * @param a_start - Date object containing 'a' start time
   * @param a_end - Date object containing 'a' end time
   * @param b_start - Date object containing 'b' start time
   * @param b_end - Date object containing 'b' end time
   * @returns True if the two dates overlap/conflict
   */
  static dateRangeOverlaps(a_start, a_end, b_start, b_end) {
    if(a_end.getDate() == b_end.getDate() && a_end.getHours() != 0){
      if ((a_start.getHours() <= b_start.getHours()) && (b_start.getHours() < a_end.getHours())){
        return true;
      } // b starts in a
      if (a_start.getHours() < b_end.getHours() && b_end.getHours() <= a_end.getHours()){
        return true;
      } // b ends in a
      if (b_start.getHours() < a_start.getHours() && a_end.getHours() < b_end.getHours()){
        return true;
      }  // a in b
    }
    return false;
  }

  /**
   * sortOccupied Method
   * 
   * Takes occupied array in form of (Date, duration) and orders it from
   * earliest to latest
   * @param occupied - array with unsorted intervals  
   * @returns array with sorted occupied intervals
   */
  static sortOccupied(occupied_in) {
    // Create deep copy to not impact occupied array
    let occupied = structuredClone(occupied_in);
    // Sort list based on starting
    occupied.sort(Task.compareTimeInterval);
    return occupied;
  }

  // reschedule all tasks based on all tasks in the local storage
  // (break up to smaller tasks using mintime maxtime during) -> priority -> (softddl -> ddl) -> difficulty
  static schedule() {
    // adding padding
    console.log('start scheduleing');
    let occupied = [];
    for (let task of Task.getAllPaddings()) {
      // if the padding is recursive, add it to each day from yesterday to the last deadline date.
      if (task.data.recurrent) {
        let start_loop = new Date();
        start_loop.setDate(start_loop.getDate() - 1);
        let end_loop = new Date(JSON.parse(localStorage.getItem('last_ddl')));
        end_loop.setDate(end_loop.getDate() + 1);
        for (let d = start_loop; d <= end_loop; d.setDate(d.getDate() + 1)) {
          let new_date = new Date(d);
          new_date.setHours(task.data.ddl.getHours());
          new_date.setMinutes(task.data.ddl.getMinutes());
          new_date.setSeconds(task.data.ddl.getSeconds());
          occupied.push([new_date, Number.parseInt(task.data.duration)]);
        }
      } else {
        occupied.push([new Date(task.data.ddl), Number.parseInt(task.data.duration)]);
      }
    }
    // processing tasks that needs scheduling
    let task_need_schedule = Task.getTasksAfterDDL(new Date());
    for (let task of task_need_schedule) {
      if (!task.data.padding){
        Task.splitTask(task,Number.parseInt(task.data.mintime));
      }
    }
    task_need_schedule = Task.getTasksAfterDDL(new Date());
    // where scheduling happens
    task_need_schedule.sort(function(a,b) {
      let one_day = 86400000;
      if ((a.data.ddl-new Date())<(one_day*3) || (b.data.ddl-new Date())<(one_day*3)){
        if(Task.compareDDL(a,b) != 0){
          return Task.compareDDL(a,b);
        }    
      }
      if (Task.comparePriority(b,a) == 0){
        return Task.compareDifficulty(b,a);
      }
      else {
        return Task.comparePriority(b,a);
      }
    });
    for (let task of task_need_schedule) {
      if (task.data.padding) {
        task.data.start_date = task.data.ddl;
        Task.removeFromLocalStorage(task.data.uid);
        task.addToLocalStorage();
      } else {
        //get the first available date that can fit the task
        task.data.start_date = Task.firstAvailable(occupied, task);
        //check the deadline
        if (task.data.start_date > task.data.ddl) {alert('Schedule CanNOT be generated!')};
        occupied.push([new Date(task.data.start_date), Number.parseInt(task.data.duration)]);
        Task.removeFromLocalStorage(task.data.uid);
        task.addToLocalStorage();
      }
    }
  }

  /**
   * addToLocalStorage Method
   * 
   * add the current task obajct to local strage
   */
  addToLocalStorage() {
    localStorage.setItem(this.data.uid, this.toJson());

    // handle the dictionary that catalog the tasks using its start date
    let date = this.data.start_date;
    let month = date.getMonth() + 1; //months from 1-12
    let day = date.getDate();
    let year = date.getFullYear();
    let all_tasks_uid = JSON.parse(localStorage.getItem('task_date'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
    let year_tasks_uid = all_tasks_uid[year] = all_tasks_uid[year] || {};
    let month_tasks_uid = year_tasks_uid[month] = year_tasks_uid[month] || {};
    let day_tasks_uid = month_tasks_uid[day] = month_tasks_uid[day] || [];
    let dup = false;
    for (let uid of day_tasks_uid) {
      if (uid === this.data.uid) { dup = true };
    };
    if (!dup) { day_tasks_uid.push(this.data.uid) };
    all_tasks_uid[year][month][day] = day_tasks_uid;
    localStorage.setItem('task_date', JSON.stringify(all_tasks_uid));

    // handle the dictionary that catalog the tasks using its deadline
    date = this.data.ddl;
    month = date.getMonth() + 1; //months from 1-12
    day = date.getDate();
    year = date.getFullYear();
    all_tasks_uid = JSON.parse(localStorage.getItem('ddl_date'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
    year_tasks_uid = all_tasks_uid[year] = all_tasks_uid[year] || {};
    month_tasks_uid = year_tasks_uid[month] = year_tasks_uid[month] || {};
    day_tasks_uid = month_tasks_uid[day] = month_tasks_uid[day] || [];
    dup = false;
    for (let uid of day_tasks_uid) {
      if (uid === this.data.uid) { dup = true };
    };
    if (!dup) { day_tasks_uid.push(this.data.uid) };
    all_tasks_uid[year][month][day] = day_tasks_uid;
    localStorage.setItem('ddl_date', JSON.stringify(all_tasks_uid));

    // handle the dictionary that catalog all large task_uid
    all_tasks_uid = JSON.parse(localStorage.getItem('large_tasks'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
    let large_tasks_uid = all_tasks_uid[this.data.task_uid] = all_tasks_uid[this.data.task_uid] || [];
    dup = false;
    for (let uid of large_tasks_uid) {
      if (uid === this.data.uid) { dup = true };
    };
    if (!dup) { large_tasks_uid.push(this.data.uid) };
    all_tasks_uid[this.data.task_uid] = large_tasks_uid;
    localStorage.setItem('large_tasks', JSON.stringify(all_tasks_uid));

    // handle the dictionary that catalog based on tasks difficulty
    all_tasks_uid = JSON.parse(localStorage.getItem('task_difficulty'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
    let task_difficulty = all_tasks_uid[this.data.difficulty] = all_tasks_uid[this.data.difficulty] || [];
    dup = false;
    for (let uid of task_difficulty) {
      if (uid === this.data.uid) { dup = true };
    };
    if (!dup) { task_difficulty.push(this.data.uid) };
    all_tasks_uid[this.data.difficulty] = task_difficulty;
    localStorage.setItem('task_difficulty', JSON.stringify(all_tasks_uid));

    // handle the dictionary that catalog based on tasks priority
    all_tasks_uid = JSON.parse(localStorage.getItem('task_priority'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
    let task_priority = all_tasks_uid[this.data.priority] = all_tasks_uid[this.data.priority] || [];
    dup = false;
    for (let uid of task_priority) {
      if (uid === this.data.uid) { dup = true };
    };
    if (!dup) { task_priority.push(this.data.uid) };
    all_tasks_uid[this.data.priority] = task_priority;
    localStorage.setItem('task_priority', JSON.stringify(all_tasks_uid));

    // handle the dictionary that catalog based on tasks category
    for (let category of this.data.category) {
      all_tasks_uid = JSON.parse(localStorage.getItem('task_category'));
      all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
      let task_category = all_tasks_uid[category] = all_tasks_uid[category] || [];
      dup = false;
      for (let uid of task_category) {
        if (uid === this.data.uid) { dup = true };
      };
      if (!dup) { task_category.push(this.data.uid) };
      all_tasks_uid[category] = task_category;
      localStorage.setItem('task_category', JSON.stringify(all_tasks_uid));
    };

    // handle the dictionary that catalog based on small uid
    all_tasks_uid = JSON.parse(localStorage.getItem('all_tasks'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || [];
    dup = false;
    for (let uid of all_tasks_uid) {
      if (uid === this.data.uid) { dup = true };
    };
    if (!dup) { all_tasks_uid.push(this.data.uid) };
    localStorage.setItem('all_tasks', JSON.stringify(all_tasks_uid));

    // generate and store lastest deadline
    let last_ddl = JSON.parse(localStorage.getItem('last_ddl'));
    last_ddl = last_ddl = last_ddl || new Date(-8640000000000000);
    last_ddl = new Date(last_ddl);
    if (this.data.ddl > last_ddl) {
      localStorage.setItem('last_ddl', JSON.stringify(this.data.ddl));
    };

    // generate and store all padding tasks
    let padding_uid = JSON.parse(localStorage.getItem('padding_tasks'));
    padding_uid = padding_uid = padding_uid || [];
    if (this.data.padding) {
      dup = false;
      for (let uid of padding_uid) {
        if (uid === this.data.uid) { dup = true };
      };
      if (!dup) { padding_uid.push(this.data.uid) };
      localStorage.setItem('padding_tasks', JSON.stringify(padding_uid));
    };

    all_tasks_uid = JSON.parse(localStorage.getItem('task_name'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
    let name = all_tasks_uid[this.data.task_name] = all_tasks_uid[this.data.task_name] || [];
    dup = false;
    for (let uid of name) {
      if (uid === this.data.uid) { dup = true };
    };
    if (!dup) { name.push(this.data.uid) };
    all_tasks_uid[this.data.task_name] = name;
    localStorage.setItem('task_name', JSON.stringify(all_tasks_uid));

  }

  /**
   * removeFromLocalStorage Method
   * 
   * Takes a uid and remove that task from local storage
   * @param uid - uid of the removed task
   */
  static removeFromLocalStorage(uid) {

    // define a helper function that 
    let removeFromArray = function (arr, value) {
      let index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    }

    let task = Task.getTaskFromUID(uid);
    localStorage.removeItem(uid);

    // remove the task using the dictionary catalog that is based on its start date
    let date = task.data.start_date;
    let month = date.getMonth() + 1; //months from 1-12
    let day = date.getDate();
    let year = date.getFullYear();
    let all_tasks_uid = JSON.parse(localStorage.getItem('task_date'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
    let year_tasks_uid = all_tasks_uid[year] = all_tasks_uid[year] || {};
    let month_tasks_uid = year_tasks_uid[month] = year_tasks_uid[month] || {};
    let day_tasks_uid = month_tasks_uid[day] = month_tasks_uid[day] || [];
    let dup = false;
    for (let uid of day_tasks_uid) {
      if (uid === task.data.uid) { dup = true };
    };
    if (dup) {
      day_tasks_uid = removeFromArray(day_tasks_uid, task.data.uid)
    };
    all_tasks_uid[year][month][day] = day_tasks_uid;
    localStorage.setItem('task_date', JSON.stringify(all_tasks_uid));

    // remove the task using the dictionary catalog that is based on its deadline
    date = task.data.ddl;
    month = date.getMonth() + 1; //months from 1-12
    day = date.getDate();
    year = date.getFullYear();
    all_tasks_uid = JSON.parse(localStorage.getItem('ddl_date'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
    year_tasks_uid = all_tasks_uid[year] = all_tasks_uid[year] || {};
    month_tasks_uid = year_tasks_uid[month] = year_tasks_uid[month] || {};
    day_tasks_uid = month_tasks_uid[day] = month_tasks_uid[day] || [];
    dup = false;
    for (let uid of day_tasks_uid) {
      if (uid === task.data.uid) { dup = true };
    };
    if (dup) {
      day_tasks_uid = removeFromArray(day_tasks_uid, task.data.uid)
    };
    all_tasks_uid[year][month][day] = day_tasks_uid;
    localStorage.setItem('ddl_date', JSON.stringify(all_tasks_uid));

    // remove the task in the task_uid dictionary catalog
    all_tasks_uid = JSON.parse(localStorage.getItem('large_tasks'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
    let large_tasks_uid = all_tasks_uid[task.data.task_uid] = all_tasks_uid[task.data.task_uid] || [];
    dup = false;
    for (let uid of large_tasks_uid) {
      if (uid === task.data.uid) { dup = true };
    };
    if (dup) {
      large_tasks_uid = removeFromArray(large_tasks_uid, task.data.uid)
    };
    if (large_tasks_uid.length === 0) {
      delete all_tasks_uid[task.data.task_uid];
    } else {
      all_tasks_uid[task.data.task_uid] = large_tasks_uid;
    }
    localStorage.setItem('large_tasks', JSON.stringify(all_tasks_uid));
    
    // remove the task in the task difficulty dictionary catalog
    all_tasks_uid = JSON.parse(localStorage.getItem('task_difficulty'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
    let task_difficulty = all_tasks_uid[task.data.difficulty] = all_tasks_uid[task.data.difficulty] || [];
    dup = false;
    for (let uid of task_difficulty) {
      if (uid === task.data.uid) { dup = true };
    };
    if (dup) {
      task_difficulty = removeFromArray(task_difficulty, task.data.uid)
    };
    if (task_difficulty.length === 0) {
      delete all_tasks_uid[task.data.difficulty];
    } else {
      all_tasks_uid[task.data.difficulty] = task_difficulty;
    }
    localStorage.setItem('task_difficulty', JSON.stringify(all_tasks_uid));

    // remove the task in the task priority dictionary catalog
    all_tasks_uid = JSON.parse(localStorage.getItem('task_priority'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
    let task_priority = all_tasks_uid[task.data.priority] = all_tasks_uid[task.data.priority] || [];
    dup = false;
    for (let uid of task_priority) {
      if (uid === task.data.uid) { dup = true };
    };
    if (dup) {
      task_priority = removeFromArray(task_priority, task.data.uid)
    };
    if (task_priority.length === 0) {
      delete all_tasks_uid[task.data.priority];
    } else {
      all_tasks_uid[task.data.priority] = task_priority;
    }
    localStorage.setItem('task_priority', JSON.stringify(all_tasks_uid));

    // remove the task in the task category dictionary catalog
    for (let category of task.data.category) {
      all_tasks_uid = JSON.parse(localStorage.getItem('task_category'));
      all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
      let task_category = all_tasks_uid[category] = all_tasks_uid[category] || [];
      dup = false;
      for (let uid of task_category) {
        if (uid === task.data.uid) { dup = true };
      };
      if (dup) {
        task_category = removeFromArray(task_category, task.data.uid)
      };
      if (task_category.length === 0) {
        delete all_tasks_uid[category];
      } else {
        all_tasks_uid[category] = task_category;
      }
      localStorage.setItem('task_category', JSON.stringify(all_tasks_uid));
    };

    // remove the task in the all task dictionary catalog
    all_tasks_uid = JSON.parse(localStorage.getItem('all_tasks'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || [];
    dup = false;
    for (let uid of all_tasks_uid) {
      if (uid === task.data.uid) { dup = true };
    };
    if (dup) {
      all_tasks_uid = removeFromArray(all_tasks_uid, task.data.uid)
    };
    localStorage.setItem('all_tasks', JSON.stringify(all_tasks_uid));

    // remove the task in the all padding dictionary catalog
    let padding_uid = JSON.parse(localStorage.getItem('padding_tasks'));
    padding_uid = padding_uid = padding_uid || [];
    if (task.data.padding) {
      dup = false;
      for (let uid of padding_uid) {
        if (uid === task.data.uid) { dup = true };
      };
      if (dup) {
        padding_uid = removeFromArray(padding_uid, task.data.uid)
      };
      localStorage.setItem('padding_tasks', JSON.stringify(padding_uid));
    };

    // remove the task in the task name dictionary catalog
    all_tasks_uid = JSON.parse(localStorage.getItem('task_name'));
    all_tasks_uid = all_tasks_uid = all_tasks_uid || {};
    let task_name = all_tasks_uid[task.data.task_name] = all_tasks_uid[task.data.task_name] || [];
    dup = false;
    for (let uid of task_name) {
      if (uid === task.data.uid) { dup = true };
    };
    if (dup) {
      task_name = removeFromArray(task_name, task.data.uid)
    };
    if (task_name.length === 0) {
      delete all_tasks_uid[task.data.task_name];
    } else {
      all_tasks_uid[task.data.task_name] = task_name;
    }
    localStorage.setItem('task_name', JSON.stringify(all_tasks_uid));

  }

  /**
   * removeAllTasks Method
   * 
   * remove all tasks and clear local storage
   */
  static removeAllTasks() {
    for (let uid of Task.getAllUIDs()) {
      Task.removeFromLocalStorage(uid);
    }
  }

  /**
   * removeLargeTask Method
   * 
   * Takes a task_uid and remove that large task from local storage
   * @param task_uid - task_uid of the removed large task
   */
  static removeLargeTask(task_uid) {
    for (let task of Task.getTasksFromTaskUID(task_uid)) {
      Task.removeFromLocalStorage(task.data.uid);
    }
  }

}



