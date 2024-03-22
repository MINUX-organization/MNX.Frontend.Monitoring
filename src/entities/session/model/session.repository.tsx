import { useStateObject } from "@/shared/lib/utils/state-object";
import { Session } from "./types";

export function useSessionRepository() {
  const session = useStateObject(
    localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')!) : null
  );

  const saveSession = (value: Session) => {
    localStorage.setItem('session', JSON.stringify(value));
    session.setValue(value);
  }

  const getSession = (): Session | null => session.value;

  const removeSession = () => {
    localStorage.removeItem('session')
    session.setValue(null)
  };

  return { saveSession, getSession, removeSession };
}