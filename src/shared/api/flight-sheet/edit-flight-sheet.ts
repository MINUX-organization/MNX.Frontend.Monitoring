import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const editFlightSheetApi = <T>(id: string, data: T) => 
  apiInstance().put(`${BACKEND_APIS.FLIGHT_SHEET.FLIGHT_SHEETS}/${id}`, data);