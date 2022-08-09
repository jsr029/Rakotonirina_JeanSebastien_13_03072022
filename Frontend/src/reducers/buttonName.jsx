const buttonNameReducer = (state=true, action) => {
    switch(action.type){
        case 'BUTTONNAME':
            return !state 
        default:
            return state
    }
}
export default buttonNameReducer