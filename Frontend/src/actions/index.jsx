import { history, baseUrl } from "../App"
import axios from 'axios'

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

export const loginUser = (username, password) => {
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
                console.log(response)
                try {
                    dispatch(loginSuccess(response.data.body.token, response.data.status, response.data.message));
                    dispatch(accessProfile(response.data.body.token));
                } catch (e) {
                    dispatch(loginFailure(response.data.status, response.data.message, response.data.showRememberMe));
                }
            })
            .catch(error => {
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
                console.log(response.data)
                dispatch(receiveData(response.data.body, response.data.status));
                history.push(`/user/${(response.data.body.firstName).toLowerCase()}`);
            })
            .catch(error => {
                if (error.status === 401) {
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
                console.log(response)
                dispatch(receiveData(response.data.body, response.data.status));
                dispatch(logoutRequest());
                history.push(`/sign-in`);
            })
            .catch(error => {
                console.log(error)
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
                    dispatch(logoutRequest())
                    history.push(`/sign-in`);
                } else {
                    dispatch(loginFailure(response.data.status, response.data.message));
                }
            })
            .catch(error => {
                if (error.response.status !== 200) {
                    dispatch(loginFailure(error))
                }
            })
    }
}
