import React, { Component } from 'react';
import MapContainer from './map/mapContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../styles/styles.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <header>
            <h1>Welcome to Feup Finder</h1>
          </header>
          <MapContainer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
