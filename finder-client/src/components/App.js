import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MapContainer from './map/mapContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './login/login';

import '../styles/styles.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Feup Finder" />
          <MapContainer />
          <Login />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
