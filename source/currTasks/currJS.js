import { Task } from './../skyTasks.js';

window.addEventListener('load', (event) => {
    console.log("load");        // LOG

    // helper function to update the shcedule perferences
    let updateSchedule = function (morning = 9, noon = 12, evening = 22) {

        localStorage.setItem('morning', JSON.stringify(morning));
        localStorage.setItem('noon', JSON.stringify(noon));
        localStorage.setItem('evening', JSON.stringify(evening));

        // delete old padings, if there are any
        let r_padding = Task.getAllRecuringPaddings();
        for (let each_padding of r_padding) {
            Task.removeFromLocalStorage(each_padding.data.uid);
        }

        let resursivePadding = new Task('morning', Task.getUniqueUID(), Task.getUniqueTaskUID());
        let recursiveDate = new Date('December 17, 1995 00:00:00');
        resursivePadding.data.ddl = recursiveDate;
        resursivePadding.data.duration = morning;
        resursivePadding.setToRecursivePadding();
        resursivePadding.addToLocalStorage();

        resursivePadding = new Task('noon', Task.getUniqueUID(), Task.getUniqueTaskUID());
        recursiveDate = new Date('December 17, 1995 00:00:00');
        recursiveDate.setHours(noon);
        resursivePadding.data.ddl = recursiveDate;
        resursivePadding.data.duration = 1;
        resursivePadding.setToRecursivePadding();
        resursivePadding.addToLocalStorage();

        resursivePadding = new Task('evening', Task.getUniqueUID(), Task.getUniqueTaskUID());
        recursiveDate = new Date('December 17, 1995 00:00:00');
        recursiveDate.setHours(evening);
        resursivePadding.data.ddl = recursiveDate;
        let recursiveDuration = 24 - evening;
        resursivePadding.data.duration = recursiveDuration;
        resursivePadding.setToRecursivePadding();
        resursivePadding.addToLocalStorage();

        Task.schedule();
    }

    // ask for recuring padding info from user
    if (localStorage.getItem("morning") === null || localStorage.getItem("noon") === null || localStorage.getItem("evening") === null) {
        let isInt = function (value) {
            return !isNaN(value) &&
                parseInt(Number(value)) == value &&
                !isNaN(parseInt(value, 10));
        }
        let morning;
        let noon;
        let evening;
        let ans = prompt("Welcome to Code Monkeyz Smart Scheduler! Looks like this is your first time visiting the site. When do you wake up (input a number out of 24 hour): ", "9");
        if (isInt(ans)) {
            morning = parseInt(ans);
        } else {
            alert("Invalid input, using default of 9am");
            morning = 9;
        }
        ans = prompt("When do you go to lunch (input a number out of 24 hour): ", "12");
        if (isInt(ans)) {
            noon = parseInt(ans);
        } else {
            alert("Invalid input, using default of noon");
            noon = 12;
        }

        ans = prompt("When do you go to bed (input a number out of 24 hour): ", "22");
        if (isInt(ans)) {
            evening = parseInt(ans);
        } else {
            alert("Invalid input, using default of 10pm");
            evening = 22;
        }

        updateSchedule(morning, noon, evening);

    }
});

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
    let tasks = Task.getAllLargeTasks();
    addTasksToDocument(tasks);
    initFormHandler();
}


