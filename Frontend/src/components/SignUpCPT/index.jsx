import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { baseUrl } from '../../App';

const SignUpCPT = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [formData, setForm] = useState(
      JSON.parse(localStorage.getItem('signUp')) || false
    )
    const [message, setMessage] = useState('')
    const history = useHistory()
  
    function handleChange(e) {
      setForm({
        firstName: e.target.value,
        lastName: e.targe.value,
        email: e.target.value.trim(),
        password: e.target.value,
      })
    }
    function onSubmit(data) {
      axios({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        url: baseUrl + '/signup',
        data: {
          ...data,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password
        },
      })
        .then(function (response) {
          console.log(response)
          localStorage.setItem('signUp', JSON.stringify(
            {
              data: response.config.data
            }
          ));
          setForm({
            data: response.config.data
          })
          history.push("/")
          setMessage('You are registered.')
          console.log(response);
        })
        .catch(function (error) {
          setMessage('You are not registered.')
          console.log(error);
        });
    }
  
    return (
        <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign Up</h1>
          <form onSubmit={() => handleSubmit(onSubmit)} >
            <div className="input-wrapper">
              <label htmlFor="email">Fisrt Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                {...register("firstName")}
                onChange={() => handleChange}
              />
              {errors.firstName && <p>{errors.firstName.message}</p>}
              <label htmlFor="email">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                {...register("lastName")}
                onChange={() => handleChange}
              />
              {errors.lastName && <p>{errors.lastName.message}</p>}
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                {...register("email")}
                onChange={() => handleChange}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={() => handleChange}
                {...register("password")}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {/** PLACEHOLDER DUE TO STATIC SITE */}
            <input type="submit" className="sign-in-button" value="Sign-Up" />
            {/** SHOULD BE THE BUTTON BELOW */}
            {/** <button className="sign-in-button">Sign In</button> */}
            <div>{message}</div>
          </form>
        </section>
      </main>
    );
};

export default SignUpCPT;