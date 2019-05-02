import qs from 'qs';
import { generator } from '../utils/axios';
import { AxiosRequestConfig } from 'axios';
import { IIncluded } from './types';

const headers = {
  Accept: 'application/json',
};

function onSuccess(response: any) {
  return response.data;
}

function onError(error: any) {
  const errors = error.response
    ? error.response.data
    : { base: ['^Failed to contact server'] };

  return Promise.reject(errors);
}

export interface IJsonApiResult {
  data: any;
  included?: IIncluded[];
  meta?: {
    first?: string,
    last?: string,
    next?: string | null,
    prev?: string | null,
    total_pages?: number,
    total_count?: number,
  };
}

const generateJsonApi = (version: number = 1, axiosConfig = {}) => {
  const axios = generator(version, axiosConfig);
  return class JsonApi {
    static get<T = IJsonApiResult>(url: string, params = {}, extraConfig: Partial<AxiosRequestConfig> = {}) {
      const config: AxiosRequestConfig = {
          headers,
          params,
          paramsSerializer: p => qs.stringify(p, {
              arrayFormat: 'brackets',
          }),
          ...extraConfig,
      };

      return axios.get<T>(url, config).then(onSuccess, onError);
    }

    static curryGet<T = IJsonApiResult>(url: string): (params?: any, extraConfig?: Partial<AxiosRequestConfig>) => Promise<T> {
      return (params = {}, extraConfig = {}) => JsonApi.get<T>(url, params, extraConfig);
    }

    static partialCurryGet<T = IJsonApiResult>(func: (arg: any) => string): (arg: any, params?: any, extraConfig?: Partial<AxiosRequestConfig>) => Promise<T> {
      return (arg, params = {}, extraConfig = {}) => JsonApi.get<T>(func(arg), params, extraConfig);
    }

    static post<T = IJsonApiResult>(url: string, data?: any, extraConfig: Partial<AxiosRequestConfig> = {}) {
      return axios.post<T>(url, data, { ...extraConfig, headers }).then(onSuccess, onError);
    }

    static curryPost<T = IJsonApiResult>(url: string, data?: (data: any) => any | any): (data?: any, extraConfig?: Partial<AxiosRequestConfig>) => Promise<T> {
      if (typeof data === 'function') {
        return (dataParam, extraConfig = {}) => JsonApi.post<T>(url, data(dataParam), extraConfig);
      }
      return (dataParam = {}, extraConfig = {}) => JsonApi.post<T>(url, dataParam, extraConfig);
    }

    static patch<T = IJsonApiResult>(url: any, data: any, opts = {}) {
      return axios.patch<T>(url, data, { ...opts, headers }).then(onSuccess, onError);
    }

    static put<T = IJsonApiResult>(url: any, data: any, opts = {}) {
      return axios.put<T>(url, data, { ...opts, headers }).then(onSuccess, onError);
    }

    static destroy(url: any, opts = {}) {
      return axios.delete(url, { ...opts, headers }).then(onSuccess, onError);
    }
  };
};

export default generateJsonApi(2);
export { generateJsonApi };
