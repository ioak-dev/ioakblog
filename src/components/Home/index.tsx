import React, { useEffect, useState } from 'react';
import './style.scss';
import { Select, SelectPropsConverter } from 'basicui';
import Generator from './Generator';
import { getSessionValue, setSessionValue, toNumber } from '../../utils/SessionUtils';
import * as Constants from './Constants';
import Logo from '../Logo';
import DarkModeIcon from '../DarkModeIcon';

interface Props {
}
const Home = (props: Props) => {

  return (
    <div className="page-home">
      <div className='page-home__header'>
        <Logo variant='full' />
        <DarkModeIcon />
      </div>
      <div className='page-home__body'>
        body
      </div>
    </div>
  );
};

export default Home;
