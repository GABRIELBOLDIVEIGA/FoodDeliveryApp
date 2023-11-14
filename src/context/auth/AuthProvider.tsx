/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../../types/User';
import { AuthContext } from './AuthContext';
import { useState, useLayoutEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { deliveryInstanceOLD } from 'src/services/deliveryInstance';
import { useMutation } from '@tanstack/react-query';
import { ErrorAxios } from 'src/types/ErrorAxios';

const login = async (data: { email: string; password: string }) => {
  return deliveryInstanceOLD
    .post('http://localhost:3000/auth/login', { ...data })
    .then((res) => {
      return res.data;
    })
    .catch((error: ErrorAxios) => {
      throw new Error(error.response.data.message);
    });
};

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        const user: User = jwt_decode(data.access_token);
        setUser(user);
      }
    },
  });

  useLayoutEffect(() => {
    loadUser();
  }, []);

  const singin = async (data: { email: string; password: string }) => {
    loginMutation.mutate(data);
    return true;
  };

  const singout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
  };

  const loadUser = () => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      const user: User = jwt_decode(access_token);
      setUser(user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        singin,
        singout,
        error: loginMutation.error,
        loading: loginMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
