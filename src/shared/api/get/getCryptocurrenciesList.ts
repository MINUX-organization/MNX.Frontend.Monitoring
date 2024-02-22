import { AxiosResponse } from "axios";
import { apiInstance } from "../_api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

interface Response {
  shortName: string;
  fullName: string;
  algorithm: string;
}

export const getCryptocurrenciesList = () => 
  apiInstance().get(BACKEND_APIS.CRYPTOCURRENCY) as Promise<AxiosResponse<Response, unknown>>;