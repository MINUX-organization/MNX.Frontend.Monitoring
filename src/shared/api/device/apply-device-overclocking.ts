import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const applyDeviceOverclockingApi = <TResponse>(data: TResponse, id: string) => 
  apiInstance().post(BACKEND_APIS.DEVICES.DEVICE_OVERCLOCKING, data, {
    params: {
      deviceId: id
    }
  });