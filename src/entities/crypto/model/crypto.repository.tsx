import { useMutation, useQuery, useQueryClient } from "react-query";
import { addCryptocurrency, deleteCryptocurrency, getCryptocurrenciesList } from "@/shared/api";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { Crypto } from "./types";
import _ from "lodash";

export function useCryptoRepository() {
  const queryClient = useQueryClient();
  const { data, ...cryptoQuery } = useQuery(['cryptosList'], getCryptocurrenciesList);
  
  const cryptosList = ZodSaveParse(data, Crypto.array().optional());
  
  const addCrypto = useMutation({
    mutationFn: (crypto: _.Omit<Crypto, 'id'>) => addCryptocurrency(crypto),
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
         _.filter(cryptosList, (crypto) => crypto.id !== variables)
      )
    }
  });

  const getCryptosList = () => cryptosList;

  const setCryptosList = (cryptosList: Crypto[]) => 
    queryClient.setQueryData(['cryptosList'], cryptosList)
    
  return {
    addCrypto,
    deleteCrypto,
    getCryptosList,
    setCryptosList,
    ...cryptoQuery
  }
}