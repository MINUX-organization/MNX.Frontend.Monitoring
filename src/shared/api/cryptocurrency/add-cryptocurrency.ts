import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const addCryptocurrencyApi = <T>(data: T) => 
  apiInstance().post(BACKEND_APIS.CRYPTOCURRENCIES, data);