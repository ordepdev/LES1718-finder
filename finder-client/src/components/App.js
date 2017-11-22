import React, { Component } from 'react';
<<<<<<< Updated upstream
=======
import Search from './search/search';
import AppBar from 'material-ui/AppBar';
>>>>>>> Stashed changes
import MapContainer from './map/mapContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './login/login';

import '../styles/styles.css';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
<<<<<<< Updated upstream
          <SideBar authentication={this.props.authentication} />
          <MapContainer />
=======
          <AppBar title="Feup Finder" />
          <MapContainer />
          <Search />
          <Login />
>>>>>>> Stashed changes
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

