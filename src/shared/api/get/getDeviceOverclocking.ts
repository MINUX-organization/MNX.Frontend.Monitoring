import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getDeviceOverclocking = <T>(deviceId: string) =>
  apiInstance().get<T>(`${BACKEND_APIS.DEVICE_OVERCLOCKING}?deviceId=${deviceId}`);