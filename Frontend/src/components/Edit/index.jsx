import React, { useState } from 'react'
import axios from 'axios';
import { baseUrl } from '../../App';
import { useForm } from 'react-hook-form';

function Edit() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setForm] = useState(
    JSON.parse(localStorage.getItem('signUp')) || false
  )
  const [message, setMessage] = useState('')    
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
      headers: { 
        'Content-Type': 'application/json' 
      },
      url: baseUrl + '/profile',
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
        //history.push("/")
        setMessage('You are registered.')
        console.log(response);
      })
      .catch(function (error) {
        setMessage('You are not registered.')
        console.log(error);
      });
  }

  return (
        <div className="header">
          <form onSubmit={() => handleSubmit(onSubmit)} >
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                {...register("firstName")}
                onChange={() => handleChange}
              />
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                {...register("lastName")}
                onChange={() => handleChange}
              />
            </form>
        </div>
    );
};

export default Edit;