import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

export const savePresetApi = <T>(data: T) => 
  apiInstance().post(BACKEND_APIS.PRESETS, data);