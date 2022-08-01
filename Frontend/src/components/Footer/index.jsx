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
        </footer>
    );
};

export default Footer;