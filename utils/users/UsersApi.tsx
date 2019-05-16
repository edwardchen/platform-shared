import { generateJsonApi, IJsonApiResult } from '../JsonApi';
import { createNormalizingApi } from '../NormalizingJsonApi';
import { IUser } from '../types';

const JsonApiV2 = createNormalizingApi(generateJsonApi(1));

interface IListResult extends IJsonApiResult {
  data: IUser[];
}

interface IGetResult extends IJsonApiResult {
  ticket: IUser;
}

export default class UsersApi {
  static list = (config = {}): Promise<IListResult> => {
    return JsonApiV2.get(`/users`, config);
  }

  static get = (id: any, params = {}): Promise<IGetResult> => {
    return JsonApiV2.get(`/users/${id}`, params);
  }


  // This returns all the Users for a particular search with no pagination. The `list` API can return
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
