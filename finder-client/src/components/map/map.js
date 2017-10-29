import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../../constants/configuration';

class Map extends Component {

  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      const { google } = this.props;
      const node = ReactDOM.findDOMNode(this.refs.map);

      const center = new google.maps.LatLng(DEFAULT_LATITUDE, DEFAULT_LONGITUDE);
      const mapConfig = Object.assign({}, {
        center: center
      });

      const map = new google.maps.Map(node, mapConfig);

      new google.maps.KmlLayer("https://www.google.com/maps/d/u/0/kml?mid=1Lk09pmnjKNyqJJVR3WOGYktiCrY&forcekml=1", {
        suppressInfoWindows: false,
        preserveViewport: false,
        map: map
      });
    }
  }

  render() {
    return (
      <div ref='map' className="map-container">
        Loading map...
      </div>
    );
  }
}

export default Map;
