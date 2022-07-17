import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import Footer from '../components/Footer';
import NavMain from '../components/NavMain';
import { baseUrl } from '../App';

function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [formData, setForm] = useState(
    JSON.parse(localStorage.getItem('form-Data')) || false
  )
  const [message, setMessage] = useState('')
  const history = useHistory()
  console.log(watch("email"))

  function handleChange(e) {
    setForm({
      email: e.target.value.trim(),
      password: e.target.value,
    })
  }
  function onSubmit(data, config) {
    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      url: baseUrl + '/login',
      data: {
        ...data,
        email: data.email,
        password: data.password,
        token: data.body
      },
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
    <>
      <NavMain message={message} />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="input-wrapper">
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
            <input type="submit" className="sign-in-button" value="Sign-in" />
            <div>Create a count ? <Link to='/sign-up'>Sign-Up</Link></div>
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

export default Login;