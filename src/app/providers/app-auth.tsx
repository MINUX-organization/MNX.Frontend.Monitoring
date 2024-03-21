import { AuthContext } from "@/shared/lib/providers/auth-context";
import { useStateObject } from "@/shared/lib/utils/state-object";
import React from "react";

const AuthProvider = ({ children } : { children: React.ReactNode }) => {
  const { value: isAuthenticated, setValue: setIsAuthenticated } = useStateObject(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };