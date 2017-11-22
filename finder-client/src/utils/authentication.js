import store from '../store/store';
import { loggedIn, loggedOut } from '../actions/actions';
import { SESSION_COOKIE_NAME } from '../constants/configuration';
import { setCookie, deleteCookie, getCookie } from './cookie-handler';
import { authenticateUser, getAuthInfo } from '../utils/communication-manager';

/**
 * Authenticates an user.
 * @param {*} userID User id.
 * @param {*} provider Provider the user used to login.
 */
export function authenticate(userID, provider) {
  authenticateUser(userID, provider).then(function (response) {
    setCookie(SESSION_COOKIE_NAME, response.accessToken);

    response["isLoggedIn"] = "true";
    store.dispatch(loggedIn(response));
  }).catch(function (error) {
    console.log(error);
  });
}

/**
 * Logs out the user.
 */
export function logout() {
  store.dispatch(loggedOut());
  deleteCookie(SESSION_COOKIE_NAME)
}

/**
 * Updates the auth info.
 */
export function updateAuthInfo() {
  let sessionCookie = getCookie(SESSION_COOKIE_NAME);

  if (sessionCookie !== null) {
    getAuthInfo(sessionCookie).then(function (response) {
      response["isLoggedIn"] = "true";
      store.dispatch(loggedIn(response));
    }).catch(function (error) {
      console.log(error);
    });
  }
}