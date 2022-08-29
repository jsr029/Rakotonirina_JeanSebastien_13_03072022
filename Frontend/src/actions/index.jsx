import { history, baseUrl } from "../App"
import axios from 'axios'
import { toast } from 'react-toastify'

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
export const showForm = () => {
    return {
        type: 'SHOWFORM'
    }
}
export const showRememberMe = () => {
    return {
        type: 'SHOWREMEMBERME'
    }
}

export const buttonName = () => {
    return {
        type: 'BUTTONNAME'
    }
}
export const classButton = () => {
    return {
        type: 'CLASSBUTTON'
    }
}
export const logoutRequest = () => {
    return {
        type: 'USER_LOGGED_OUT'
    }
}

export const loginSuccess = (token, status, message) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            token: token,
            status: status,
            message: message
        }
    }
}

export const loginFailure = (status, message) => {
    return {
        type: 'LOGIN_FAILURE',
        payload: {
            status: status,
            message: message
        }
    }
}

export const reset = () => {
    return {
        type: 'RESET'
    }
}

export const receiveData = (data, status) => {
    return {
        type: 'RECEIVE_DATA',
        payload: {
            data: data,
            status: status
        }
    }
}

export const loginUser = (username, password, rmb) => {
    return (dispatch) => {
        return axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: {
                "email": username,
                "password": password
            },
            url: baseUrl + '/login'
        })
            .then(response => {
                //console.log(response)
                try {
                    toast.success('User is logged in.')
                    //if we have a response and if remeber me chexkbox is checked, we stock the token in the localStorae and the store
                    if(response.data && rmb === true){
                        dispatch(loginSuccess(response.data.body.token, response.data.status, response.data.message));
                        dispatch(accessProfile(response.data.body.token));
                        localStorage.removeItem('user')
                        localStorage.setItem('user', JSON.stringify({
                            token: response.data.body.token, 
                            email: username, 
                            password: password
                        }))
                        toast.success('Checkbox Remember Me is checked')
                    }
                    //if we have a response and if remeber me chexkbox is unchecked, we stock the token only in the store
                    if(response.data && rmb === false){
                        dispatch(loginSuccess(response.data.body.token, response.data.status, response.data.message));
                        dispatch(accessProfile(response.data.body.token));
                        localStorage.removeItem('user')
                        localStorage.setItem('user', JSON.stringify({
                                token:'',
                                email: '',
                                password: ''
                        }))
                      toast.success('Checkbox Remember Me is unchecked')
                    }
                } catch (e) {
                    toast.error('Your email or password is incorrect')
                    console.clear()
                    dispatch(loginFailure(response.data.status, response.data.message, response.data.showRememberMe));
                }
            })
            .catch(error => {
                toast.error('Your IDs are not valid. Please retry !')
                console.clear()
                dispatch(loginFailure(error));
            })
    }
}

export const accessProfile = (token) => {
    return (dispatch) => {
        return axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                token: token
            },
            url: baseUrl + '/profile'
        })
            .then(response => {
                //console.log(response.data)
                toast.success('You can access to your profile and redirect by EditProfile component !')
                dispatch(receiveData(response.data.body, response.data.status));
                history.push(`/user/${(response.data.body.firstName).toLowerCase()}`);
            })
            .catch(error => {
                if (error.status === 401) {
                    toast.error('You can not access to your profile. Check accessProfile action !')
                    dispatch(loginFailure(error));
                }
            })
    }
}

export const modifyName = (token, newFirstName, newLastName) => {
    return (dispatch) => {
        return axios({
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                "firstName": newFirstName,
                "lastName": newLastName
            },
            url: baseUrl + '/profile'
        })
            .then(response => {
                toast.success('Names have been successfully modified !')
                dispatch(receiveData(response.data.body, response.data.status));
                dispatch(showForm())
                //dispatch(logoutRequest());
                history.push(`/user/${(response.data.body.firstName).toLowerCase()}`);
            })
            .catch(error => {
                toast.error('Names have not been modified. Check modifyName actions !')
                if (error.response.status !== 200) {
                    dispatch(loginFailure(error))
                }
            })
    }
}

export const signUpUser = (email, password, firstName, lastName) => {
    return (dispatch) => {
        return axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "email": email,
                "password": password,
                "firstName": firstName,
                "lastName": lastName
            },
            url: baseUrl + '/signup'
        })
            .then(response => {
                if (response.data.status === 200) {
                    toast.success('User has been added.')
                    dispatch(logoutRequest())
                    history.push(`/sign-in`);
                } else {
                    toast.error('The response status is 200, but User has not been added.')
                    dispatch(loginFailure(response.data.status, response.data.message));
                }
            })
            .catch(error => {
                if (error.response.status !== 200) {
                    toast.error('The response status is not 200. User has not been added.')
                    dispatch(loginFailure(error))
                }
            })
    }
}
