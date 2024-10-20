import { addPoolApi, deletePoolApi, editPoolApi, getPoolsListApi } from "@/shared/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { Pool, PostPool } from "./types";
import _ from "lodash";
import { IS_SUCCESS_STATUS } from "@/shared/api/api-instance";

export function usePoolRepository() {
  const queryClient = useQueryClient();
  const { data, ...cryptoQuery } = useQuery(['poolsList'], getPoolsListApi);

  const poolsList = ZodSaveParse(data, Pool.array().optional());

  const addPoolMutation = useMutation({
    mutationFn: (pool: PostPool) => addPoolApi(pool),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['poolsList'], 
        _.concat(poolsList, data))
    }
  });
  
  const editPoolMutation = useMutation({
    mutationFn: (value: {id: string, pool: PostPool}) => editPoolApi(value.id, value.pool),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['poolsList'],
        _.map(poolsList, (pool) => pool.id === data.id ? data : pool)
      )
    }
  })

  const deletePoolMutation = useMutation({
    mutationFn: (id: string) => deletePoolApi(id),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ['poolsList'],
         _.filter(poolsList, (pool) => pool.id !== variables)
      )
    }
  });
  
  const addPool = async (pool: PostPool) => {
    const status = addPoolMutation.mutateAsync(pool);

    return IS_SUCCESS_STATUS(status);
  }

  const editPool = async (id: string, pool: PostPool) => {
    const status = await editPoolMutation.mutateAsync({id, pool});

    return IS_SUCCESS_STATUS(status);
  }

  const deletePool = (id: string) => {
    deletePoolMutation.mutate(id);
  }

  const getPoolsList = () => poolsList;

  const setPoolsList = (poolsList?: Pool[]) => {
    if (!poolsList) return;
    queryClient.setQueryData(['poolsList'], poolsList);
  }
    
  return {
    addPool,
    editPool,
    deletePool,
    getPoolsList,
    setPoolsList,
    ...cryptoQuery
  }
}