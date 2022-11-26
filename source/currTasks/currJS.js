import { Task } from './../skyTasks.js';

window.addEventListener('load',(event)=>{
  console.log("load");        // LOG
  // Get tasks from local storage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  // Query user name
  //const nameInput = document.querySelector('#user-name');
  // Query new task
  const taskInput = document.querySelector('#new-task');
  //const username = localStorage.getItem('user-name') || '';
  const collapse = document.querySelector('.advance');

  // Toggle with displaying form
  const formbtn = document.querySelector('.toggle-form');
  formbtn.addEventListener('click',function(){
    this.classList.toggle("active");
    let newform = document.querySelector('#new-task');
    if (formbtn.innerText === "Add new task"){
      formbtn.innerText = "Schedule Time Slot";
      newform.innerHTML = `<form id="new-task">
      <div id="task-content">
          <h4>Task Name:
              <input type="text" name="task_name" id="content" 
                  placeholder="e.g. Get groceries" required/>
          </h4>
          
          <!-- Category Bubbles -->
          <table>
              <tr>
                  <td><h4>Category:</h4></td>
                  <td><div class="help-tip">
                      <p>Organize your tasks by selecting the best category.</p>
                  </div></td>
              </tr>
          </table>
          <div class="options">
              <label>
                  <input type="radio" name="category" id="category1" value="school" /> 
                  <span class="bubble school"></span>
                  <div>School</div>
              </label>
              <label>
                  <input type="radio" name="category" id="category2" value="personal" />
                  <span class="bubble personal"></span>
                  <div>Personal</div>
              </label>

              <label>
                  <input type="radio" name="category" id="category3" value="other" />
                  <span class="bubble other"></span>
                  <div>Other</div>
              </label>
              
          </div>

          <table>
              <tr>
                  <td>
                      <h4>Duration: 
                          
                      </h4>
                  </td>
                  <td>
                      <div class="help-tip">
                          <p>Estimate how long the task will take you to complete.</p>
                      </div>
                  </td>
                  <td>
                      <h4><input type="number" name="duration" id="duration" min="0" max="20" step = "1" 
                          placeholder = "e.g. 1" required> hours</h4>
                  </td>
              </tr>
          </table>                    

          <h4>Description:</h4>
          <textarea type="text" name = "description" id="taskdescription" rows="5" cols="40" placeholder="e.g. bananas, onions, garlic, cheese"></textarea>
          <br>

          <h4>Schedule Slot in Calendar:</h4>
          <input type="datetime-local" name="datetime" id="datetime">
          <br>

          </div>
      </div>

      <input type="submit" class="submit" value="ADD TASK">
  </form>`;
    }
    else{
      formbtn.innerText = "Add new task";
      newform.innerHTML = `<form id="new-task">
      <div id="task-content">
          <!-- Title Input -->
          <h4>Task Name:
              <input type="text" name="task_name" id="content" 
                  placeholder="e.g. Get groceries" required/>
          </h4>
          
          <!-- Category Input -->
          <table>
              <tr>
                  <td><h4>Category:</h4></td>
                  <td><div class="help-tip">
                      <p>Organize your tasks by selecting the best category.</p>
                  </div></td>
              </tr>
          </table>
          <div class="options">
              <label>
                  <input type="radio" name="category" id="category1" value="school" /> 
                  <span class="bubble school"></span>
                  <div>School</div>
              </label>
              <label>
                  <input type="radio" name="category" id="category2" value="personal" />
                  <span class="bubble personal"></span>
                  <div>Personal</div>
              </label>

              <label>
                  <input type="radio" name="category" id="category3" value="other" />
                  <span class="bubble other"></span>
                  <div>Other</div>
              </label>
              
          </div>

          <!-- Duration Input -->
          <table>
              <tr>
                  <td>
                      <h4>Duration: 
                          
                      </h4>
                  </td>
                  <td>
                      <div class="help-tip">
                          <p>Estimate how long the task will take you to complete.</p>
                      </div>
                  </td>
                  <td>
                      <h4><input type="number" name="duration" id="duration" min="0" max="20" step = "1" 
                          placeholder = "e.g. 1" required> hours</h4>
                  </td>
              </tr>
          </table>                            

          <!-- Description Input -->
          <h4>Description:</h4>
          <textarea type="text" name = "description" id="taskdescription" rows="5" cols="40" placeholder="e.g. bananas, onions, garlic, cheese"></textarea>
          <br>

          <!-- Priority Input -->
          <table>
              <tr>
                  <td>
                      <h4>Priority:</h4>
                  </td>
                  <td>
                      <div class="help-tip">
                          <p>Rank the priority of this your with 1 being LOW and 5 being HIGH.</p>
                      </div>
                  </td>
                  <td>
                      <input type="range" name="priority" id="taskPriority" min="1" max="5" value="3" oninput="priorityValue.innerText = this.value"> <p id="priorityValue">3</p>
                  </td>
              </tr>
          </table>

          <!-- Difficulty Input -->
          <table>
              <tr>
                  <td>
                      <h4>Difficulty: </h4>
                  </td>
                  <td>
                      <div class="help-tip">
                          <p>Select the difficulty of this task with 1 being LOW and 5 being HIGH.</p>
                      </div>
                  </td>
                  <td>
                      <input type="range" name="difficulty" id="difficulty" min="1" max="5" value="3" oninput="diffValue.innerText = this.value"> <p id="diffValue">3</p>
                  </td>
                  
              </tr>
          </table>

          <!-- Preferred Work Length Input -->
          <table>
              <tr>
                  <td>
                      <h4>Preferred Work Length: 
                      </h4>
                  </td>
                  <td>
                      <div class="help-tip">
                          <p>Input how long you would like to work on this task in one sitting.</p>
                      </div>
                  </td>
                  <td>
                      <input type="number" name="mintime" id="min-work-time" min="0" max="10" step = "1" placeholder = "1">
                  </td>
              </tr>
          </table>    

          <!-- Deadline Input -->
          <h4>Deadline: <input type="date" name="ddl" id="taskddl" required></h4>
      </div>

      <input type="submit" class="submit" value="ADD TASK">
  </form>`;
      
    }
  });
  // Collapsible
  collapse.addEventListener('click',function(){
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
  });

  // Track name changes
  nameInput.value = username;
  nameInput.addEventListener('change',(event)=>{
      console.log("change");        // LOG
      localStorage.setItem('user-name', event.target.value);
  });
})  

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
// Get the tasks from localStorage
let tasks = getTasksFromStorage();
// Add each task to the <main> element
addTasksToDocument(tasks);
// Add the event listeners to the form elements
initFormHandler();
}

