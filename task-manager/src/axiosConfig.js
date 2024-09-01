import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // No need for an Authorization header since we're using session-based authentication
  },
  withCredentials: false, // This ensures cookies are sent with requests
});

export default axiosInstance;
