import { useMutation, useQueryClient } from "react-query";
import { Crypto } from "./types";
import { addCryptocurrency, deleteCryptocurrency } from "@/shared/api";
import _ from "lodash";

export function useCryptoRepository() {
  const queryClient = useQueryClient();

  const cryptosList = queryClient.getQueryData<Crypto[]>(['cryptosList']);

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
  }
}