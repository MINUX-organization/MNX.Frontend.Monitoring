import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

export const deletePoolApi = <T>(id: string) => 
  apiInstance().delete<T>(`${BACKEND_APIS.POOLS}/${id}`);