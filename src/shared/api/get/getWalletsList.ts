import { apiInstance } from "../_api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

type Response = {
  id: string;
  name: string;
  address: string;
  cryptocurrency: string;
}

export const getCryptocurrenciesList = async () => 
  (await apiInstance().get(BACKEND_APIS.WALLET)).data as Response[];