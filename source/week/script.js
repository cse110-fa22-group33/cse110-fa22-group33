// weekly-calendar.js
import { Task } from './../skyTasks.js';

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
    // Display HTML & styling
    render();
    
    // Get tasks from local storage and populate weekly calendar
    getHeaderAndTasksFromStorage();
}

export function render() {
    /* array that represents the day of the weeks in index number 
   0: sunday, 1: monday, 2:tuesday, 3: wednesday, 4: thursday, 5: friday, 6:saturday */
   const dayWeeks = ["0", "1", "2" ,"3", "4", "5", "6"]; 
   for (let i = 0; i < 24; i++) {
       if(i === 0){ // 12 am is 0 in the 24 hours scale
           let str = `<div id="`+(i)+ `" class="grid-container">
           <div class="grid-item pos">`+ 12 +`am</div>` 
           for (let j=0; j < dayWeeks.length; j++){
               str += `<div id= "`+ dayWeeks[j] + i + `" class="grid-item sch-`+ dayWeeks[j] +`"></div>`;
           }
           str += `</div>`; 
           document.getElementById("repetition").innerHTML += str;
       }
       else if (i === 12){ //this one gets 12pm  
           let str = `<div class="grid-container">
           <div class="grid-item pos">`+ i +`pm</div>`
           for (let j=0; j < dayWeeks.length; j++){
               str += `<div id= "`+ dayWeeks[j]+ i + `" class="grid-item sch-`+ dayWeeks[j] +`"></div>`;
           }
           str += `</div>`; 
           document.getElementById("repetition").innerHTML += str;
       }
       else if (i >= 12) { //this one makes 1pm to 11pm
           let str = `<div class="grid-container">
           <div class="grid-item pos">`+ (i - 12) +`pm</div>`
           for (let j=0; j < dayWeeks.length; j++){
               str += `<div id= "`+ dayWeeks[j]+ i + `" class="grid-item sch-`+ dayWeeks[j] +`"></div>`;
           }
           str += `</div>`; 
           document.getElementById("repetition").innerHTML += str;
       } 
       else {
           let str = `<div class="grid-container">
           <div class="grid-item pos">`+ i +`am</div>` 
           for (let j=0; j < dayWeeks.length; j++){
               str += `<div id= "`+ dayWeeks[j]+ i + `" class="grid-item sch-`+ dayWeeks[j] +`"></div>`;
           }
           str += `</div>`; 
           document.getElementById("repetition").innerHTML += str;
       }
   }
}

/**
 * Sets header data and calculates start and end dates of week. 
 * Calls a helper methof that reads tasks from local storage and 
 * returns an array of all of the tasks found (as Task objects). If nothing
 * is found in localStorage for tasks, an empty array is returned.
 * @returns {Array<Object>} An array of tasks found in localStorage
 */
