import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { PostWallet, Pool } from "./types";
import _ from "lodash";
import { getWalletsListApi, addWalletApi, deleteWalletApi, editWalletApi } from "@/shared/api"

export function usePoolRepository() {
  const queryClient = useQueryClient();
  const { data, ...cryptoQuery } = useQuery(['poolsList'], getWalletsListApi);

  const poolsList = ZodSaveParse(data, Pool.array().optional());

  const addWalletMutation = useMutation({
    mutationFn: (pool: PostWallet) => addWalletApi(pool),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['poolsList'], 
        _.concat(poolsList, data))
    }
  });
  
  const editWalletMutation = useMutation({
    mutationFn: (pool: Pool) => editWalletApi(pool, pool.id),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ['poolsList'],
        _.map(poolsList, (pool) => pool.id === variables.id ? variables : pool)
      )
    }
  })

  const deleteWalletMutation = useMutation({
    mutationFn: (id: string) => deleteWalletApi(id),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ['poolsList'],
         _.filter(poolsList, (pool) => pool.id !== variables)
      )
    }
  });
  
  const addWallet = (pool: PostWallet) => {
    addWalletMutation.mutate(pool);
  }

  const editWallet = (pool: Pool) => {
    editWalletMutation.mutate(pool);
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