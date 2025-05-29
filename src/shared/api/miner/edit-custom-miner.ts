import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const editCustomMinerApi = <T>(minerId: string, data: T) => 
  apiInstance().put(BACKEND_APIS.MINERS.CUSTOM_MINERS + `/${minerId}`, data);