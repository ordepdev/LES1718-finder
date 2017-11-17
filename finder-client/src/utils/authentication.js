import store from '../store/store';
import { setCookie, deleteCookie } from './cookie-handler';
import { loggedIn, loggedOut } from '../actions/actions';
import { authenticateUser, logoutUser } from '../utils/communication-manager';
import { SESSION_COOKIE_NAME } from '../constants/configuration';

/**
 * Authenticates an user.
 * @param {*} userID User id.
 * @param {*} provider Provider the user used to login.
 */
export function authenticate (userID, provider) {
  authenticateUser(userID, provider).then(function(response){
    setCookie(SESSION_COOKIE_NAME, response.accessToken);

    response["isLoggedIn"] = "true";
    store.dispatch(loggedIn(response));
  }).catch(function(error) {
    console.log(error);
  });
}

/**
 * Logs out the user.
 */
export function logout() {
  logoutUser().then(function(response){
    store.dispatch(loggedOut());

    deleteCookie(SESSION_COOKIE_NAME)
  }).catch(function(error) {
    console.log(error);
  });
}