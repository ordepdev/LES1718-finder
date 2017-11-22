import React, { Component } from 'react';
import MapContainer from './map/mapContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SideBar from './side-bar/sideBar';
import '../styles/styles.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <SideBar authentication={this.props.authentication} />
          <MapContainer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
