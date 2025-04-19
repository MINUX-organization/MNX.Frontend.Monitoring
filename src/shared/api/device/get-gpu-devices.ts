import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getGpuDevices = <T>() => 
  apiInstance().get<T>(BACKEND_APIS.DEVICES.GPUS)