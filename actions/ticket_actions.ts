import TicketsApi from '../utils/tickets/TicketsApi';
// import { inlineItems } from "../utils/tickets/Inliner";
// import { byListing } from "../utils/tickets/GroupSummaryText";
import jsonApiMerger from '../utils/jsonApiMerger';
import { networkAction } from './utils';
import build from 'redux-object';

import {
  GET_TICKETS_SUCCESS,
  GET_TICKETS_FAIL,
  GET_TICKET_SUCCESS,
  GET_TICKETS_FAIL_PERSIST
} from './types';

export interface ITicket {
  id: string;
  type: 'ticket';
}

export const getTickets = (user_id) => async dispatch => {
  try {
    // https://zeusliving.com/api/v1/tickets?assignee_id_eq=5346&status_eq%5B%5D=open&special_ticket_type_eq%5B%5D=maintenance_request&due_before=2019-04-15T23%3A59%3A59.999-07%3A00&no_pagination=1

    const params = {
      assignee_id_eq: user_id,
      status_eq: ['open'],
      type_eq: ['Ticket'],
    };

console.log('startin tickets');
    TicketsApi.list(params).then((data) => {

      // const inline_tickets = inlineItems(tickets, included);

      // networkAction(false, dispatch);
      // dispatch({
      //   type: GET_TICKETS_SUCCESS,
      //   payload: byListing(inline_tickets)
      // });


      const tickets: ITicket[] = data.ticket ? Object.keys(data.ticket).map(id => {
        return jsonApiMerger(id, 'ticket', data)
      }) : [];

      networkAction(false, dispatch);
      dispatch({
        type: GET_TICKETS_SUCCESS,
        payload: tickets
      });
    }, () => {
      console.log('no connection');
      networkAction(true, dispatch);
      // dispatch({
      //   type: GET_TICKETS_FAIL_PERSIST,
      //   payload: null
      // });
    });
  } catch (e) {
    console.log(e);
    alert('error');
    networkAction(true, dispatch);
    // dispatch({
    //   type: GET_TICKETS_FAIL_PERSIST,
    //   payload: null
    // });
  }
  console.log('whatt');
  // const TICKETS_ENDPOINT = `api/v1/tickets`;
  // try {
  //   let { data } = await api.get(`${TICKETS_ENDPOINT}`);
  //
  //   dispatch({ type: GET_TICKETS_SUCCESS, payload: data });
  // } catch (e) {
  //   request_error(e);
  //   return dispatch({ type: GET_TICKETS_FAIL })
  // }
}

export const getTicket = (ticket_id) => async dispatch => {
  try {
    TicketsApi.get(ticket_id).then((data) => {
      const ticket = build(data, 'ticket', ticket_id);

      networkAction(false, dispatch);
      dispatch({
        type: GET_TICKET_SUCCESS,
        payload: ticket
      });
    }, () => {
      console.log('no connection');
      networkAction(true, dispatch);
    });
  } catch (e) {
    alert('error');
    networkAction(true, dispatch);
  }
}
