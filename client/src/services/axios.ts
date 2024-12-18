import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Server Error:', error.response);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
