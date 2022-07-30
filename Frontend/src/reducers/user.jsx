const userReducer = (state = {status: '' , email: '', firstName: '', lastName: '', id:''}, action) => {
    switch (action.type) {
        case 'RECEIVE_DATA':
            return state = {
                status: action.payload.status,
                id: action.payload.data.id,
                createdAt: action.payload.data.createdAt,
                updatedAt: action.payload.data.updatedAt,
                email: action.payload.data.email,
                firstName: action.payload.data.firstName,
                lastName: action.payload.data.lastName
            };
        default:
            return state;
    }
}
 
export default userReducer;