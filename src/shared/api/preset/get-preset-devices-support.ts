import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getPresetDevicesSupportedApi = <T>(id: string) => 
  apiInstance().get<T>(BACKEND_APIS.PRESET.PRESET_DEVICES_SUPPORTED(id));