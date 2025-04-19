import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

export const addPoolApi = <T>(data: T) => 
  apiInstance().post(BACKEND_APIS.POOLS, data);