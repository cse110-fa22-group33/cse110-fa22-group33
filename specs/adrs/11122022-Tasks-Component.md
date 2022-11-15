# Tasks Implementation

## Context and Problem Statement
*How do we display our tasks? What attributes will be used to allocate tasks? Where to allocate our tasks? How do we navigate between other components?*

## Considered Options:

### Task Display
- Show each task that is created based on priorities and deadlines on the home page
- Have a button on the add tasks page that shows current tasks

### Task Attributes
- Input name and category of task for identity
- Input soft and hard deadlines to estimate task completion
- Input duration of completing the task 
- Input priority and importance of tasks to determine order
- Allocate tasks based on 30-min intervals or 1 hr intervals
- Deadlines based on date
- Deadlines based on time of completion

### Task Allocation
- Have a button on the Home Page where we can add tasks that are listed
- Click on days on the Monthly or Weekly Calendar to add tasks

### Navigation
- Have a button that leads from Current Task to the Monthly Calendar
- Have a button in the Current Task that navigates to Add Tasks page
- Combine both Current Tasks and Add Tasks page and lead to other Calendars

## Decision Outcome: 

### Task Display
**We will create our tasks in the home page, where tasks are ordered depending on the importance of the task, the deadline as well as the time it takes to complete.**

### Task Attributes
**The main attributes of the task will be the name, its category, deadline date, duration and priority. Task durations are determined by hour intervals.**

### Task Allocation
**We will have a button in the Current Tasks page (HOME) that will lead to the add tasks page where tasks are allocated and loaded into local storage for reference between all components.**

### Navigation
**We will have a button that leads to the Monthly Calendar from the Current Tasks page. We will also have a button in the Current Tasks page that leads to the Add Tasks page.**
