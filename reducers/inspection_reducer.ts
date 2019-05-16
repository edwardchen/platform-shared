import { handleActions } from 'redux-actions';
import updateField from "utils/updateField";
import { IInspection } from '../types';

export interface IInspectionState {
  current_inspection: IInspection;
  current_inspections: IInspection[];
}

const initialState: IInspectionState = {
  current_inspection: null,
  current_inspections: [],
};

const inspectionReducer = handleActions(
  {
    'inspection/getInspectionComplete': updateField('current_inspection'),
    'inspection/getInspectionsComplete': updateField('current_inspections'),
  },
  initialState,
);

export default inspectionReducer;
