import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getGpusUniqueNamesApi = <T>() => 
  apiInstance().get<T>(BACKEND_APIS.DEVICES.GPUS_UNIQUE_NAMES);