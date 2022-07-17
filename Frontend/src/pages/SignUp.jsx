import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Footer from '../components/Footer';
import NavMain from '../components/NavMain';
import { baseUrl } from '../App';

function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setForm] = useState(
    JSON.parse(localStorage.getItem('signUp')) || false
  )
  const [message, setMessage] = useState('')
  const history = useHistory()

  function handleChange(e) {
    setForm({
      firstname: e.target.value,
      lastname: e.targe.value,
      email: e.target.value.trim(),
      password: e.target.value,
    })
  }
  function onSubmit(data, config) {
    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      url: baseUrl + '/signup',
      data: {
        ...data,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password
      },
    })
      .then(function (response) {
        localStorage.setItem('signUp', JSON.stringify(
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
    <>
      <NavMain message={message} />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="input-wrapper">
              <label htmlFor="email">Fisrt Name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                {...register("firstname")}
                onChange={() => handleChange}
              />              
              <label htmlFor="email">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lstaname"
                value={formData.lastname}
                {...register("lastname")}
                onChange={() => handleChange}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                {...register("email")}
                onChange={() => handleChange}
              />
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
            <div className='message'>{message ? message : ''}</div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SignUp;