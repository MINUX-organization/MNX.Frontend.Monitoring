import { useMutation } from "@tanstack/react-query"
import { LoginType } from "./login.type";
import { loginApi, logoutApi, refreshTokensApi, registrationApi } from "@/shared/api";
import { RegistrationType } from "./registration.type";
import { SessionType } from "./session.type";
import { toaster } from "@/shared/ui/toaster";

const sessionQuery = (): SessionType | undefined => {
  const session = localStorage.getItem('session');

  if (!session) {
    return undefined;
  }

  return JSON.parse(session);
}

function useSessionMutation() {
  const setSessionViaLoginMutation = useMutation({
    mutationFn: (data: LoginType) => loginApi<LoginType, SessionType>(data),
    onSuccess: (response) => {
      localStorage.setItem('session', JSON.stringify(response.data));
      toaster.success({
        description: 'You have successfully logged in',
      })
    },
  })

  const setSessionViaRegistrationMutation = useMutation({
    mutationFn: (data: RegistrationType) => registrationApi<RegistrationType, SessionType>(data),
    onSuccess: (response) => {
      localStorage.setItem('session', JSON.stringify(response.data));
      toaster.success({
        description: 'You have successfully registered and logged in',
      })
    },
  })

  const refreshSessionMutation = useMutation({
    mutationFn: (refreshToken: string) => refreshTokensApi(refreshToken),
    onSuccess: (response) => {
      localStorage.setItem('session', JSON.stringify(response.data));
    },
  })

  const removeSessionMutation = useMutation({
    mutationFn: (refreshToken: string) => logoutApi(refreshToken),
    onSuccess: () => {
      localStorage.removeItem('session');
    }
  })

  const setSession = (session: SessionType) => {
    localStorage.setItem('session', JSON.stringify(session));
  }

  return {
    refreshSession: refreshSessionMutation.mutateAsync,
    setSessionViaLogin: setSessionViaLoginMutation.mutateAsync,
    setSessionViaRegistration: setSessionViaRegistrationMutation.mutateAsync,
    removeSession: removeSessionMutation.mutateAsync,
    setSession,
  }
}

export const sessionRepository = {
  sessionQuery,
  useSessionMutation,
}