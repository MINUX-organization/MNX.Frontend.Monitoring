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
    mutationFn: (crypto: Crypto) => addCryptocurrency(crypto),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(['cryptosList'], _.concat(cryptosList, variables))
    }
  });
  
  const deleteCrypto = useMutation({
    mutationFn: (fullName: string) => deleteCryptocurrency(fullName),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(['cryptosList'], _.filter(cryptosList, (crypto) => crypto.fullName !== variables))
    }
  });

  return {
    cryptosList,
    isLoading,
    error,
    addCrypto,
    deleteCrypto
  }
}