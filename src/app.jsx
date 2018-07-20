import React from 'react';
import Electron from 'electron';

import PodcastList from './components/listpodcast';
import Renderer from './components/renderer';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h2>Podcast Tool Bundle {Electron.remote.app.getVersion()}</h2>
        <PodcastList />
        <Renderer />
      </div>);
  }
}
