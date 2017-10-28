import React, { Component } from 'react';
import MapContainer from './map/mapContainer';

import '../styles/styles.css';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Welcome to Feup Finder</h1>
        </header>
        <MapContainer />
      </div>
    );
  }
}

export default App;
