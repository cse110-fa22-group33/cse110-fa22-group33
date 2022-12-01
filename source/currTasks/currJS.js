import { Task } from './../skyTasks.js';

window.addEventListener('load', (event) => {
    console.log("load");        // LOG

 // /*
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
        localStorage.setItem('morning', JSON.stringify(morning));
        ans = prompt("When do you go to lunch (input a number out of 24 hour): ", "12");
        if (isInt(ans)) {
            noon = parseInt(ans);
        } else {
            alert("Invalid input, using default of noon");
            noon = 12;
        }
        localStorage.setItem('noon', JSON.stringify(noon));

        ans = prompt("When do you go to bed (input a number out of 24 hour): ", "22");
        if (isInt(ans)) {
            evening = parseInt(ans);
        } else {
            alert("Invalid input, using default of 10pm");
            evening = 22;
        }
        localStorage.setItem('evening', JSON.stringify(evening));

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
        let recursiveDuration = 24-evening;
        resursivePadding.data.duration = recursiveDuration;
        resursivePadding.setToRecursivePadding();
        resursivePadding.addToLocalStorage();

        Task.schedule();
    }
// */

    
    // Toggle with displaying form
    const formbtn = document.querySelector('.toggle-form');
    formbtn.addEventListener('click', function () {
        this.classList.toggle("active");
        let newform = document.querySelector('#new-task');
        if (formbtn.innerText === "Add new task") {
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
        else {
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
})

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {

    let tasks = Task.getAllTasksFlat();
    addTasksToDocument(tasks);
    initFormHandler();
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

    /* shadow element implementation
    let list = document.querySelector('#list');
    for (let t = 0; t < tasks.length; t++) {
        let task = document.createElement('my-task');
        task.data = tasks[t];
        list.appendChild(task);
    }
    */

    // task object implementation
    let list = document.querySelector('#list');
    for (let t = 0; t < tasks.length; t++){
        let task = document.createElement('article');
        let task_data = tasks[t].data;
        task.innerHTML = `
         <details>
         <summary>
             <taskName>${task_data.task_name}</taskName> (${task_data.ddl})
         </summary>
         <p>Category: ${task_data.category}</p>
         <p>Duration: ${task_data.duration} hours</p>
         <p>Description: ${task_data.description}</p>
         <p>Priority: ${task_data.priority}</p>
         <p>Difficulty: ${task_data.difficulty}/5</p>
         <p>DDL Time: ${task_data.taskddltime}</p>
         <p>Preferred Work Length: ${task_data.mintime}</p>
         </details>

         <div class="container">
    <a class="btn" href="#open-modal${t}">${task_data.task_name}</a>
    </div>
    
    <div id="open-modal${t}" class="modal-window">
       <div>
           <a href="#" title="Close" class="modal-close">Close</a>
           <h1>${task_data.task_name}</h1>
           <p>Category: ${task_data.category}</p>
           <p>Duration: ${task_data.duration} hours</p>
           <p>Description: ${task_data.description}</p>
           <p>Priority: ${task_data.priority}</p>
           <p>Difficulty: ${task_data.difficulty}/5</p>
           <p>DDL Time: ${task_data.taskddltime}</p>
           <p>Preferred Work Length: ${task_data.mintime}</p>
           <div>Details of task 1 </div>
           <br>
       </div>
    </div>
         `;
        list.appendChild(task);
    }
}

// /**
// * Takes in an array of tasks, converts it to a string, and then
// * saves that string to 'tasks' in localStorage
// * @param {Array<Object>} tasks An array of tasks
// */
// function saveTasksToStorage(tasks) {
//     /*
//     console.log("saveTasksToStorage");        // LOG
//     let str_tasks = JSON.stringify(tasks);
//     localStorage.setItem('tasks', str_tasks);
//     */

//     // task object implementation
//     for(let t = 0; t < tasks.length; t++){
//         tasks[t].addToLocalStorage();
//     }
// }

// function assignDateAndTime() {
//     // Check if anything in storage
//     // if nothing in storage (first task inputted)
//     // set date to "tomorrow" and time to midnight
//     const today = new Date()
//     let assignedDate = new Date()
//     assignedDate.setDate(today.getDate() + 1)

//     // else if something in storage (at least one task already exists)
//     // if possible to fit new task duration directly after previous task
//     // then do so
//     // else set assignedDate to the next day and time to midnight
// }



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
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        // Create a new FormData object from the <form> element reference above
        let fd = new FormData(form);
        // Create an empty taskObject, and extract the keys and corresponding
        // values from the FormData object and insert them into taskObject
        let taskObject = {};
        let new_task_obj = new Task();
        for (const [key, val] of fd) {
            // if(!val){
            //   continue;
            // }
            taskObject[key] = val;
            if (key=='ddl') {
                let ddl = new Date(val);
                ddl.setHours(ddl.getHours()+8);
                new_task_obj.data[key] = ddl;
            } else {
                new_task_obj.data[key] = val;
            }
        }

        //create task object
        let uid = Task.getUniqueUID();
        new_task_obj.data['uid'] = uid;
        new_task_obj.data['task_uid'] = uid;
        new_task_obj.data['category'] = [taskObject['category']];
        new_task_obj.addToLocalStorage();
        Task.schedule();
    })

    // Get a reference to the "Clear Local Storage" button
    let clear_stg = document.querySelector('.danger');
    // Add a click event listener to clear local storage button
    clear_stg.addEventListener('click', (event) => {
        // Clear the local storage
        localStorage.clear();
        // Delete the contents of <main>
        list.innerHTML = '';
    })
}



