import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

export const editWalletApi = <T>(id: string, data: T) => 
  apiInstance().put(`${BACKEND_APIS.WALLETS}/${id}`, data);