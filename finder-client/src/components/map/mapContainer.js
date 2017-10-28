import React from 'react';
import Map from './map';
import GoogleApiComponent from '../../scripts/GoogleApiComponent';

export class MapContainer extends React.Component {
    render() {
        return (
            <Map google={this.props.google} />
        );
    }
}

export default GoogleApiComponent({
    apiKey: "AIzaSyBsZC7tWxNB8HTwRcSH9hkkodk_X8BZAcw"
})(MapContainer)