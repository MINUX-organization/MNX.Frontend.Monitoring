import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

export const editPresetApi = <T>(id: string, data: T) => 
  apiInstance().patch(`${BACKEND_APIS.PRESET.PRESETS}/${id}`, data);