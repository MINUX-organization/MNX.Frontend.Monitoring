import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../_api-instance";

export const deleteWalletApi = (id: string) => 
  apiInstance().delete(`${BACKEND_APIS.WALLET}/${id}`);