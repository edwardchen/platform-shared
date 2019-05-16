// import objectToFormData from 'object-to-formdata';
import { generateJsonApi } from '../JsonApi';
import { createNormalizingApi } from '../NormalizingJsonApi';

const JsonApiV2 = createNormalizingApi(generateJsonApi(2));

export default class InspectionsApi {
  static list(config = {}) {
    return JsonApiV2.get(`/inspections`, config);
  }

  static get = (id: any, params = {}) => {
    return JsonApiV2.get(`/inspections/${id}`, params);
  }


  // This returns all the Tickets for a particular search with no pagination. The `list` API can return
  // up to 300 results at a time. For UI that handles all pagination, sorting and filtering on the
  // frontend, you can use this to collected the paginated results and return them all at once.
  static all = (params = {}) => {
    const noPaginateParams = {
      ...params,
      no_pagination: '1',
    };

    return InspectionsApi.list(noPaginateParams);
  }
}
