import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../_api-instance";

export const deleteWallet = (id: string) => 
  apiInstance().delete(`${BACKEND_APIS.WALLET}/${id}`);