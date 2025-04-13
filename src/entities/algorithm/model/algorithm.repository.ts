import { AlgorithmPostType, AlgorithmSchema, AlgorithmType } from "./algorithm.type";
import { zodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addAlgorithmApi, deleteAlgorithmApi, editAlgorithmApi, getAlgorithmByIdApi, getAvailableAlgorithmsApi } from "@/shared/api";
import find from "lodash/find";
import { useCallback } from "react";
import { toaster } from "@/shared/ui/toaster";

export const algorithmQueryOptions = queryOptions({
  queryKey: ['algorithms'],
  queryFn: () => getAvailableAlgorithmsApi<AlgorithmType[]>(),
})

export const algorithmByIdQueryOptions = (id?: string) => queryOptions({
  queryKey: ['algorithms', id],
  queryFn: () => getAlgorithmByIdApi<AlgorithmPostType>(id!),
  enabled: !!id,
})

export const useAlgorithmQuery = () => {
  const { data, ...query } = useQuery(algorithmQueryOptions);

  const algorithms = zodSaveParse(data?.data, AlgorithmSchema.array().optional());

  const getById = useCallback(
    (id?: string) => {
      if (!id) return undefined;  
      return find(algorithms, (algorithm) => algorithm.id === id);
    },
    [algorithms]
  )

  return { algorithms, getById, ...query }
}

export const useAlgorithmMutation = () => {
  const queryClient = useQueryClient();

  const addAlgorithmMutation = useMutation({
    mutationFn: (data: AlgorithmPostType) => addAlgorithmApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['algorithms'] });
      toaster.success({
        description: 'You have successfully added algorithm',
      })
    }
  });

  const editAlgorithmMutation = useMutation({
    mutationFn: ({ id, ...data }: AlgorithmPostType & { id: string }) => editAlgorithmApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['algorithms'] });
      toaster.success({
        description: 'You have successfully edited algorithm',
      })
    }
  });

  const deleteAlgorithmMutation = useMutation({
    mutationFn: (id: string) => deleteAlgorithmApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['algorithms'] });
      toaster.success({
        description: 'You have successfully deleted algorithm',
      })
    }
  });

  return {
    addAlgorithm: addAlgorithmMutation.mutateAsync,
    editAlgorithm: editAlgorithmMutation.mutateAsync,
    deleteAlgorithm: deleteAlgorithmMutation.mutateAsync
  }
}

export const algorithmRepository = {
  useAlgorithmQuery,
  useAlgorithmMutation
}