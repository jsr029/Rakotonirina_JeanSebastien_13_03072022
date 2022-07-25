import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import { baseUrl } from '../../App';
import { ErrorMessage } from '@hookform/error-message';
import { getAllPosts } from '../../actions';

const LoginCPT = ({ getAllPosts, posts }) => {
    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [formData, setForm] = useState(
        JSON.parse(localStorage.getItem('form-Data')) || false
    )
    const [message, setMessage] = useState('')
    const history = useHistory()

    function handleChange(e) {
        e.preventDefault()
        setForm({
            email: e.target.value.trim(),
            password: e.target.value,
        })
    }
    function onSubmit(data) {
        axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            url: baseUrl + '/login',
        })
            .then(function (response) {
                localStorage.setItem('form-Data', JSON.stringify(
                    {
                        'data': response.config.data,
                        'token': response.data.body.token
                    }
                ));
                if (formData) {
                    setForm({
                        data: response.config.data,
                        token: response.data.body.token
                    })
                }
                history.push("/user")
                setMessage('You are logged in.')
                console.log(response);
            })
            .catch(function (error) {
                setMessage('You are not logged in.')
                console.log(error);
            });
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In </h1>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            {...register("email", {
                                required: 'This field is required',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    massage: 'Invlaid format email, try again !'
                                },
                                isEmpty: false
                            })}
                            onChange={() => handleChange}
                        />
                        {errors.email?.message && (
                            <ErrorMessage errorMessage={errors.email?.message} />
                        )}

                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={() => handleChange}
                            {...register("password", {
                                minLength: 8,
                                required: 'This field is required',
                                isEmpty: false
                            })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {/** PLACEHOLDER DUE TO STATIC SITE */}
                    <input type="submit" className="sign-in-button" value="Sign-in" />
                    <div>Create a count ? <Link to='/sign-up'>Sign-Up</Link></div>
                    {/** SHOULD BE THE BUTTON BELOW */}
                    {/** <button className="sign-in-button">Sign In</button> */}
                    <div className='message'>{message ? message : ''}</div>
                </form>
            </section>
        </main>
    );
};

export default LoginCPT;