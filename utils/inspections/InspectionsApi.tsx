import objectToFormData from 'object-to-formdata';
import JsonApi, { IJsonApiResult } from '../JsonApi';
import { generateJsonApi } from '../JsonApi';
import { IInspection } from './types';
import {AxiosRequestConfig} from "axios";

import { createNormalizingApi } from '../../../apis/NormalizingJsonApi';

const JsonApiV2 = createNormalizingApi(generateJsonApi(2));

interface IListResult extends IJsonApiResult {
  data: IInspection[];
}

interface IGetResult extends IJsonApiResult {
  data: IInspection;
}

export default class InspectionsApi {

  // static list = JsonApi.get<IListResult>('/inspections');

  // static get = JsonApiV2.partialCurryGet<IGetResult>((id: string | number) => `/inspections/${id}`);

  static get = (id, params = {}): Promise<IGetResult> => {
    return JsonApiV2.get(`/inspections/${id}`, params);
  }

  // static create = JsonApiV2.curryPost<IGetResult>('/inspections', (data: any) => objectToFormData(data));


  // This returns all the Tickets for a particular search with no pagination. The `list` API can return
  // up to 300 results at a time. For UI that handles all pagination, sorting and filtering on the
  // frontend, you can use this to collected the paginated results and return them all at once.
  // static all = (params = {}, extraConfig?: Partial<AxiosRequestConfig>) => {
  //   const noPaginateParams = {
  //     ...params,
  //     no_pagination: '1',
  //   };

  //   return InspectionsApi.list(noPaginateParams, extraConfig);
  // }
}
