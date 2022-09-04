import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { Link } from 'react-router-dom'
import { loginUser, reset, showRememberMe } from '../../actions'
import { history } from '../../App';
import Footer from '../Footer'
import NavMain from '../NavMain'

function SignIn() {

  const dispatch = useDispatch()
  const { formState: { errors }, register, handleSubmit } = useForm();

  const status = useSelector(state => state.loginReducer.status)
  const message = useSelector(state => state.loginReducer.message)

  const rmb = useSelector(state => state.showRememberMeReducer)

  const handleClick = (e) => {
    dispatch(showRememberMe())
    history.push('/user')
  }
  const onSubmit = (data) => {
    //console.log(data)
    dispatch(loginUser(data.email, data.password, data.rememberMe))
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='input-wrapper'>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register('email', { required: "Email is required" })}
              />
              <ErrorMessage errors={errors} name="email" />
            </div>
            <div className='input-wrapper'>
              <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  {...register('password', { required: "Password is required" })}
                />
                <ErrorMessage errors={errors} name="password" />
            </div>
            <div className="input-remember">
              <input 
                type="checkbox" 
                id="rememberMe" 
                {...register('rememberMe')}
              />
              <label htmlFor="remember-me">Remember me</label>
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