export function getHeaderAndTasksFromStorage() {
    
    // set today's date
    let date = new Date();
    // get today's date, grab from monthly
    // if today exists in local storage, reset today 
    if (localStorage.getItem('newToday') !== null) {
        date = new Date(localStorage.getItem('newToday'));
    }
    // get day of week
    let day = date.getDay();

    // set up header variables
    let weekDayOne = new Date();
    let weekDayTwo = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();

    // declare start date and task array
    let startTasks;
    startTasks = new Date();
    let tasks = [];

    // DESIGN DECISION: Hardcode start and end of week using current date and getTasksFromDate.
    // That way, week start and end are always correct, start on Sunday and end on Saturday.

    // if today is sunday
    if(day == 0) {
        // set week start and end dates in header
        weekDayOne = new Date(subtractTimeFromDate(date, 0));
        weekDayTwo = new Date(addTimeToDate(date, 6));

        // set header to correct month and year
        document.getElementById('monthYear').innerHTML = currentMonth(month) + " " + year;

        if(weekDayOne.getMonth() != weekDayTwo.getMonth()) {
            document.getElementById('monthYear').innerHTML = currentMonth(weekDayOne.getMonth()) + " " + " - " + currentMonth(weekDayTwo.getMonth()) + " " + year;
        }

        // set header to correct week days
        document.getElementById('weekDays').innerHTML = weekDayOne.getDate() + " - " + weekDayTwo.getDate();

        // set beginning of week
        startTasks = weekDayOne;

        tasks =  setTasksForDay(startTasks);

        return tasks;
        
    }

    // if today is monday
    if(day == 1) {
        // set week start and end dates in header
        weekDayOne = new Date(subtractTimeFromDate(date, 1));
        weekDayTwo = new Date(addTimeToDate(date, 5));

        // set header to correct month and year
        document.getElementById('monthYear').innerHTML = currentMonth(month) + " " + year;

        if(weekDayOne.getMonth() != weekDayTwo.getMonth()) {
            document.getElementById('monthYear').innerHTML = currentMonth(weekDayOne.getMonth()) + " " + " - " + currentMonth(weekDayTwo.getMonth()) + " " + year;
        }

        // set header to correct week days
        document.getElementById('weekDays').innerHTML = weekDayOne.getDate() + " - " + weekDayTwo.getDate();

        // set beginning of week
        startTasks = weekDayOne;

        tasks =  setTasksForDay(startTasks);

        return tasks;
       
    }

    // if today is tuesday
    if(day == 2) {
        weekDayOne = new Date(subtractTimeFromDate(date, 2));
        weekDayTwo = new Date(addTimeToDate(date, 4));

        // set header to correct month and year
        document.getElementById('monthYear').innerHTML = currentMonth(month) + " " + year;

        if(weekDayOne.getMonth() != weekDayTwo.getMonth()) {
            document.getElementById('monthYear').innerHTML = currentMonth(weekDayOne.getMonth()) + " " + " - " + currentMonth(weekDayTwo.getMonth()) + " " + year;
        }

        // set header to correct week days
        document.getElementById('weekDays').innerHTML = weekDayOne.getDate() + " - " + weekDayTwo.getDate();

        // set beginning of week
        startTasks = weekDayOne;
        
        tasks =  setTasksForDay(startTasks);

        return tasks;
    }

    // if today is wednesday
    if(day == 3) {
        // set week start and end dates in header
        weekDayOne = new Date(subtractTimeFromDate(date, 3));
        weekDayTwo = new Date(addTimeToDate(date, 3));
        
        // set header to correct month and year
        document.getElementById('monthYear').innerHTML = currentMonth(month) + " " + year;

        if(weekDayOne.getMonth() != weekDayTwo.getMonth()) {
            document.getElementById('monthYear').innerHTML = currentMonth(weekDayOne.getMonth()) + " " + " - " + currentMonth(weekDayTwo.getMonth()) + " " + year;
        }

        // set header to correct week days
        document.getElementById('weekDays').innerHTML = weekDayOne.getDate() + " - " + weekDayTwo.getDate();

        // set beginning of week
        startTasks = weekDayOne;
        
        tasks =  setTasksForDay(startTasks);

        return tasks;
    }

    // if today is thursday
    if(day == 4) {
        // set week start and end dates in header
        weekDayOne = new Date(subtractTimeFromDate(date, 4));
        weekDayTwo = new Date(addTimeToDate(date, 2));
       
        // set header to correct month and year
        document.getElementById('monthYear').innerHTML = currentMonth(month) + " " + year;

        if(weekDayOne.getMonth() != weekDayTwo.getMonth()) {
            document.getElementById('monthYear').innerHTML = currentMonth(weekDayOne.getMonth()) + " " + " - " + currentMonth(weekDayTwo.getMonth()) + " " + year;
        }

        // set header to correct week days
        document.getElementById('weekDays').innerHTML = weekDayOne.getDate() + " - " + weekDayTwo.getDate();

        // set beginning of week
        startTasks = weekDayOne;
        
        tasks =  setTasksForDay(startTasks);

        return tasks;
    }

    // if today is friday
    if(day == 5) {
        // set week start and end dates in header
        weekDayOne = new Date(subtractTimeFromDate(date, 5));
        weekDayTwo = new Date(addTimeToDate(date, 1));
        
        // set header to correct month and year
        document.getElementById('monthYear').innerHTML = currentMonth(month) + " " + year;

        if(weekDayOne.getMonth() != weekDayTwo.getMonth()) {
            document.getElementById('monthYear').innerHTML = currentMonth(weekDayOne.getMonth()) + " " + " - " + currentMonth(weekDayTwo.getMonth()) + " " + year;
        }

        // set header to correct week days
        document.getElementById('weekDays').innerHTML = weekDayOne.getDate() + " - " + weekDayTwo.getDate();

        // set beginning of week
        startTasks = weekDayOne;
        
        tasks =  setTasksForDay(startTasks);

        return tasks;
    }

    // if today is saturday
    if(day == 6) {
        // set week start and end dates in header
        weekDayOne = new Date(subtractTimeFromDate(date, 6));
        weekDayTwo = new Date(addTimeToDate(date, 0));
        
        // set header to correct month and year
        document.getElementById('monthYear').innerHTML = currentMonth(month) + " " + year;

        if(weekDayOne.getMonth() != weekDayTwo.getMonth()) {
            document.getElementById('monthYear').innerHTML = currentMonth(weekDayOne.getMonth()) + " " + " - " + currentMonth(weekDayTwo.getMonth()) + " " + year;
        }

        // set header to correct week days
        document.getElementById('weekDays').innerHTML = weekDayOne.getDate() + " - " + weekDayTwo.getDate();

        // set beginning of week
        startTasks = weekDayOne;
        
        tasks =  setTasksForDay(startTasks);

        return tasks;
    }

    return tasks;

}

