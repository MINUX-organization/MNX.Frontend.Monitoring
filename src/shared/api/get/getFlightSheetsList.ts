import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { Flightsheet } from "@/entities/flightsheet/modal/types";
import { apiInstance } from "../api-instance";

export const getFlightSheetsListApi = async () => 
  (await apiInstance().get(BACKEND_APIS.FLIGHT_SHEETS)).data as Flightsheet[]