import { AsyncStorage } from 'react-native';
import { login } from '../utils/AuthApi';
import { request_error } from '../utils/request_error';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  AUTH_COMPLETE,
  AUTH_TYPE,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  ERROR_PROP_SET,
  USER_ID_CHANGED
} from './types';


export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const setUserId = (userId) => {
  return {
    type: USER_ID_CHANGED,
    payload: userId
  };
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const setErrorProp = (errorProp) => {
  return { type: ERROR_PROP_SET, payload: errorProp };
}

export const handleLogin = ({email, password, action}) => async dispatch => {
  alert('in here');
  let token = await AsyncStorage.getItem('jwt_token');
  if (token) {
    dispatch({ type: AUTH_TYPE, payload: 'signin' });
    await dispatch({ type: LOGIN_SUCCESS, payload: token });
    dispatch({ type: AUTH_COMPLETE });
  } else {
    try {
      if(action === 'signin') {
        dispatch({ type: AUTH_TYPE, payload: 'signin' });
        await auth(email, password, dispatch);
      } else {
        dispatch({ type: AUTH_TYPE, payload: 'signup' });
        await auth(email, password, dispatch);
      }
    } catch (e) {
      request_error(e);
      alert('An error occurred. There may be an issue with the network.');
      dispatch({ type: AUTH_COMPLETE });
    }
    dispatch({ type: AUTH_COMPLETE });

  }
}

const auth = async (email, password, dispatch) => {
  try {
    let { data } = await login( email, password );
    if ( data.auth_token === undefined ) {
      return dispatch({ type: LOGIN_FAIL, payload: data.auth_token })
    }

    await dispatch({ type: LOGIN_SUCCESS, payload: data.auth_token });
  } catch (e) {
    request_error(e);
    return dispatch({ type: LOGIN_FAIL, payload: e.response.data })
  }
};
