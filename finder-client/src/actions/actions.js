import * as actionTypes from '../actionTypes/actionTypes';

export const loggedIn = userInfo => ({ type: actionTypes.LOGGED_IN, userInfo });
export const loggedOut = () => ({ type: actionTypes.LOGGED_OUT });