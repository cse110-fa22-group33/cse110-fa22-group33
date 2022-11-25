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

function render() {
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
 * Reads tasks from local storage and returns an array of 
 * all of the tasks found (as Task objects). If nothing
 * is found in localStorage for tasks, an empty array is returned.
 * @returns {Array<Object>} An array of tasks found in localStorage
 */
function getHeaderAndTasksFromStorage() {
    
    // set today's date
    let date = new Date();
    // get today's date, grab from monthly
    // if today exists in local storage, reset today 
    if (localStorage.getItem('newToday') !== null) {
        date = new Date(localStorage.getItem('newToday'));
    }
    let today = date.getDate();
    // get day of week
    let day = date.getDay();

    // set up header variables
    let weekDayOne = new Date();
    let weekDayTwo = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    // let scheduleName; where to pull this variable from??


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

    // set header to correct month and year
    document.getElementById('monthYear').innerHTML = month + " " + year;

    // set schedule name
    // document.getElementById('scheduleName').innerHTML = scheduleName;

    // declare start date and task array
    let startTasks;
    startTasks = new Date();
    let tasks = [];

    // DESIGN DECISION: Hardcode start and end of week using current date and getTasksFromDate.
    // That way, week start and end are always correct, start on Sunday and end on Saturday.

    // if today is sunday
    if(day == 0) {
        // set week start and end dates in header
        weekDayOne.setDate(today);
        weekDayTwo.setDate(today + 6);
        document.getElementById('weekDays').innerHTML = weekDayOne.getDate() + " - " + weekDayTwo.getDate();

        // set beginning of week
        startTasks = weekDayOne;
        
        // loop over entire current week
        for (let i = 0; i < 7; i++) {
            // pull all tasks for current day
            tasks = Task.getTasksFromDate(startTasks);

            if(tasks.length != 0) {
                for (let task of tasks) {
                    // pull correct date and time from task element
                    let currDay = task.data.ddl.getDay();
                    let currTime = task.data.ddl.getHours();

                    let currDayTime = "" + currDay  + currTime;

                    // grab corresponding html cell
                    let currCell = document.getElementById(currDayTime);

                    // set innerHTML to reflect correct task data
                    currCell.innerHTML = task.data.task_name;
                    currCell.style.backgroundColor="pink";

                    // set calendar to reflect task duration
                    let curDuration = task.data.duration;
                    if (curDuration > 1) {
                        for (let i = 0; i < curDuration - 1; i++) {
                            currTime++;
                            currDayTime++;
                            if (currTime == 24) {
                                currTime = 0;
                                currDay++;
                                currDayTime = "" + currDay + currTime;
                            }
                            currCell = document.getElementById(currDayTime);
                            currCell.innerHTML = task.data.task_name;
                            currCell.style.backgroundColor="pink";
                        }
                    }  
                }
            }

            startTasks.setDate(startTasks.getDate() + 1);
        }

        return tasks;
    }

    // if today is monday
    if(day == 1) {
        // set week start and end dates in header
        weekDayOne.setDate(today - 1);
        weekDayTwo.setDate(today + 5);
        document.getElementById('weekDays').innerHTML = weekDayOne.getDate() + " - " + weekDayTwo.getDate();

        // set beginning of week
        startTasks = weekDayOne;
        
        // loop over entire current week
        for (let i = 0; i < 7; i++) {
            // pull all tasks for current day
            tasks = Task.getTasksFromDate(startTasks);

            if(tasks.length != 0) {
                for (let task of tasks) {
                    // pull correct date and time from task element
                    let currDay = task.data.ddl.getDay();
                    let currTime = task.data.ddl.getHours();

                    let currDayTime = "" + currDay  + currTime;
                    // grab corresponding html cell
                    let currCell = document.getElementById(currDayTime);

                    // set innerHTML to reflect correct task data
                    currCell.innerHTML = task.data.task_name;
                    currCell.style.backgroundColor="pink";

                    // set calendar to reflect task duration
                    let curDuration = task.data.duration;
                    if (curDuration > 1) {
                        for (let i = 0; i < curDuration - 1; i++) {
                            currTime++;
                            currDayTime++;
                            if (currTime == 24) {
                                currTime = 0;
                                currDay++;
                                currDayTime = "" + currDay + currTime;
                            }
                            currCell = document.getElementById(currDayTime);
                            currCell.innerHTML = task.data.task_name;
                            currCell.style.backgroundColor="pink";
                        }
                    }  
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
        document.getElementById('weekDays').innerHTML = weekDayOne.getDate() + " - " + weekDayTwo.getDate();
 
        // set beginning of week
        startTasks = weekDayOne;
        
        // loop over entire current week
        for (let i = 0; i < 7; i++) {
            console.log(startTasks);
            // pull all tasks for current day
            tasks = Task.getTasksFromDate(startTasks);
            console.log(tasks);

            if(tasks.length != 0) {
                console.log("made it");
                for (let task of tasks) {
                    // pull correct date and time from task element
                    let currDay = task.data.ddl.getDay();
                    let currTime = task.data.ddl.getHours();

                    let currDayTime = "" + currDay  + currTime;

                    // grab corresponding html cell
                    let currCell = document.getElementById(currDayTime);

                    // set innerHTML to reflect correct task data
                    currCell.innerHTML = task.data.task_name;
                    currCell.style.backgroundColor="pink";

                    // set calendar to reflect task duration
                    let curDuration = task.data.duration;
                    if (curDuration > 1) {
                        for (let i = 0; i < curDuration - 1; i++) {
                            currTime++;
                            currDayTime++;
                            if (currTime == 24) {
                                currTime = 0;
                                currDay++;
                                currDayTime = "" + currDay + currTime;
                            }
                            currCell = document.getElementById(currDayTime);
                            currCell.innerHTML = task.data.task_name;
                            currCell.style.backgroundColor="pink";
                        }
                    }  
                }
            }

            startTasks.setDate(startTasks.getDate() + 1);
        }

        return tasks;
    }

    // if today is wednesday
    if(day == 3) {
        // set week start and end dates in header
        weekDayOne.setDate(today - 3);
        weekDayTwo.setDate(today + 3);
        document.getElementById('weekDays').innerHTML = weekDayOne.getDate() + " - " + weekDayTwo.getDate();

        // set beginning of week
        startTasks = weekDayOne;
        
        // loop over entire current week
        for (let i = 0; i < 7; i++) {
            // pull all tasks for current day
            tasks = Task.getTasksFromDate(startTasks);

            if(tasks.length != 0) {
                for (let task of tasks) {
                    // pull correct date and time from task element
                    let currDay = task.data.ddl.getDay();
                    let currTime = task.data.ddl.getHours();

                    let currDayTime = "" + currDay  + currTime;

                    // grab corresponding html cell
                    let currCell = document.getElementById(currDayTime);

                    // set innerHTML to reflect correct task data
                    currCell.innerHTML = task.data.task_name;
                    currCell.style.backgroundColor="pink";

                    // set calendar to reflect task duration
                    let curDuration = task.data.duration;
                    if (curDuration > 1) {
                        for (let i = 0; i < curDuration - 1; i++) {
                            currTime++;
                            currDayTime++;
                            if (currTime == 24) {
                                currTime = 0;
                                currDay++;
                                currDayTime = "" + currDay + currTime;
                            }
                            currCell = document.getElementById(currDayTime);
                            currCell.innerHTML = task.data.task_name;
                            currCell.style.backgroundColor="pink";
                        }
                    }  
                }
            }

            startTasks.setDate(startTasks.getDate() + 1);
        }

        return tasks;
    }

    // if today is thursday
    if(day == 4) {
        // set week start and end dates in header
        weekDayOne.setDate(today - 4);
        weekDayTwo.setDate(today + 2);
        document.getElementById('weekDays').innerHTML = weekDayOne.getDate() + " - " + weekDayTwo.getDate();

        // set beginning of week
        startTasks = weekDayOne;
        
        // loop over entire current week
        for (let i = 0; i < 7; i++) {
            // pull all tasks for current day
            tasks = Task.getTasksFromDate(startTasks);

            if(tasks.length != 0) {
                for (let task of tasks) {
                    // pull correct date and time from task element
                    let currDay = task.data.ddl.getDay();
                    let currTime = task.data.ddl.getHours();

                    let currDayTime = "" + currDay  + currTime;

                    // grab corresponding html cell
                    let currCell = document.getElementById(currDayTime);

                    // set innerHTML to reflect correct task data
                    currCell.innerHTML = task.data.task_name;
                    currCell.style.backgroundColor="pink";

                    // set calendar to reflect task duration
                    let curDuration = task.data.duration;
                    if (curDuration > 1) {
                        for (let i = 0; i < curDuration - 1; i++) {
                            currTime++;
                            currDayTime++;
                            if (currTime == 24) {
                                currTime = 0;
                                currDay++;
                                currDayTime = "" + currDay + currTime;
                            }
                            currCell = document.getElementById(currDayTime);
                            currCell.innerHTML = task.data.task_name;
                            currCell.style.backgroundColor="pink";
                        }
                    }  
                }
            }

            startTasks.setDate(startTasks.getDate() + 1);
        }

        return tasks;
    }

    // if today is friday
    if(day == 5) {
        // set week start and end dates in header
        weekDayOne.setDate(today - 5);
        weekDayTwo.setDate(today + 1);
        document.getElementById('weekDays').innerHTML = weekDayOne.getDate() + " - " + weekDayTwo.getDate();

        // set beginning of week
        startTasks = weekDayOne;
        
        // loop over entire current week
        for (let i = 0; i < 7; i++) {
            // pull all tasks for current day
            tasks = Task.getTasksFromDate(startTasks);

            if(tasks.length != 0) {
                for (let task of tasks) {
                    // pull correct date and time from task element
                    let currDay = task.data.ddl.getDay();
                    let currTime = task.data.ddl.getHours();

                    let currDayTime = "" + currDay  + currTime;

                    // grab corresponding html cell
                    let currCell = document.getElementById(currDayTime);

                    // set innerHTML to reflect correct task data
                    currCell.innerHTML = task.data.task_name;
                    currCell.style.backgroundColor="pink";

                    // set calendar to reflect task duration
                    let curDuration = task.data.duration;
                    if (curDuration > 1) {
                        for (let i = 0; i < curDuration - 1; i++) {
                            currTime++;
                            currDayTime++;
                            if (currTime == 24) {
                                currTime = 0;
                                currDay++;
                                currDayTime = "" + currDay + currTime;
                            }
                            currCell = document.getElementById(currDayTime);
                            currCell.innerHTML = task.data.task_name;
                            currCell.style.backgroundColor="pink";
                        }
                    }  
                }
            }

            startTasks.setDate(startTasks.getDate() + 1);
        }

        return tasks;
    }

    // if today is saturday
    if(day == 6) {
        // set week start and end dates in header
        weekDayOne.setDate(today - 6);
        weekDayTwo.setDate(today);
        document.getElementById('weekDays').innerHTML = weekDayOne.getDate() + " - " + weekDayTwo.getDate();

        // set beginning of week
        startTasks = weekDayOne;
        
        // loop over entire current week
        for (let i = 0; i < 7; i++) {
            // pull all tasks for current day
            tasks = Task.getTasksFromDate(startTasks);

            if(tasks.length != 0) {
                for (let task of tasks) {
                    // pull correct date and time from task element
                    let currDay = task.data.ddl.getDay();
                    let currTime = task.data.ddl.getHours();

                    let currDayTime = "" + currDay  + currTime;

                    // grab corresponding html cell
                    let currCell = document.getElementById(currDayTime);

                    // set innerHTML to reflect correct task data
                    currCell.innerHTML = task.data.task_name;
                    currCell.style.backgroundColor="pink";

                    // set calendar to reflect task duration
                    let curDuration = task.data.duration;
                    if (curDuration > 1) {
                        for (let i = 0; i < curDuration - 1; i++) {
                            currTime++;
                            currDayTime++;
                            if (currTime == 24) {
                                currTime = 0;
                                currDay++;
                                currDayTime = "" + currDay + currTime;
                            }
                            currCell = document.getElementById(currDayTime);
                            currCell.innerHTML = task.data.task_name;
                            currCell.style.backgroundColor="pink";
                        }
                    }  
                }
            }
            startTasks.setDate(startTasks.getDate() + 1);
        }

        return tasks;
    }

    return tasks;

}