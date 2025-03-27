import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const applyPresetApi = <T>(id: string, data: T) =>
  apiInstance().post(`${BACKEND_APIS.PRESETS}/${id}/apply`, data);