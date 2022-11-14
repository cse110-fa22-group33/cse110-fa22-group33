/**
 * inside local storage:
 *      a tasks object {key=uid, value=Task object}
 *      a current_task object that holds integer: uid
 *      a current_week object that holds array of uid in current week
 */
function Task(name='New Task', uid=null, task_uid=null, category=[], duration=1, softddl=null,
              ddl=null, decription=null, mintime=1, maxtime=3, notes=null,
              recurrent=false, padding=false, difficulty=3, start_date=null) {
  this.name = name; //a string, the name of the task, not required
  this.uid = uid; // an integer, the unique identifier of the splitted task, required (expect when task is padding)
  this.task_uid = task_uid; // an integer, the unique identifier of the same task, all splitted task have the same task_uid, required (expect when task is padding)
  this.category = category; // an array of string, include all categories, not required
  this.decription=decription; // a string, destription of the task, not required
  this.duration = duration; // a integer, the estimated duration of task (in hour), not required
  this.softddl = softddl; // a date object, soft deadline, not required
  this.ddl = ddl; // a date object, hard deadline, requried (expect padding)
  this.mintime = mintime; // a integer, in hour, not required
  this.maxtime = maxtime; // a integer, in hour, not required
  this.notes = notes; // a string, not required
  this.recurrent=recurrent; // a boolean, true means recurrent tasks, not required
  this.padding=padding; // a boolean, indicate if the task is a padding (user-defined busy period), not required
  if (padding) {this.recurrent=true};
  this.difficulty=difficulty; // a integer from 1-5, 1 is lowest difficulty and 5 is hardest, not required
  this.start_date=start_date; // a date object, not required
}