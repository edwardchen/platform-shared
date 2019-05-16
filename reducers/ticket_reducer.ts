// import {
//   GET_TICKETS_SUCCESS,
//   GET_TICKETS_FAIL,
//   GET_TICKET_SUCCESS,
// } from '../actions/types';

// const INITIAL_STATE = {
//   tickets: [],
//   current_ticket: null,
//   selected_ticket: null,
//   ticket_included: null
// };

// export default function(state = INITIAL_STATE, action) {
//   switch (action.type) {
//     case GET_TICKETS_SUCCESS:
//       console.log(action.payload);

//       return { ...state, tickets: action.payload, network_error: false };
//     case GET_TICKET_SUCCESS:

//       return { ...state,
//         current_ticket: action.payload,
//         network_error: false };
//     default:
//       return state;
//   }
// }

import { handleActions } from 'redux-actions';
import updateField from "utils/updateField";
import { ITicket } from '../types';

export interface ITicketState {
  current_ticket: ITicket;
}

const initialState: ITicketState = {
  current_ticket: null,
};

const ticketReducer = handleActions(
  {
    // Saga related
    'ticket/getTicketComplete': updateField('current_ticket'),
    'ticket/getTicketsComplete': updateField('current_tickets'),
  },
  initialState,
);

export default ticketReducer;
