import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const deleteCustomMinerApi = <T>(minerId: string) => 
  apiInstance().delete<T>(BACKEND_APIS.MINERS.CUSTOM_MINERS + `/${minerId}`);