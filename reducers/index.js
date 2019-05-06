import { combineReducers } from 'redux';

import inspection from './inspection_reducer';
import auth from './auth_reducer';
import ticket from './ticket_reducer';
import glob from './glob_reducer';

export default combineReducers({
  inspection,
  auth,
  ticket,
  glob
});