/**
* Takes in an array of tasks and for each task creates a
* new <my-task> element, adds the task data to that card
* using element.data = {...}, and then appends that new task
* to <main>
* @param {Array<Object>} tasks [[task1,task2,...],[duration1,duation2,...]]
*/
function addTasksToDocument(tasks) {
    console.log("addTasksToDocument");        // LOG
    // task object implementation
    let list = document.querySelector('#list');
    let task_lst = tasks[0];
    let duration_lst = tasks[1];
    if (task_lst === undefined) {
        console.log('No Tasks');
        return;
    }
    for (let t = 0; t < task_lst.length; t++) {
        let new_task = task_lst[t];
        let new_task_duration = duration_lst[t];
        let task = document.createElement('article');
        let task_data = new_task.data;
        let color = 'gray';
        let priorityy = "";
        if (task_data.category == "" || task_data.category == 'other') {
            color = "#94308df3";
        }
        if (task_data.category == 'personal') {
            color = "#1d739efa";
        }
        if (task_data.category == 'school') {
            color = "#338017e8";
        }
        if (task_data.description == null || task_data.description == "") {
            task_data.description = "N/A";
        }
        if (task_data.priority == 1 || task_data.priority == 2) {
            priorityy = "Low";
        }
        if (task_data.priority == 3) {
            priorityy = "Medium";
        }
        if (task_data.priority == 4 || task_data.priority == 5) {
            priorityy = "High";
        }
        //Two different forms 1 for paddings and one for not padding tasks :
        if (task_data.padding == false) {
            task.innerHTML = `
            <div class="grid-item">
            <div class="containerTasks">
            <a class="btn" style="background-color:${color}" href="#open-task${t}">${task_data.task_name}</a>
            </div>
            </div>
            <div id="open-task${t}" class="modal-wind">
            <div>
                <a href="#" title="Close" class="modal-cl">x</a>
                <br>
                <h1 class="titl" >${task_data.task_name}</h1>
                <p class="det"><span class="effect">Duration: </span>${new_task_duration} hours</p>
                <p class="det"><span class="effect">Priority :</span> ${priorityy}</p>
                <p class="det"><span class="effect">Difficulty:</span> ${task_data.difficulty}/5</p>
                <p class="det"><span class="effect">Description:</span> ${task_data.description}</p>
                <p class="det"><span class="effect">Your deadline for this task is:</span>  </p>
                <p class="deadline"> ${task_data.ddl}</p>
                <br>
            </div>
            </div>
            `;
        } else {
            task.innerHTML = `
            <div class="grid-item">
            <div class="containerTasks">
               <a class="btn" style="background-color:${color}" href="#open-task${t}">${task_data.task_name}</a>
           </div>
           </div>
           <div id="open-task${t}" class="modal-wind">
           <div>
               <a href="#" title="Close" class="modal-cl">x</a>
               <br>
               <h1 class="titl" >${task_data.task_name}</h1>
               <p class="det"><span class="effect">Duration: </span>${new_task_duration} hours</p>
               <p class="det"><span class="effect">Description:</span> ${task_data.description}</p>
               <p class="det"><span class="effect">Your deadline for this task is:</span>  </p>
               <p class="deadline"> ${task_data.ddl}</p>
               <br>
           </div>
           </div>
             `;

        }

        list.appendChild(task);
    }
}

/**
* Adds the necesarry event handlers to <form> and the clear storage
* <button>.
*/
function initFormHandler() {
    let list = document.querySelector('#list');
    // Get a reference to the <form> element
    let form = document.querySelector('#new-task');

    // Add an event listener for the 'submit' event, which fires when the
    // submit button is clicked
    form.addEventListener('submit', (event) => {


        event.preventDefault();
        alert('form1 submitted');
        // Create a new FormData object from the <form> element reference above
        let fd = new FormData(form);
        // Create an empty taskObject, and extract the keys and corresponding
        // values from the FormData object and insert them into taskObject
        let new_task_obj = new Task();
        for (const [key, val] of fd) {
            if (key == 'ddl') {
                let ddl = new Date(val);
                ddl.setHours(ddl.getHours() + 8);
                new_task_obj.data[key] = ddl;
            } else {
                new_task_obj.data[key] = val;
            }
        }

        //create task object
        let uid = Task.getUniqueUID();
        new_task_obj.data['uid'] = uid;
        new_task_obj.data['task_uid'] = uid;
        new_task_obj.addToLocalStorage();
        Task.schedule();
        location.href = '#';
        // refresh page to display task
        window.location.reload();
    });

    let form2 = document.querySelector('#new-padding');
    form2.addEventListener('submit', (event) => {
        alert('form2 submitted');
        let fd = new FormData(form2);
        let new_padding_obj = new Task();
        for (const [key, val] of fd) {
            // if(!val){
            //   continue;
            // }

            if (key == 'ddl') {
                let ddl = new Date(val);
                ddl.setHours(ddl.getHours());
                new_padding_obj.data[key] = ddl;
            } else {
                new_padding_obj.data[key] = val;
            }



        }

        //create task object
        new_padding_obj.data['uid'] = Task.getUniqueUID();
        new_padding_obj.data['task_uid'] = Task.getUniqueTaskUID();
        new_padding_obj.setToPadding();
        new_padding_obj.data.recurrent = false;
        new_padding_obj.addToLocalStorage();

        Task.schedule();
        location.href = '#';
        // refresh page to display task
        window.location.reload();
    })

    // Get a reference to the "Clear Local Storage" button
    let clear_stg = document.querySelector('.danger');
    // Add a click event listener to clear local storage button
    clear_stg.addEventListener('click', (event) => {
        // Clear the local storage
        localStorage.clear();
        // Delete the contents of <main>
        list.innerHTML = '';
    });

    // Get a reference to the "update schedule" button
    let update_schedule = document.querySelector('.update_schedule');
    // Add a click event listener to update schedule button
    update_schedule.addEventListener('click', (event) => {

    });
}
