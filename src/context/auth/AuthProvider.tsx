/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";
import { useState, useLayoutEffect } from "react";
import jwt_decode from "jwt-decode";
import { deliveryInstance } from "src/services/deliveryInstance";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    loadUser();
  }, []);

  const singin = async (data: { email: string; password: string }) => {
    setError(null);
    setLoading(true);
    deliveryInstance
      .post("http://localhost:3000/auth/login", { ...data })
      .then((res) => {
        console.log(res.data)
        if (res.data.access_token) {
          localStorage.setItem("access_token", res.data.access_token);
          const user: User = jwt_decode(res.data.access_token);
          console.log(user)
          setUser(user);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
    return true;
  };

  const singout = () => {
    setUser(null);
    localStorage.removeItem("access_token")
    // removeAccessToken();
  };

  // const removeAccessToken = () => {
  //   localStorage.removeItem("access_token")
  // };

  const loadUser = () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      const user: User = jwt_decode(access_token);
      setUser(user);
    }
  };

  return (
    <AuthContext.Provider value={{ user, singin, singout, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
