import axios from 'axios';
import apiConfig from './config';
const axiosInstance = axios.create({
  baseURL: apiConfig.base_url,
  headers: {
    'Content-Type': 'application/json',
  },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {

//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance ;
