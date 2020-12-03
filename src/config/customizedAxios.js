import axios from 'axios';

const defaultOptions = {
  baseURL: process.env.REACT_APP_SERVER_URL,
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
