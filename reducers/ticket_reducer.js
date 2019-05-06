import {
  GET_TICKETS_SUCCESS,
  GET_TICKETS_FAIL,
  GET_TICKET_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  tickets: [],
  selected_ticket: null,
  ticket_included: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_TICKETS_SUCCESS:
      console.log(action.payload);

      return { ...state, tickets: action.payload, network_error: false };
    case GET_TICKET_SUCCESS:
      let included_dict = {};
      for (let value of action.payload.included) {
        if (!(value.type in included_dict)) {
              included_dict[value.type] = [];
        }
        included_dict[value.type].push(value.attributes);
      }

      return { ...state,
        selected_ticket: action.payload.ticket,
        ticket_included: included_dict,
        network_error: false };
    default:
      return state;
  }
}
