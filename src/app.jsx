import React from 'react';
import Electron from 'electron';



export default class App extends React.Component {
  render() {
    return (<div>
      <h2>Podcast Tool Bundle {Electron.remote.app.getVersion()}</h2>
    </div>);
  }
}
