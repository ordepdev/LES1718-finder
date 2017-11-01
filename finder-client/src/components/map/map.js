import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE, DEFAULT_ZOOM_LEVEL } from '../../constants/configuration';

class Map extends Component {

  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  /**
   * Loads the map object with all the necessary information.
   * @param {*} initialLat Initial latitude.
   * @param {*} initialLng Initial longitude.
   */
  loadMap(initialLat = undefined, initialLng = undefined, showMarker = false) {
    if (this.props && this.props.google) {
      const { google } = this.props;
      const node = ReactDOM.findDOMNode(this.refs.map);

      let lat, lng;

      if (initialLat === undefined || initialLng === undefined) {

        //We need to verify if the user gave permission to obtain his location.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.loadMap(position.coords.latitude, position.coords.longitude, true);
          }, () => {
            this.loadMap(DEFAULT_LATITUDE, DEFAULT_LONGITUDE);
          });
        } else {
          lat = DEFAULT_LATITUDE;
          lng = DEFAULT_LONGITUDE;
        }
      } else {
        lat = initialLat;
        lng = initialLng;
      }

      const center = new google.maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: DEFAULT_ZOOM_LEVEL
      });

      this.map = new google.maps.Map(node, mapConfig);

      if (showMarker) {
        new google.maps.Marker({
          position: {lat: initialLat, lng: initialLng},
          map: this.map
        });
      }

      new google.maps.KmlLayer("https://www.google.com/maps/d/u/0/kml?mid=1Lk09pmnjKNyqJJVR3WOGYktiCrY&forcekml=1", {
        suppressInfoWindows: false,
        preserveViewport: true,
        map: this.map
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
