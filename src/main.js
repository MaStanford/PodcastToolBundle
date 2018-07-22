import electron from 'electron';
import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let onlineStatusWindow
let windows = [];

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });

/** 
 * handle singleton logic, dont allow 2, focus first
*/
const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
    }
})

if (isSecondInstance) {
    app.quit()
}

const createWindow = async () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    windows.push(mainWindow);

    // and load the index.html of the app.
    let path = 
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    // Open the DevTools.
    if (isDevMode) {
        await installExtension(REACT_DEVELOPER_TOOLS);
        mainWindow.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        windows.forEach((win) => {
            if(win !== mainWindow && !win.isDestroyed()){
                win.close();
                win = null;
            }
        });
        windows = [];
        app.quit();
        app.exit(0);
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();
    onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
    onlineStatusWindow.loadURL(`file://${__dirname}/html/onlinestatus.html`)
    windows.push(onlineStatusWindow);
});


// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        windows.forEach((win) => {
            if(win !== mainWindow && !win.isDestroyed()){
                win.close();
                win = null;
            }
        });
        windows = [];
        app.quit();
        app.exit(0);
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('online-status-changed', (event, status) => {
    const options = {
        type: 'info',
        title: 'Network changed',
        buttons: ['Ok'],
        message: 'Online status changed from' + (status ? ' offline to online'  : ' online to offline')
    }
    electron.dialog.showMessageBox(mainWindow, options, function () { })
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
require('./main/menu');
