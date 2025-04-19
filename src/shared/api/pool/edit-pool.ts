import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

export const editPoolApi = <T>(id: string, data: T) => 
  apiInstance().put(`${BACKEND_APIS.POOLS}/${id}`, data);