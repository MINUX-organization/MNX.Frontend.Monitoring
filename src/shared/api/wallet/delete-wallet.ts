import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

export const deleteWalletApi = <T>(id: string) => 
  apiInstance().delete<T>(`${BACKEND_APIS.WALLETS}/${id}`);