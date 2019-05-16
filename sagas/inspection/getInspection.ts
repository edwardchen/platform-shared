import { put, call } from 'redux-saga/effects';
import InspectionsApi from '../../utils/inspections/InspectionsApi';
import actions from '../../actions';
import toast from 'utils/toast';
import build from 'redux-object';

export default function* getInspection(action) {
  const id = action.payload;
  try {
    yield put(actions.app.updateLoading(true));
    const res = yield call(InspectionsApi.get, id);
    const inspection = build(res, 'inspection', id);

    yield put(actions.inspection.getInspectionComplete(inspection));
    toast.success("This inspection has been got.");
  } catch (err) {
    toast.error('Failed to get inspection!');
  } finally {
    yield put(actions.app.updateLoading(false));
  }
}
