import counterReducer from "./counter";
import { combineReducers } from "redux";
import loginReducer from "./login";
import userReducer from "./user";

const allReducers = combineReducers({
    counter: counterReducer,
    loginReducer: loginReducer,
    userReducer: userReducer,
})

export default allReducers