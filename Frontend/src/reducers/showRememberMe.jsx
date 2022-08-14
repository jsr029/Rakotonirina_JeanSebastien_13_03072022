const showRememberMeReducer = (state=false, action) => {
    switch(action.type){
        case 'SHOWREMEMBERME':
            return !state 
        default:
            return state
    }
}
export default showRememberMeReducer