import axios from 'axios';
import { URL } from '../constants';

const defaultOptions = {
  baseURL: URL.BASE,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;

  return config;
});

export default axiosInstance;
