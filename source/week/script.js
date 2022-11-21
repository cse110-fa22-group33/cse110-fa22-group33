// weekly-calendar.js
import { Task } from './../skyTasks.js';

/*
let mytask = new Task('task name', 1000, 2000, new Date());
mytask.addToLocalStorage();
new Task('task name', 999, 2000, new Date('11/14/2022')).addToLocalStorage();
new Task('task name', 123999, 2000, new Date('11/13/2022')).addToLocalStorage();
new Task('task name', 22, 2000, new Date()).addToLocalStorage();
new Task('task name', 1111, 3000, new Date('11/17/2022')).addToLocalStorage();
new Task('task name', 123, 3000, new Date('11/19/2022')).addToLocalStorage();*/

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
    
    // Get tasks from local storage and populate weekly calendar
    getHeaderAndTasksFromStorage();
    
    // Add event listeners to form elements
    // dean already completed
    // initFormHandler();
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
    let weekDayOne = new Date();
    let weekDayTwo = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let scheduleName; // where to pull this variable from??

    // document.getElementById('month').innerHTML = month;
    // document.getElementById('year').innerHTML = year;
    // document.getElementById('scheduleName').innerHTML = scheduleName;

    // configure start/end days and tasks based on day of week
    let startTasks;
    startTasks = new Date();
    let tasks = [];

    // if today is sunday
    if(day == 0) {
        weekDayOne.setDate(today);
        weekDayTwo.setDate(today + 6);
        // document.getElementById('weekDayOne').innerHTML = weekDayOneHeader;
        // document.getElementById('weekDayTwo').innerHTML = weekDayTwoHeader;

        // set beginning of week
        startTasks = weekDayOne;
        
        for (let i = 0; i < 7; i++) {
            tasks = Task.getTasksFromDate(startTasks);

            if(tasks.length != 0) {
                for (let task of tasks) {
                    // pull correct date and time from task element
                    let currDay = startTasks.getDay();
                    let currTime = startTasks.getHours();
                    let currDayTime = "" + currDay  + currTime;

                    // grab corresponding html cell
                    let currCell = document.getElementById(currDayTime);

                    // set innerHTML to reflect correct task data
                    currCell.innerHTML = task.data.task_name;
                    currCell.style.backgroundColor="pink";
                }
            }

            startTasks.setDate(startTasks.getDate() + 1);
        }

        return tasks;
    }

    // if today is monday
    if(day == 1) {
        weekDayOne.setDate(today - 1);
        weekDayTwo.setDate(today + 5);
        // document.getElementById('weekDayOne').innerHTML = weekDayOneHeader;
        // document.getElementById('weekDayTwo').innerHTML = weekDayTwoHeader;

        // set beginning of week
        startTasks = weekDayOne;
        
        for (let i = 0; i < 7; i++) {
            tasks = Task.getTasksFromDate(startTasks);

            if(tasks.length != 0) {
                for (let task of tasks) {
                    // pull correct date and time from task element
                    let currDay = startTasks.getDay();
                    let currTime = startTasks.getHours();
                    let currDayTime = "" + currDay  + currTime;

                    // grab corresponding html cell
                    let currCell = document.getElementById(currDayTime);

                    // set innerHTML to reflect correct task data
                    currCell.innerHTML = task.data.task_name;
                    currCell.style.backgroundColor="pink";
                }
            }

            startTasks.setDate(startTasks.getDate() + 1);
        }

        return tasks;
    }

    // if today is tuesday
    if(day == 2) {
        weekDayOne.setDate(today - 2);
        weekDayTwo.setDate(today + 4);
        // document.getElementById('weekDayOne').innerHTML = weekDayOneHeader;
        // document.getElementById('weekDayTwo').innerHTML = weekDayTwoHeader;
 
        // set beginning of week
        startTasks = weekDayOne;
        
        for (let i = 0; i < 7; i++) {
            tasks = Task.getTasksFromDate(startTasks);

            if(tasks.length != 0) {
                for (let task of tasks) {
                    // pull correct date and time from task element
                    let currDay = startTasks.getDay();
                    let currTime = startTasks.getHours();
                    let currDayTime = "" + currDay  + currTime;

                    // grab corresponding html cell
                    let currCell = document.getElementById(currDayTime);

                    // set innerHTML to reflect correct task data
                    currCell.innerHTML = task.data.task_name;
                    currCell.style.backgroundColor="pink";
                }
            }

            startTasks.setDate(startTasks.getDate() + 1);
        }

        return tasks;
    }

    // if today is wednesday
    if(day == 3) {
        weekDayOne.setDate(today - 3);
        weekDayTwo.setDate(today + 3);
        // document.getElementById('weekDayOne').innerHTML = weekDayOneHeader;
        // document.getElementById('weekDayTwo').innerHTML = weekDayTwoHeader;

        // set beginning of week
        startTasks = weekDayOne;
        
        for (let i = 0; i < 7; i++) {
            tasks = Task.getTasksFromDate(startTasks);

            if(tasks.length != 0) {
                for (let task of tasks) {
                    // pull correct date and time from task element
                    let currDay = startTasks.getDay();
                    let currTime = startTasks.getHours();
                    let currDayTime = "" + currDay  + currTime;

                    // grab corresponding html cell
                    let currCell = document.getElementById(currDayTime);

                    // set innerHTML to reflect correct task data
                    currCell.innerHTML = task.data.task_name;
                    currCell.style.backgroundColor="pink";
                }
            }

            startTasks.setDate(startTasks.getDate() + 1);
        }

        return tasks;
    }

    // if today is thursday
    if(day == 4) {
        weekDayOne.setDate(today - 4);
        weekDayTwo.setDate(today + 2);
        // document.getElementById('weekDayOne').innerHTML = weekDayOneHeader;
        // document.getElementById('weekDayTwo').innerHTML = weekDayTwoHeader;

        // set beginning of week
        startTasks = weekDayOne;
        
        for (let i = 0; i < 7; i++) {
            tasks = Task.getTasksFromDate(startTasks);

            if(tasks.length != 0) {
                for (let task of tasks) {
                    // pull correct date and time from task element
                    let currDay = startTasks.getDay();
                    let currTime = startTasks.getHours();
                    let currDayTime = "" + currDay  + currTime;

                    // grab corresponding html cell
                    let currCell = document.getElementById(currDayTime);

                    // set innerHTML to reflect correct task data
                    currCell.innerHTML = task.data.task_name;
                    currCell.style.backgroundColor="pink";
                }
            }

            startTasks.setDate(startTasks.getDate() + 1);
        }

        return tasks;
    }

    // if today is friday
    if(day == 5) {
        weekDayOne.setDate(today - 5);
        weekDayTwo.setDate(today + 1);
        // document.getElementById('weekDayOne').innerHTML = weekDayOneHeader;
        // document.getElementById('weekDayTwo').innerHTML = weekDayTwoHeader;

        // set beginning of week
        startTasks = weekDayOne;
        
        for (let i = 0; i < 7; i++) {
            tasks = Task.getTasksFromDate(startTasks);

            if(tasks.length != 0) {
                for (let task of tasks) {
                    // pull correct date and time from task element
                    let currDay = startTasks.getDay();
                    let currTime = startTasks.getHours();
                    let currDayTime = "" + currDay  + currTime;

                    // grab corresponding html cell
                    let currCell = document.getElementById(currDayTime);

                    // set innerHTML to reflect correct task data
                    currCell.innerHTML = task.data.task_name;
                    currCell.style.backgroundColor="pink";
                }
            }

            startTasks.setDate(startTasks.getDate() + 1);
        }

        return tasks;
    }

    // if today is saturday
    if(day == 6) {
        weekDayOne.setDate(today - 6);
        weekDayTwo.setDate(today);
        // document.getElementById('weekDayOne').innerHTML = weekDayOneHeader;
        // document.getElementById('weekDayTwo').innerHTML = weekDayTwoHeader;

        // set beginning of week
        startTasks = weekDayOne;
        
        for (let i = 0; i < 7; i++) {
            tasks = Task.getTasksFromDate(startTasks);

            if(tasks.length != 0) {
                for (let task of tasks) {
                    // pull correct date and time from task element
                    let currDay = startTasks.getDay();
                    let currTime = startTasks.getHours();
                    let currDayTime = "" + currDay  + currTime;

                    // grab corresponding html cell
                    let currCell = document.getElementById(currDayTime);

                    // set innerHTML to reflect correct task data
                    currCell.innerHTML = task.data.task_name;
                    currCell.style.backgroundColor="pink";
                }
            }

            startTasks.setDate(startTasks.getDate() + 1);
        }

        return tasks;
    }

    return tasks;

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