import React, { createContext, useContext, useState, useEffect } from "react";
import type { UserInfo } from "../types/types";

interface AuthProviderProps {
  children: React.ReactNode;
}
interface TokenType {
  token: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;

  saveToken: (data: TokenType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,

  saveToken: () => {},
  logout: () => {},
});

export default function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [, setUser] = useState<UserInfo | null>(null);

  const isAuthenticated = !!token;

  const saveToken = (data: TokenType) => {
    localStorage.setItem("token", data.token);
    setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, saveToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
