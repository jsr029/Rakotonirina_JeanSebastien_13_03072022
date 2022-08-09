const classButtonReducer = (state=true, action) => {
    switch(action.type){
        case 'CLASSBUTTON':
            return !state 
        default:
            return state
    }
}
export default classButtonReducer