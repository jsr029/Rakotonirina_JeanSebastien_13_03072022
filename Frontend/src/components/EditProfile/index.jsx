import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { modifyName } from "../../actions";
import NavMain from "../NavMain"; 
import Footer from '../Footer';


function EditProfile() {

    const dispatch = useDispatch();

    const status = useSelector(state => state.loginReducer.status);
    const message = useSelector(state => state.loginReducer.message);  

    const token = useSelector(state => state.loginReducer.token);
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');

    const [newFirstNameError, setNewFirstNameError] = useState('');
    const [newLastNameError, setNewLastNameError] = useState('');

    const validate = () => {

        let newFisrtNameErrorMessage = '';
        let newLastNameErrorMessage = '';

        if (!newFirstName) { newFisrtNameErrorMessage = 'This field cannot be left empty.' };
        if (!newLastName) { newLastNameErrorMessage = 'This field cannot be left empty.' };

        if (newFisrtNameErrorMessage || newLastNameErrorMessage) {
            setNewFirstNameError(newFisrtNameErrorMessage);
            setNewLastNameError(newLastNameErrorMessage);
            return false;
        }

        return true;
    };
   
    const handleSubmit = (event) => {
        event.preventDefault();
        const isFormValid = validate();
        if(isFormValid) dispatch(modifyName(token, newFirstName, newLastName));
    }

    return (
        <>
            <NavMain />
            <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-edit sign-in-icon"></i>
                <h1>Edit Your Personal Infos</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Your New First Name</label>
                        <input
                            placeholder="First Name"
                            name="firstName"
                            type="text"
                            id="firstName"
                            value={newFirstName}
                            onChange={(event) => setNewFirstName(event.target.value)}
                        />
                        { newFirstNameError ? <div className="form-error">{newFirstNameError}</div> : null  }  
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="lastName">Your New Last Name</label>
                        <input
                            placeholder="Last Name"
                            name="lastName"
                            type="text"
                            id="lastName"
                            value={newLastName}
                            onChange={(event) => setNewLastName(event.target.value)}
                        />
                        { newLastNameError ? <div className="form-error">{newLastNameError}</div> : null  }  
                    </div>
                    <button className="sign-in-button" type="submit">Edit</button>
                </form>
                {status && status !== 200 ? <h3 className="error-login">{message}</h3> : null }
                </section>
            </main>
            <Footer />
            </>
        )
}

export default EditProfile;