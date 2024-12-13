import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

type Request = string[];

export const applyFlightSheetApi = (data: Request, flightSheetId: string) => 
  apiInstance().post(`${BACKEND_APIS.FLIGHT_SHEETS}/${flightSheetId}/apply`, data);