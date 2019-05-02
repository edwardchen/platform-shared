import {
  GET_INSPECTIONS_SUCCESS,
  GET_INSPECTION_SUCCESS,
  GET_INSPECTIONS_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  inspection: {},
  inspectin_item: {},
  inspections_array: [],
  inspections_included: null,
  network_error: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_INSPECTIONS_SUCCESS: {
      console.log('in success');
      const included_dict = {};
      for (const value of action.payload.included) {
        if (!(value.type in included_dict)) {
          included_dict[value.type] = {};
        }
        included_dict[value.type][value.id] = value.attributes;
      }
      return {
        ...state,
        inspections_included: included_dict,
        inspections_array: action.payload.inspections,
        network_error: false,
      };
    }
    case GET_INSPECTIONS_FAIL: {
      alert('hi');
      return {};
    }
    case GET_INSPECTION_SUCCESS: {
      // const included_dict = {};
      // for (const value of action.payload.included) {
      //   if (!(value.type in included_dict)) {
      //     included_dict[value.type] = {};
      //   }
      //   included_dict[value.type][value.id] = value.attributes;
      // }

      return {
        ...state,
        inspection: action.payload.data.inspection,
        inspection_item: action.payload.data.inspection_item,
        network_error: false,
      };
    }
    default: {
      return state;
    }
  }
}
