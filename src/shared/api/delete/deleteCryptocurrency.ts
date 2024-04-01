import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const deleteCryptocurrencyApi = (id: string) => 
  apiInstance().delete(`${BACKEND_APIS.CRYPTOCURRENCY}/${id}`);