import React, { Component } from 'react';
import MapContainer from './map/mapContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import '../styles/styles.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Feup Finder" />
          <MapContainer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
