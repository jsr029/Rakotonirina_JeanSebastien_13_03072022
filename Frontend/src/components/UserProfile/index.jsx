import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { modifyName } from "../../actions"
import NavMain from '../NavMain'
import Footer from '../Footer'
import Home from '../../pages/Home'


function UserProfile({ history }) {
    const dispatch = useDispatch();

    const status = useSelector(state => state.loginReducer.status);
    const message = useSelector(state => state.loginReducer.message);

    const token = useSelector(state => state.loginReducer.token);
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [newFirstNameError, setNewFirstNameError] = useState('');
    const [newLastNameError, setNewLastNameError] = useState('');
    const [newEmailError, setNewEmailError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');

    const firstName = useSelector(state => state.userReducer.firstName)
    const lastName = useSelector(state => state.userReducer.lastName)
    const email = useSelector(state => state.userReducer.email)
    const password = useSelector(state => state.userReducer.password)
    const id = useSelector(state => state.userReducer.id)
    const creationDate = new Date(Date.parse(useSelector(state => state.userReducer.createdAt))).toLocaleString()
    const updatedAt = new Date(Date.parse(useSelector(state => state.userReducer.updatedAt))).toLocaleString()

    const [showForm, setShowForm] = useState(true)

    const validate = () => {

        let newFisrtNameErrorMessage = '';
        let newLastNameErrorMessage = '';
        let newEmailErrorMessage = '';
        let newPasswordErrorMessage = '';

        if (!newFirstName) { newFisrtNameErrorMessage = 'This field cannot be left empty.' };
        if (!newLastName) { newLastNameErrorMessage = 'This field cannot be left empty.' };
        if (!newEmail) { newEmailErrorMessage = 'This field cannot be left empty.' };
        if (!newPassword) { newPasswordErrorMessage = 'This field cannot be left empty.' };


        if (newFisrtNameErrorMessage ||
            newLastNameErrorMessage ||
            newEmailErrorMessage ||
            newPasswordErrorMessage
        ) {
            setNewFirstNameError(newFisrtNameErrorMessage);
            setNewLastNameError(newLastNameErrorMessage);
            setNewEmailError(newEmailErrorMessage);
            setNewPasswordError(newPasswordErrorMessage);
            return false;
        }

        return true;
    }

    useEffect(() => {
        document.title = `Argent Bank - ${firstName} ${lastName}`
    }, [firstName, lastName])

    const handleClick = () => {
        setShowForm(false)
    }

    /* const handleClickEdit = (event) => {
         event.preventDefault()
         history.push({pathname: `/edit-profile/${id}/${(firstName).toLowerCase()}`})
     }*/
    const handleSubmit = (event) => {
        event.preventDefault();

        const isFormValid = validate();
        if (isFormValid) dispatch(modifyName(token, newFirstName, newLastName));
    }

     if(!firstName) {
        history.push({ pathname: `/` })
        return <Home />
    }

    return (
        <>
            <NavMain />
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back <br />
                        {
                            showForm ? firstName + ' ' + lastName + ' !' :
                                <form className='bloc-form-edit' onSubmit={(e)=>handleSubmit(e)}>
                                    <div className='bloc-name'>
                                        <label htmlFor="firstName">Fisrt Name</label>
                                        <input
                                            type='text'
                                            id='firstName'
                                            name='firstName'
                                            placeholder={firstName}
                                            value={newFirstName}
                                            onChange={(event) => setNewFirstName(event.target.value)}
                                        />
                                        {newFirstNameError ? <div className="form-error">{newFirstNameError}</div> : null}
                                        <label htmlFor="lastName">Last Name</label>
                                        <input
                                            type='text'
                                            id='lastName'
                                            name='lastName'
                                            placeholder={lastName}
                                            onChange={(event) => setNewLastName(event.target.value)}
                                        />
                                        {newLastNameError ? <div className="form-error">{newLastNameError}</div> : null}
                                    </div>
                                    <div className='bloc-email'>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type='email'
                                            id='email'
                                            name='email'
                                            placeholder={email}
                                            value={newEmail}
                                            onChange={(event) => setNewEmail(event.target.value)}
                                        />
                                        {newEmailError ? <div className="form-error">{newEmailError}</div> : null}                                          <label htmlFor="password">Password</label>
                                        <input
                                            type='password'
                                            id='password'
                                            name='password'
                                            placeholder={password}
                                            value={newPassword}
                                            onChange={(event) => setNewPassword(event.target.value)}
                                        />
                                        {newPasswordError ? <div className="form-error">{newPasswordError}</div> : null}
                                    </div>
                                    <button type='submit'>Save</button>
                                    {status && status !== 200 ? <h3 className="error-login">{message}</h3> : null }
                                </form>
                        }
                    </h1>
                    <button className={'edit-button ' + showForm ? 'formEdit' : 'noFormEdit'} onClick={handleClick}>
                        Edit Name
                    </button>
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p className="account-amount">184.30</p>
                        <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            </main>
            <Footer />
        </>

    )
}

export default UserProfile