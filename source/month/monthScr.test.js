import { testExport } from "./monthScr";

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './month.html'), 'utf8');

jest.dontMock('fs');

describe('Monthly Calendar Tests', () => {
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