// require('update-electron-app')()

const { app, BrowserWindow,ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.handle('ping', () => 'pong')
  win.loadFile("index.html");
  // win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
  console.log('process.env.DONGQ_TOKEN',process.env.DONGQ_TOKEN)
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
