import { Task } from './../skyTasks.js';

let sleeping = new Task('sleeping', 100, 200, new Date());
sleeping.data.ddl = new Date(2022,11,17,11);
sleeping.data.duration = 8;
sleeping.setToPadding();
sleeping.addToLocalStorage();


let new_task = new Task('cse110 lab 8', 1000, 2000, new Date());
new_task.data.ddl=new Date(2022,11,22,11);
new_task.data.priority = 1;
new_task.addToLocalStorage();

console.log(new_task.data.start_date);
Task.schedule();
console.log(new_task.data.start_date);