import axios from "axios";

const API = axios.create({
  baseURL: 'http://localhost:8000/api',  
  headers: {
    'Content-Type': 'application/json',
  },
});


API.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage or wherever you store it
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API