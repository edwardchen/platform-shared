import axios from 'axios';
// import { AsyncStorage } from 'react-native';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


// Generate instance for different api version
const generator = (version: number = 1, config = {}) => {
  // Common instance of axios that sets the baseUrl and csrf-token in the common headers
  const instance = axios.create({
    baseURL: `/api/v${version}`,
    ...config,
  });

  instance.interceptors.response.use(response => {
    // console.log('Response:', JSON.stringify(response))
    return response;
  });

  instance.interceptors.request.use(async (request) => {
    // console.log('Starting Request', config);
    // console.log(request);
    // const token = await AsyncStorage.getItem('jwt_token');

    // request.headers.Authorization = token ? `${token}` : '';
    return request;
  });

  return instance;
};

export default generator();

export {
  generator
};
