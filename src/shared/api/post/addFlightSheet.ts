import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const addFlightSheetApi = async (flightSheet: any) => 
  (await apiInstance().post(BACKEND_APIS.FLIGHT_SHEETS, flightSheet)).data 