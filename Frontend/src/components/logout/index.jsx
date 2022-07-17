import React from 'react'
import Home from '../../pages/Home'

function Logout() {
    window.localStorage.clear(); //clear all localstorage
    window.localStorage.removeItem("form-Data"); //remove one item
    return (
        <Home />
    );
};

export default Logout;