import { addPoolApi, deletePoolApi, editPoolApi, getPoolsListApi } from "@/shared/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { Pool, PostPool } from "./types";
import _ from "lodash";

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
    mutationFn: (value: {id: string, pool: PostPool}) => editPoolApi(value.pool, value.id),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ['poolsList'],
        _.map(poolsList, (pool) => pool.id === variables.id ? variables : pool)
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
  
  const addPool = (pool: PostPool) => {
    addPoolMutation.mutate(pool);
  }

  const editPool = (pool: PostPool) => {
    const id = _.find(poolsList, ['domain', pool.domain])?.id;

    if (!id) return;

    editPoolMutation.mutate({id, pool});
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