import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const deleteFlightSheetApi = async (id: string) => 
  apiInstance().delete(`${BACKEND_APIS.FLIGHT_SHEETS}/${id}`)