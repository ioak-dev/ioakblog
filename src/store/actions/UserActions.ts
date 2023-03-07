import { httpGet } from 'src/utils/RestTemplate';
import { GET_USER, ADD_USER, FETCH_ALL_USERS } from './types';

const domain = 'user';

export const getUser = () => (dispatch) => {
  dispatch({
    type: GET_USER,
  });
};

export const addUser = (data) => (dispatch) => {
  dispatch({
    type: ADD_USER,
    payload: {users: data},
  });
};
