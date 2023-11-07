import axios from 'axios';

export const deliveryInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? import.meta.env.VITE_BASE_API
      : import.meta.env.VITE_LOCAL_API,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
  },
});
