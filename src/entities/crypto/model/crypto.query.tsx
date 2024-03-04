import { useMutation, useQuery, useQueryClient } from "react-query";
import { Crypto } from "./types";
import { addCryptocurrency, deleteCryptocurrency, getCryptocurrenciesList } from "@/shared/api";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import _ from "lodash";

export function useCryptoQuery() {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(['cryptosList'], getCryptocurrenciesList);
  
  const cryptosList = ZodSaveParse(data, Crypto.array().optional());

  const addCrypto = useMutation({
    mutationFn: (crypto: _.Omit<Crypto, 'id'>) => addCryptocurrency(crypto),
    onSuccess: (data) => {
      queryClient.setQueryData(['cryptosList'], _.concat(cryptosList, data))
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

  const sortByProperty = (property: keyof Crypto) => {
    queryClient.setQueryData(
      ['cryptosList'],
      _.sortBy(cryptosList, property)
    )
  }

  return {
    cryptosList,
    isLoading,
    error,
    addCrypto,
    deleteCrypto,
    sortByProperty
  }
}