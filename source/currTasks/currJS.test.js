/* 
*  currJS.test
*  Description: This file contains unit tests implemented for the currJS file.
*/

/**
 * @jest-environment jsdom
 */
import { testExport } from "./currJS";

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './currTask.html'), 'utf8');

jest.dontMock('fs');

describe('currJS Tests', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    afterEach(() => {
        // restore the original func after test
        jest.resetModules();
    });
    test('Check if render function works', () => {
        testExport.render();
    })
})