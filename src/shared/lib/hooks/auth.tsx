import { useContext } from "react";
import { createContext } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (_authenticated: boolean) => {},
});

export function useAuth() {
  return useContext(AuthContext);
}