import { addPoolApi, deletePoolApi, editPoolApi, getPoolsListApi } from "@/shared/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { Pool, PostPool } from "./types";
import _ from "lodash";

export function usePoolRepository() {
  const queryClient = useQueryClient();
  const { data, ...cryptoQuery } = useQuery(['poolsList'], getPoolsListApi);

  const poolsList = ZodSaveParse(data, Pool.array().optional());

  const addWalletMutation = useMutation({
    mutationFn: (pool: PostPool) => addPoolApi(pool),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['poolsList'], 
        _.concat(poolsList, data))
    }
  });
  
  const editWalletMutation = useMutation({
    mutationFn: (value: {id: string, pool: PostPool}) => editPoolApi(value.pool, value.id),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ['poolsList'],
        _.map(poolsList, (pool) => pool.id === variables.id ? variables : pool)
      )
    }
  })

  const deleteWalletMutation = useMutation({
    mutationFn: (id: string) => deletePoolApi(id),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ['poolsList'],
         _.filter(poolsList, (pool) => pool.id !== variables)
      )
    }
  });
  
  const addWallet = (pool: PostPool) => {
    addWalletMutation.mutate(pool);
  }

  const editWallet = (pool: PostPool) => {
    const id = _.find(poolsList, ['domain', pool.domain])?.id;

    if (!id) return;

    editWalletMutation.mutate({id, pool});
  }

  const deleteWallet = (id: string) => {
    deleteWalletMutation.mutate(id);
  }

  const getWalletsList = () => poolsList;

  const setWalletsList = (poolsList?: Pool[]) => {
    if (!poolsList) return;
    queryClient.setQueryData(['poolsList'], poolsList);
  }
    
  return {
    addWallet,
    editWallet,
    deleteWallet,
    getWalletsList,
    setWalletsList,
    ...cryptoQuery
  }
}