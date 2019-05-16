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
    'ticket/getTicketComplete': updateField('current_ticket'),
    'ticket/getTicketsComplete': updateField('current_tickets'),
  },
  initialState,
);

export default ticketReducer;
