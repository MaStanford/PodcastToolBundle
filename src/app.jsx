import React from 'react';
import Electron from 'electron';

import PodcastList from './components/listpodcast';

import RSSFetch from './network/rssfetch';

import Styles from './styles/styles';

const path = require('path');
const BrowserWindow = require('electron').remote.BrowserWindow;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.fetchRSS('http://fashthenation.com/feed/');
    }

    fetchRSS(url) {
        console.log(url);
        RSSFetch.fetchRSSFeed(url)
            .then((r) => {
                console.log('Success' + JSON.stringify(r))
            })
            .catch((e) => {
                console.log(e)
            });
    }

    handleNewWindowClick() {
        const modalPath = path.join('file://', __dirname, './html//example.html')
        let win = new BrowserWindow({ width: 400, height: 320 })
        win.on('close', function () { win = null })
        win.loadURL(modalPath)
        win.show()
    }

    render() {
        return (
            <div style={Styles.Global}>
                <h2>Podcast Tool Bundle {Electron.remote.app.getVersion()}</h2>
                <PodcastList />
                <div>
                    <button onClick={() => { this.handleNewWindowClick() }}>
                        New window
                    </button>
                </div>
            </div>);
    }
}
