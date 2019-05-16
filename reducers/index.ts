import { combineReducers } from 'redux';

import inspection from './inspection_reducer';
import auth from './auth_reducer';
import ticket from './ticket_reducer';
import app from './app_reducer';

export default combineReducers({
  inspection,
  auth,
  ticket,
  app
});
