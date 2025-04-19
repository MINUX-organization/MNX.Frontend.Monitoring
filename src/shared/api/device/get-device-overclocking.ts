import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getDeviceOverclockingApi = <T>(id: string) => 
  apiInstance().get<T>(BACKEND_APIS.DEVICES.DEVICE_OVERCLOCKING, {
    params: {
      deviceId: id
    }
  });