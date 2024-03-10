import { useMutation, useQuery, useQueryClient } from "react-query";
import { addCryptocurrencyApi, deleteCryptocurrencyApi, getCryptocurrenciesListApi } from "@/shared/api";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { Crypto } from "./types";
import _ from "lodash";

export function useCryptoRepository() {
  const queryClient = useQueryClient();
  const { data, ...cryptoQuery } = useQuery(['cryptosList'], getCryptocurrenciesListApi);

  const cryptosList = ZodSaveParse(data, Crypto.array().optional());
  
  const addCrypto = useMutation({
    mutationFn: (crypto: _.Omit<Crypto, 'id'>) => addCryptocurrencyApi(crypto),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['cryptosList'], _.concat(cryptosList, data))
    }
  });
  
  const deleteCrypto = useMutation({
    mutationFn: (id: string) => deleteCryptocurrencyApi(id),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ['cryptosList'],
         _.filter(cryptosList, (crypto) => crypto.id !== variables)
      )
    }
  });
  
  const getCryptosList = () => cryptosList;

  const setCryptosList = (cryptosList?: Crypto[]) => {
    if (!cryptosList) return;
    queryClient.setQueryData(['cryptosList'], cryptosList);
  }
    
  return {
    addCrypto,
    deleteCrypto,
    getCryptosList,
    setCryptosList,
    ...cryptoQuery
  }
}