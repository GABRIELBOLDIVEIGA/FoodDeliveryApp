/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { User } from "src/types/User";

export type AuthContextType = {
  user: User | null;
  singin: (credentials: {
    email: string;
    password: string;
  }) => Promise<boolean>;
  // singin: (credentials: { email: string, password: string }) => void;
  singout: () => void;
  error: any;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>(null!);
AuthContext.displayName = "AuthContext";
