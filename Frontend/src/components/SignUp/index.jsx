import NavMain from '../NavMain'
import Footer from '../Footer'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { signUpUser, reset } from '../../actions'
import { toast } from 'react-toastify';

function SignUp() {

    const dispatch = useDispatch()
    const { formState: { errors }, register, handleSubmit } = useForm();

    const status = useSelector(state => state.loginReducer.status)
    const message = useSelector(state => state.loginReducer.message)

    const onSubmit = (data) => {
        console.log(data)
        if(data.password === data.repeatPassword) {
        dispatch(signUpUser(data.email, data.password, data.firstName, data.lastName))
        }else{
            toast.error('Passwords mismacthed')
        }
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-wrapper">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                placeholder="First Name"
                                name="fistName"
                                type="text"
                                id="firstName"
                                {...register('firstName', { required: "Firstname is required" })}
                                />
                                <ErrorMessage errors={errors} name="firstName" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                placeholder="Last Name"
                                name="lastName"
                                type="text"
                                id="LastName"
                                {...register('lastName', { required: "Lastname is required" })}
                                />
                                <ErrorMessage errors={errors} name="lastName" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input
                                placeholder="Email"
                                name="email"
                                type="mail"
                                id="email"
                                {...register('email', { required: "Email is required" })}
                                />
                                <ErrorMessage errors={errors} name="email" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                placeholder="Password"
                                name="password"
                                type="password"
                                id="password"
                                {...register('password', { required: "Password is required" })}
                                />
                                <ErrorMessage errors={errors} name="password" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="repeatPassword">Repeat password</label>
                            <input
                                placeholder="Repeat password"
                                name="repeatPassword"
                                type="password"
                                id="repeatPassword"
                                {...register('repeatPassword', { required: "Password confirm is required" })}
                                />
                                <ErrorMessage errors={errors} name="repeatPassword" />
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