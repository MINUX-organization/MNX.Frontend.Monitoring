import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const deletePresetApi = (id: string) => 
  apiInstance().delete(`${BACKEND_APIS.PRESETS}/${id}`);