import React, { createContext, ReactNode, useState, useEffect } from "react";
import { ThunkActionDispatch } from "redux-thunk";

interface Props {
  children: ReactNode;
}

interface Value {
  setAuth: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext({} as Value);

export function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState("");
  return (
    <AuthContext.Provider value={{ setAuth }}>{children}</AuthContext.Provider>
  );
}
