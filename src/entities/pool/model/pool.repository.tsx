import { addPoolApi, deletePoolApi, editPoolApi, getPoolsApi } from "@/shared/api";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PoolSchema, PoolType, PostPoolType } from "./pool.type";
import { zodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { toaster } from "@/shared/ui/toaster";

export const poolQueryOptions = queryOptions({
  queryKey: ['pool'],
  queryFn: () => getPoolsApi<PoolType[]>()
})

const usePoolQuery = () => {
  const { data, ...query } = useQuery(poolQueryOptions);

  const pools = zodSaveParse(data?.data, PoolSchema.array().optional());

  return { pools, ...query }
}

const usePoolMutation = () => {
  const queryClient = useQueryClient();

  const addPoolMutation = useMutation({
    mutationFn: (data: PostPoolType) => addPoolApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pool'] });
      toaster.success({
        description: 'You have successfully added pool',
      })
    },
  })
  
  const editPoolMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: string } & PostPoolType) => editPoolApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pool'] });
      toaster.success({
        description: 'You have successfully edited pool',
      })
    },
  });

  const deletePoolMutation = useMutation({
    mutationFn: (id: string) => deletePoolApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pool'] });
      toaster.success({
        description: 'You have successfully deleted pool',
      })
    },
  });

  return {
    addPool: addPoolMutation.mutateAsync,
    editPool: editPoolMutation.mutateAsync,
    deletePool: deletePoolMutation.mutateAsync
  }
}

export const poolRepository = {
  usePoolQuery,
  usePoolMutation,
}