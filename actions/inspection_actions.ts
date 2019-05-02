import InspectionsApi from '../utils/inspections/InspectionsApi';
import {
  GET_INSPECTIONS_SUCCESS,
  GET_INSPECTION_SUCCESS } from './types';
import { networkAction } from './utils';
import build from 'redux-object';

import jsonApiMerger from '../../utils/jsonApiMerger';

export const getInspections = user_id => async (dispatch) => {

  // try {
  //   InspectionsApi.all({}).then(({ data: inspections, included }) => {
  //     networkAction(false, dispatch);
  //     dispatch({
  //       type: GET_INSPECTIONS_SUCCESS,
  //       payload: {
  //         inspections,
  //         included,
  //       },
  //     });
  //   }, () => {
  //     console.log('no connection');
  //     networkAction(true, dispatch);
  //   });
  // } catch (e) {
  //   alert('error');
  //   networkAction(true, dispatch);
  // }
};

export const getInspection = inspection_id => async (dispatch) => {

  try {
    InspectionsApi.get(inspection_id).then((data) => {
      const post = build(data, 'inspection');
      const asdf = jsonApiMerger(1393, 'inspection', data, 1);

      networkAction(false, dispatch);
      dispatch({
        type: GET_INSPECTION_SUCCESS,
        payload: {
          data
        },
      });
    }, () => {
      alert('no connection');
      networkAction(true, dispatch);
    });
  } catch (e) {
    alert('error');
    networkAction(true, dispatch);
  }
};
