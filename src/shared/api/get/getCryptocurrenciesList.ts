import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

type Response = {
  id: string;
  shortName: string;
  fullName: string;
  algorithm: string;
}

export const getCryptocurrenciesListApi = async () => 
  (await apiInstance().get(BACKEND_APIS.CRYPTOCURRENCY)).data as Response[];