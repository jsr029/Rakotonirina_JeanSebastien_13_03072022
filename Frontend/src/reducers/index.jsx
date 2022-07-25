import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import { combineReducers } from "redux";
import postReducer from "./postReducer";

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    posts: postReducer,
})
export default allReducers