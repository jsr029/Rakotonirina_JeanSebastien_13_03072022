import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const NavMain = ({ message, logout }) => {
    return (
        <>
            <nav className="main-nav">
                <Link to="/" className='main-nav-logo'>
                    <img className='main-nav-logo-image' src='http://127.0.0.1:3000/img/argentBankLogo.png' alt='Argent Bank Logo' />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                <div className="main-nav-message">{message ? message : ''}</div>
                   {logout ? 
                   <Link to="/logout">{logout}</Link>
                   : 
                    <Link to="/login" className="main-nav-item">
                        <FontAwesomeIcon icon={faUserCircle} />
                        Sign In
                    </Link>}
                </div>
            </nav>
        </>
    );
};

export default NavMain;