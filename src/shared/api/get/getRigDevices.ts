import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getRigDevicesSupportedApi = (flightSheetId: string) =>
  apiInstance().get(`${BACKEND_APIS.FLIGHT_SHEETS}/${flightSheetId}/devices/supported`)