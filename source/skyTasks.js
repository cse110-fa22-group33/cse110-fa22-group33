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
    if (padding) {
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

  // Toggle 'padding' of this task object
  setToPadding() {
    this.data.recurrent = true;
    this.data.padding = true;
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

  // Generate a unique UID
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

  /**
   * getAllTaskUIDs Method
   * 
   * Get all task_uid's in local storage
   * @returns array of all task_uid's
   */
  static getAllTaskUIDs() {
    let large_tasks = JSON.parse(localStorage.getItem('large_tasks'));
    if (large_tasks===undefined) {return []};
    return Object.keys(large_tasks);
  }

  /**
   * getAllUIDs Method
   * 
   * Get all UIDs in local storage
   * @returns array of all UIDs
   */
  static getAllUIDs() {
    let large_tasks = JSON.parse(localStorage.getItem('all_tasks'));
    if (large_tasks===undefined) {return []};
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
      let tasks=[];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    }catch (e){
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
      let tasks=[];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    }catch (e){
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
      let tasks=[];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    }catch (e){
      return [];
    }}

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
      let tasks=[];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    }catch (e){
      return [];
    }}

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
      let tasks=[];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    }catch (e){
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
      let tasks=[];
      for (let uid of tasks_uid) {
        tasks.push(Task.getTaskFromUID(uid));
      };
      return tasks;
    }catch (e){
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
    for (let d = new Date(date1); d <= date2; d.setDate(d.getDate() + 1)) {
      out = out.concat(this.getTasksFromDate(d));
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
    return (this.getTaskBetweenDate(date,new Date(JSON.parse(localStorage.getItem('last_ddl')))));
  }

  /**
   * compareDifficulty Method
   * 
   * Checks if difficulty of a is easier than b
   * @param a - Date object a 
   * @param b - Date object b
   * @returns Difference in difficulty between a and b
   */
  static compareDifficulty(a,b){
    return (a.data.difficulty - b.data.difficulty);
  }

  /**
   * comparePriority Method
   * 
   * Checks if priorty of a is earlier than b
   * @param a - Date object a 
   * @param b - Date object b
   * @returns Difference in priority between a and b
   */
  static comparePriority(a,b){
    return (a.data.priority - b.data.priority);
  }

  /**
   * compareDDL Method
   * 
   * Checks if ddl of a is earlier than b
   * @param a - Date object a 
   * @param b - Date object b
   * @returns true if ddl of a comes before b
   */
  static compareDDL(a,b){
    return (a.data.ddl > b.data.ddl);
  }

  /**
   * compareStartDate Method
   * 
   * Checks if start_date of a is earlier than b
   * @param a - Date object a 
   * @param b - Date object b
   * @returns true if start_date of a comes before b
   */
  static compareStartDate(a,b){
    return (a.data.start_date > b.data.start_date);
  }

  /**
   * firstAvailable Method
   * 
   * Takes occupied array and task object and finds earliest time slot
   * to allocate the task
   * @param occupied_in - array with unsorted intervals  
   * @param task - task object to be assigned
   * @returns date object for first available time to assign the task
   */
  static firstAvailable(occupied_in, task) {
    // Sort the list of occupied intervals
    let occupied = Task.sortOccupied(occupied_in);
    let result = new Date();

    // Round the result date to the closest hour
    result.setHours(result.getHours() + Math.ceil(result.getMinutes()/60));
    result.setMinutes(0, 0, 0);

    // Inner function checks if current time slot will fit the task
    let isOccupied = function(opid,time,duration) {
      for (let time_block of opid) {
        let storage = new Date(time_block[0]).setHours(time_block[0].getHours()+time_block[1]);
        let storage2 = new Date(time).setHours(time.getHours()+duration);
        let special = time_block[0].getHours() + time_block[1];
        console.log ("time_block[0] " + time_block[0].getHours()); 
        console.log ("time_block[1] " + time_block[1]); 
        console.log(special);
        //console.log("Comparing " + time_block[0] + " to " + Date(storage));
        //console.log("Comparing " + time + " to " + Date(storage2));
        //console.log("---------------------------------------------");
        
        if (Task.dateRangeOverlaps(time_block[0], storage, time, storage2)){
          return true;
        }
      }
      return false;
    }

    // Increment until a valid time slot is found
    while (isOccupied(occupied,result,task.data.duration)) {
      result.setHours(result.getHours()+1);
    }
    console.log(task.data.task_name + ": " + result);
    return result;
  }
  
  static dateRangeOverlaps (a_start, a_end, b_start, b_end) {
    if (a_start <= b_start && b_start < a_end) return true; // b starts in a
    if (a_start < b_end   && b_end   <= a_end) return true; // b ends in a
    if (b_start <  a_start && a_end   <  b_end) return true; // a in b
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
  static sortOccupied(occupied_in){
    // Initialize Variables
    // Create deep copy to not impact occupied array
    let occupied = structuredClone(occupied_in);    
    let sorted = [];
    let delIndex = 0;
    let earliest = occupied[delIndex];
    let storage = occupied.length;
    // Outer loop to ensure all elements are visited
    for(let i = 0; i < storage; i++){
      earliest = occupied[0];
      // Inner loop to iterate through updated occupied list
      for(let j = 0; j < occupied.length; j++){
        // Find earliest date object --> Earliest interval has to have 
        // negative difference from all other intervals (hence < 0)
        if (occupied[j][0] - earliest[0] < 0){
          earliest = occupied[j];
          // Store index of earliest occupied interval
          delIndex = j;   
        }
      }
      // Push earliest object to new array
      sorted.push(earliest);
      // Remove earliest object from occupied
      occupied.splice(delIndex, 1);
    }
    return sorted;
  }

  // reschedule all tasks based on all tasks in the local storage
  // (break up to smaller tasks using mintime maxtime during) -> priority -> (softddl -> ddl) -> difficulty
  static schedule() {
    // adding padding
    let task_need_schedule = Task.getTasksAfterDate(new Date());
    let occupied = [];
    for (let task of task_need_schedule) {
      if (task.data.padding){
        occupied.push([new Date(task.data.ddl), task.data.duration]);
        
        task.data.start_date = task.data.ddl;
        task.addToLocalStorage();
      }
    }

    // processing tasks that needs scheduling
    console.log("Padding: " + occupied);
    task_need_schedule.sort(Task.comparePriority).reverse();
    for (let task of task_need_schedule) {
      if (task.data.padding) {continue};
      //get the first available date that can fit the task
      task.data.start_date=Task.firstAvailable(occupied,task);
      //check the deadline
      occupied.push([new Date(task.data.start_date), task.data.duration]);
      console.log(occupied);
      task.addToLocalStorage();
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
