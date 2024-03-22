import { useSessionRepository } from "@/entities/session";
import { AuthContext } from "@/shared/lib/providers/auth-context";
import { useStateObject } from "@/shared/lib/utils/state-object";
import React, { useEffect } from "react";

const AuthProvider = ({ children } : { children?: React.ReactNode }) => {
  const { getSession } = useSessionRepository();
  const { value: isAuthenticated, setValue: setIsAuthenticated } = useStateObject(false);
  
  const session = getSession();

  useEffect(() => {
    if (session) {
      setIsAuthenticated(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };