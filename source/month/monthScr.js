import { Task } from './../skyTasks.js';



let mytask = new Task('task name', 1000, 2000, new Date());
mytask.data.decription = 'asdasdad';
mytask.addToLocalStorage();

mytask.addToLocalStorage();
new Task('task name', 999, 2000, new Date(),['eating','studying','working']).addToLocalStorage();
new Task('task name', 123999, 2000, new Date(),['important']).addToLocalStorage();
new Task('task name', 22, 2000, new Date('11/17/2022')).addToLocalStorage();
new Task('different task name', 1111, 3000, new Date('11/16/2022')).addToLocalStorage();
new Task('task name', 123, 3000, new Date('11/16/2022')).addToLocalStorage();
new Task('task name', 11, 2000, new Date()).addToLocalStorage();
new Task('task name', 1, 2000, new Date()).addToLocalStorage();

//console.log(Task.getAllUIDs());
//console.log(Task.getAllTaskUIDs());






let currentMonth = 0;

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
        location.href="../week/week.html";
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
          task_num+=1;
          if (task_num>3) {break;};
          let curr_event = document.createElement('div');
          curr_event.classList.add('event');
          curr_event.innerText = task.data.task_name;
          if (task.data.category.includes("important")) {curr_event.style.background = "#dd7825";};
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
