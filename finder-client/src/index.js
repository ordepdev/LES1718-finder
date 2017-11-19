import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import AppContainer from './components/App-container';
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={AppContainer}>
            </Route>
        </Router>
    </Provider>
    , document.getElementById('root')
);
