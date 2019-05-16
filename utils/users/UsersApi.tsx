// import objectToFormData from 'object-to-formdata';
import { generateJsonApi, IJsonApiResult } from '../JsonApi';


import { createNormalizingApi } from '../NormalizingJsonApi';

const JsonApiV2 = createNormalizingApi(generateJsonApi(1));

import { IUser } from '../types';

// export interface ITicket {
//   id: string;
//   type: 'ticket';
// }

interface IListResult extends IJsonApiResult {
  data: IUser[];
}

interface IGetResult extends IJsonApiResult {
  ticket: IUser;
}

export default class UsersApi {
  static list = (config = {}): Promise<IGetResult> => {
    return JsonApiV2.get(`/users`, config);
  }
  // static list = JsonApiV2.get<IListResult>('/inspections');

  // static get = JsonApiV2.partialCurryGet<IGetResult>((id: string | number) => `/inspections/${id}`);

  static get = (id: any, params = {}): Promise<IGetResult> => {
    return JsonApiV2.get(`/users/${id}`, params);
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

    return UsersApi.list(noPaginateParams);
  }
}


// import JsonApi, { IJsonApiResult } from './JsonApi';
// import {IUser} from './types';
// import RequestCache from '../components/tickets/apis/RequestCache';

// interface IGetResult extends IJsonApiResult {
//   data: IUser;
// }

// interface IListResult extends IJsonApiResult {
//   data: IUser[];
// }

// class UsersApi {

//   public list = JsonApi.curryGet<IListResult>('/users');

//   public get = JsonApi.partialCurryGet<IGetResult>((id: string | number) => `/users/${id}`);

//   private getCache = new RequestCache<IGetResult>();

//   public getCached(id): Promise<IGetResult> {
//     return this.getCache.fetch(id, () => this.get(id));
//   }
// }

// const api = new UsersApi();

// export default api;
