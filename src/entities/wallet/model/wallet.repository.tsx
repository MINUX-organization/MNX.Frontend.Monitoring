import { addWalletApi, deleteWalletApi, editWalletApi, getWalletsApi } from "@/shared/api";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PostWalletType, WalletSchema, WalletType } from "./walet.type";
import { zodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { toaster } from "@/shared/ui/toaster";

export const walletQueryOptions = queryOptions({
  queryKey: ['wallet'],
  queryFn: () => getWalletsApi<WalletType[]>()
})

export const useWalletQuery = () => {
  const { data, ...query } = useQuery(walletQueryOptions);

  const wallets = zodSaveParse(data?.data, WalletSchema.array().optional());

  return { wallets, ...query }
}

export const useWalletMutation = () => {
  const queryClient = useQueryClient();

  const addWalletMutation = useMutation({
    mutationFn: (data: PostWalletType) => addWalletApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      toaster.success({
        description: 'You have successfully added wallet',
      })
    }
  })

  const editWalletMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: string } & PostWalletType) => editWalletApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      toaster.success({
        description: 'You have successfully edited wallet',
      })
    }
  })

  const deleteWalletMutation = useMutation({
    mutationFn: (id: string) => deleteWalletApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      toaster.success({
        description: 'You have successfully deleted wallet',
      })
    }
  })

  return {
    addWallet: addWalletMutation.mutateAsync,
    editWallet: editWalletMutation.mutateAsync,
    deleteWallet: deleteWalletMutation.mutateAsync
  }
}

export const walletRepository = {
  useWalletQuery, 
  useWalletMutation
}