/**
* Reads 'tasks' from localStorage and returns an array of
* all of the tasks found (parsed, not in string form). If
* nothing is found in localStorage for 'tasks', an empty array
* is returned.
* @returns {Array<Object>} An array of tasks found in localStorage
*/
function getTasksFromStorage() {
  console.log("getTasksFromStorage");        // LOG
  let r = localStorage.getItem('tasks');
  if (!r)
    return [];
  return JSON.parse(r);
}

/**
* Takes in an array of tasks and for each task creates a
* new <my-task> element, adds the task data to that card
* using element.data = {...}, and then appends that new task
* to <main>
* @param {Array<Object>} tasks An array of recipes
*/
function addTasksToDocument(tasks) {
  console.log("addTasksToDocument");        // LOG
  // Loop through each of the tasks in the passed in array,
  // create a <my-task> element for each one, and populate
  // each <my-task> with that task data using element.data = ...
  // Append each element to <main>
  let list = document.querySelector('#list');
  for(let t = 0; t < tasks.length; t++){
    let task = document.createElement('my-task');
    task.data = tasks[t];
    list.appendChild(task);
  }
}

/**
* Takes in an array of tasks, converts it to a string, and then
* saves that string to 'tasks' in localStorage
* @param {Array<Object>} tasks An array of tasks
*/
function saveTasksToStorage(tasks) {
  console.log("saveTasksToStorage");        // LOG
  let str_tasks = JSON.stringify(tasks);
  localStorage.setItem('tasks',str_tasks);
}

function assignDateAndTime(){
  // Check if anything in storage
    // if nothing in storage (first task inputted)
    // set date to "tomorrow" and time to midnight
    const today = new Date()
    let assignedDate =  new Date()
    assignedDate.setDate(today.getDate() + 1)

    // else if something in storage (at least one task already exists)
    // if possible to fit new task duration directly after previous task
    // then do so
    // else set assignedDate to the next day and time to midnight
}

// new Task('task name', 999, 2000, new Date(),['eating','studying','working']).addToLocalStorage();

// let mytask = new Task('task name', 1000, 2000, new Date());
// mytask.addToLocalStorage();


function generateUID(){
  const task_uid = taskName +"_"+assignedDate+"_"+assignedTime;
}

/**
* Adds the necesarry event handlers to <form> and the clear storage
* <button>.
*/
function initFormHandler() {
let list = document.querySelector('#list');
// get reference

// Get a reference to the <form> element
let form = document.querySelector('form');
// Add an event listener for the 'submit' event, which fires when the
// submit button is clicked
form.addEventListener('submit',(event)=>{
  event.preventDefault();
  // Create a new FormData object from the <form> element reference above
  let fd = new FormData(form);
  // Create an empty taskObject, and extract the keys and corresponding
  // values from the FormData object and insert them into taskObject
  let taskObject = {};
  let new_task_obj = new Task();
  for(const [key,val] of fd){
    // if(!val){
    //   continue;
    // }
    taskObject[key] = val;
    new_task_obj.data[key] = val;
  }

  // Create a new <my-task> element
  let new_task = document.createElement('my-task');
  // Add the taskObject data to <my-task> using element.data
  new_task.data = taskObject;
  // Append this new <my-task> to <new_task>
  list.appendChild(new_task);
  // Get the recipes array from localStorage, add this new recipe to it, and
  // then save the recipes array back to localStorage
  let tasks = getTasksFromStorage();
  tasks.push(taskObject);
  saveTasksToStorage(tasks);

  //create task object
  
  let uid = Task.getUniqueUID();
  new_task_obj.data['uid'] = uid;
  new_task_obj.data['task_uid'] = uid;
  new_task_obj.data['category'] = [taskObject['category']];
  console.log(new_task_obj);
  new_task_obj.addToLocalStorage();
})

// Get a reference to the "Clear Local Storage" button
let clear_stg = document.querySelector('.danger');
// Add a click event listener to clear local storage button
clear_stg.addEventListener('click',(event)=>{
  // Clear the local storage
  localStorage.clear();
  // Delete the contents of <main>
  list.innerHTML = '';
})
}