import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Footer from '../components/Footer';
import NavMain from '../components/NavMain';
import { baseUrl } from '../App';

const UserPage = () => {
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
  const initialData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
    }
  const [formData, setForm] = useState(initialData)
    function handleClick() {
      setShowForm((prevState) => (!prevState))
    }
    function handleChange(e) {
    setForm(formData)
  }
  function onSubmit(data) {
    axios({
      method: 'post',
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
    <>
      <NavMain message={firstName} logout={<FontAwesomeIcon icon={faRightFromBracket} />} />
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />
            {
              showForm ? firstName + ' ' + lastName + ' !' :
                <form className='bloc-form-edit' onSubmit={() => handleSubmit(onSubmit)}>
                  <div className='bloc-name'>
                    <label htmlFor="firstName">Fisrt Name</label>
                    <input
                      type='text'
                      id='firstName'
                      name='firstName'
                      value={firstName}
                      {...register("firstName")}
                      onChange={handleChange} 
                       />
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                    type='text' 
                    id='lastName' 
                    name='lastName' 
                    value={lastName}
                      {...register("lastName")}
                      onChange={() => handleChange} 
                       />
                  </div>
                  <div className='bloc-email'>
                    <label htmlFor="email">Email</label>
                    <input 
                      type='email' 
                      id='email' 
                      name='email' 
                      value={email}
                        {...register("email")}
                        onChange={() => handleChange}
                         />
                    <label htmlFor="password">Password</label>
                    <input 
                      type='password' 
                      id='password' 
                      name='password' 
                      value={password}
                        {...register("password")}
                        onChange={() => handleChange()}
                         />
                  </div>
                  <button>Save</button>
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
      <Footer />
    </>
  );
};

export default UserPage;