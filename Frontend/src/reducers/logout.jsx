const logoutReducer = (state = false, action) => {
    switch(action.type){
        case 'USER_LOGGED_OUT':
            return !state
        default:
            return
    }
}
export default logoutReducer