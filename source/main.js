const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1300,
    height: 700,
    minWidth: 840,
    webPreferences: {
      devTools: !app.isPackaged
    }
  });
  win.loadFile('./currTasks/currTask.html');
  win.menuBarVisible = false;
};

app.whenReady().then(() => {
  createWindow();

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});