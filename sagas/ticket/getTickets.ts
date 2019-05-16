import { put, call } from 'redux-saga/effects';
import TicketsApi from '../../utils/tickets/TicketsApi';
import actions from '../../actions';
import toast from 'utils/toast';
import build from 'redux-object';
import { ITicket } from '../../types';

export default function* getTicket(action) {
  const user_id = action.payload;
  const params = {
    assignee_id_eq: user_id,
    status_eq: ['open'],
    type_eq: ['Ticket'],
  };
  try {
    yield put(actions.app.updateLoading(true));
    const res = yield call(TicketsApi.list, params);
    const tickets: ITicket[] = res.ticket ? Object.keys(res.ticket).map(id => {
      return build(res, 'ticket', id)
    }) : [];


    yield put(actions.ticket.getTicketsComplete(tickets));
    toast.success("This tickets has been got.");
  } catch (err) {
    toast.error('Failed to get tickets!');
  } finally {
    yield put(actions.app.updateLoading(false));
  }
}

