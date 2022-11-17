// weekly-calendar.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded, init');

// Starts the program, all function calls trace back here
function init() {
    // Populate weekly calendar data
    populateWeeklyData();
    // Get tasks from local storage
    let tasks = getTasksFromStorage();
    // Add each task to calendar
    populateTaskData(tasks);
    // Add event listeners to form elements
    initFormHandler();
}

/**
 * Takes in weekDayOne, weekDayTwo, month, year and scheduleName
 * from monthly calendar and populates this data in weeklyCalendar.
 */
function populateWeeklyData() {
    // comes from monthly calendar -> local storage
    let weekDayOne;
    let weekDayTwo;
    let month;
    let year;
    let scheduleName;
    let home;
    let back;
}

/**
 * Reads tasks from local storage and returns an array of 
 * all of the tasks found (parsed, not in string form). If nothing
 * is found in localStorage for tasks, an empty array is returned.
 * @returns {Array<Object>} An array of tasks found in localStorage
 */
function getTasksFromStorage() {
    return JSON.parse(window.localStorage.getItem('tasks'));
}

/**
 * Takes in an array of tasks and for each tasks creates a new <current-task>
 * element, adds the task data to that current task using element.data = {...},
 * and then appends that task to <main>
 * @param {Array<Object>} tasks An array of tasks
 */
function populateTaskData(tasks) {
    // from localStorage
    let main = document.querySelector('main');
    for (let i = 0; i < tasks.length; i++) {
        let currTask = document.createElement('current-task');
        currTask.data = tasks[i];
        main.append(currTask);
    }
}

/**
 * Takes in a task and opens the edit/add/create window for that task. If task
 * is null, window is opened without any data passed in.
 * @param Object A current task object
 */
function openEditTask(task) {

}

/**
 * Returns to monthly calendar that matches current weekly calendar.
 */
function openMonthlyCalendar() {

}

/**
 * Returns to home page which displays current tasks.
 */
 function openHomePage() {

}

/**
 * Adds the necessary event handlers to the back <button> and current tasks.
 */
function initFormHandler() {
    task.addEventListener('click', () => {
        openEditTask(task);
    })


    back.addEventListener('click', () => {
        openMonthlyCalendar();
    })

    home.addEventListener('click', () => {
        openHomePage();
    })
}
