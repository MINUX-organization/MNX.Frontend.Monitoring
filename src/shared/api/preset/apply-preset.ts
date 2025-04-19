import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const applyPresetDevicesApi = <T>(id: string, data: T) =>
  apiInstance().post(`${BACKEND_APIS.PRESET.PRESETS}/${id}/apply`, data);