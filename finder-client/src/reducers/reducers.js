import { combineReducers } from 'redux'
import * as actionTypes from '../actionTypes/actionTypes';

const DEFAULT_AUTHENTICATION_STATE = { accessToken: undefined, provider: "None" };

function authentication(state = DEFAULT_AUTHENTICATION_STATE, action) {
  switch (action.type) {
    case actionTypes.LOGGED_IN:
      return action.userInfo;
    default:
      return state;
  }
}

const appReducer = combineReducers({
  authentication
})

const rootReducer = function (state, action) {
  if (action.type === actionTypes.LOGGED_OUT) {
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;