import { handleActions } from 'redux-actions';
import updateField from "utils/updateField";

export interface IAppState {
  isLoading: boolean;
  networkError: boolean;
}
const initialState: IAppState = {
  isLoading: false,
  networkError: false
};

const appReducer = handleActions(
  {
    'app/updateLoading': updateField('isLoading'),
    'app/updateNetworkError': updateField('networkError'),
  },
  initialState,
);

export default appReducer;
