import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Search from '../search/search';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE, DEFAULT_ZOOM_LEVEL } from '../../constants/configuration';

class Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      api: undefined,
      map: undefined,
      marker: undefined
    }
  }

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

      let lat, lng, marker = undefined;

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
        marker = new google.maps.Marker({
          position: { lat: initialLat, lng: initialLng },
          map: this.map
        });
      } else if (this.state.marker !== undefined) {
        marker = this.state.marker;
      }

      new google.maps.KmlLayer("https://gist.githubusercontent.com/RicardoAlmeida25/c9defb562055597eee62d430db656189/raw/64a44c37dec1b6febc3d0aef864c32fd45114f57/feup_prok.kml", {
        suppressInfoWindows: false,
        preserveViewport: true,
        map: this.map
      });

      this.setState({
        api: google,
        map: this.map,
        marker: marker
      });
    }
  }

  /**
   * Clears the position marker on the map.
   */
  clearMarker = () => {
    if (this.state.marker !== undefined) {
      let oldMarker = this.state.marker;
      oldMarker.setMap(null);

      this.setState({ marker: undefined });
    }
  }

  /**
   * Updates the marker position on the map.
   * @param {*} latitude Marker latitude.
   * @param {*} longitude Marker longitude.
   */
  updateMarker = (latitude, longitude) => {
    if (latitude !== undefined && longitude !== undefined) {
      this.clearMarker();

      let newMarker = new this.state.api.maps.Marker({
        position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        map: this.state.map
      });

      this.setState({ marker: newMarker });
    }
  }

  render() {
    return (
      <div>
        <div ref='map' className="map-container">
          Loading map...
        </div>
        <Search
          updateMarker={this.updateMarker}
          clearMarker={this.clearMarker} />
      </div>
    );
  }
}

export default Map;
