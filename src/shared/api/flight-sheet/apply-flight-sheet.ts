import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const applyFlightSheetApi = <T>(id: string, data: T) => 
  apiInstance().post(`${BACKEND_APIS.FLIGHT_SHEET.FLIGHT_SHEETS}/${id}/apply`, data);