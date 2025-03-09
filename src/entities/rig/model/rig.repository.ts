import { getRigsApi, rigStartMiningApi, rigStopMiningApi } from "@/shared/api"
import { queryOptions, useMutation } from "@tanstack/react-query"
import { RigType } from "./rig.type"
import { toaster } from "@/shared/ui/toaster"

export const rigsQueryOptions = queryOptions({
  queryKey: ['rigs'],
  queryFn: () => getRigsApi<RigType[]>(),
  staleTime: 5000,
})

const useRigMutation = () => {
  const startRigMiningMutation = useMutation({
    mutationFn: (id: string) => rigStartMiningApi(id),
    onSuccess: () => {
      toaster.success({
        description: 'You have successfully send start mining command',
      })
    }
  })

  const stopRigMiningMutation = useMutation({
    mutationFn: (id: string) => rigStopMiningApi(id),
    onSuccess: () => {
      toaster.success({
        description: 'You have successfully send stop mining command',
      })
    }
  })

  return {
    startRigMining: startRigMiningMutation.mutateAsync,
    stopRigMining: stopRigMiningMutation.mutateAsync,
  }
}

export const rigRepository = {
  useRigMutation,
}