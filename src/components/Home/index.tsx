import React, { useEffect, useState } from 'react';
import './style.scss';
import Logo from '../Logo';
import DarkModeIcon from '../DarkModeIcon';
import PageView from './PageView';
import Navigation from '../Navigation';

interface Props {
}
const Home = (props: Props) => {

  return (
    <div className="page-home">
      <div className='page-home__body'>
        <PageView />
      </div>
    </div>
  );
};

export default Home;
