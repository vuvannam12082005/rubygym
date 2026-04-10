import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api'
});

api.interceptors.request.use((config) => {
  const rawAuth = localStorage.getItem('rubygym_auth');

  if (rawAuth) {
    const { token } = JSON.parse(rawAuth);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
