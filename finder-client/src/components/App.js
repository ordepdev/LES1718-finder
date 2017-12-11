import React, { Component } from 'react';
import SideBar from './side-bar/sideBar';
import MapContainer from './map/mapContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../styles/styles.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <SideBar authentication={this.props.authentication} />
          <MapContainer authentication={this.props.authentication} />

          {
            this.props.children !== null &&
            React.cloneElement(this.props.children, this.props)
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
