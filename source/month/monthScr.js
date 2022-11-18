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
  Month_string =dt.toLocaleDateString('en-us', {month: 'long'});
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
    }
     else {
      oneday.classList.add('padding');
    }
    console.log(oneday);
    calendar.appendChild(oneday);
  }

}
