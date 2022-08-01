import counterReducer from "./counter";
import { routerReducer } from 'react-router-redux';
import { withReduxStateSync } from 'redux-state-sync';
import { combineReducers } from "redux";
import loginReducer from "./login";
import userReducer from "./user";

const allReducers = combineReducers({
    counter: counterReducer,
    loginReducer: loginReducer,
    userReducer: userReducer,
    routerReducer: routerReducer
})
const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'USER_LOGGED_OUT') {
    state = undefined;
  }
  return allReducers(state, action);
};

//export default rootReducer;
export default withReduxStateSync(rootReducer);
//export default allReducers