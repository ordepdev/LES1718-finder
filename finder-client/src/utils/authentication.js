import store from '../store/store';
import { loggedIn } from '../actions/actions';
import { authenticateUser } from '../utils/communication-manager'; 

export function authenticate (userID, provider) {
  authenticateUser(userID, provider).then(function(response){ 
    response["isLoggedIn"] = "true";
    store.dispatch(loggedIn(response));
  }).catch(function(error) {
    console.log(error);
  });
}