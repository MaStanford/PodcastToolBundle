import React from 'react';

const ipc = require('electron').ipcRenderer
const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')
const os = require('os')
const shell = require('electron').shell

export default class Renderer extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            path: "",
            save: "",
            didOpenLink: false,
            tray: false,
        };

        ipc.on('selected-directory', (event, path) => {
            this.setState({ path: path });
        });

        ipc.on('saved-file', (event, path) => {
            if (!path) path = 'No path'
            this.setState({ save: path });
        });

        // Tray removed from context menu on icon
        ipc.on('tray-removed', function () {
            ipc.send('remove-tray')
            this.setState({ tray: false });
        })
    }

    handleNewWindowClick() {
        const modalPath = path.join('file://', __dirname, '../html/example.html')
        let win = new BrowserWindow({ width: 400, height: 320 })
        win.on('close', function () { win = null })
        win.loadURL(modalPath)
        win.show()
    }

    handleDirBrowserClick() {
        ipc.send('open-file-dialog');
    }

    handleFileSaveClick() {
        ipc.send('save-dialog');
    }

    handleExternalLinkClick() {
        let didWOrk = shell.openExternal('https://github.com');
        this.setState({ didOpenLink: didWOrk });
    }

    handleOpenFileManagerClick() {
        shell.showItemInFolder(os.homedir())
    }

    handleTrayClick() {
        if (this.state.tray) {
            ipc.send('remove-tray');
            this.setState({ tray: false });
        } else {
            ipc.send('put-in-tray');
            this.setState({ tray: true });
        }
    }

    handleContextMenuClick() {
        ipc.send('show-context-menu')
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={() => { this.handleNewWindowClick() }}>
                        New window
                    </button>
                </div>
                <div>
                    <button onClick={() => { this.handleDirBrowserClick() }}>
                        Open Dir Browser
                    </button>
                    Path Choosen: {this.state.path}
                </div>
                <div>
                    <button onClick={() => { this.handleFileSaveClick() }}>
                        Open save dialog
                    </button>
                    Path Choosen: {this.state.save}
                </div>
                <div>
                    <button onClick={() => { this.handleExternalLinkClick() }}>
                        Open external link
                    </button>
                    Successful? : {this.state.didOpenLink ?  'Worked': 'Not yet'}
                </div>
                <div>
                    <button onClick={() => { this.handleOpenFileManagerClick() }}>
                        Open File Manager
                    </button>
                </div>
                <div>
                    <button onClick={() => { this.handleTrayClick() }}>
                        Put App in Tray
                    </button>
                    Tray Visible? : {this.state.tray ?  'Visible': 'Hidden'}
                </div>
                <div>
                    <button onClick={() => { this.handleContextMenuClick() }}>
                        Context Menu
                    </button>
                </div>
            </div>
        );
    }
}

