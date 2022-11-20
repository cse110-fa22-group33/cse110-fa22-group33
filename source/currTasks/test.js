import { Task } from './../skyTasks.js';

let sleeping = new Task('sleeping', 100, 200, new Date());
sleeping.data.ddl = new Date(2022,11,25,11);
sleeping.data.duration = 8;
sleeping.setToPadding();
sleeping.addToLocalStorage();


let new_task = new Task('cse110 lab 8', 1000, 2000, new Date());
new_task.data.ddl=new Date(2022,11,27,11);
new_task.data.priority = 1;
new_task.addToLocalStorage();

// console.log(new_task.data.start_date);
// Task.schedule();
// console.log(new_task.data.start_date);

let padding_data = new Date(2022,11,19,18);
let padding_data2 = new Date(2022,11,19,19);
let occ = [([padding_data,8])];

let firsta = Task.firstAvailible(occ,new_task);
console.log(firsta);

let date_3 = new Date(2022,11,19,20);
let date_4 = new Date(2022,11,19,23);
let overlap = Task.dateRangeOverlaps(padding_data,padding_data2,date_3,date_4);
console.log(overlap);