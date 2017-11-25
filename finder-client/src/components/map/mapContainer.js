import React from 'react';
import Map from './map';
import GoogleApiComponent from '../../scripts/GoogleApiComponent';
import Search from '../search/search';
import { GOOGLE_MAPS_API_KEY } from '../../constants/configuration';

export class MapContainer extends React.Component {
    render() {
        return (
            <div>
                <Map google={this.props.google} />
            </div>
        );
    }
}

export default GoogleApiComponent({
    apiKey: GOOGLE_MAPS_API_KEY
})(MapContainer)
