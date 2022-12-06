/* 
*  currJS
*  Description: This file contains all of the JavaScript code needed to develop
*  the "Add Task" functionality as well as displaying the list of tasks. Inputs are
*  taken from the user and stored locally so that other components can access. 
*  This file includes all event listeners checking for the user's actions on the page
*  and correspondingly directing them to the correct next page or adapting the
*  Task objects based on adjustments made by the user.
*/

// Import skyTasks -> Needed to create Tasks objects used by our application
import { Task } from './../skyTasks.js';

/**
 * updateSchedule Helper Method
 * 
 * Updates the shcedule perferences calling the 'schedule' method
 * @param morning - Integer 0-23 representing wake up time
 * @param noon - Integer 0-23 representing lunch time
 * @param evening - Integer 0-23 representing sleep time
 */
let updateSchedule = function (morning = 9, noon = 12, evening = 22) {
    // Set local storage values
    localStorage.setItem('morning', JSON.stringify(morning));
    localStorage.setItem('noon', JSON.stringify(noon));
    localStorage.setItem('evening', JSON.stringify(evening));

    // Delete old paddings, if there are any
    let r_padding = Task.getAllRecuringPaddings();
    for (let each_padding of r_padding) {
        Task.removeFromLocalStorage(each_padding.data.uid);
    }
    
    // Input new padding task object for wake up time
    let resursivePadding = new Task('morning', Task.getUniqueUID(), Task.getUniqueTaskUID());
    let recursiveDate = new Date('December 17, 1995 00:00:00');
    resursivePadding.data.ddl = recursiveDate;
    resursivePadding.data.duration = morning;       // 12am - morning
    resursivePadding.setToRecursivePadding();       // Set as recursive padding
    resursivePadding.addToLocalStorage();

    // Input new padding task object for lunch time
    resursivePadding = new Task('noon', Task.getUniqueUID(), Task.getUniqueTaskUID());
    recursiveDate = new Date('December 17, 1995 00:00:00');
    recursiveDate.setHours(noon);
    resursivePadding.data.ddl = recursiveDate;
    resursivePadding.data.duration = 1;             // 1 hour long duration
    resursivePadding.setToRecursivePadding();       // Set as recursive padding
    resursivePadding.addToLocalStorage();

    // Input new padding task object for sleeping time
    resursivePadding = new Task('evening', Task.getUniqueUID(), Task.getUniqueTaskUID());
    recursiveDate = new Date('December 17, 1995 00:00:00');
    recursiveDate.setHours(evening);
    resursivePadding.data.ddl = recursiveDate;
    let recursiveDuration = 24 - evening;
    resursivePadding.data.duration = recursiveDuration;     // evening - midnight
    resursivePadding.setToRecursivePadding();               // Set as recursive padding
    resursivePadding.addToLocalStorage();

    // Run the scheduling algorithm
    Task.schedule();
}

/**
 * Load Event Listener
 * Runs whenever the page loads up
 */
window.addEventListener('load', (event) => {
    console.log("load");        // LOG

    // Get recurrent paddings
    let morning = localStorage.getItem('morning') || 9;
    let noon = localStorage.getItem('noon') || 12;
    let evening = localStorage.getItem('evening') || 22;

    let morning_input = document.querySelector('#morning');
    let noon_input = document.querySelector('#noon');
    let evening_input = document.querySelector('#evening');

    // Update recurrent paddings
    morning_input.value = morning;
    noon_input.value = noon;
    evening_input.value = evening;

});

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
    // getAllLargeTasks so we don't repeat split tasks in display
    let tasks = Task.getAllLargeTasks();
    addTasksToDocument(tasks);
    initFormHandler();
}


