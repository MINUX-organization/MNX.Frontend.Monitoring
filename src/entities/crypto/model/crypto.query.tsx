import { useMutation, useQuery } from "react-query";
import { Crypto } from "./types";
import { addCryptocurrency, deleteCryptocurrency, getCryptocurrenciesList } from "@/shared/api";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";

export function useCryptoQuery() {
  const { isLoading, error, data } = useQuery(["cryptosList"], getCryptocurrenciesList);

  const cryptosList = ZodSaveParse(data, Crypto.array().optional());

  const addCrypto = useMutation((crypto: Crypto) => addCryptocurrency(crypto));
  const deleteCrypto = useMutation((crypto: Crypto) => deleteCryptocurrency(crypto.fullName));
  
  return {
    cryptosList,
    isLoading,
    error,
    addCrypto,
    deleteCrypto
  }
}