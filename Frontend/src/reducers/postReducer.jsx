import _ from "lodash";
import { GET_POSTS } from "../actions";

function postReducer(state = {}, action) {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
}


export default postReducer