# First Sprint Kickoff
## November 6, 2022

### List of Attendees

- Sashwat
- Bradley
- Dean
- Clarissa
- Steven
- River

### Links
[Project Timeline](https://docs.google.com/document/d/1ftAjzyDihtLy-gTYkSZkHnD_dQ9gX-8rzK29jKTpQqk/edit)\
[Project Resources](https://docs.google.com/document/d/1-Qo3ew7RwPbIojRI7X5BBmDDgsFqV2_TwE7MoBs_7Fw/edit)

## Meeting Notes

### CI 

(As per Bradley and Steven's Implementation)
1. All work is to be done in the **DEV** branch!
2. When your feature is ready for testing, make a pull request from **DEV** branch to **STAGE** branch for our automatic tests to be run
3. This pull request into **STAGE** branch is to be reviewed by two people and automated tests are to be run. Once successful, we merge into **STAGE** branch.
4. Inside the **STAGE** branch manual testing will be done by developers for anything not covered by automatic testing
5. At completion of all testing (manual and automatic), make a pull request from **STAGE** to **MAIN**. This request is again reviewed by two people.
6. When successful, the PR goes through and the code is deployed to our chosen mode of delivery.

*Note: the CI pipeline right now only lints code to ensure that the process runs. More will be added to the CI pipeline. If you encounter issues, please consult Bradley or Steven!*

### Sprint 1 Requirements

- We will have 4 pages we will work on for our first phase. Current Tasks Page (HOME), Monthly Calendar, Weekly Calendar and Add Task. Implement Modify Tasks if have time.
- Current Tasks Page (HOME)
  - This page acts as the initial page when entering the web application. 
  - Blank at the start, with tasks getting displayed as they are added. 
  - Tasks are sorted based on Priority and Deadline. 
  - One button in this page: leads to the Monthly Calendar.
- Monthly Calendar Page
  - This page displays the entire Calendar for the Month. 
  - Tasks here will be displayed with their titles on the days in which it is to be worked on. 
  - Blank at the start, with tasks getting displayed as they are added. 
  - Clicking on a day will provide the next page, Weekly Calendar. One can also go back to the Home Page using the Back button. 
- Weekly Calendar Page
  - This page displays the schedule for the week that is selected from the Monthly Calendar page. 
  - The schedule is displayed over 7 days and over 24 (?) hours. 
  - Tasks here are represented as blocks per hour. 
  - This page has three buttons: adding a new task, modifying an existing task, and back to the Monthly Calendar Page. 
- Add Tasks
  - This page asks for input from the user to create a new task object that is stored in the Calendars as well as the Tasks List
  - Tasks are determined by the following attributes:
    - Name
    - Duration
    - Deadline
    - Priority
    - Description
  - Click Done to create the object and append to all displays, Click Back to Cancel adding tasks and return to the back page.
- Modify Tasks (*if we have time*)
  - Similar to Add Tasks, except we are made to modify the already defined attributes for the task.
  - Click Done to modify object, Click Back to Cancel.

**The Initial Sprint will focus on being able to display the tasks list, display our calendars and adding tasks into the schedule**

**We are also supposed to have some basic styling done for our first sprint for ALL OUR PAGES!**

### Assignments

Current Tasks - **River, Shasta** \
Monthly Calendar - \
Weekly Calendar - \
Add Tasks - \
CI Pipeline/DevOps - **Bradley, Steven** 

### Deadlines

***FIRST SPRINT DUE NOV 13th!*** \
***FIRST PHASE OF CI PIPELINE DUE NOV 14th!***


