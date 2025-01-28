import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

export const deletePoolApi = <T>() => 
  apiInstance().delete<T>(BACKEND_APIS.POOLS);