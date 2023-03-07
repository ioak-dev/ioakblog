import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faMoneyBill,
  faMoon,
  faSun,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { setProfile } from '../../store/actions/ProfileActions';

const DarkModeIcon = () => {
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const toggleMode = () => {
    dispatch(
      setProfile({
        theme: profile.theme === 'basicui-dark' ? 'basicui-light' : 'basicui-dark',
      })
    );

    sessionStorage.setItem(
      'fortuna_pref_profile_colormode',
      profile.theme === 'basicui-dark' ? 'basicui-light' : 'basicui-dark'
    );
  };
  return (
    <button className={`dark-mode-icon ${profile.theme}`} onClick={toggleMode}>
      {profile.theme === 'basicui-dark' && <FontAwesomeIcon icon={faSun} />}
      {profile.theme !== 'basicui-dark' && (
        <FontAwesomeIcon icon={faMoon} />
      )}
    </button>
  );
};

export default DarkModeIcon;
