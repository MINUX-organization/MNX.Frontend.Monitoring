import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getFlightSheetDevicesSupportedApi = <T>(id: string) => 
  apiInstance().get<T>(BACKEND_APIS.FLIGHT_SHEET.FLIGHT_SHEET_DEVICES_SUPPORTED(id));