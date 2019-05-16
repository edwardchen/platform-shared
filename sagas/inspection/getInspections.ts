import { put, call } from 'redux-saga/effects';
import InspectionsApi from '../../utils/inspections/InspectionsApi';
import actions from '../../actions';
import toast from 'utils/toast';
import build from 'redux-object';
import { IInspection } from '../../types';

export default function* getTicket(action) {
  const listing_id = action.payload;

  try {
    yield put(actions.app.updateLoading(true));
    const res = yield call(InspectionsApi.list, listing_id);
    const inspections: IInspection[] = res.inspection ? Object.keys(res.inspection).map(id => {
      return build(res, 'inspection', id)
    }) : [];



    yield put(actions.inspection.getInspectionsComplete(inspections));
    toast.success("This inspections has been got.");
  } catch (err) {
    toast.error('Failed to get inspections!');
  } finally {
    yield put(actions.app.updateLoading(false));
  }
}

