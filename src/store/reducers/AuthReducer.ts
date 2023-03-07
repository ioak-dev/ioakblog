import { setSessionValue } from '../../utils/SessionUtils';
import { GET_AUTH, ADD_AUTH, REMOVE_AUTH } from '../actions/types';

const initialState = {
  isAuth: false,
  email: '',
  firstName: '',
  lastName: '',
  memberId: null,
  profilePic: '',
  token: null
};

export default function AuthReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_AUTH:
      console.log('GET_AUTH reducer');
      return {
        ...state,
      };
    case ADD_AUTH:
      console.log('ADD_AUTH reducer');
      setSessionValue("IOAK_USER", JSON.stringify(
        {
          ...state,
          isAuth: true,
          ...action.payload
        }));
      return {
        ...state,
        isAuth: true,
        ...action.payload,
      };

    case REMOVE_AUTH:
      console.log('REMOVE_AUTH reducer');
      console.log(state);
      return {
        ...state,
        isAuth: false,
        email: '',
        firstName: '',
        lastName: '',
        memberId: null,
        profilePic: '',
        token: null
      };
    default:
      return state;
  }
}
