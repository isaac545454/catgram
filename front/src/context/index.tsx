import React, { createContext, ReactNode, useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  children: ReactNode;
}

interface Value {
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
  auth: Auth | null;
  clearUser: () => void;
  isLoading: boolean;
}
export interface Auth {
  _id: string;
  token: string;
  profileImage?: string;
}

export const AuthContext = createContext({} as Value);

export function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user") as any);
    if (token) {
      axios.defaults.headers["Authorization"] = `Bearer ${token.token}`;
      setAuth(token);
    }

    setIsLoading(false);
  }, []);

  const clearUser = () => {
    setAuth(null);
    axios.defaults.headers["Authorization"] = ``;
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ setAuth, auth, clearUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
