import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getGpuRestrictionsApi = <T>(deviceId: string) => 
  apiInstance().get<T>(BACKEND_APIS.DEVICES.GPUS_RESTRICTIONS(deviceId));