import { createContext, useContext, useState } from "react";
import type { LoginResponse } from "../type/types";

type AuthContextType = {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  getUser: () => any;
  saveUser: (data: LoginResponse) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const isAuthenticated = !!token;

  const getUser = () => user;

  const saveUser = (data: LoginResponse) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, getUser, saveUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