/**
 * Helper method for getHeaderAndTasksFromStorage.
 * Reads tasks from local storage and returns an array of 
 * all of the tasks found (as Task objects). If nothing
 * is found in localStorage for tasks, an empty array is returned.
 * @parameter startTasks date object
 * @returns {Array<Object>} An array of tasks found in localStorage
 */
export function setTasksForDay(startTasks) {
    let tasks = [];
    let paddingTasks = Task.getAllPaddings();

    // loop over entire current week
    for (let i = 0; i < 7; i++) {
        
        // pull all tasks for current day
        tasks = Task.getTasksFromDate(startTasks);

        if(tasks.length != 0) {
            for (let task of tasks) {
                if(!task.data.recurrent) {
                // pull correct date and time from task element
                let currDay = task.data.start_date.getDay();
                let currTime = task.data.start_date.getHours();

                let currDayTime = "" + currDay  + currTime;

                // grab corresponding html cell
                let currCell = document.getElementById(currDayTime);

                // set innerHTML to reflect correct task data
                currCell.innerHTML = task.data.task_name;

                if(task.data.category == "school") {
                    currCell.style.backgroundColor="#51a051d8";
                }

                if(task.data.category == "personal") {
                    currCell.style.backgroundColor="#496ebe81";
                }

                if(task.data.category == "other") {
                    currCell.style.backgroundColor="#c38bce91";
                }

                if(task.data.category == "") {
                    currCell.style.backgroundColor="#c38bce91";
                }

                if(task.data.recurrent) {
                    currCell.innerHTML = "";
                    currCell.style.backgroundColor="";
                }

                // set calendar to reflect task duration
                let curDuration = task.data.duration;
                if (curDuration > 1) {
                    for (let i = 0; i < curDuration - 1; i++) {
                        currTime++;
                        currDayTime++;
                        if (currTime == 24) {
                            currTime = 0;
                            currDay++;
                        }

                        currDayTime = "" + currDay + currTime;
                        currCell = document.getElementById(currDayTime);

                        if(task.data.category == "school") {
                            currCell.style.backgroundColor="#51a051d8";
                        }
        
                        if(task.data.category == "personal") {
                            currCell.style.backgroundColor="#496ebe81";
                        }
        
                        if(task.data.category == "other") {
                            currCell.style.backgroundColor="#c38bce91";
                        }
        
                        if(task.data.category == "") {
                            currCell.style.backgroundColor="#c38bce91";
                        }

                        if(!(task.data.padding) & !(task.data.recurrent)) {
                            currCell.innerHTML = task.data.task_name;
                        }
                    }
                } 
            } 
            }
        }

        // let morningPadding = Task.getTasksFromName('morning')[0];
        // console.log(morningPadding);
        // let eveningPadding = Task.getTasksFromName('evening')[0];
        // console.log(eveningPadding);

        // console.log(morningPadding.data.ddl.getHours());
        // console.log(eveningPadding.data.ddl.getHours());

        /*if (eveningPadding.data.ddl.getHours() < morningPadding.data.ddl.getHours()) {
            eveningPadding.data.ddl = new Date(subtractTimeFromDate(morningPadding.data.ddl, 1));
            console.log("new date" + eveningPadding);
        }*/

        for(let task of paddingTasks) {
            // console.log(task.data.ddl);
            if(task.data.recurrent){
            // pull correct date and time from task element
            let currDay = startTasks.getDay();
            let currTime = task.data.ddl.getHours();
    
            let currDayTime = "" + currDay  + currTime;
    
            // grab corresponding html cell
            let currCell = document.getElementById(currDayTime);
    
            currCell.style.backgroundColor="C8C8C8";

            let curDuration = task.data.duration;
            for (let i = 0; i < curDuration - 1; i++) {
                    currTime++;
                    currDayTime++;
                    if (currTime == 24) {
                        currTime = 0;
                    }
                    currDayTime = "" + currDay + currTime;
                    currCell = document.getElementById(currDayTime);
                    currCell.style.backgroundColor="C8C8C8";
                }
            }
        }

        startTasks.setDate(startTasks.getDate() + 1);
    }

    return tasks;
}

