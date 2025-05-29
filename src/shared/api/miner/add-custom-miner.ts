import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const addCustomMinerApi = <T>(data: T) => 
  apiInstance().post(BACKEND_APIS.MINERS.CUSTOM_MINERS, data);