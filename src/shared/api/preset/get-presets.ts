import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

export const getPresetsApi = <T>(deviceName?: string) => 
  apiInstance().get<T>(BACKEND_APIS.PRESET.PRESETS, {
    params: {
      gpuName:deviceName
    }
  });