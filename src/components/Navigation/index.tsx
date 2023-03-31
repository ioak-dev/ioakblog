import { Button } from 'basicui';
import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { removeAuth } from '../../store/actions/AuthActions';
import { removeSessionValue } from '../../utils/SessionUtils';
import DarkModeIcon from '../DarkModeIcon';
import Logo from '../Logo';
import './style.scss';

const Topbar = () => {
    const authorization = useSelector((state: any) => state.authorization);
    const dispatch = useDispatch();
  
    const navigate = useNavigate();

    const logout = () => {
        dispatch(removeAuth());
        navigate("/login");
    }

    return (
        <div className='topbar'>
            <div className="topbar__left">
                <Logo variant='full' />
                <nav className="topbar__links">
                    {authorization.isAuth && <Link className="topbar__link" to="/home">Home</Link>}
                    {authorization.isAuth && <Link className="topbar__link" to="/newpost">New post</Link>}
                </nav>
            </div>
            <div className="topbar__right">
                <DarkModeIcon />
                {authorization.firstName}
                {!authorization.isAuth && <Link className="topbar__link" to="/login">Sign in</Link>}
                {authorization.isAuth && <Button onClick={logout}>Logout</Button>}
            </div>
        </div>)
}

export default Topbar;