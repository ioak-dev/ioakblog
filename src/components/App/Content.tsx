import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Link, BrowserRouter, HashRouter } from 'react-router-dom';
import Home from '../Home';
import Landing from '../Landing';
import Navigation from '../Navigation';
import Init from './Init';
import './style.scss';

type Props = {
    cookies?: any
}

function Content({ cookies }: Props) {

    const profile = useSelector((state: any) => state.profile);

    return (
        <div className={`content ${profile.theme === "basicui-dark" ? "basicui-dark reach-dark" : "basicui-light reach-light"}`}>
            <HashRouter>
                <Init />
                {/* <Navigation /> */}
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="landing" element={<Landing />} />
                    <Route path="/" element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="*" element={<p>There's nothing here: 404!</p>} />
                </Routes>
            </HashRouter>
        </div>
    );
};

export default Content;
