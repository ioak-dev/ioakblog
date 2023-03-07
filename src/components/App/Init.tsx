import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllRealms } from '../../store/actions/RealmActions';
import { receiveMessage, sendMessage } from '../../events/MessageService';
import { fetchAllClients } from '../../store/actions/ClientActions';
import { addAuth } from '../../store/actions/AuthActions';
import { getSessionValue, setSessionValue } from '../../utils/SessionUtils';
import { axiosInstance, httpPost } from '../../utils/RestTemplate';
import { getAllUsers } from './service';
import { addUser } from '../../store/actions/UserActions';

interface Props {
}
const Init = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  const [previousAuthorizationState, setPreviousAuthorizationState] =
    useState<any>();
  const [realm, setRealm] = useState<number>(100);
  const dispatch = useDispatch();

  useEffect(() => {
    const _authorization = JSON.parse(getSessionValue("IOAK_USER") || "{}");
    if (_authorization.isAuth) {
      dispatch(addAuth(_authorization));
    }
  }, []);

  useEffect(() => {
    if (authorization.isAuth) {
      getAllUsers().then((data: any[]) => {
        dispatch(addUser(data));
      })
    }
  }, [authorization]);

  useEffect(() => {
    if (
      authorization.isAuth &&
      authorization.isAuth !== previousAuthorizationState.isAuth
    ) {
      initializeHttpInterceptor();
      initialize();
    }
    setPreviousAuthorizationState(authorization);
  }, [authorization]);

  useEffect(() => {
    if (authorization.isAuth && realm) {
      initializeHttpInterceptor();
      initialize();
    }
  }, [realm]);

  useEffect(() => {
    receiveMessage().subscribe((event: any) => {
      if (event.name === 'realmChange' && realm !== event.data) {
        setRealm(event.data);
      }
    });
  }, []);

  useEffect(() => {
    // document.body.addEventListener('mousedown', () => {
    //   sendMessage('usingMouse', true);
    // });
    // Re-enable focus styling when Tab is pressed
    // document.body.addEventListener('keydown', (event: any) => {
    //   if (event.keyCode === 9) {
    //     sendMessage('usingMouse', false);
    //   }
    // });
  }, [profile]);

  useEffect(() => {
    if (profile.theme === 'basicui-light') {
      document.body.classList.add("basicui-light");
      document.body.classList.remove("basicui-dark");
      document.body.classList.add("reach-light");
      document.body.classList.remove("reach-dark");
      // document.body.style.backgroundColor = 'var(--theme-white-50)';
    } else {
      document.body.classList.add("basicui-dark");
      document.body.classList.remove("basicui-light");
      document.body.classList.add("reach-dark");
      document.body.classList.remove("reach-light");
      // document.body.style.backgroundColor = 'var(--theme-black-800)';
    }
  }, [profile.theme]);

  const initialize = () => {
    console.log('Initialization logic here');
  };
  const initializeHttpInterceptor = () => {
    console.log('HTTP Interceptor initialization');
    axiosInstance.defaults.headers.authorization = authorization.token;
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status !== 401) {
          return new Promise((resolve, reject) => {
            reject(error);
          });
        }
        httpPost(
          '/auth/token',
          {
            refresh_token: authorization.refresh_token,
            grant_type: 'refresh_token',
            realm: realm || 100,
          },
          null
        )
          .then((response: any) => {
            if (response.status === 200) {
              axiosInstance.defaults.headers.authorization =
                response.data.access_token;
              setSessionValue(
                `${realm || 100}-access_token`,
                response.data.access_token
              );
              // dispatch(
              //   addAuth({
              //     ...authorization,
              //     access_token: response.data.access_token,
              //   })
              // );
              if (!error.config._retry) {
                error.config._retry = true;
                error.config.headers.authorization = response.data.access_token;
                return axiosInstance(error.config);
              }
            } else {
              console.log('********redirect to login');
            }
          })
          .catch((error: any) => {
            Promise.reject(error);
          });
      }
    );
  };
  return <></>;
};

export default Init;
