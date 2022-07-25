import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../../actions';
import { decrement } from '../../actions';
import { reset } from '../../actions';

const Footer = () => {
    const counter = useSelector(state => state.counter)
    const dispatch = useDispatch()
    return (
        <footer className="footer">
            <p className="footer-text">Copyright 2020 Argent Bank</p>
            <div className='footer-counter'>
                <h2>Counter {counter}</h2>
                <div className='footer-counter-button'>
                    <button onClick={() => dispatch(decrement())}>-</button>
                    <button onClick={() => dispatch(reset())}>Reset</button>
                    <button onClick={() => dispatch(increment())}>+</button>
                </div>
             </div>
        </footer>
    );
};

export default Footer;