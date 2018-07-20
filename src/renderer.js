// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipc = require('electron').ipcRenderer
const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')
const os = require('os')
const shell = require('electron').shell

//New window renderer process
const newWindowBtn = document.getElementById('new-window')
newWindowBtn.addEventListener('click', function (event) {
  const modalPath = path.join('file://', __dirname, '../../sections/windows/modal.html')
  let win = new BrowserWindow({ width: 400, height: 320 })
  win.on('close', function () { win = null })
  win.loadURL(modalPath)
  win.show()
})

//Open file chooser
const selectDirBtn = document.getElementById('select-directory')
selectDirBtn.addEventListener('click', function (event) {
  ipc.send('open-file-dialog')
})

ipc.on('selected-directory', function (event, path) {
  document.getElementById('selected-file').textContent = `You selected: ${path}`
})

//Save file
const saveBtn = document.getElementById('save-dialog')
saveBtn.addEventListener('click', function (event) {
  ipc.send('save-dialog')
})

ipc.on('saved-file', function (event, path) {
  if (!path) path = 'No path'
  document.getElementById('file-saved').innerHTML = `Path selected: ${path}`
})

//Open external link
const exLinksBtn = document.getElementById('open-ex-links')
exLinksBtn.addEventListener('click', function (event) {
  let didWOrk = shell.openExternal('https://github.com')
})

//Open file manager
const fileManagerBtn = document.getElementById('open-file-manager')
fileManagerBtn.addEventListener('click', function (event) {
  shell.showItemInFolder(os.homedir())
})

//Tray Renderer process
const trayBtn = document.getElementById('put-in-tray')
let trayOn = false
trayBtn.addEventListener('click', function (event) {
  if (trayOn) {
    trayOn = false
    document.getElementById('tray-countdown').innerHTML = 'Tray Not Active'
    ipc.send('remove-tray')
  } else {
    trayOn = true
    const message = 'Click demo again to remove.'
    document.getElementById('tray-countdown').innerHTML = message
    ipc.send('put-in-tray')
  }
})

// Tray removed from context menu on icon
ipc.on('tray-removed', function () {
  ipc.send('remove-tray')
  trayOn = false
  document.getElementById('tray-countdown').innerHTML = 'Tray Not Active'
})

//Wrap all outbound links 
const links = document.querySelectorAll('a[href]')
Array.prototype.forEach.call(links, function (link) {
  const url = link.getAttribute('href')
  if (url.indexOf('http') === 0) {
    link.addEventListener('click', function (e) {
      e.preventDefault()
      shell.openExternal(url)
    })
  }
})

// Tell main process to show the menu when demo button is clicked
const contextMenuBtn = document.getElementById('context-menu')
contextMenuBtn.addEventListener('click', function (event) {
  ipc.send('show-context-menu')
})