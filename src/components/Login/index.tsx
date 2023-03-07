import React, { useEffect, useState } from 'react';
import { Button, Input, Textarea, ThemeType } from 'basicui'
import './style.scss';
import { ArticleType } from 'reach';
import { userSignin } from './service';
import { setSessionValue } from '../../utils/SessionUtils';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../store/actions/AuthActions';

interface Props {
}
const Login = (props: Props) => {

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

  const cancel = () => {

  }

  return (
    <div className="login">
      <form>
        <Input value={state.email} name="email" label='Username' onInput={handleChange} />
        <Input value={state.password} type="password" name="password" label='Password' onInput={handleChange} />
        <div className="login__action-bar">
          <Button onClick={signin} theme={ThemeType.primary}>Sign in</Button>
          <Button onClick={cancel}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
