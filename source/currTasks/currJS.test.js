/**
 * @jest-environment jsdom
 */

/* 
*  currJS.test
*  Description: This file contains unit tests implemented for the currJS file.
*/

import { Task } from "./../skyTasks";

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './currTask.html'), 'utf8');
const functions = require("./currJS.js");

jest.dontMock('fs');

describe('currJS Tests', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    afterEach(() => {
        // restore the original func after test
        jest.resetModules();
    });

    test("test init", () => {
        functions.init();
    });

    test("test addTasksToDocument", () => {
        let task1 = new Task("Task 1", Task.getUniqueUID, Task.getUniqueTaskUID);
        let task2 = new Task("Task 2", Task.getUniqueUID, Task.getUniqueTaskUID);

        let taskArr = [[task1, task2],[1, 1]];

        functions.addTasksToDocument(taskArr);

        let storageList = Task.getAllTasksFlat();
        let allSameTasks = true;
        for(let i = 3; i < storageList.length; i++)
        {
            if((storageList[i].task_name !== taskArr[0][i-3]) || (storageList[i].uid !== taskArr[1][i-3]))
            {
                allSameTasks = false;
            }
        }

        expect(allSameTasks).toBe(true);
    });

    test("test initFormHandler", () => {
        functions.initFormHandler();
    });
})