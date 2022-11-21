import { Task } from './../skyTasks.js';

let isOccupied = function(opid,time,duration) {
    for (let time_block of opid) {
      if (Task.dateRangeOverlaps(time_block[0],
        new Date(time_block[0]).setHours(time_block[0].getHours()+time_block[1]),
        time,
        new Date(time).setHours(time.getHours()+duration)
        )){
        return true;
      }
    }
    return false;
}

let sleeping = new Task('sleeping', Task.getUniqueUID(), 1, new Date());
sleeping.data.ddl = new Date('November 20, 2022 21:00:00'); // November 20th, 9pm-11pm
sleeping.data.duration = 2;
sleeping.setToPadding();
sleeping.addToLocalStorage();

const first = new Task('first', Task.getUniqueUID(), 2, new Date());
first.data.ddl = new Date('November 21, 2022 23:59:00');  // Deadline: November 21nd, 2pm 
first.data.duration = 1;
first.data.priority = 5;
first.addToLocalStorage();

let sleeping2 = new Task('sleeping2', Task.getUniqueUID(), 3, new Date());
sleeping2.data.ddl = new Date('November 21, 2022 00:00:00'); // November 21th, 12am-1am
sleeping2.data.duration = 1;
sleeping2.setToPadding();
sleeping2.addToLocalStorage();

const second = new Task('second', Task.getUniqueUID(), 4, new Date());
second.data.ddl = new Date('November 21, 2022 23:59:00');  // Deadline: November 21nd, 2pm 
second.data.duration = 1;
second.data.priority = 4;
second.addToLocalStorage();

const third = new Task('third', Task.getUniqueUID(), 5, new Date());
third.data.ddl = new Date('November 21, 2022 23:59:00');  // Deadline: November 21nd, 2pm 
third.data.duration = 1;
third.data.priority = 3;
third.addToLocalStorage();

Task.schedule();

//Output should be
// Sleeping 11/20 9-11pm
// first 11/20 11pm-11/21 12am
// sleeping2 11/21 12am-1am
// second 11/21 1am-2am
// third 11/21 2am-3am        --> For some reason is setting start time to 1am again



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