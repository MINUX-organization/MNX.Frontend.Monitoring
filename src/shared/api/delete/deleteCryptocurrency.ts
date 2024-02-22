import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../_api-instance";

export const deleteCryptocurrency = (fullName: string) => 
  apiInstance().delete(`${BACKEND_APIS.CRYPTOCURRENCY}/${fullName}`);