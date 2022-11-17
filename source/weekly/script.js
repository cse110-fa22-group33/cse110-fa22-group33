// weekly-calendar.js
import { Task } from '/task.js';

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
    
    // Get tasks from local storage and call populateWeeklyHeaderData
    let tasks = getHeaderAndTasksFromStorage();
    
    // Add each task to calendar
    populateTaskData(tasks);
    
    // Add event listeners to form elements
    initFormHandler();
}

/**
 * Takes in weekDayOne, weekDayTwo, month, year and scheduleName
 * from monthly calendar and populates this data in weeklyCalendar.
 */
function populateWeeklyHeaderData(weekDayOne, weekDayTwo, month, year, scheduleName) {
    
    // comes from task -> local storage
    document.getElementById('weekDayOne').innerHTML = weekDayOne.getDate();
    document.getElementById('weekDayTwo').innerHTML = weekDayTwo.getDate();
    document.getElementById('month').innerHTML = month;
    document.getElementById('year').innerHTML = year;
    document.getElementById('scheduleName').innerHTML = scheduleName;
}

/**
 * Reads tasks from local storage and returns an array of 
 * all of the tasks found (as Task objects). If nothing
 * is found in localStorage for tasks, an empty array is returned.
 * @returns {Array<Object>} An array of tasks found in localStorage
 */
function getHeaderAndTasksFromStorage() {
    // hardcode using current date and getTasksFromDate
    
    // set today's date
    const date = new Date();
    // get today's date
    let today = date.getDate();
    // get day of week
    let day = date.getDay();

    // set up header variables
    let passWeekDayOne = new Date();
    let passWeekDayTwo = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let scheduleName; // where to pull this variable from??

    // configure start/end days and tasks based on day of week
    let startTasks;
    let tasks = [];

    // if today is sunday
    if(day == 0) {
        populateWeeklyHeaderData(passWeekDayOne, passWeekDayTwo.setDate(today + 6), month, year, scheduleName);

        // grab all tasks for week
        startTasks = passWeekDayOne;
        for (let i = 0; i < 7; i++) {
            tasks.concat[Task.getTasksFromDate(startTasks)];
            startTasks.setDate(startTasks + 1);
        }

        return tasks;
    }

    // if today is monday
    if(day == 1) {
        populateWeeklyHeaderData(passWeekDayOne.setDate(today - 1), passWeekDayTwo.setDate(today + 5), month, year, scheduleName);
    
         // grab all tasks for week
        startTasks = passWeekDayOne;
        for (let i = 0; i < 7; i++) {
            tasks.concat[Task.getTasksFromDate(startTasks)];
            startTasks.setDate(startTasks + 1);
        }

        return tasks;
    }

    // if today is tuesday
    if(day == 2) {
        populateWeeklyHeaderData(passWeekDayOne.setDate(today - 2), passWeekDayTwo.setDate(today + 4), month, year, scheduleName);

         // grab all tasks for week
         startTasks = passWeekDayOne.setDate(today - 2);
         for (let i = 0; i < 7; i++) {
             tasks.concat[Task.getTasksFromDate(startTasks)];
             startTasks.setDate(startTasks + 1);
         }
 
         return tasks;        
    }

    // if today is wednesday
    if(day == 3) {
        populateWeeklyHeaderData(passWeekDayOne.setDate(today - 3), passWeekDayTwo.setDate(today + 3), month, year, scheduleName);
    
        // grab all tasks for week
        startTasks = passWeekDayOne.setDate(today - 3);
        for (let i = 0; i < 7; i++) {
            tasks.concat[Task.getTasksFromDate(startTasks)];
            startTasks.setDate(startTasks + 1);
        }

        return tasks;
    }

    // if today is thursday
    if(day == 4) {
        populateWeeklyHeaderData(passWeekDayOne.setDate(today - 4), passWeekDayTwo.setDate(today + 2), month, year, scheduleName);

        // grab all tasks for week
        startTasks = passWeekDayOne.setDate(today - 4);
        for (let i = 0; i < 7; i++) {
            tasks.concat[Task.getTasksFromDate(startTasks)];
            startTasks.setDate(startTasks + 1);
        }

        return tasks;
    }

    // if today is friday
    if(day == 5) {
        populateWeeklyHeaderData(passWeekDayOne.setDate(today - 5), passWeekDayTwo.setDate(today + 2), month, year, scheduleName);

        // grab all tasks for week
        startTasks = passWeekDayOne.setDate(today - 5);
        for (let i = 0; i < 7; i++) {
            tasks.concat[Task.getTasksFromDate(startTasks)];
            startTasks.setDate(startTasks + 1);
        }

        return tasks;
    }

    // if today is saturday
    if(day == 6) {
        populateWeeklyHeaderData(passWeekDayOne.setDate(today - 6), passWeekDayTwo, month, year, scheduleName);

        // grab all tasks for week
        startTasks = passWeekDayOne.setDate(today - 6);
        for (let i = 0; i < 7; i++) {
            tasks.concat[Task.getTasksFromDate(startTasks)];
            startTasks.setDate(startTasks + 1);
        }

        return tasks;
    }

    return tasks;

}

/**
 * Takes in an array of tasks and for each tasks creates a new <current-task>
 * element, adds the task data to that current task using element.data = {...},
 * and then appends that task to <main>
 * @param {Array<Object>} tasks An array of tasks
 */
function populateTaskData(tasks) {
    // get correct ids from clarissa

    // iterate through each task which should appear on weekly calendar
    for (let i = 0; i < tasks.length; i++) {

        // retrieve current task
        let currTask = tasks[i];

        // pull correct date and time from task element
        let currDay = currTask.data.start_date.getDay();
        let currTime = currTask.data.ddl;

        // grab corresponding html cell
        let currCell = document.getElementById('');

        // grab task data to appear in cell
        let currTitle = currTask.data.task_name;

        // set innerHTML to reflect correct task data
        currCell.innerHTML = currTitle;

        // color currCell along with those which currTasks extends into
    }
}

/**
 * Takes in a task and opens the edit/add/create window for that task. If task
 * is null, window is opened without any data passed in.
 * @param Object A current task object
 */
function openEditTask() {
    window.location.href = "editTask.html"
}

/**
 * Returns to monthly calendar that matches current weekly calendar.
 */
function openMonthlyCalendar() {
    window.location.href = "monthlyCalendar.html"
}

/**
 * Returns to home page which displays current tasks.
 */
 function openHomePage() {
    window.location.href = "currentTasks.html"
}

/**
 * Adds the necessary event handlers to the back <button> and current tasks.
 */
function initFormHandler() {
    let editTask = document.getElementById('currentTaskPage');
    let monthlyCalendar = document.getElementById('monthlyCalendar');
    let homePage = document.getElementById('currentTasks');

    editTask.addEventListener('click', () => {
        openEditTask();
    })


    monthlyCalendar.addEventListener('click', () => {
        openMonthlyCalendar();
    })

    homePage.addEventListener('click', () => {
        openHomePage();
    })
}