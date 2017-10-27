import React from 'react';
import Map from './map';
import GoogleApiComponent from '../../scripts/GoogleApiComponent';

export class MapContainer extends React.Component {
    render() {
        const style = {
            width: '600px',
            height: '600px'
        }

        return (
            <div style={style}>
                <Map google={this.props.google} />
            </div>
        );
    }
}

export default GoogleApiComponent({
    apiKey: "AIzaSyBsZC7tWxNB8HTwRcSH9hkkodk_X8BZAcw"
})(MapContainer)