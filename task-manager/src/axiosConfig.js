// src/axiosConfig.js
import axios from 'axios';

const username = 'your_username'; // Replace with actual username
const password = 'your_password'; // Replace with actual password
const token = btoa(`${username}:${password}`);

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${token}`,
  },
});

export default axiosInstance;
