# Monthly Calendar Implementation

## Context and Problem Statement

*How do we allocate each month in correspondence to the days it has? How do we space out the days that are displayed? How do we denote which month and day we are in? How do we navigate between our other components?*

## Considered Options:

### Month Allocation
- Hard code each month in the year (developer allocation)
- Dynamically allocate our calendar by finding the date that is currently being explored.
- Only display the current month the user is in.

### Month Display
- Display days as floating boxes that are padded for the specific month only
- List days in a matrix format. Rows are determined by weeks in the month and columns represent days in the week. Include other months as well

### Month Identity
- Display the month and year at the top as headers
- Display the month and year at the bottom with big fonts
- Highlight the day the user is in on the calendar
- Display the current date with the headers

### Navigation between Pages
- Click on a day on calendar to navigate to the specific week
- Click on a button to present the current week’s tasks
- Have a back button to navigate to home page
- Have buttons to be able to switch between months.
- Have a dropdown menu to select which month to go to
- Include an add tasks feature

## Decision Outcome

### Month Allocation
**Identify the current date that is being accessed, and then allocate all the days for that specific month to be displayed. Reset the calendar and reallocate if month is changed.**

### Month Display
**Show the current month that is being accessed through days represented as floating boxes that are padded. Also only show days specific to that month.**

### Month Identity
**Have a header which includes the current month and year that is being accessed, also highlight the present day on the calendar.**

### Navigation
**Go to the respective week’s calendar by clicking on the day of that week. Also have buttons within the header that help switch between months. To return to home, click on the home button.**
