import InspectionsApi from '../utils/inspections/InspectionsApi';
import {
  GET_INSPECTIONS_SUCCESS,
  GET_INSPECTION_SUCCESS } from './types';
import { networkAction } from './utils';
import { IInspection } from '../utils/types';
import jsonApiMerger from '../utils/jsonApiMerger';

export interface IResult {
  inspections: any
}

export const getInspections = (user_id: number) => async (dispatch: any) => {
  try {
    console.log('user_id');
    console.log(user_id);
    InspectionsApi.list({}).then((data: any) => {
      console.log('in then');

      // console.log(jsonApiMerger('inspection', data, 10));
      const inspections: IInspection[] = data.inspection ? Object.keys(data.inspection).map(id => {
        return jsonApiMerger(id, 'inspection', data)
      }) : [];

      let result = {inspections}

      networkAction(false, dispatch);
      dispatch({
        type: GET_INSPECTIONS_SUCCESS,
        payload: {
          result
        }
      });
    }, () => {
      console.log('no connection');
      networkAction(true, dispatch);
    });
  } catch (e) {
    console.log('e.message');
    console.log(e.message);
    networkAction(true, dispatch);
  }
}

//
// export const getInspections = (user_id: any) => async (dispatch: any) => {
//   alert(user_id);
//
//
//
//   dispatch({
//     type: GET_INSPECTIONS_SUCCESS,
//     payload: {},
//   });
//   // try {
//   //   InspectionsApi.all({}).then(({ data: inspections, included }) => {
//   //     networkAction(false, dispatch);
//       // dispatch({
//       //   type: GET_INSPECTIONS_SUCCESS,
//       //   payload: {
//       //     inspections,
//       //     included,
//       //   },
//   //     });
//   //   }, () => {
//   //     console.log('no connection');
//   //     networkAction(true, dispatch);
//   //   });
//   // } catch (e) {
//   //   alert('error');
//   //   networkAction(true, dispatch);
//   // }
// };

export const getInspection = (inspection_id: any) => async (dispatch: any) => {

  try {
    InspectionsApi.get(inspection_id).then((data: any) => {
      // const asdf = jsonApiMerger(1393, 'inspection', data, 1);
      // alert(asdf);
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
