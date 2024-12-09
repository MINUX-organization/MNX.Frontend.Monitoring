import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getFlightSheetById = async (flightSheetId: string) => 
  await (await apiInstance().get(BACKEND_APIS.FLIGHT_SHEETS + `/${flightSheetId}`)).data