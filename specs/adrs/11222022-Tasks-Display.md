# Task Display

## Context and Problem Statement

*For created task objects, how do we display the information inputted by user?*
*How is user able to differentiate between adding tasks and observing tasks?*

## Considered Options

### Task Object Display
- Have a drop down summary of the inputted information, with the task name and deadline appearing as headers
- Have a clickable div element which transforms from main task information to summary of task to complete
- Have only the name, deadline, and duration of tasks appear in list, color coded based on category

### Navigation
- Have the Addition of Tasks as well as Task List in the same page, showing dynamic allocation and sorting of tasks
- Have Addition of Tasks and Tasks List on separate pages, with the creation of task objects sending an alert with a link to the next page.

## Decision Outcome

### Display
**Tasks appear as clickable div elements that are color-coded on category selected by user. Div shows name of task and deadline, but when clicked shows additional information.**

### Navigation
**Tasks List and the creation of tasks shown in same page next to each other. Tasks List dynamically allocates created task and schedules it optimally to show to user.**
