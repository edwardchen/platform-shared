import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import getTicket from './ticket/getTicket';
import getTickets from './ticket/getTickets';
import getInspections from './inspection/getInspections';
import getInspection from './inspection/getInspection';

function* rootSaga() {
  yield all([
    takeLatest('inspection/getInspections', getInspections),
    takeLatest('inspection/getInspection', getInspection),
    takeLatest('ticket/getTicket', getTicket),
    takeLatest('ticket/getTickets', getTickets),
  ]);
}

export default rootSaga;
