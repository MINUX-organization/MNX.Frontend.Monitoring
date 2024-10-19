import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const editFlightSheetApi = async (id: string, flightSheet: any) => 
  (await apiInstance().put(`${BACKEND_APIS.FLIGHT_SHEETS}/${id}`, flightSheet)).data