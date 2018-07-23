import React from 'react';
import Electron from 'electron';
import path from 'path';


import PodcastList from './components/listpodcast';

import Styles from './styles/styles';

const BrowserWindow = Electron.remote.BrowserWindow;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rssFeedUri: 'https://www.rt.com/rss/'
        }
    }

    handleNewWindowClick() {
        const modalPath = path.join('file://', __dirname, './html//example.html')
        this.openNewWindow(modalPath);
    }

    openNewWindow(url){
        let win = new BrowserWindow({ width: 800, height: 600 })
        win.on('close', function () { win = null })
        win.loadURL(url)
        win.show()
    }

    handleItemClick(item) {
        this.openNewWindow(item.link);
    }

    render() {
        return (
            <div style={Styles.Global}>
                <h2>Podcast Tool Bundle {Electron.remote.app.getVersion()}</h2>
                <PodcastList rssFeedUri={this.state.rssFeedUri} onItemClicked={(item) => this.handleItemClick(item)} />
                <div>
                    <button onClick={() => { this.handleNewWindowClick() }}>
                        New window
                    </button>
                </div>
            </div>);
    }
}
