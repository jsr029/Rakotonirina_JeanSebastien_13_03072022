const loginReducer = (state = {token: '', status: '', message: ''}, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return state = {
                token: action.payload.token,
                status: action.payload.status,
                message: action.payload.message
            }
        case 'LOGIN_FAILURE':
            return state = {
                token: null,
                status: action.payload.status,
                message: action.payload.message
            }
        case 'RESET':
            return state = {
                token: null,
                status: null,
                message: null
            }
        default:
            return state;
    }
};

export default loginReducer;