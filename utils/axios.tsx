import axios from 'axios';

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
    // console.log('Starting Request', config)
    return request;
  });

  return instance;
};

export default generator();

export {
  generator
};
