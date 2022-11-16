window.addEventListener('load',(event)=>{
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const nameInput = document.querySelector('#user-name');
    const taskInput = document.querySelector('#new-task');
    const username = localStorage.getItem('user-name') || '';
    const collapse = document.querySelector('.advance');
    collapse.addEventListener('click',function(){
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
    });
  
    nameInput.value = username;
  
    nameInput.addEventListener('change',(event)=>{
        localStorage.setItem('user-name', event.target.value);
    });
  })  
  
  // main.js
  
  // Run the init() function when the page has loaded
  window.addEventListener('DOMContentLoaded', init);
  
  // Starts the program, all function calls trace back here
  function init() {
  // Get the recipes from localStorage
  let tasks = getTasksFromStorage();
  // Add each recipe to the <main> element
  addTasksToDocument(tasks);
  // Add the event listeners to the form elements
  initFormHandler();
  }
  
  /**
  * Reads 'recipes' from localStorage and returns an array of
  * all of the recipes found (parsed, not in string form). If
  * nothing is found in localStorage for 'recipes', an empty array
  * is returned.
  * @returns {Array<Object>} An array of recipes found in localStorage
  */
  function getTasksFromStorage() {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  
  let r = localStorage.getItem('tasks');
  if (!r){
    return [];
  }
  return JSON.parse(r);
  }
  
  /**
  * Takes in an array of recipes and for each recipe creates a
  * new <recipe-card> element, adds the recipe data to that card
  * using element.data = {...}, and then appends that new recipe
  * to <main>
  * @param {Array<Object>} tasks An array of recipes
  */
  function addTasksToDocument(tasks) {
  // A10. TODO - Get a reference to the <main> element
  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  let list = document.querySelector('#list');
  for(let t = 0; t < tasks.length; t++){
    let task = document.createElement('my-task');
    task.data = tasks[t];
    list.appendChild(task);
  }
  
  }
  
  /**
  * Takes in an array of recipes, converts it to a string, and then
  * saves that string to 'recipes' in localStorage
  * @param {Array<Object>} tasks An array of recipes
  */
  function saveTasksToStorage(tasks) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  let str_tasks = JSON.stringify(tasks);
  localStorage.setItem('tasks',str_tasks);
  }
  
  /**
  * Adds the necesarry event handlers to <form> and the clear storage
  * <button>.
  */
  function initFormHandler() {
  let list = document.querySelector('#list');
  // B2. TODO - Get a reference to the <form> element
  let form = document.querySelector('form');
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  console.log('before submit');
  form.addEventListener('submit',(event)=>{
    // Steps B4-B9 will occur inside the event listener from step B3
    console.log('try');
    event.preventDefault();
    // B4. TODO - Create a new FormData object from the <form> element reference above
    let fd = new FormData(form);
    // B5. TODO - Create an empty object (I'll refer to this object as taskObject to
    //            make this easier to read), and then extract the keys and corresponding
    //            values from the FormData object and insert them into taskObject
    let taskObject = {};
    for(const [key,val] of fd){
      taskObject[key] = val;
    }
    console.log(taskObject);
    // B6. TODO - Create a new <my-task> element
    let new_task = document.createElement('my-task');
    // B7. TODO - Add the taskObject data to <my-task> using element.data
    new_task.data = taskObject;
    // B8. TODO - Append this new <my-task> to <new_task>
    list.appendChild(new_task);
    // B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
    //            then save the recipes array back to localStorage
    let tasks = getTasksFromStorage();
    tasks.push(taskObject);
    saveTasksToStorage(tasks);
  })
  
  // B10. TODO - Get a reference to the "Clear Local Storage" button
  let clear_stg = document.querySelector('.danger');
  // B11. TODO - Add a click event listener to clear local storage button
  clear_stg.addEventListener('click',(event)=>{
    // Steps B12 & B13 will occur inside the event listener from step B11
    // B12. TODO - Clear the local storage
    //event.preventDefault();
    localStorage.clear();
    // B13. TODO - Delete the contents of <main>
    list.innerHTML = '';
  })
  }