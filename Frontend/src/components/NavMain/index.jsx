import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutRequest } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons'

function NavMain() {

    const dispatch = useDispatch();

    const status = useSelector(state => state.userReducer.status);
    const user = useSelector(state => state.userReducer.firstName);
    const id = useSelector(state => state.userReducer.id);

    const handleLogOut = () => {
        dispatch(logoutRequest());   
    }
       
    return (
    <>
        <nav className="main-nav">
            <NavLink className="main-nav-logo" to="/">
                <img
                className="main-nav-logo-image"
                src="http://127.0.0.1:3000/img/argentBankLogo.png"
                alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div className="main-nav-link">
                <NavLink className="main-nav-item" to={status === 200 ? `/user/${id}/${user}` : '/sign-in'}>
                <FontAwesomeIcon icon={faUserCircle} />
                    {status === 200 ? user : 'Sign In'}
                </NavLink>
                {status === 200 ? <NavLink className="main-nav-item" to="/" onClick={handleLogOut}>
                <FontAwesomeIcon icon={faSignOut} />
                                    Sign Out
                </NavLink> : ''}
                
            </div>
        </nav>
    </>
    
    )
}

export default NavMain;