import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { LoginType } from "./login.type";
import { loginApi } from "@/shared/api";

function useSessionQuery() {
  return useQuery({
    queryKey: ['session'],
  });
}

function useSessionMutation() {
  const query = useQueryClient();

  const setSessionViaLoginMutation = useMutation({
    mutationFn: (login: LoginType) => loginApi(login),
    
  })
}

export const SessionRepository = {
  useSessionQuery,
  useSessionMutation
}