/**
 * Helper function for weekly header, returns correct day after 
 * substracting input number of days
 * @parameter objDate Date object
 * @parameter intDays number of days to be subtracted
 * @returns Date object
 */
export function subtractTimeFromDate(objDate, intDays) {
    var numberOfMlSeconds = objDate.getTime();
    var addMlSeconds = (intDays * 24) * 60 * 60 * 1000;
    var newDateObj = new Date(numberOfMlSeconds - addMlSeconds);
    
    return newDateObj;
}

/**
 * Helper function for weekly header, returns correct day after 
 * addding input number of days
 * @parameter objDate Date object
 * @parameter intDays number of days to be added
 * @returns Date object
 */
export function addTimeToDate(objDate, intDays) {
    var numberOfMlSeconds = objDate.getTime();
    var addMlSeconds = (intDays * 24) * 60 * 60 * 1000;
    var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
    
    return newDateObj;
}

/**
 * Helper function for weekly header, returns correct month name after 
 * recieving corresponding number
 * @parameter month current month number
 * @returns month current month name
 */
export function currentMonth(month) {
    // set current month
    if (month == 0) {
        month = "January";
    }
    else if (month == 1) {
        month = "February";
    }
    else if (month == 2) {
        month = "March";
    }
    else if (month == 3) {
        month = "April";
    }
    else if (month == 4) {
        month = "May";
    }
    else if (month == 5) {
        month = "June";
    }
    else if (month == 6) {
        month = "July";
    }
    else if (month == 7) {
        month = "August";
    }
    else if (month == 8) {
        month = "September";
    }
    else if (month == 9) {
        month = "October";
    }
    else if (month == 10) {
        month = "November";
    }
    else if (month == 11) {
        month = "December";
    }

    return month;
}