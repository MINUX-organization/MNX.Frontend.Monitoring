import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

export const deletePresetApi = <T>(id: string) => 
  apiInstance().delete<T>(`${BACKEND_APIS.PRESETS}/${id}`);