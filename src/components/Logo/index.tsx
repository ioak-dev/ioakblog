import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import './style.scss';
import ioakblogBlack from '../../images/ioakblog_black.svg';
import ioakblogWhite from '../../images/ioakblog_white.svg';

interface Props {
  variant: 'full' | 'short';
}

const Logo = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  return (
    <div className="logo">
      <div className="logo--image">
        {profile.theme === 'basicui-light' && (
          <img src={ioakblogWhite} alt="Ioakblog logo" />
        )}
        {profile.theme !== 'basicui-light' && (
          <img src={ioakblogWhite} alt="Ioakblog logo" />
        )}
      </div>
    </div>
  );
};

export default Logo;
