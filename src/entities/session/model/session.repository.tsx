import { Session } from "./types";

export function useSessionRepository() {
  const saveSession = (session: Session) => 
    localStorage.setItem('session', JSON.stringify(session));

  const getSession = (): Session | null => {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : null;
  }

  const removeSession = () => localStorage.removeItem('session');

  return { saveSession, getSession, removeSession };
}