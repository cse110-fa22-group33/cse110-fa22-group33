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

let sleeping = new Task('sleeping', 100, 200, new Date());
sleeping.data.ddl = new Date(2022,10,20,12); // October 20th, noon
sleeping.data.duration = 2;
sleeping.setToPadding();

let sleeping2 = new Task('sleeping2', 1001, 2001, new Date());
sleeping2.data.ddl = new Date(2022,10,20,17); // October 20th, noon
sleeping2.data.duration = 2;
sleeping2.setToPadding();

const first = new Task('lab8', 100, 200, new Date());
first.data.ddl = new Date(2022,10,22,14);  // October 22nd, 2pm
first.data.duration = 2;

let occupied = [[sleeping.data.ddl, 2], [sleeping2.data.ddl, 2]];
let storage = Task.firstAvailable(occupied, first);
console.log("first Available: " + storage);

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

let firsta = Task.firstAvailible(occ,new_task);
console.log(firsta);

let date_3 = new Date(2022,11,19,20);
let date_4 = new Date(2022,11,19,23);
let overlap = Task.dateRangeOverlaps(padding_data,padding_data2,date_3,date_4);
console.log(overlap);*/