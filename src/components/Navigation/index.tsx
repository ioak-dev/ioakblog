import React from 'react';
import { Link } from "react-router-dom";
import DarkModeIcon from '../DarkModeIcon';
import Logo from '../Logo';
import './style.scss';

const Topbar = () => (
    <div className='topbar'>
        <div className="topbar__left">
            <Logo variant='full' />
            <nav className="topbar__links">
                <Link className="topbar__link" to="/home">Home</Link>
                <Link className="topbar__link" to="/admin">Admin</Link>
            </nav>
        </div>
        <div>
            <DarkModeIcon />
        </div>
    </div>
);

export default Topbar;