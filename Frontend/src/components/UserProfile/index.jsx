import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { modifyName } from "../../actions"
import NavMain from '../NavMain'
import Footer from '../Footer'
import Home from '../../pages/Home'
import { history } from '../../App'

function UserProfile() {
    const dispatch = useDispatch();

    const status = useSelector(state => state.loginReducer.status);
    const message = useSelector(state => state.loginReducer.message);

    const token = useSelector(state => state.loginReducer.token);
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');

    const [newFirstNameError, setNewFirstNameError] = useState('');
    const [newLastNameError, setNewLastNameError] = useState('');

    const firstName = useSelector(state => state.userReducer.firstName)
    const lastName = useSelector(state => state.userReducer.lastName)
    //const id = useSelector(state => state.userReducer.id)
    const [showForm, setShowForm] = useState(true)

    const validate = () => {

        let newFisrtNameErrorMessage = '';
        let newLastNameErrorMessage = '';

        if (!newFirstName) { newFisrtNameErrorMessage = 'This field cannot be left empty.' };
        if (!newLastName) { newLastNameErrorMessage = 'This field cannot be left empty.' };


        if (newFisrtNameErrorMessage ||
            newLastNameErrorMessage 
        ) {
            setNewFirstNameError(newFisrtNameErrorMessage);
            setNewLastNameError(newLastNameErrorMessage);
            return false;
        }

        return true;
    }

    useEffect(() => {
        document.title = `Argent Bank - ${firstName} ${lastName}`
    }, [firstName, lastName])

    const handleClick = () => {
        setShowForm(prevState => !prevState)
    }

     /*const handleClickEdit = (event) => {
         event.preventDefault()
         history.push({pathname: `/edit-profile/${id}/${(firstName).toLowerCase()}`})
     }*/
     
    const handleSubmit = (event) => {
        event.preventDefault();
        const isFormValid = validate();
        if (isFormValid) dispatch(modifyName(token, newFirstName, newLastName));
        history.push('/sign-in')
    }

     /*if(!firstName) {
        history.push({ pathname: `/` })
        return <Home />
    }*/

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
                                    <button type='submit'>Save</button>
                                    {status && status !== 200 ? <h3 className="error-login">{message}</h3> : null }
                                </form>
                        }
                    </h1>
                    <button className={'edit-button ' + showForm ? 'formEdit' : 'noFormEdit'} onClick={()=>handleClick()}>
                        Edit Panel
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