/**
* Takes in an array of tasks and for each task creates the display
* modal for each task. When the user clicks on the modal they are able
* to see more detailed information about that task.
* @param {Array<Object>} tasks [[task1,task2,...],[duration1,duation2,...]]
*/
function addTasksToDocument(tasks) {
    console.log("addTasksToDocument");        // LOG
    // task object implementation
    let list = document.querySelector('#list');

    // Storing input into two variables
    let task_lst = tasks[0];
    let duration_lst = tasks[1];

    // Empty case
    if (task_lst === undefined) {
        console.log('No Tasks');
        return;
    }

    // Loop through the task list
    for (let t = 0; t < task_lst.length; t++) {
        let new_task = task_lst[t];
        let new_task_duration = duration_lst[t];            // get duration for corresponding task
        let task = document.createElement('article');
        let task_data = new_task.data;

        // Modal Customization
        let color = 'gray';
        let modalColor ='white;';
        let priorityy = "";
        if (task_data.category == "" || task_data.category == 'other') {
            color = "#94308df8";
            modalColor="#d1c5dd";
        }
        if (task_data.category == 'personal') {
            color = "#1d739efa";
            modalColor="#a0c4d6fa";
        }
        if (task_data.category == 'school') {
            color = "#338017f8";
            modalColor= "#abccab";
        }
        if (task_data.description == null || task_data.description == "") {
            task_data.description = "N/A";
        }

        // Converting priority to words to make easier for user
        if (task_data.priority == 1 || task_data.priority == 2) {
            priorityy = "Low";
        }
        if (task_data.priority == 3) {
            priorityy = "Medium";
        }
        if (task_data.priority == 4 || task_data.priority == 5) {
            priorityy = "High";
        }

        // Two different forms 1 for specific time slot and one for regular task to be scheduled:
        if (task_data.padding == false) {
            // Regular task to be scheduled
            task.innerHTML = `
            <div class="grid-item">
            <div class="containerTasks">
            <a class="btn" style="background-color:${color}" href="#open-task${t}">${task_data.task_name}</a>
            </div>
            </div>
            <div id="open-task${t}" class="modal-wind" onclick="document.getElementById('open-task${t}').style.display='block'">
            <div style="background-color:${modalColor};">
                <a onclick="document.getElementById('open-task${t}').style.display='none'" href="#" title="Close" class="modal-cl">x</a>
                <br>
                <h1 style="background-color:${color};" class="titl" >${task_data.task_name}</h1>
                <p class="descript"><span class="effect">Duration: </span>${new_task_duration} hours</p>
                <p class="descript"><span class="effect">Priority :</span> ${priorityy}</p>
                <p class="descript"><span class="effect">Difficulty:</span> ${task_data.difficulty}/5</p>
                <p class="descript"><span class="effect">Description:</span> ${task_data.description}</p>
                <p class="descript"><span class="effect">Your deadline for this task is:</span>  </p>
                <p class="deadline"> ${task_data.ddl}</p>
                <br>
            </div>
            </div>
            `;
        } else {
            // Scheduling a particular time slot in calendar
            task.innerHTML = `
            <div class="grid-item">
            <div class="containerTasks">
               <a class="btn" style="background-color:${color}" href="#open-task${t}">${task_data.task_name}</a>
           </div>
           </div>
           <div id="open-task${t}" class="modal-wind" onclick="document.getElementById('open-task${t}').style.display='block'">
           <div style="background-color:${modalColor};" >
               <a onclick="document.getElementById('open-task${t}').style.display='none'" href="#" title="Close" class="modal-cl">x</a>
               <br>
               <h1 style="background-color:${color};" class="titl" >${task_data.task_name}</h1>
               <p class="descript"><span class="effect">Duration: </span>${new_task_duration} hours</p>
               <p class="descript"><span class="effect">Description:</span> ${task_data.description}</p>
               <p class="descript"><span class="effect">Your deadline for this task is:</span>  </p>
               <p class="deadline"> ${task_data.ddl}</p>
               <br>
           </div>
           </div>
             `;

        }

        // Add the task to the list
        list.appendChild(task);
    }

    // Handling click on outside modal -> close the popup window
    var modal = document.getElementById('open-modal');
    var modal2 = document.getElementById('open-modal2');
    var modals = [];
    for (let t = 0; t < task_lst.length; t++){
        var name = "open-task";
        name = name + t;
        modals[t] = document.getElementById(name);
    }
    window.onclick = function(event) {
        // OPTIONS modals
        if (event.target == modal2) {
            modal2.style.display = "modal.close";
            location.href ='#'; 
        }
        if (event.target == modal) {
            modal.style.display = "modal.close";
            location.href ='#';
        }

        // Modals for all of the task list 
        for (let i=0; i < modals.length; i++){
            if (event.target == modals[i]) {
                modals[i].style.display = "modal.cl";
                location.href ='#';
            }
        }
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

        // Run scheduling algorithm
        Task.schedule();
        location.href = '#';

        // Refresh page to display task under "Current Tasks"
        window.location.reload();
    });

    // Second form type -> Scheduling particular time slot as padding
    // Format is same as above for form 1
    let form2 = document.querySelector('#new-padding');
    form2.addEventListener('submit', (event) => {
        let fd = new FormData(form2);
        let new_padding_obj = new Task();
        for (const [key, val] of fd) {
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

        // Run scheduling algorithm
        Task.schedule();
        location.href = '#';

        // Refresh page to display task under "Current Tasks"
        window.location.reload();
    });

    // Get a reference to the "Clear Local Storage" button
    let clear_stg = document.querySelector('.danger');
    // Add a click event listener to clear local storage button
    clear_stg.addEventListener('click', (event) => {
        // Clear the local storage
        localStorage.clear();
        // Delete the contents of <main>
        list.innerHTML = '';

        alert("Schedule Preferences Reset to 9am Wake Up, 12pm Lunch, 10pm Sleep");

        // Refresh page to after clearing schedule
        window.location.reload();
    });

    // Get a reference to the "update schedule" button
    let update_schedule = document.querySelector('.update_schedule');
    
    // Add a click event listener to update schedule button
    update_schedule.addEventListener('click', (event) => {
        let morning = 9;
        let noon = 12;
        let evening = 22;
        if (document.querySelector('#morning').value != ""){
            morning = Number.parseInt(document.querySelector('#morning').value);
        }
        if (document.querySelector('#noon').value != ""){
            noon = Number.parseInt(document.querySelector('#noon').value);
        }
        if (document.querySelector('#evening').value != ""){
            evening = Number.parseInt(document.querySelector('#evening').value);
        }
        // Call custom update method
        updateSchedule(morning,noon,evening);
        alert("Schedule Preferences Updated");
    });
}
