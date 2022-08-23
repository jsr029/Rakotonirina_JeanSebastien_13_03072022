import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser, reset, showRememberMe } from '../../actions'
import Footer from '../Footer'
import NavMain from '../NavMain'

function SignIn() {

  const dispatch = useDispatch()

  const status = useSelector(state => state.loginReducer.status)
  const message = useSelector(state => state.loginReducer.message)

  const userEmail = JSON.parse(localStorage.getItem('user')).userData.email
  const [email, setEmail] = useState(
    userEmail || ''
  )

  const [password, setPassword] = useState('')

  const rmb = useSelector(state => state.showRememberMeReducer)

  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')

  const validate = () => {

    let emailErrorMessage = ''
    let passwordErrorMessage = ''

    if (!email) { emailErrorMessage = 'Please, enter your email.' }
    if (email && !email.includes('@')) { emailErrorMessage = 'Please, enter a valid email.' }
    if (!password) { passwordErrorMessage = 'Please, enter your password.' }
    if (passwordErrorMessage || emailErrorMessage) {
      setEmailError(emailErrorMessage)
      setPasswordError(passwordErrorMessage)
      return false
    }

    return true
  }
  const handleClick = (e) => {
    dispatch(showRememberMe())
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const isFormValid = validate()
    if (isFormValid) dispatch(loginUser(email, password, rmb))
  }
  
  useEffect(() => {
    document.title = "Argent Bank - Sign In"
    dispatch(reset())
  }, [dispatch])

  return (
    <>
      <NavMain />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              {emailError ? <div className="form-error">{emailError}</div> : null}
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                id="password"
                value={password}

                onChange={(event) => setPassword(event.target.value)}
              />
              {passwordError ? <div className="form-error">{passwordError}</div> : null}
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" value={rmb ? "true" : "false"} onClick={(e) => handleClick(e)} /><label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" type="submit">Sign In</button>
            <div>Create a count ? <Link to='/sign-up'>Sign-Up</Link></div>

          </form>
          {status && status !== 200 ? <h3 className="error-login">{message}</h3> : null}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default SignIn