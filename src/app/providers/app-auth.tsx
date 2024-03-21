import { useStateObject } from "@/shared/lib/utils/state-object";
import React, { createContext } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
});

const AuthProvider = ({ children } : { children: React.ReactNode }) => {
  const { value: isAuthenticated, setValue: SetIsAuthenticated } = useStateObject(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };