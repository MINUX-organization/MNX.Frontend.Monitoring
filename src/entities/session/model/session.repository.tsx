import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { LoginType } from "./login.type";
import { loginApi, registrationApi } from "@/shared/api";
import { RegistrationType } from "./registration.type";
import { SessionType } from "./session.type";
import { toaster } from "@/shared/ui/toaster";

function useSessionQuery() {
  return useQuery({
    queryKey: ['session'],
    queryFn: () => localStorage.getItem('session'),
  });
}

function useSessionMutation() {
  const query = useQueryClient();

  const setSessionViaLoginMutation = useMutation({
    mutationFn: (data: LoginType) => loginApi<LoginType, SessionType>(data),
    onSuccess: (response) => {
      localStorage.setItem('session', JSON.stringify(response.data));
      query.setQueryData(['session'], response)
      toaster.success({
        description: 'You have successfully logged in',
      })
    },
    onError: (error) => {
      toaster.error({
        description: error.message
      })
    }
  })

  const setSessionViaRegistrationMutation = useMutation({
    mutationFn: (data: RegistrationType) => registrationApi<RegistrationType, SessionType>(data),
    onSuccess: (response) => {
      localStorage.setItem('session', JSON.stringify(response.data));
      query.setQueryData(['session'], response)
      toaster.success({
        description: 'You have successfully registered and logged in',
      })
    },
    onError: (error) => {
      toaster.error({
        description: error.message
      })
    }
  })

  const setSession = (session: SessionType) => {
    localStorage.setItem('session', JSON.stringify(session));
    query.setQueryData(['session'], session)
  }

  return {
    setSessionViaLogin: setSessionViaLoginMutation.mutateAsync,
    setSessionViaRegistration: setSessionViaRegistrationMutation.mutateAsync,
    setSession,
  }
}

export const sessionRepository = {
  useSessionQuery,
  useSessionMutation,
}