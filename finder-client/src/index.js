import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import history from './components/history/history';
import MapContainer from './components/map/mapContainer';
import { Router, Route, hashHistory } from 'react-router'


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path='history' component={history} />
          <Route path='map' component={MapContainer} />
        </Route>
    </Router>
    , document.getElementById('root')
);
