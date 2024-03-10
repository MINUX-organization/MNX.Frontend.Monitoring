import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../_api-instance";

export const deleteCryptocurrency = (id: string) => 
  apiInstance().delete(`${BACKEND_APIS.CRYPTOCURRENCY}/${id}`);