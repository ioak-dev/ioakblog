import React, { useEffect, useState } from 'react';
import { Button, Input, Textarea, ThemeType } from 'basicui'
import './style.scss';
import { ArticleType } from 'reach';
import { forgotPassword, userSignin } from './service';
import { setSessionValue } from '../../utils/SessionUtils';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth } from '../../store/actions/AuthActions';
import ioakblogBlack from '../../images/ioakblog_black.svg';
import ioakblogWhite from '../../images/ioakblog_white.svg';
import { useNavigate } from 'react-router-dom';

interface Props {
}
const Login = (props: Props) => {
  const [showForgotPwd, setShowForgotPwd] = useState(false);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "", password: ""
  });

  const handleChange = (event: any) => {
    setState({...state, [event.currentTarget.name]: event.currentTarget.value});
  }

  const signin = () => {
    console.log(state);
    userSignin(state).then((data) => {
      dispatch(addAuth(data));
      navigate('/home');
    });
  }

  const openforgotPwd = () => {
    setShowForgotPwd(true);
  }

  const closeforgotPwd = () => {
    setShowForgotPwd(false);
  }

  const forgotPwd = () => {
    console.log(state);
    const payload = {email: state.email};
    forgotPassword(payload).then((data) => {
      console.log(data);
    });
  }

  return (
    <div className="login_container">
      <div className="login">
        {profile.theme === 'basicui-light' && (
          <img src={ioakblogWhite} alt="Ioakblog logo" />
        )}
        {profile.theme !== 'basicui-light' && (
          <img src={ioakblogBlack} alt="Ioakblog logo" />
        )}
        {!showForgotPwd &&
          <form>
            <Input value={state.email} className="login-form__input" name="email" onInput={handleChange} />
            <Input value={state.password} className="login-form__input" type="password" name="password" onInput={handleChange} />
            <span className="forgot_password_link"><a onClick={openforgotPwd}>Forgot password?</a></span>
            <div className="login__action-bar">
              <Button onClick={signin} theme={ThemeType.primary}>Login</Button>
            </div>
          </form>
        }
        {showForgotPwd &&
          <form>
            <Input value={state.email} className="login-form__input" name="email" onInput={handleChange} />
            <span className="forgot_password_link"><a onClick={closeforgotPwd}>Sign In!</a></span>
            <div className="login__action-bar">
              <Button onClick={forgotPwd} theme={ThemeType.primary}>Submit</Button>
            </div>
          </form>
        }
      </div>
    </div>
  );
};

export default Login;
