import React, { Component } from 'react';
import Search from './search/search';
import AppBar from 'material-ui/AppBar';
import MapContainer from './map/mapContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../styles/styles.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Feup Finder" />
          <MapContainer />
          <Search />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
