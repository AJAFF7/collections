const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

const createWindow = async () => {
  const contextMenu = await import('electron-context-menu');
  contextMenu.default({
    showInspectElement: false,
  });

  mainWindow = new BrowserWindow({
    width: 1500,
    height: 1400,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    },
    autoHideMenuBar: true,
    backgroundColor: '#212121',
  });

  mainWindow.loadURL('https://hub.docker.com/');
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

// IPC communication
ipcMain.on('minimize', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.on('maximize', () => {
  if (mainWindow) {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
  }
});

ipcMain.on('close', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

