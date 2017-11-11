import React, { Component } from 'react';
import Search from './search/search';
import MapContainer from './map/mapContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SideBar from './side-bar/sideBar';

import '../styles/styles.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <SideBar />
          <MapContainer />
          <Search />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
