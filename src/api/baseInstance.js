import axios from 'axios';

const baseAPI = (url, options) => {
  return axios.create({ baseURL: url, ...options });
};
export const baseInstance = baseAPI(process.env.REACT_APP_BASE_URL);
