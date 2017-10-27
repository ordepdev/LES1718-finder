import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../styles/App.css';

import MapContainer from './map/mapContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Feup Finder</h1>
        </header>
        <MapContainer />
      </div>
    );
  }
}

export default App;
