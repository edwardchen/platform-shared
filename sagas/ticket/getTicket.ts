import { put, call } from 'redux-saga/effects';
import TicketsApi from '../../utils/tickets/TicketsApi';
import actions from '../../actions';
import toast from 'utils/toast';
import build from 'redux-object';

export default function* getTicket(action) {
  const id = action.payload;
  try {
    yield put(actions.app.updateLoading(true));
    const res = yield call(TicketsApi.get, id);
    const ticket = build(res, 'ticket', id);

    yield put(actions.ticket.getTicketComplete(ticket));
    toast.success("This ticket has been got.");
  } catch (err) {
    toast.error('Failed to get ticket!');
  } finally {
    yield put(actions.app.updateLoading(false));
  }
}
