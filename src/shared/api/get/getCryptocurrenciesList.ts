import { apiInstance } from "../_api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

type Response = {
  shortName: string;
  fullName: string;
  algorithmName: string;
}

export const getCryptocurrenciesList = async () => 
  (await apiInstance().get(BACKEND_APIS.CRYPTOCURRENCY)).data as Response[];