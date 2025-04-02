import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getPresetDevicesApi = <T>(id?: string) => 
  apiInstance().get<T>(BACKEND_APIS.PRESET.PRESET_DEVICES(id));