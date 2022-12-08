import { Task } from "./../skyTasks";

describe('currJS end-to-end tests', () => {
  beforeAll(async () => {
    page.on("dialog", async dialog => {
      await dialog.accept();
    })
    await page.goto("http://localhost:5500/currTask.html");
  });

  test('test modify preferences', async () => {
    await page.$eval('#morning', el => el.value = '9');
    await page.$eval('#noon', el => el.value = '12');
    await page.$eval('#evening', el => el.value = '22');
    
    let submitButton = await page.$(".update_schedule");
    await submitButton.click();

    let morning = await page.evaluate( () => {
      return localStorage.getItem("morning");
    });
    let localMorn = JSON.parse(morning);
    expect(localMorn).toBe(9);
    
    let noon = await page.evaluate( () => {
      return localStorage.getItem("noon");
    });
    let localNoon = JSON.parse(noon);
    expect(localNoon).toBe(12);
    
    let evening = await page.evaluate( () => {
      return localStorage.getItem("evening");
    });
    let localEvning = JSON.parse(evening);
    expect(localEvning).toBe(22);
  });

  test('test number of tasks', async () => {
    let list = await page.$("#list");
    let innerList = await list.$$("article");

    let len = innerList.length;

    console.log(len);

    expect(len).toBe(0);
  });

  test('test remove tasks', async () => {
    let clearButton = await page.$(".danger");

    const [response] = await Promise.all([
        page.waitForNavigation(),
        clearButton.click(),
    ]);

    let list = await page.$("#list");
    console.log(list);
    
    let innerList = await list.$$("article");

    let len = innerList.length;

    console.log(len);

    expect(len).toBe(0);
  });
})
