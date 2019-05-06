import JsonApi from './JsonApi';
// @ts-ignore
import normalize from 'json-api-normalizer';

/* Patches JsonApi methods to normalize JSONAPI resposnes to facilitate normalized redux storage.
 * Why: https://redux.js.org/recipes/structuringreducers/normalizingstateshape
 *
 * Normalizer takes standard JSONAPI response { data: [{ type: 'A', relationships: { ... } }], included: [...] }
 * and converts it to an object w/ each object type in the response as a key. Each corresponding value is a map from object id => object
 */
export const createNormalizingApi = (jsonApi: any) =>
  new Proxy(jsonApi, {
    get(target, prop) {
      if (typeof target[prop] === 'function') {
        return (...args: any[]) => target[prop](...args).then((json: any) => {
          const normalized = normalize(json, { camelizeKeys: false, camelizeTypeValues: false });
          normalized.meta = json.meta;
          normalized.errors = json.errors;
          return normalized;
        });
      }
      return target[prop];
    },
  });

export default createNormalizingApi(JsonApi);
