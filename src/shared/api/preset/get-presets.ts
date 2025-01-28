import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

export const getPresetsApi = <T>() => 
  apiInstance().get<T>(BACKEND_APIS.PRESETS);