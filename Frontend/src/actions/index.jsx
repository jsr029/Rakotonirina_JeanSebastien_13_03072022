import { httpGetAllPosts } from "../functions/requestPosts"

export const increment = () => {
    return {
        type: 'INCREMENT'
    }
}
export const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}
export const reset = () => {
    return {
        type: 'RESET'
    }
}
export const signIn = () => {
    return {
        type: 'SIGN_IN'
    }
}
export const GET_POSTS = () => {
    return {
        type: 'GET_POSTS'
    }
}
const getAllPosts = () => async (dispatch) => {
    const response = await httpGetAllPosts();
    dispatch({ type: GET_POSTS, payload: response });
  };
  
  export { getAllPosts };
  