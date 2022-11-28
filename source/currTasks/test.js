import { Task } from './../skyTasks.js';

/*
// Shasta's Test Case
Task.removeAllTasks();

let sleeping = new Task('sleeping', Task.getUniqueUID(), 1, new Date());
sleeping.data.ddl = new Date('November 22, 2022 16:00:00'); // November 22th, 4pm-6pm
sleeping.data.duration = 2;
sleeping.setToPadding();
sleeping.addToLocalStorage();

const first = new Task('first', Task.getUniqueUID(), 2, new Date());
first.data.ddl = new Date('November 23, 2022 23:59:00');  // Deadline: November 23nd, 11:59pm 
first.data.duration = 1;
first.data.priority = 5;
first.addToLocalStorage();

let sleeping2 = new Task('sleeping2', Task.getUniqueUID(), 3, new Date());
sleeping2.data.ddl = new Date('November 22, 2022 19:00:00'); // November 22th, 7pm-8pm
sleeping2.data.duration = 1;
sleeping2.setToPadding();
sleeping2.addToLocalStorage();

const second = new Task('second', Task.getUniqueUID(), 4, new Date());
second.data.ddl = new Date('November 23, 2022 23:59:00');  // Deadline: November 23nd, 11:59pm 
second.data.duration = 1;
second.data.priority = 4;
second.addToLocalStorage();

const third = new Task('third', Task.getUniqueUID(), 5, new Date());
third.data.ddl = new Date('November 23, 2022 23:59:00');  // Deadline: November 23nd, 11:59pm 
third.data.duration = 1;
third.data.priority = 3;
third.addToLocalStorage();
/*

Task.schedule();




/*const fourth = new Task('fourth', Task.getUniqueUID(), 6, new Date());
fourth.data.ddl = new Date('November 22, 2022 23:59:00');  // Deadline: November 22nd, 11:59pm 
fourth.data.duration = 1;
fourth.data.priority = 2;
fourth.addToLocalStorage();*/

// Output should be
// sleeping 11/22, 4pm-6pm
// first 11/22 6pm-7pm
// sleeping2 11/22 7pm-8pm
// second 11/22 8pm-9pm
// third 11/22 9pm-10pm      --> gets scheduled with 'second' even though there is conflict


//let occupied = [[sleeping.data.ddl, 2]];
/*
let occupied = [[sleeping.data.ddl, 2], [sleeping2.data.ddl, 1]];
let storage = Task.firstAvailable(occupied, first);
console.log("first Available for first task: " + storage);
let storage2 = Task.firstAvailable(occupied, second);
console.log("first Available for second task: " + storage2);
let storage3 = Task.firstAvailable(occupied, third);
console.log("first Available for third task: " + storage3);*/


/*
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

let firsta = Task.firstAvailable(occ,new_task);
console.log(firsta);

let date_3 = new Date(2022,11,19,20);
let date_4 = new Date(2022,11,19,23);
let overlap = Task.dateRangeOverlaps(padding_data,padding_data2,date_3,date_4);
console.log(overlap);*/



/*
//Dean's test (Weird bug, when set the ddl after current time, the web page will crash)

Task.removeAllTasks();

let recurPadding = new Task('recurPadding', Task.getUniqueUID(), 1, new Date());
recurPadding.data.ddl = new Date('November 29 2022 16:00:00'); // November 27th, 4pm-6pm
recurPadding.data.duration = 2;
recurPadding.setToPadding();
recurPadding.addToLocalStorage();
console.log('hppd');

const first = new Task('first', Task.getUniqueUID(), 2, new Date());
first.data.ddl = new Date('November 29, 2022 23:59:00');  // Deadline: November 23nd, 11:59pm 
first.data.duration = 1;
first.data.priority = 5;
first.addToLocalStorage();

let sleeping2 = new Task('sleeping2', Task.getUniqueUID(), 3, new Date());
sleeping2.data.ddl = new Date('December 22, 2022 19:00:00'); // November 22th, 7pm-8pm
sleeping2.data.duration = 1;
sleeping2.data.recurrent = true;
sleeping2.setToPadding();
sleeping2.addToLocalStorage();

const second = new Task('second', Task.getUniqueUID(), 4, new Date());
second.data.ddl = new Date('November 30, 2022 23:59:00');  // Deadline: November 23nd, 11:59pm 
second.data.duration = 1;
second.data.priority = 4;
second.addToLocalStorage();
*/