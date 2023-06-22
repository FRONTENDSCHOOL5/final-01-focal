import axios from 'axios';

const authAPI = (url, options) => {
  return axios.create({ baseURL: url, ...options });
};

const authInstance = authAPI(process.env.REACT_APP_BASE_URL);

authInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    config.headers['Content-Type'] = 'application/json';
    config.headers['Access-Control-Allow-origin'] = '*';
    config.headers['Authorization'] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default authInstance;
