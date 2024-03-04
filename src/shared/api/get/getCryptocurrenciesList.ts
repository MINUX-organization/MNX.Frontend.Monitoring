import { apiInstance } from "../_api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

type Response = {
  id: string;
  shortName: string;
  fullName: string;
  algorithm: string;
}

export const getCryptocurrenciesList = async () => 
  (await apiInstance().get(BACKEND_APIS.CRYPTOCURRENCY)).data as Response[];