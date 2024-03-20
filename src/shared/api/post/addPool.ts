import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../_api-instance";

type Response = {
  id: string;
  domain: string;
  port: number;
  cryptocurrency: string;
}

type Request = {
  domain: string;
  port: number;
  cryptocurrencyId: string;
};

export const addPoolApi = async (data: Request) => 
  (await apiInstance().post<Response>(BACKEND_APIS.POOL, data)).data
