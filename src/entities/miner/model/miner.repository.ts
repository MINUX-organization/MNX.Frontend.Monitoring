import { getMinersApi } from "@/shared/api"
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MinerSchema, MinerType } from "./miner.type"
import { zodSaveParse } from "@/shared/lib/utils/zod-save-parse"
import { CustomMinerPost } from "./custom-miner-post.type"
import { toaster } from "@/shared/ui/toaster"
import { deleteCustomMinerApi, addCustomMinerApi, editCustomMinerApi } from "@/shared/api/"

export const minerQueryOptions = queryOptions({
  queryKey: ['miner'],
  queryFn: () => getMinersApi<MinerType[]>(),
})

export const useMinerQuery = () => {
  const { data, ...query } = useQuery(minerQueryOptions)

  const miners = zodSaveParse(data?.data, MinerSchema.array().optional());

  return {
    miners,
    ...query
  }
}

export const useMinerMutation = () => {
  const qyeryClient = useQueryClient();

  const addCustomMinerMutation = useMutation({
    mutationFn: (data: CustomMinerPost) => addCustomMinerApi<CustomMinerPost>(data),
    onSuccess: () => {
      toaster.success({
        description: 'You have successfully added custom miner',
      })
      qyeryClient.invalidateQueries({ queryKey: ['miner'] });
    }
  })

  const editCustomMinerMutation = useMutation({
    mutationFn: ({ id, ...data }: CustomMinerPost & { id: string }) => editCustomMinerApi<CustomMinerPost>(id, data),
    onSuccess: () => {
      toaster.success({
        description: 'You have successfully edited custom miner',
      })
      qyeryClient.invalidateQueries({ queryKey: ['miner'] });
    }
  })

  const deleteCustomMinerMutation = useMutation({
    mutationFn: (id: string) => deleteCustomMinerApi(id),
    onSuccess: () => {
      toaster.success({
        description: 'You have successfully deleted custom miner',
      })
      qyeryClient.invalidateQueries({ queryKey: ['miner'] });
    }
  })

  return {
    addCustomMiner: addCustomMinerMutation.mutateAsync,
    editCustomMiner: editCustomMinerMutation.mutateAsync,
    deleteCustomMiner: deleteCustomMinerMutation.mutateAsync
  }
}

export const minerRepository = {
  useMinerQuery,
  useMinerMutation,
}