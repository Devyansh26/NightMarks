// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', // or whatever your Flask API URL is
  withCredentials: true, // Only if using cookies/sessions
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
