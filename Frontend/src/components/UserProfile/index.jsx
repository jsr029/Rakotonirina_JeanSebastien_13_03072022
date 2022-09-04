import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { modifyName, showForm, buttonName, classButton } from "../../actions"
import NavMain from '../NavMain'
import Footer from '../Footer'
import { history } from '../../App'
//import showFormReducer from '../../reducers/showForm'

function UserProfile() {
    const dispatch = useDispatch();
    const { formState: { errors }, register, handleSubmit } = useForm();

    const status = useSelector(state => state.loginReducer.status);
    const message = useSelector(state => state.loginReducer.message);

    const firstName = useSelector(state => state.userReducer.firstName)
    const lastName = useSelector(state => state.userReducer.lastName)

    const showFormState = useSelector(state => state.showFormReducer)
    const classButtonState = useSelector(state => state.classButtonReducer)
    const buttonNameState = useSelector(state => state.buttonNameReducer)

    const token = useSelector(state => state.loginReducer.token);

    useEffect(() => {
        document.title = `Argent Bank - ${firstName} ${lastName}`
    }, [firstName, lastName])

    const handleClick = (evt) => {
        dispatch(showForm())
        dispatch(classButton())
        dispatch(buttonName())
    }

    const onSubmit = (data) => {
        dispatch(modifyName(token, data.newFirstName, data.newLastName))
        //history.push('/sign-in')
    }

    if (!firstName) {
        history.push({ pathname: `/sign-in` })
    }

    return (
        <>
            <NavMain />
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back <br />
                        {
                            showFormState ? firstName + ' ' + lastName + ' !' :
                                <form onSubmit={handleSubmit(onSubmit)} className='bloc-form-edit'>
                                    <div className='bloc-name'>
                                        <label htmlFor="newFirstName">Fisrt Name</label>
                                        <input
                                            type='text'
                                            id='newFirstName'
                                            name='newFirstName'
                                            placeholder={firstName}
                                            {...register("newFirstName", { required: "Firstname is required" })}
                                        />
                                        <ErrorMessage errors={errors} name="newFirstName" />
                                        <label htmlFor="newLastName">Last Name</label>
                                        <input
                                            type='text'
                                            id='newLastName'
                                            name='newLastName'
                                            placeholder={lastName}
                                            {...register("newLastName", { required: "Firstname is required" })}
                                        />
                                        <ErrorMessage errors={errors} name="newLastName" />
                                    </div>
                                    <button className='edit-button' type='submit'>Save</button>
                                    {status && status !== 200 ? <h3 className="error-login">{message}</h3> : null}
                                </form>
                        }
                    </h1>
                    <button className={`edit-button ${classButtonState ? "visiblePanel" : "invisiblePanel"}`} onClick={() => handleClick()}>
                        {buttonNameState ? 'Edit Name' : 'Cancel'}
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