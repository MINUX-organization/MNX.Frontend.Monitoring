import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

export const getPresetsGroupedByGpuApi = <T>() => 
  apiInstance().get<T>(`${BACKEND_APIS.PRESETS}/gpu_groups`);