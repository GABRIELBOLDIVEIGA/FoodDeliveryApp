import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'src/context/auth/AuthContext';

export const useDeliveryInstance = () => {
  const navigate = useNavigate();
  const { singout } = useContext(AuthContext);
  const token = localStorage.getItem('access_token');

  const deliveryInstance = axios.create({
    baseURL:
      process.env.NODE_ENV === 'production'
        ? import.meta.env.VITE_BASE_API
        : import.meta.env.VITE_LOCAL_API,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  deliveryInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        singout();
        navigate('/login');
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

  return { deliveryInstance };
};

export const deliveryInstanceOLD = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? import.meta.env.VITE_BASE_API
      : import.meta.env.VITE_LOCAL_API,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
  },
});
