import { useMutation, useQuery, useQueryClient } from "react-query";
import { addCryptocurrency, deleteCryptocurrency, getCryptocurrenciesList } from "@/shared/api";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { Wallets } from "./types";
import _ from "lodash";

export function useWalletRepository() {
  const queryClient = useQueryClient();
  const { data, ...cryptoQuery } = useQuery(['walletsList'], getCryptocurrenciesList);

  const cryptosList = ZodSaveParse(data, Wallets.array().optional());
  
  const addCrypto = useMutation({
    mutationFn: (wallet: _.Omit<Wallets, 'id'>) => addCryptocurrency(wallet),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['cryptosList'], _.concat(cryptosList, data))
    }
  });
  
  const deleteCrypto = useMutation({
    mutationFn: (id: string) => deleteCryptocurrency(id),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ['cryptosList'],
         _.filter(cryptosList, (wallet) => wallet.id !== variables)
      )
    }
  });
  
  const getCryptocurrenciesList = () => cryptosList;

  const setCryptosList = (cryptosList?: Wallets[]) => {
    if (!cryptosList) return;
    queryClient.setQueryData(['cryptosList'], cryptosList);
  }
    
  return {
    addCrypto,
    deleteCrypto,
    getCryptocurrenciesList,
    setCryptosList,
    ...cryptoQuery
  }
}