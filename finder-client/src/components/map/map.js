import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
      // google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = 14;
      let lat = 41.178541;
      let lng = -8.596266;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
      
      new google.maps.KmlLayer("https://www.google.com/maps/d/u/0/kml?mid=1Lk09pmnjKNyqJJVR3WOGYktiCrY&forcekml=1", {
        suppressInfoWindows: true,
        preserveViewport: false,
        map: this.map
      });
    }
  }

  render() {
    const style = {
      width: '600px',
      height: '600px'
    }

    return (
      <div ref='map' style={style}>
        Loading map...
      </div>
    );
  }
}

export default Map;
