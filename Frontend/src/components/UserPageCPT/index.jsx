import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { baseUrl } from '../../App';
import useFetchUser from '../functions/useFetchUser';

const UserPageCPT = () => {
  const history = useHistory()
  const response = JSON.parse(localStorage.getItem('form-Data'))
  const data = response.data
  const dataSplit = data.split(',')[0]
  const dataSplit2 = data.split(',')[1]
  const password = dataSplit2.split(':')[1].split('"')[1]
  const email = dataSplit.split(':')[1].split('"')[1]
  const firstName = email.split('@')[0].replace('"', '')
  const lastName = email.split('@')[1].replace('"', '').split('.')[0]
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('')
  const token = response.token
  const [showForm, setShowForm] = useState(true)
  const { initialData, isLoading, error } = useFetchUser()
  const [formData, setForm] = useState({})
  
  function handleClick() {
    setShowForm((prevState) => (!prevState))
    setForm(formData)
  }
  function onFocus(e) {
    setForm({
      firstName: e.target.value,
      lastName: e.taget.value,
      email: e.target.value,
      password: e.target.value
    })
  }
  function handleChange(e) {
    e.preventDefault()
      setForm({
        firstName: e.target.value,
        lastName: e.taget.value,
        email: e.target.value,
        password: e.target.value
      })
  }
  function onSubmit(data) {
    axios({
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
        history.push("/user")
        setMessage('saved.')
        console.log(response);
      })
      .catch(function (error) {
        setMessage('not saved.')
        console.log(error);
      });
  }
  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />
          {
            showForm ? firstName + ' ' + lastName + ' !' :
              <form className='bloc-form-edit'>
                <div className='bloc-name'>
                  <label htmlFor="firstName">Fisrt Name</label>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    placeholder={firstName}
                    {...register("firstName", {required : true})}
                    onChange={()=>handleChange}
                    onFocus={(e) => e.target.value = formData.firstName}
                  />
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    placeholder={lastName}
                    {...register("lastName")}
                    onChange={() => handleChange}
                    onFocus={(e) => e.target.value = ''}
                  />
                </div>
                <div className='bloc-email'>
                  <label htmlFor="email">Email</label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder={email}
                    {...register("email")}
                    onChange={() => handleChange}
                    onFocus={(e) => e.target.value = ''}
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    type='text'
                    id='password'
                    name='password'
                    placeholder={password}
                    {...register("password")}
                    onChange={() => handleChange()}
                     onFocus={(e) => e.target.value = ''}
                 />
                </div>
                <button onClick={() => handleSubmit(onSubmit)}>Save</button>
              </form>
          }
        </h1>
        <button className={'edit-button ' + showForm ? 'formEdit' : 'noFormEdit'} onClick={handleClick}>
          Edit Name
        </button>
        <div className='message'>{message}</div>
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
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default UserPageCPT;