import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import { Router, Route, hashHistory } from 'react-router'

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
        </Route>
    </Router>
    , document.getElementById('root')
);
