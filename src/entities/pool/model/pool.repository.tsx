import { addPoolApi, deletePoolApi, editPoolApi, getPoolsApi } from "@/shared/api";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PoolSchema, PoolType, PostPoolType } from "./pool.type";
import { zodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { AxiosError } from "axios";
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
    onError: (error: AxiosError<string[]>) => {
      toaster.error({
        title: error.message,
        description: error.response?.data[0],
      })
    }
  })
  
  const editPoolMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: string } & PostPoolType) => editPoolApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pool'] });
      toaster.success({
        description: 'You have successfully edited pool',
      })
    },
    onError: (error: AxiosError<string[]>) => {
      toaster.error({
        title: error.message,
        description: error.response?.data[0],
      })
    }
  });

  const deletePoolMutation = useMutation({
    mutationFn: (id: string) => deletePoolApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pool'] });
      toaster.success({
        description: 'You have successfully deleted pool',
      })
    },
    onError: (error: AxiosError<string[]>) => {
      toaster.error({
        title: error.message,
        description: error.response?.data[0],
      })
    }
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