import NavMain from '../NavMain'
import Footer from '../Footer'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signUpUser, reset } from '../../actions'

function SignUp() {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [repeatPasswordError, setRepeatPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')

    const status = useSelector(state => state.loginReducer.status)
    const message = useSelector(state => state.loginReducer.message)

    const validate = () => {

        let firstNameErrorMessage = ''
        let lastNameErrorMessage = ''
        let passwordErrorMessage = ''
        let repeatPasswordErrorMessage = ''
        let emailErrorMessage = ''

        if (!firstName) { firstNameErrorMessage = 'This field cannot be left empty.' }
        if (!lastName) { lastNameErrorMessage = 'This field cannot be left empty.' }
        if (!email) { emailErrorMessage = 'This field cannot be left empty.' }
        if (email && !email.includes('@')) { emailErrorMessage = 'Enter a valid email.' }
        if (!password) { passwordErrorMessage = 'You must choose a password.' }
        if (password !== repeatPassword) { repeatPasswordErrorMessage = 'Passwords must match.' }
        if (firstNameErrorMessage || lastNameErrorMessage || passwordErrorMessage || repeatPasswordErrorMessage || emailErrorMessage) {

            setFirstNameError(firstNameErrorMessage)
            setLastNameError(lastNameErrorMessage)
            setPasswordError(passwordErrorMessage)
            setRepeatPasswordError(repeatPasswordErrorMessage)
            setEmailError(emailErrorMessage)
            return false
        }
        return true
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = validate()
        if (isValid) dispatch(signUpUser(email, password, firstName, lastName))
    }

    useEffect(() => {
        document.title = "Argent Bank - Sign Up"
        dispatch(reset())
    }, [dispatch])

    return (
        <>
            <NavMain />
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-plus sign-up-icon"></i>
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                placeholder="First Name"
                                name="fistName"
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                            {firstNameError ? <div className="form-error">{firstNameError}</div> : null}
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                placeholder="Last Name"
                                name="lastName"
                                type="text"
                                id="LastName"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                            {lastNameError ? <div className="form-error">{lastNameError}</div> : null}
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input
                                placeholder="Email"
                                name="email"
                                type="mail"
                                id="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            {emailError ? <div className="form-error">{emailError}</div> : null}
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                placeholder="Password"
                                name="password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            {passwordError ? <div className="form-error">{passwordError}</div> : null}
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="repeatPassword">Repeat password</label>
                            <input
                                placeholder="Repeat password"
                                name="repeatPassword"
                                type="password"
                                id="repeatPassword"
                                value={repeatPassword}
                                onChange={(event) => setRepeatPassword(event.target.value)}
                            />
                            {repeatPasswordError ? <div className="form-error">{repeatPasswordError}</div> : null}
                        </div>

                        <button className="sign-in-button" type="submit">Sign Up</button>
                    </form>
                    {status && status !== 200 ? <h3 className="error-login">{message}</h3> : null}
                </section>
            </main>
            <Footer />
        </>
    )
}

export default SignUp