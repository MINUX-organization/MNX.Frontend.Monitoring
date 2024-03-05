import { useQuery } from "react-query";
import { Crypto } from "./types";
import { getCryptocurrenciesList } from "@/shared/api";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";

export function useCryptoQuery() {
  const { data, ...cryptoQuery } = useQuery(['cryptosList'], getCryptocurrenciesList);
  
  const cryptosList = ZodSaveParse(data, Crypto.array().optional());

  return {
    cryptosList,
    ...cryptoQuery
  }
}