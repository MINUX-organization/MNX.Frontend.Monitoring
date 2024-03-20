import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../_api-instance";

type Response = {
  id: string;
  domain: string;
  port: number;
  cryptocurrency: string;
};

type Request = {
  domain: string
  port: number
  cryptocurrencyId: string
}

export const editPoolApi = async (id: string, data: Request) => 
  (await apiInstance().put<Response>(`${BACKEND_APIS.POOL}/${id}`, data)).data as Response