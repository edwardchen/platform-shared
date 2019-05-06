import {
  NETWORK_STATUS
} from '../actions/types';

const INITIAL_STATE = {
  network_error: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case NETWORK_STATUS:
      return { ...state, network_error: action.payload };
    default:
      return state;
  }
}
