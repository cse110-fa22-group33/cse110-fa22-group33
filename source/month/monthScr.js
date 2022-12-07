  /**
   * Monthly Calendar javascript file 
   * 
   * Control the display of MOnths and Days in the Month as well as the display of tasks
   */

import { Task } from './../skyTasks.js';

let currentMonth = 0;


/**
 * Change the current month Method
 * 
 * Go to the next month or back to the last month
 */
window.addEventListener('DOMContentLoaded', () => {
  render();
  document.getElementById('back').addEventListener('click', () => {
    console.log('pressed');
    currentMonth--;
    render();
  });

  document.getElementById('next').addEventListener('click', () => {
    currentMonth++;
    render();
  });
});

/**
  * Task Constructor Method
  * 
  * Creates Monthly Calendar to be used across Monthly Schedule 
  */
function render() {
  
  const dt = new Date();
  
  //get the New month 
  if (currentMonth !== 0) {
    let New_month = new Date().getMonth() + currentMonth;
    dt.setMonth(New_month);
  }
  let today = dt.getDate();
  let month = dt.getMonth();
  let year = dt.getFullYear();

  let firstDay = new Date(year, month, 1);//Set the first day of the current month 
  let daysonemonth = new Date(year, month + 1, 0).getDate();//number of days 

  let FirstdayString = firstDay.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  let Month_string = dt.toLocaleDateString('en-us', { month: 'long' });
  let paddings;
  //set paddings for the first week
  switch (FirstdayString.split(',')[0]) {
    case 'Sunday':
      paddings = 0;
      break;
    case 'Monday':
      paddings = 1;
      break;
    case 'Tuesday':
      paddings = 2;
      break;
    case 'Wednesday':
      paddings = 3;
      break;
    case 'Thursday':
      paddings = 4;
      break;
    case 'Friday':
      paddings = 5;
      break;
    case 'Saturday':
      paddings = 6;
  }

  let calendar = document.getElementById('calendar');
  calendar.innerHTML = '';

  //set the Month Title 
  let month_title = document.getElementById('monthTitle');
  month_title.textContent = `${Month_string} ${year}`

  //Add each day div to the Monthly Calendar
  for (let i = 1; i <= paddings + daysonemonth; i++) {
    let oneday = document.createElement('div');
    oneday.classList.add('day');
    let valueweseed = [];

    if (i > paddings) {
      //the navigation from Monthly Calendar to Weekly Calendar
      oneday.onclick = function () {
        let setToday = new Date(year, month, i - paddings);
        localStorage.setItem('newToday', setToday);
        location.href = "../week/weekly.html";
      }
      //Track today 
      if (i - paddings === today && currentMonth === 0) {
        oneday.id = 'today';
      }
      oneday.innerText = i - paddings;

      let curr_day = new Date(year, month, i - paddings);
      let task_list = Task.getTasksFromDate(curr_day);

      let truncate = function (str, n = 14) {
        return (str.length > n) ? str.slice(0, n - 1) + ' ...' : str;
      };

      if (task_list.length != 0) {
        let task_num = 0;
        for (let task of task_list) {
          if (task.data.padding && task.data.recurrent) { continue };
          task_num += 1;
          

          // check if the number of tasks on that day is larger than 3, add a '...' showing user more tasks are comming
          if (task_num > 2 && task_list.length > 3) {
            let curr_event = document.createElement('div');
            curr_event.classList.add('event');
            curr_event.style.background = 'rgba(154, 196, 205, 1)';
            curr_event.innerText = 'More Tasks ......';
            oneday.appendChild(curr_event);
            break;
          };

          if (task_num > 3) { break };

          // for each task create a new event element
          // If the task is not displayed in Calendar, then disply it on the calendar 
          if(valueweseed.indexOf(truncate(task.data.task_name)) == -1){
            valueweseed.push(truncate(task.data.task_name));
            let curr_event = document.createElement('div');
            curr_event.classList.add('event');
            curr_event.innerText = truncate(task.data.task_name);
            //display the task with different color on Monthly Calendar 
            if (task.data.category.includes("school")) { curr_event.style.background = 'rgba(53, 130, 25, 0.75)'; };
            if (task.data.category.includes("personal")) { curr_event.style.background = 'rgba(20, 111, 157, 0.931)'; };
            if (task.data.category.includes("other")) { curr_event.style.background = 'rgba(146, 19, 137, 0.931)'; };
            oneday.appendChild(curr_event);
          }

          // check the category of the task and color the block accordingly
 
        }
      }
    }
    else {
      oneday.classList.add('padding');
    }
    calendar.appendChild(oneday);
  }

}

export const testExport = {
  render
};