/* Adjusting Task Display Method -> NO SHADOW ELEMENT
function DisplayTodos () {
	const todoList = document.querySelector('#list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
	})
}*/

/*
Testing New Modal Stuff

var button 			= $('.button');
var content 		= $('.button__content');
var win 				= $(window);

var expand = function() {
  if (button.hasClass('button--active')) {
    return false;
  } else {
    var W 					= win.width();
    var xc 					= W / 2;

    var that 				= $(this);
    var thatWidth 	= that.innerWidth() / 2;
    var thatOffset 	= that.offset();
    var thatIndex		= that.index();
    var other;

    if (!that.next().is('.button')) {
      other = that.prev();
    } else {
      other = that.next();
    }

    var otherWidth		= other.innerWidth() / 2;
    var otherOffset		= other.offset();

    // content box stuff
    var thatContent = $('.button__content').eq(thatIndex);
    var thatContentW = thatContent.innerWidth();
    var thatContentH = thatContent.innerHeight();

    // transform values for button
    var thatTransX 	= xc - thatOffset.left - thatWidth;
    var otherTransX	= xc - otherOffset.left - otherWidth;
    var thatScaleX	= thatContentW / that.innerWidth();
    var thatScaleY	= thatContentH / that.innerHeight();

    that.css({
      'z-index': '2',
      'transform': 'translateX(' + thatTransX + 'px)'
    });

    other.css({
      'z-index': '0',
      'opacity': '0',
      'transition-delay': '0.05s',
      'transform': 'translateX(' + otherTransX + 'px)'
    });

    that.on('transitionend webkitTransitionEnd', function() {
      that.css({
        'transform': 'translateX(' + thatTransX + 'px) scale(' + thatScaleX +',' + thatScaleY + ')',
      });

      that.addClass('button--active');
      thatContent.addClass('button__content--active');
      thatContent.css('transition', 'all 1s 0.1s cubic-bezier(0.23, 1, 0.32, 1)');
      that.off('transitionend webkitTransitionEnd');
    });

    return false;
  }
};

var hide = function(e) {
  var target= $(e.target);
  if (target.is(content)) {
    return;
  } else {
    button.removeAttr('style').removeClass('button--active');
    content.removeClass('button__content--active').css('transition', 'all 0.2s 0 cubic-bezier(0.23, 1, 0.32, 1)');
  }
};

var bindActions = function() {
  button.on('click', expand);
  win.on('click', hide);
};

var init = function() {
  bindActions();
};

init();
*/