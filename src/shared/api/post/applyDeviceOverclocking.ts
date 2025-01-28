import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const applyDeviceOverclockingApi = <T>(data: T, deviceId: string) => 
  apiInstance().post(`${BACKEND_APIS.DEVICE_OVERCLOCKING}`, data, {
    params: { deviceId }
  });