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
   * Creates Monthly Calendar to be used across CMonthly Schedule 
   */
function render(){

  const dt = new Date();

  if (currentMonth !== 0) {
    let New_month = new Date().getMonth() + currentMonth;
    dt.setMonth(New_month);
  }
  let today = dt.getDate();
  let month = dt.getMonth();
  let year = dt.getFullYear();

  let firstDay = new Date(year, month, 1);
  let daysonemonth = new Date(year, month + 1, 0).getDate();
  
  let FirstdayString = firstDay.toLocaleDateString('en-us',{
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  let Month_string =dt.toLocaleDateString('en-us', {month: 'long'});
  let paddings;
  switch(FirstdayString.split(',')[0]){
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

  let month_title = document.getElementById('monthTitle');
  month_title.textContent = `${Month_string} ${year}`

  for(let i = 1; i <= paddings + daysonemonth; i++) {
    let oneday = document.createElement('div');
    oneday.classList.add('day');

    if (i > paddings) {
      oneday.onclick=function(){
        let setToday = new Date(year, month, i-paddings);
        localStorage.setItem('newToday', setToday);
        location.href="../week/weekly.html";
      }
      if (i - paddings === today && currentMonth === 0) {
        oneday.id = 'today';
      }
      oneday.innerText = i - paddings;
      
      let curr_day = new Date(year, month, i-paddings);
      let task_list = Task.getTasksFromDate(curr_day);
      if (task_list.length!=0) {
        let task_num=0;
        for (let task of task_list){
          if (task.data.padding) {continue};
          task_num+=1;
          if (task_num>3) {
            let curr_event = document.createElement('div');
            curr_event.classList.add('event');
            curr_event.innerText = '...';
            oneday.appendChild(curr_event);
            break;
          };
          let curr_event = document.createElement('div');
          curr_event.classList.add('event');
          curr_event.innerText = task.data.task_name;
          if (task.data.category.includes("school")) {curr_event.style.background = 'rgba(53, 130, 25, 0.75)';};
          if (task.data.category.includes("personal")) {curr_event.style.background = 'rgba(20, 111, 157, 0.931)';};
          if (task.data.category.includes("other")) {curr_event.style.background = 'rgba(146, 19, 137, 0.931)';};
          oneday.appendChild(curr_event);
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