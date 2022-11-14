function Task(name='New Task', uid=null, category=[], duration=1, softddl=null,
              ddl=null, decription=null, mintime=1, maxtime=3, notes=null,
              recurrent=false, busy=false, difficulty=3, start_date=null,
              same_task=[]) {
  this.name = name;
  this.uid = uid;
  this.category = category;
  this.duration = duration;
  this.softddl = softddl;
  this.ddl = ddl;
  this.mintime = mintime;
  this.maxtime = maxtime;
  this.notes = notes;
  this.recurrent=recurrent;
  this.busy=busy;
  this.decription=decription;
  this.difficulty=difficulty;
  this.start_date=start_date;
  this.same_task=same_task;
}