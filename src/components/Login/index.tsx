import React, { useEffect, useState } from 'react';
import { Button, Input, Textarea, ThemeType } from 'basicui'
import './style.scss';
import { ArticleType } from 'reach';
import { userSignin } from './service';
import { setSessionValue } from '../../utils/SessionUtils';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth } from '../../store/actions/AuthActions';
import ioakblogBlack from '../../images/ioakblog_black.svg';
import ioakblogWhite from '../../images/ioakblog_white.svg';

interface Props {
}
const Login = (props: Props) => {
  var showForgotPwd:boolean = false;

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

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
    });
  }

  const openforgotPwd = () => {
    return showForgotPwd = true;
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
        <form>
          <Input value={state.email} className="login-form__input" name="email" onInput={handleChange} />
          <Input value={state.password} className="login-form__input" type="password" name="password" onInput={handleChange} />
          <span className="forgot_password_link"><a onClick={openforgotPwd}>Forgot password?</a></span>
          <div className="login__action-bar">
            <Button onClick={signin} theme={ThemeType.primary}>Login</Button>
          </div>
        </form>
        {showForgotPwd &&
          <form>
            <Input value={state.email} className="login-form__input" name="email" onInput={handleChange} />
            <div className="login__action-bar">
              <Button onClick={signin} theme={ThemeType.primary}>Submit</Button>
            </div>
          </form>
        }
      </div>
    </div>
  );
};

export default Login;
