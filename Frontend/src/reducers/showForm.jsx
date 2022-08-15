const showFormReducer = (state=false, action) => {
    switch(action.type){
        case 'SHOWFORM':
            return !state 
        default:
            return state
    }
}
export default showFormReducer