const showFormReducer = (state=true, action) => {
    switch(action.type){
        case 'SHOWFORM':
            return !state 
        default:
            return state
    }
}
export default showFormReducer