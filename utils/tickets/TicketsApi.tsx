// import objectToFormData from 'object-to-formdata';
import { generateJsonApi, IJsonApiResult } from '../JsonApi';


import { createNormalizingApi } from '../NormalizingJsonApi';

const JsonApiV2 = createNormalizingApi(generateJsonApi(2));

export interface ITicket {
  id: string;
  type: 'ticket';
}

// interface IListResult extends IJsonApiResult {
//   data: ITicket[];
// }

interface IGetResult extends IJsonApiResult {
  ticket: ITicket;
}

export default class TicketsApi {
  static list = (config = {}): Promise<IGetResult> => {
    return JsonApiV2.get(`/tickets`, config);
  }
  // static list = JsonApiV2.get<IListResult>('/inspections');

  // static get = JsonApiV2.partialCurryGet<IGetResult>((id: string | number) => `/inspections/${id}`);

  static get = (id: any, params = {}): Promise<IGetResult> => {
    return JsonApiV2.get(`/tickets/${id}`, params);
  }

  // static create = JsonApiV2.curryPost<IGetResult>('/inspections', (data: any) => objectToFormData(data));


  // This returns all the Tickets for a particular search with no pagination. The `list` API can return
  // up to 300 results at a time. For UI that handles all pagination, sorting and filtering on the
  // frontend, you can use this to collected the paginated results and return them all at once.
  static all = (params = {}) => {
    const noPaginateParams = {
      ...params,
      no_pagination: '1',
    };

    return TicketsApi.list(noPaginateParams);
  }
}
