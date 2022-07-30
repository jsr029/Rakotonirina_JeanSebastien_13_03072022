import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import NavMain from '../NavMain'
import Footer from '../Footer'
import Home from '../../pages/Home'


function UserProfile({ history }) {

    const firstName = useSelector(state => state.userReducer.firstName)
    const lastName = useSelector(state => state.userReducer.lastName)
    const id = useSelector(state => state.userReducer.id)
    const creationDate = new Date(Date.parse(useSelector(state => state.userReducer.createdAt))).toLocaleString()
    const updatedAt = new Date(Date.parse(useSelector(state => state.userReducer.updatedAt))).toLocaleString()

     useEffect(() => {
         document.title = `Argent Bank - ${firstName} ${lastName}`  
    }, [firstName, lastName]) 

    const handleClickEdit = (event) => {
        event.preventDefault()
        history.push({pathname: `/edit-profile/${(firstName).toLowerCase()}`})
    }

    if (!firstName) {
        history.push({pathname: `/`})
        return <Home />
    } 
  
    return (
        <>
            <NavMain />
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br /> {firstName} {lastName} !</h1>
                    <button className="edit-button" onClick={handleClickEdit}>Edit Name</button>
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">${new Intl.NumberFormat('en-EN').format((Math.random() * (10603 - 249) + 249).toFixed(2))}</p>
                    <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">${new Intl.NumberFormat('en-EN').format((Math.random() * (12698 - 1045) + 1045).toFixed(2))}</p>
                    <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">${new Intl.NumberFormat('en-EN').format((Math.random() * (603 - 24) + 24).toFixed(2))}</p>
                    <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <div className="customer-info">
                    <p>Member ID : {id}</p>
                    <p>Member since : {creationDate} </p>
                    <p>Last modified : {updatedAt}</p>
                </div>
            </main>
            <Footer />
        </>
        
    )
}

export default UserProfile