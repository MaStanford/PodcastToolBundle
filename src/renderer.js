// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipc = require('electron').ipcRenderer
const shell = require('electron').shell

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