import { NETWORK_STATUS } from './types';

export const networkAction = async (val, dispatch) => {
  dispatch({
    type: NETWORK_STATUS,
    payload: val,
  });
};

export default networkAction;
