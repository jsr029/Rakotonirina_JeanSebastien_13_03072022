import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Footer from '../components/Footer';
import NavMain from '../components/NavMain';

const UserPage = () => {
  const response = JSON.parse(localStorage.getItem('form-Data'))
  console.log(response.data)
  const data = response.data
  const dataSplit = data.split(',')[0]
  const email = dataSplit.split(':')[1]
  const firstName = email.split('@')[0].replace('"', '')
  const lastName = email.split('@')[1].replace('"', '').split('.')[0]
  console.log(firstName, lastName)
      return (
        <>
        <NavMain message={firstName} logout={<FontAwesomeIcon icon={faRightFromBracket} />}/>
        <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{firstName} {lastName} !</h1>
          <button className="edit-button">Edit Name</button>
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