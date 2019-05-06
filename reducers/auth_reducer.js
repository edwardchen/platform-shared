import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  AUTH_COMPLETE,
  AUTH_TYPE,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  ERROR_PROP_SET,
  USER_ID_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  token: null,
  error: null,
  auth_type: null,
  user_id : null
};

export default function(state = {}, action) {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case AUTH_TYPE:
      return { ...state, auth_type: action.payload };
    case AUTH_COMPLETE:
      return { ...state, auth_type: null };
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload };
    case LOGIN_FAIL:
      return { ...state, token: null, error: 'Error' }
    case ERROR_PROP_SET:
      return { ...state, error: '' }
    case USER_ID_CHANGED:
      return { ...state, user_id: action.payload }
    default:
      return state;
  }
}
