import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { Wallet } from "./types";
import _ from "lodash";
import { getWalletsListApi, addWalletApi, deleteWalletApi, editWalletApi } from "@/shared/api"

export function useWalletRepository() {
  const queryClient = useQueryClient();
  const { data, ...cryptoQuery } = useQuery(['walletsList'], getWalletsListApi);

  const walletsList = ZodSaveParse(data, Wallet.array().optional());

  const addWalletMutation = useMutation({
    mutationFn: (wallet: _.Omit<Wallet, 'id'>) => addWalletApi(wallet),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['walletsList'], 
        _.concat(walletsList, data))
    }
  });
  
  const editWalletMutation = useMutation({
    mutationFn: (wallet: Wallet) => editWalletApi(wallet, wallet.id),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ['walletsList'],
        _.map(walletsList, (wallet) => wallet.id === variables.id ? variables : wallet)
      )
    }
  })

  const deleteWalletMutation = useMutation({
    mutationFn: (id: string) => deleteWalletApi(id),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ['walletsList'],
         _.filter(walletsList, (wallet) => wallet.id !== variables)
      )
    }
  });
  
  const addWallet = (wallet: Wallet) => {
    addWalletMutation.mutate(wallet);
  }

  const editWallet = (wallet: Wallet) => {
    editWalletMutation.mutate(wallet);
  }

  const deleteWallet = (id: string) => {
    deleteWalletMutation.mutate(id);
  }

  const getWalletsList = () => walletsList;

  const setWalletsList = (walletsList?: Wallet[]) => {
    if (!walletsList) return;
    queryClient.setQueryData(['walletsList'], walletsList);
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