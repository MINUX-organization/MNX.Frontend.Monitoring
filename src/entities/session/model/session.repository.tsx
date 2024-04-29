import { useStateObject } from "@/shared/lib/utils/state-object";
import { Session } from "./types";
import { useAuth } from "@/shared/lib/hooks/auth";

export function useSessionRepository() {
  const { setIsAuthenticated } = useAuth();

  const session = useStateObject(
    localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')!) : null
  );
    
  const saveSession = (value: Session) => {
    localStorage.setItem('session', JSON.stringify(value));
    setIsAuthenticated(true);
    session.setValue(value);
  }

  const getSession = (): Session | null => session.value;
  
  const removeSession = () => {
    localStorage.removeItem('session')
    setIsAuthenticated(false)
    session.setValue(null)
  };

  return { saveSession, getSession, removeSession };
}